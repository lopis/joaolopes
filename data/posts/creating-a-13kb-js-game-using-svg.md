---
title: Creating a 13KB JS Game using SVG
path: '/how-to-design-a-javascript-game-in-13kb-or-less'
date: 2019-09-18T09:11:01.253Z
description: Where I go through my process of using SVGs to create an animated game interface.
tags: js13k, javascript, svg
image: ../../assets/img/blueprint.png
---

This is the second, more technical, part of my JS13K post-mortem. If you didn't yet, [check out the first part about game design](https://dev.to/mrlopis/how-to-design-a-javascript-game-in-13kb-or-less-59kn).

----

[JS13K](https://js13kgames.com/) is all about developing 13KB javascript games using anything you want, as long as all your assents fit in those 13kb - that includes code, images, sounds, game data, and any libraries you might need. I developed my game from scratch, I 

## TOC

 * [Choice of graphics](#choice-of-graphics)
 * [Creating and manipulating SVGs](#creating-and-manipulating-svgs)
 * [Saving and optimizing SVGs](#saving-and-optimizing-svgs)
 * [Animating dots on an SVG](#animating-dots-on-an-svg)
 * [Moving SVG elements around](#moving-svg-elements-around)
 * [Final notes](#final-notes)

## Choice of graphics

[Last year](https://js13kgames.com/entries/signalmon) I developed a game using 2D Canvas. Canvas are really flexible and easy to use. You can save lots of bytes by generating your own graphics in javascript on the fly. 

![Paper prototypes](https://thepracticaldev.s3.amazonaws.com/i/51sqxgk3fw7b9kyk736t.jpg)

After a rough start this year, dipping my foot in generating graphics, I ended up abandoning that idea and focusing on the game mechanics. But I still wanted some sort of UI to make the game look better and be more engaging. So I had the idea of using SVG. SVG has many advantages:

* Large, complex, smooth and scalable images with small size, when compared to raster formats;
* It's XML and embeddable in HTML - you can set classes and IDs to each element;
* You can manipulate it in javascript; if you have a webdev background instead OpenGL, manipulating the UI as DOM is a very attractive proposition;
* You can style it and animate it using CSS3
* SVG animations (SMIL) are a thing in HTML5 and [browser compatibility is great for non-Edge browser](https://caniuse.com/#feat=svg-smil)

As I would find out, I was making a few naive assumptions when deciding to use SVG.

* SVG is small, but not very easy to compress; the paths definitions are actually pretty verbose, as is XML itself;
* There's a limit to what you can do with CSS on SVG elements; support for transforms is not reliable;
* SVG browser support is actually atrocious. It's like going back to 2005 where each browser is just doing their own thing. This effectively made me drop support for Safari and Edge early on;
* SMIL is a pain in the rear, and documentation is very poor compared to CSS animations.

But by the time I realized all this, the sunken cost was too high.

I also decided to make extensive use of emoji for all the icons. Emoji have become pretty ubiquitous in major OSs (at least Ubuntu, MacOS and Windows). This way, each icon costs only a couple bytes. The trade-off, of course, is that you have no control of how emoji look on each system.

## Creating and manipulating SVGs

My goto vectorial image editor is [Inkscape](https://inkscape.org/). It's libre software and works on Linux as well (or better than) on other OSes. I've been using it for years so I'm reasonably comfortable using it.

![Screenshot of Inkscape](https://thepracticaldev.s3.amazonaws.com/i/wbpugf0hqbd5u238b94q.png)

Most shapes are composed of nodes and curves. Simply put, the number of nodes, and not the complexity or the curves, nor the size of the shapes, will define how big the SVG file is. SVG supports different kinds of visual elements such as:

* Paths, very flexible, as complex as one desires, but more verbose;
* Objects, like rectangles and circles, less flexible but smaller in size;
* Symbols, reusable elements which can help to save lots of KBs;
* Groups, which are user-defined clusters of paths, objects, symbols, and other groups.

SVG can also contain a header with definitions such as styles, gradients and animations. Inkscape's UI supports almost everything I mentioned, with the notable exception of animations (that I know of). In fact, I noticed that when I wrote animations manually in the SVG markup, Inkscape would not only ignore them, but delete them on the next save.

Fortunately, you can embed multiple SVGs in HTML and any styles and other definitions will be shared between them.

## Saving and optimizing SVGs

Inkscape supports saving SVG in several different formats, like PDF, PNG, or Postscript. The format that I used the most was _Optimized SVG_. This format strips the file of any useless comments, headers, and attributes. It's possible to pick and choose which optimizations to enable each time one saves the file. Even then, I found the need to occasionally edit the markup manually to remove useless information.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/q1gk3h6v6onyuax53bmq.png)


For instance, `paint-order` is a property that defines if an element's stroke is drawn in front or behind it's fill. But most my shapes don't even have strokes, so this whole style is unnecessary. I found myself removing these styles occasionally because Inkscape would add them again.

As I mentioned earlier, SVG supports symbols. That worked great for some scenarios, namely for static objects like the little houses in my game. But for the people running around, I found that duplicating SVG objects in javascript was for effective.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/5swer3mgclzid5pv5fy8.gif)

In the gif above, I show you the "running ants" animation in my game. Then I disabled the mask on the paths so you could see that the dots are actually a single dash being animated along a path. This path is a clone of the template path, with a random scale transform applied to it on the X axis.

```javascript
$newTrail.style.transform = `scaleX(${1 + Math.random()*0.7 - 0.2})`;
```

So each "person" is a clone of the path.

## Animating dots on an SVG

It's possible to animate a dot along an SVG path using the SVG style property [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray). This property takes an array of values that define the dash pattern of the path.

So, for instance, a stroke-dash-array value of "2-1-4-1" paints a stroke pattern with a 2px dash, then a 1px gap, then a 4px dash, then another 1px gap, and then repeat until the end of the path. The corresponding CSS property is animatable. So to produce the path animation, I create a "dash" with size 1 and manipulate the size of the gaps around it. More precisely, I animated the gaps to change from zero to the length of the path.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/vf7ymx63vx85haiqvpgb.gif)

The code for the above animation can be found in [this codepen](https://codepen.io/lopis/pen/GRKXvQR).

I couldn't figure how to not have a dot in the beginning of the path. If you know how, I would like to hear it!.

Each person is then a dash on a path, with the exception of the hunters, who always travel in pairs. The hunters dash pattern is basically "1, 2, 1" and then surrounded by the variable gap.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/d01w02z0i5tx3brkp431.png)

> Fun fact: the stars in the sky are also a dashed path with a very large gap between dots!

# Animating gradient backgrounds

Another animation that maybe no one even noticed, is the smoke animation in the beginning of the game. The first time the player gets wood, the people in the game start burning it.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/4c8yho3eh99nap2no57d.gif)

SVG elements don't accept the `background` CSS property. Instead, they use the property `fill` which accepts a solid color - no gradients allowed. Because of that, you cannot get animated gradients either. Gradients in SVG are elements themselves. It's possible to define an animation right on the SVG source.

```xml
<linearGradient id="grad"
    x1="157" x2="157" y1="28" y2="28"
    gradientUnits="userSpaceOnUse">
  <stop stop-color="#fff" stop-opacity=".9" offset="0" />
  <stop stop-color="#e0e0e0" stop-opacity="0" offset="1" />
  <animate fill="freeze"
    attributeName="y2" begin="indefinite"
    dur="5" from="28" to="1" repeatCount="1" />
</linearGradient>
```
The above `<animate>` element defines an animation of the gradient. Typically, the animation would start right away. But because of the `begin="indefinite"` property, the animation is in stand-by. It's possible to trigger the animation using javascript:

```javascript
querySelect('animate').beginElement()
```

## Moving SVG elements around

I found a few different ways to accomplish movement. In this case CSS is a viable option. It's possible to use CSS transforms on individual elements and groups of elements. Unfortunately, the way the element moves can be unexpected. 

Firstly, SVG lives in a different dimension. What I mean is that a pixel on your webpage is not necessarily a pixel on your SVG if your SVG has been scaled. Also, if the element you are trying to move has been translated (for example in Inkscape), the transform origin might not be the middle of the element. This makes rotations very hard to use because it's often not clear where the rotation centre is.

Even worse! A translation+rotation that worked correctly in Firefox would not work correctly on Chrome at all. In my case, I was trying to animate the ship wreck in the beginning of the game. My solution was to move the ship in Inkscape to position (0, 0) and that seemed to help somewhat. But then I must have changed something and the rotation broken again. I ended up making the ship sink without rotation, just a downwards movement.

After I was done with tweaking the shipwreck animation I found out that Chrome couldn't deal with repeating the animation when the player presses "Reset". The SVG was the exact same as initially, the animations were the same, but for whatever reason, the ship animation was being completely thrown off. It. Made. No. Sense.

I ended up adding some ugly CSS just for Chrome to try and force-reset some transforms.

```css
/* Stupid hack for stupid Chrome */
@supports (not (-moz-appearance:none))
{ 
  #ship.new {
    transform: translate(0%, 0%);
  }
  #ship.go {
    transition: transform 7s cubic-bezier(.5,0,1,1);
    transform: translate(-20%, 60%)
  }
}
```

I also saw that when the game reset, Chrome would add `translate(0,0)` to the ship. It made no sense. The SVG was supposed to be pristine and no one told Chrome to do that. To address that I had to manually remove that translate when the game restarted:

```javascript
$shipTop.removeAttribute('transform') // Because Chrome is shit
```

## Final notes
Because of all the trouble I went through _just to move a boat_, you will probably not find me making more games using SVG and SMIL. I simply cannot recommend it - at least in its raw form without any libraries. So we are left in a situation where CSS3 animations of SVGs are not reliable, but have been pushed as a replacement for SMIL, [almost to the point of deprecating SMIL, but not quite](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/5o0yiO440LM/YGEJBsjUAwAJ).

> In the 15 months since we announced our intention to deprecate and eventually remove SMIL, we’ve heard a variety of opinions from members of the community. We value all of your feedback, and it's clear that there are use cases serviced by SMIL that just don’t have high-fidelity replacements yet. As a result, we’ve decided to suspend our intent to deprecate and take smaller steps toward other options.
> - Chrome team, 2016/08/17


My main takeaway this year is that I should prepare myself better before the next competition, by studying new tools like canvas engines and webGL. Also, I don't know why it didn't occur to me, but the most obvious solution to this whole mess would have been to have the boat be a _separate SVG_ that overlapped the map. Hindsight is 20/20 right?