---
title: Requirements are bull crap
path: '/on_requirements'
date: 2019-05-24T10:54:00.000Z
original_source: dev.to/mrlopis
original_link: https://dev.to/mrlopis/requirements-are-bull-crap-4gc1
description: Requirements are bull crap ...sometimes at least
tags: software engineering
image: ../../assets/img/office-troopers.jpg
---

...sometimes at least.

I worked as a frontend engineer for a company that sold a service to end customers via a multitude of partners. We sold our concept in different formats - we could either integrate with the partners' website, or we could setup a custom "white label" website to where the partner would redirect its customers.

According to our "partner managers", we had to customize the white label website to seamlessly match the partner's own website. We did this with a feature that let us choose 1 logo, a couple key colors, and apply a few lines of CSS on top of the white label. This way we could easily change logos, colors, fonts, and sizes.

Naturally, this feature was more than abused. Each new partner allegedly required more and more complex customization, brushing the limits of what we could even do with just CSS. Instead of a few lines of CSS, we now had pages of extra CSS. And with weeks of CSS'ing came weeks of testing and debugging. One particular project lasted 2 months __for a web app that technically already worked fine before__.

One time, after about 1 month of back-and-forth pixel-perfect crap-edits, we deployed our white label and redirected the partner's provided domain to us. But the engineering team made a mistake - we started accidentally serving the bare-bones white label with no customization, only the correct product names and company name. It had our logo, our corporate colors.

The partner managers were pissed. The product managers were pissed. The engineering team was quickly trying to figure out the mistake before the partners even noticed. Shortly after, the partner sent an e-mail saying:

> I love it. Just change it so it uses our logo.
