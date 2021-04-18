---
title: Clicking Stuff in E2E tests - smooth scrolling, Electron flags, and Cypress
published: true
description: How I spent 3 days trying to click a button on Cypress
tags: cypress, e2e, javascript, frontend
cover_image: https://dev-to-uploads.s3.amazonaws.com/i/r24hpcv6m1tskk5shbjd.jpg
original_link: https://dev.to/ecosia/clicking-stuff-in-e2e-tests-smooth-scrolling-electron-flags-and-cypress-2a1c
---

[Cypress](https://www.cypress.io/) is an incredibly popular end-to-end test tool. It's very versatile and typically easy to setup and use. Writing tests in javascript is reasonably intuitive, following a syntax reminiscent of JQuery.

There are several such tools. Selenium is probably the oldest around, released in 2004. The way they work is they run a browser and simulate user input on it. This sounds fairly simple, but as anyone that worked with Cypress, Selenium, or any other e2e runner will tell you, it's evidently anything but simple.

In my (admittedly limited) experience, these programs have always been sort of big and complex, with quirky behaviour, as they are but a dev-friendly frontend to the chaos of the browser APIs. Invariably, `wait` statements begin to plague the spec, waiting for the DOM dust to settle before going for the next click.

My latest battle with Cypress at [Ecosia](https://ecosia.org) included testing our simple snippet carousels:

![screenshot of the snippet carousels](https://dev-to-uploads.s3.amazonaws.com/i/gkim4gly378jp7b2wmd0.png)

## The test Scenario

I set out to implement a rather simple test scenario:

<blockquote>
 - The mock data has 7 items (the UI shows 3); <br>
 - The last item is not visible initially; <br>
 - If I click "next", the first item should no longer be visible; <br>
 - If I then click "next" 3 more times, the last item should come into view; <br>
 - If I then click "previous", the last item should no longer be visible; <br>
 - If I then click "previous" 3 more times, the first item should come into view; <br>
</blockquote>

For starters, I wrote a simpler version of the test scenario, which simply clicks "next" 4 times and checks if the first item is no longer visible, and the last one is.

```js
...
.get('.snippet-item')
.scrollIntoView()
.should('have.length', 7);

.get('.carousel-nav-button-next')
.click().click().click().click().click()

.get('.news-snippet-item').first()
.should('not.be.visible')
.get('.news-snippet-item').last()
.should('be.visible');
```

I ran this test, fully confident in my abilities, and the test failed. When I loaded up Cypress' GUI, I noticed that the click events were firing but nothing was happening.

Then it occurred to me that maybe our smooth scrolling was at fault? We use `scrollIntoView` in javascript with the option `behavior: smooth` in this carousel. Cypress is supposed to wait for the element to be clickable before firing another click, but I was starting to see that the behaviour of this framework was less than deterministic.

Disabling the smooth scrolling, the clicks events seemed to fire correctly. But how could I disable smooth scrolling just for Cypress?

## Disabling smooth scrolling just for Cypress

It turned out it's quite easy to detect Cypress. There is a runtime global `window.Cypress` that one can check:

```js
const scrollOptions: {
    behavior: (typeof window === 'undefined' || window.Cypress) ? 'auto' : 'smooth',
}
```

This would work, but it's really not ideal. We should not have our application code contain code related to our e2e test Framework. My next idea was to use some sort of browser flag that would disable smooth scrolling.

## There's no such thing as a browser flag to disable smooth scrolling

There is an accessibility feature present in any modern browser called ["reduced motion preference"](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). This preference will affect several animations in the browser chrome. You can (and should!) also use it to reduce the amount of animations in your applications, or tone them down. It doesn't, however, disable smooth scrolling on its own.

You can detect that this feature is enabled via CSS or Javascript using media queries.

```js
const prefersReducedMotion = typeof window === 'undefined' ? true :
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollOptions =  {
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
};
```

Furthermore, Firefox and Chrome can both be launched in "prefers reduced motion" mode by passing a flag. Cypress allows you to pass these flags using their [browser launch API](https://docs.cypress.io/api/plugins/browser-launch-api.html).

```js
on('before:browser:launch', (browser = {}, launchOptions) => {
  const REDUCE = 1;
  if (browser.family === 'firefox') {
    launchOptions.preferences['ui.prefersReducedMotion'] = REDUCE;
  }
  if (browser.family === 'chromium') {
    launchOptions.args.push('--force-prefers-reduced-motion');
  }
  return launchOptions;
});
```

I tested this in Cypress' GUI and confirmed that smooth scrolling was effectively disabled. My trust in my abilities was restored. I could see the light at the end of the tunnel!

## Electron doesn't support that

It turns out Cypress doesn't use Chrome nor Firefox by default. The included browser, and the one we use in our CI, is Electron. "But Electron is just Chrome", I hear you say. That is only partially true. Electron is a wrapper, and not all features and APIs are exposed the same way as in Chrome.

According to Cypress' [browser launch API docs](https://docs.cypress.io/api/plugins/browser-launch-api.html), the "prefers reduced flag" is not part of the list of flags and preferences I can pass to Electron.

From reading [some helpful github discussions](https://github.com/cypress-io/cypress/issues/1519), I finally found that some extra flags can be passed to Electron using "app switches". Those switches are described [further down in the docs](https://docs.cypress.io/api/plugins/browser-launch-api.html#Modify-Electron-app-switches). So I tried with the flag I wanted, by passing an environment variable to cypress in my `package.json` script:

```json
{
  "scripts": {
    "test:e2e": "ELECTRON_EXTRA_LAUNCH_ARGS=\"--force-prefers-reduced-motion\" cypress run --project ./e2e-tests"
  }
}
```

And this worked! Not as elegant as I would have hoped, but it did the trick. If there's a way to enable this switch in code, instead of using env vars, please let me know.

## Running the test without smooth scrolling

Implementing my test should be __smooth sailing__ henceforth. Without smooth scrolling, the clicks were registered correctly in Cypress' GUI.

I ran this test in the headless browser and it worked. Hurrah. Oh wait, there was an extra `click()` there by mistake. Silly me. I dropped the extra `click()`, feeling still sure of my mental capabilities. But, as you are surely aware due to the fact that you're still only 70% through this article, the story didn't end here. The test failed.

## A friendly frontend to chaotic browser APIs

All devs, at some point, have moments where they doubt everything they know. So I spun the app up locally and clicked repetitively on the "next" button while counting the number of clicks on my fingers. Then I counted the fingers and there were 4 fingers. So I confirmed I had not lost my mind yet.

I tried adding a `.wait(500)` before the click, but that didn't help. So I headed to the Internet.

I found a [stack overflow thread](https://stackoverflow.com/questions/51254946/cypress-does-not-always-executes-click-on-element) where people made some odd suggestions. One was to add `.trigger('mouseover')` before each click (?!). Another was to to replace the failing `.click()` with `.click().click()` (been there, done that). But the top answer suggested using `.click({ force: true })`.

Using force worked. Until I returned the next day and it didn't work anymore. I can't tell you why it was working, nor why it stopped, but it did, then it didn't. I'm glad it didn't because the solution was hacky and simply didn't sit right with me. Specially since it was ill-defined behaviour that would surely come bite me in the back in the future.

I was seriously tempted to just use `.click().click()` and leave it at that. Would I be able to live with it? Sure. Would I be able to sleep at night? Probably. But it's just wrong and I still had some sense left in me.

At this point I asked my 2 colleagues if they could spare ""a  m i n u t e"" because Cypress was acting up.

## Cypress will be Cypress?

It's easy to blame Cypress for being a horrible tool brought upon us by Beelzebub himself. But as I mentioned before, Cypress provides a friendly interface to the very chaotic browser environment. Brushing aside any dreams of moving the team to The Next Great Thing™️, we started figuring out what was wrong and how we could tackle the issue.

We considered that the click event might not be installed by the time the first click happens. However, `wait()` would have solved this, and it doesn't explain why a second click works. But it does seem like the `.click()` that always missed was sort of "waking up" the component.

Further tests showed that this also happened when clicking on the previous button, even after clicking the next button.  I wish I had an explanation for this behaviour, but that's unfortunately not the case. I do, however, have a working solution for the problem.

## Working solution for the problem

We developed a solution that tries to ensure that the element is ready to be clicked, and call the next click once ready again. It sounds overkill, it looks overkill, but this was the only way we found that was bullet proof. It's also quite elegant:

```js
const clickOnControl = (selector, times, callback) => {
  if (times > 0) {
    cy.get(selector).then(($next) => {
      cy.wrap($next).click().then(() => {
        clickOnControl(selector, times - 1);
      });
    });
  } else if (callback) {
    callback();
  }
};
```

The final e2e test looks simple and elegant as it should:

```js
const getItems = () => cy.get(byTestId(`snippet-card`));
getItems();
getItems().should('have.length', 7);
getItems().first().should('be.visible');
getItems().last().should('not.be.visible');
cy.get(byTestId('result-snippet-control-previous')).should('not.be.visible');
cy.get(byTestId('result-snippet-control-next')).should('be.visible');

clickOnControl(byTestId('result-snippet-control-next'), 1,
  () => {
    getItems().first().should('not.be.visible');
    getItems().last().should('not.be.visible');
    cy.get(byTestId('result-snippet-control-previous')).should('be.visible');
    cy.get(byTestId('result-snippet-control-next')).should('be.visible');
  },
);

clickOnControl(byTestId('result-snippet-control-next'), 3,
  () => {
    getItems().first().should('not.be.visible');
    getItems().last().should('be.visible');
    cy.get(byTestId('result-snippet-control-previous')).should('be.visible');
    cy.get(byTestId('result-snippet-control-next')).should('not.be.visible');
  },
);

clickOnControl(byTestId('result-snippet-control-previous'), 1,
  () => {
    getItems().first().should('not.be.visible');
    getItems().last().should('not.be.visible');
    cy.get(byTestId('result-snippet-control-previous')).should('be.visible');
    cy.get(byTestId('result-snippet-control-next')).should('be.visible');
  },
);

clickOnControl(byTestId('result-snippet-control-previous'), 3,
  () => {
    getItems().first().should('be.visible');
    getItems().last().should('not.be.visible');
    cy.get(byTestId('result-snippet-control-previous')).should('not.be.visible');
    cy.get(byTestId('result-snippet-control-next')).should('be.visible');
  },
);
```

## Final Notes

I remember when I first learned about Cypress in a frontend meetup some years ago. It really was sold to me as an amazing tool that was super easy to use. I have great respect for the creators and maintainers of Cypress, and it seems like they are very active and helpful on github too. But the amount of headaches we get, and the brittleness of our e2e tests,makes us start seriously considering The Next Great Thing™️.
