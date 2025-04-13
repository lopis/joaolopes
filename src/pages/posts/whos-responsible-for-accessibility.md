---
title: Who's responsible for accessibility in software development?
published: true
description:
tags: a11y, a11yday, webaccessibility, accessibledesign
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r8unba6uqrq9g1ctab8m.png
original_link: https://dev.to/lopis/whos-responsible-for-accessibility-in-software-development-1b0c
date: 2023-05-17
---


It's [Global Accessibility Awareness Day](https://a11y.day/)! So in the spirit of a11y day, I have a question for you:

In software development projects, namely those with UIs, *who's responsible for paying attention to the accessibility* of said UIs? Is it the project manager? Or is it the designer? The software developer? Perhaps the QA engineer? As you can probably guess, everyone has their own responsibilities.

I asked my colleagues to answer two questions: what is your role, and how does it contribute to developing an accessible product?

## Table Of Contents

* [Product Manager](#product-manager)
* [Product Designer](#product-designer)
* [Content Designer](#content-designer)
* [Frontend Engineer](#frontend-engineer)
* [Mobile Engineer](#mobile-engineer)
* [QA Engineer](#qa-engineer)
* [A11y Champion](#accessibility-champion)
* [Final Notes](#final-notes)
  * [Backend Engineer](#backend-engineer)
  * [IT Admin](#it-admin)
  * [User support](#user-support)

![Team planning around a table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/265y7yl5robnp9xhi925.png)

## Product manager

As a product manager, I define a vision, strategy and roadmap for our products, based on the overall company direction.

My daily tasks include prioritising features and requirements,
coordinating collaboration with other teams when needed, writing acceptance criteria (AC), analysing trends and patterns in the industry and analysing customer feedback and analytics data.

**I ensure that accessibility is part of the "definition of done"** of a project or feature by planning for the necessary capacity for implementing accessible features. I review projects regularly to stay up-to-date with the latest accessibility principles. I work with the company's accessibility experts - mostly developers - to establish a baseline of accessibility requirements.

![Abstract design popping out of a computer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/43r2ig89r2i9w9e4t088.png)

## Product Designer

As a product designer, I help keep our design system alive and up-to-date. This includes not only creating new components, composing layouts and design interactions and animations, but also establishing and following design principles across the organization.

These design principles include a set of accessibility guidelines that must be followed when creating design system (DS) components, as well as when developing feature work. I routinely review these components in terms of color contrast, font size, spacing, copy, and navigability, to make sure they follow the established guidelines.

I also lead user surveys and user tests that allow me to see how real users use our products, and how they perceive different prototypes.

## Content Designer

I strive to understand how content (i.e. text, image or otherwise) influences user behaviour. I'm responsible for creating and shaping the content strategy and user experience in the different mediums (web, mobile, socials). My role blends creativity, storytelling, and data-driven insights to create cohesive and persuasive digital experiences.

By considering accessibility guidelines and incorporating practices such as alt text for images, proper heading structure, descriptive text in links and buttons, succinct and clear copy, I help make information accessible to a broader audience, enhancing the overall user experience for people with diverse needs.

![Engineering coding on a computer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/io47vj4ujxgbvums4n2y.png)

## Frontend Engineer

As a developer, I bring designs to life through code following the acceptance criteria. I write automated tests to validate my implementation, but also manually test it before a release. I also review my colleague's code, and participate in design reviews and project planning.

I'm responsible for staying up-to-date with web accessibility standards. I use semantic HTML and ARIA labels, paying special attention to the interactive elements of our pages, like forms or dynamic content. Sometimes, special labels need to be added specifically for screen reader users.

Finally, I set up a11y automation tools like Lighthouse to assure high code quality throughout the team, which flag various accessibility issues like color contrast and HTML problems.

## QA Engineer

My main role is being the quality coach of the team. I establish cross-project QA guidelines, create templates for QA mind maps, create testing plans for developers, and establish cross-project acceptance criteria, like target browser versions.

I also write automated tests, namely end-to-end acceptance tests, e.g. using tools like browserstack. Manual QA of whole projects is also often my responsibility.

I ensure that accessibility requirements are included in the product ACs as well as in the technical ACs. I also use tools that report several a11y issues in the browser like WAVE while testing products.

# Mobile Engineer

As a mobile engineer, I create and maintain our company's mobile apps. I create new features based on a design, and fix bugs reported to us. It's my responsibility to understand mobile UX patterns. I communicate effectively with PM, Leads and Team Member regarding expectations, and participate in project planning.

I must ensure that elements are easily discernible by color and contrast regardless of the users' theme. I identify where alt texts are needed for elements which are either directly relevant (e.g. buttons) or which is only represented graphically. A big part of this is knowing the semantics of each type of element.

I also perform manual accessibility QA using the native screen reader, using alternative navigation methods, using apps without looking at the screen, or with a single hand.

![Person on a stage giving a talk while others listen and ask questions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v6evke9dd4u13u5688hk.png)

## Accessibility Champion

The "Accessibility Champion" can be anyone in the company, really.

As the Accessibility Champion, I campaign for inclusive design at every step of product development, as well as in other company functions. To do that, I keep up-to-date with the community standards and strive to learn as much as possible about the topic. The Accessibility Champion can be an abled person.

I organize cross-team and cross-discipline workshops. For example, I invite experts to increase company knowledge on a11y, and to show us how accessibility features are used both on computers and smartphones. I also write cross-team documentation and guidelines, and try to mentor new champions from different teams.

![Two people planting a tree](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2f4n4ebhptbzk2gnk9oj.png)

## Final Notes

Without trying to be exhaustive, this is should give you an idea of who's responsible for accessibility in a company: everyone. I'll leave you with a few other examples:

### Backend Engineer

I try to think about how different users will use the products I develop, e.g. accessing content in different languages and locations. I try to involve users early on to ensure proper terminology is used during project definition. I also believe good code documentation is important for the accessibility of my own colleagues.

### IT Admin

My responsibility is to provide my colleagues with the hardware, software, user accounts and other technical faculties they need to perform their work. Because I don't interact directly with our users, my main concern when it comes to accessibility is to fullfil the requirements of those with a11y needs. This could be making sure our video calls software transcripts are correctly set up, or provisioning special hardware.

### User support

My daily tasks include answering user requests, building up our help center, and facilitating feedback. I strive to use inclusive and easy language, and to make the help center more intuitive and accessible. It's important to establish guidelines on how to respond to user feedback in an inclusive manner.
