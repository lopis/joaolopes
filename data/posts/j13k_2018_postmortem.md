---
title: JS13K Game competition postmortem
path: '/j13k_games_postmortem'
date: 2019-05-24T10:54:00.000Z
original_source: dev.to/mrlopis
original_link: https://dev.to/mrlopis/js13k-game-competition-postmortem-2j1p
description: What I learned about game development and working on my own
tags: javascript, js13k, game development
image: ../../assets/img/signalmon.jpg
---

## The challenge

The 2018 edition of [js13k game development competition](http://js13kgames.com/) has come to an end. During 1 month dozens (hundreds?) of developers try to develop a tiny javascript game that can fit in 13KB - that's including graphics, code and sounds.

2018 was my second attempt at this challenge. Last year I developed a JS+CSS game called [Hoosdere](http://js13kgames.com/entries/hoosdere) where you had to outrun monsters and escape from a forest. The controls and the visuals were quite poor. The game was also delivered incomplete. This year, I promised I would do better and faster.

### The concept

Each year, the competition has a theme. The previous theme was "lost" while this year, the theme was "offline". You are of course free to interpret this theme however you want. Somehow, I quickly came up with the idea for a new game. I would make a tamagochi-like game where the online/offline state of the device would directly influence the mental state of the pet. So I started how I always start: with a pen and some paper:

![Initial mockup of the game](https://thepracticaldev.s3.amazonaws.com/i/uj59kwlp8817fc3wtp67.jpg)

Although I started late this year, I tried to get the best out of the remaining 3 weeks. With the game concept creation out of the way, it was time to explore technologies and tools.

### Tools

#### The engine

Last year, I designed my game using CSS animations and filters, as well as some SVGs. This was _ok_ but the performance was really down. So this year I decided that I wanted to grow and learn some proper WebGL. I tried a few different tools from the ones suggested by js13kgames, and settled with [tiny-Canvas](https://github.com/bitnenfer/tiny-canvas) which sets the webGL context up and provides tools to render and manipulate pictures.

#### The design

<INSERT PISKEL SCREENSHOT HERE>

I also decided that I wanted to brush up my pixel art skills, so the game would have a limited palette pixel-art design. I found a great online editor called [Piskel](https://www.piskelapp.com/) which lets you save all your designs in the browser and works offline as well. It also lets me create sprite sheets and animations, as well as defining a color palette.

Ironically, certain tasks in my main job provided some essential clues that would save me precious kilobytes: compressing PNGs. I used the online PNG compressing tool [TinyPNG](https://tinypng.com/). It easily saved me 50% of the size of my images.

Something that I want to explore next year is whether sprite sheets have smaller file sizes than the sum of the separate images. Also, if a square sprite sheet in a grid has better compression results than a single column or single row. I saw mixed results in the limited tests I ran.

#### The code

Last year I explored a couple ways of minimizing my code. Since the target browsers are evergreen, I didn't care about transpiling javascript: ES6 will do! For minifying I adapted last year's gulp file (https://github.com/lopis/signalmon/blob/master/gulpfile.js). Nothing fancy there, just plain old uglyfied javascript, css and html.

My Javascript code consists of a few independent classes and a main script that declares them:

```
    controls.js - handle user input a trigger events from them
    draw.js - handle all the drawing cycles in a functional way
    game.js - contains the game state; handles the game cycles and updating the state when events occur
    microphone.js - handles input from the microphone (more on this later)
    mini-events.js - https://github.com/allouis/minivents
    tiny-canvas.js - https://github.com/bitnenfer/tiny-canvas
    utils.js - helper global functions

    main.js - main game cycle and initializes the other modules
```

## The controls

<INSERT BUTTONS SCREENSHOT HERE>

Something that I learned from last years is that game inputs can make or break a game. I tried convoluted ways of handling game controls and ended with a horrible game experience that was not intuitive, but slow and confusing. So this year I decided to go for something basic: buttons, just like a tamagochi. I wanted to make this game differentiate itself so I introduced two funny user inputs.

 * First, the game depends on the device being connected to the Internet or not. This was my idea to follow the "offline" theme of the competition.
 * Second, the game microphone is used to detect noise. There is no recording going on, I just wanted "noisy environments" to be a game element.
 * There was going to be a third one - device shaking - but I realized too late that the web APIs have not yet that point. So I discarded that idea.

I wanted my game to make players go offline. The game also requires you to go online now and then, but most of the time you device must go completely offline for you to successfully play. I though it was very philosophical or a good metaphor for real life or something else very deep.

## The development

I have a job. And this is not it. So I, like many of my fellow challengers, had to find the time to work on this game. 

## Working schedule

I have a fairly significant daily train commute - about 25 minutes. This gave me some solid 50 minutes of daily progress, as long as I could find a seat. I could also afford to work for about 6 to 8 hours during the weekend. From my rough calculations, I could dedicate about 30 hours to this game.

As things always go in these challenges, I'm never really prepared. I tried to do some product management, but quickly abandoned it in favour or simple paper with checkboxes. The issue here is that I was not totally sure of what my MVP should look like and how much I could accomplish in the strict deadline.

One thing I wish I did, and will explore next year, is accurate time tracking. I want to know how much time each task took me and where I am wasting time. One issue I had last year was that I got lost trying to get the sound effects just right, and I ended up not having time to improve on the game controls. I'm a programmer, not an artist, so I should have seen that time sinkhole coming.

## My takeaway

I enjoyed how much I learn about my capability to focus. It's essentially very poor, but if I have a clear goal in mind I am able to focus for several days on small tasks to accomplish it.

I would like to work with someone else. For the whole time, I struggled with some creative blocks because I didn't have a coding partner with whom I could discuss the game details. I also found that I got lost in my game metaphor and the concept was less than clear for less savvy players. I had a hard time conveying the idea to some people.

I should prepare my work environment before hand. I spent too much time refactoring my code because I didn't know where I was heading. Creating a good webGL platform for my images, animations and cycles would have been a good idea.

Pixel art is fun. I forgot how much I liked.

I yearn for validation. I couldn't help but send the game to as many people as I could. But I had to restrain until the end myself because I understand that trying a half-backed game would spoil their perception of the final version.

I'm definitely trying again and harder next year.