---
title: Creating a tiny zen game using Kontra
published: true
description: How I created a relaxing 13KB game about ant watching using Kontra.js 
tags: js, js13k, gamedev, gamejam
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n4pfxgn8h93unufbc3mg.jpg
series: js13kgames
original_link: https://dev.to/lopis/creating-a-tiny-zen-game-using-kontra-jm8
date: 2023-06-01
---


Another year has passed and with it another [JS13K game jam](https://js13kgames.com/) has come to an end. If you're not familiar with this game jam, the challenge is to create a web game that fits in under 13KB (zipped), including code, and assets. This year's theme was "space", so it made me think of something like "dimension". My interpretation of this theme was to create an empty space where some agents would roam and interact.

## The game concept

![alt text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dok8ypi8xm048j324tkj.png)

I had lots of ideas for this game, but not so much time to implement them. Even though the competition runs for 1 month, work got in the way, and then I was away with my family for some time too. I imagine an agent-based game where each agent was an ant explored the area around the ant nest. I envisioned a game map with predators, food and obstacles.

The main game mechanic that I wanted to focus on was the ability of ants to use chemical signals to follow each other- If you want to learn more about ants, watch [these](https://www.youtube.com/watch?v=N8rGEiHI52c) [videos](https://www.youtube.com/watch?v=vG-QZOTc5_Q).

Basically, each time an ant moves, she leaves a chemical trail behind. Other ants are able to pick up on this trail. The more ants follow a trail, the more they reinforce it, and the more ants tend to follow that path.

While implementing these ant-like behaviours, I became so obsessed with watching my creations move around and follow that I ended up focusing my whole game on the concept of ant watching, and creating a relaxing artistic experience.

## The Algorithm

I went back and forth thinking about how to better represent the ant space. I initially tried to use a square or hexagonal grid where ants would move in discreet steps. The chemical trails would also only exist in discreet locations in space. The problem with using a grid if that it would make the trails too restricted and ugly, and animating the ants would be more annoying. Furthermore, maintaining the 3-dimensional array to represent that hex grid and all its data got very ugly, very fast.

The solution I came up with was to use the actual canvas as a data store for the trails. The ants's position is kept by Kontra (the game engine) and the ants "paint" the blue trail on the canvas on each update.

![alt text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vxm57ljpphwnxztm4uzf.png)

Each ant follows a very rudimentary algorithm:

- If the "blueness" ahead is high, move forward
- If the "blueness" on the right if high, turn slightly to the right
- If the "blueness" on the left if high, turn slightly to the left
- Else, continue forward with a chance of turning slightly to the side randomly.

The "blueness" of a pixel, as the name indicates, is how blue a pixel is. The more ants leave a trail on a place, the bright the blue color, and the higher its blueness. In a future iteration of this experiment, ants would leave trails of different colors to mean different things. In natural, ants leave different chemical trails to mean "just exploring" or "i found food". By using the 3 RGB channels of each pixel on the canvas as separate data, I could theoretically have overlapping trails of different types.

But for now, all my ants do is explore, so all trails are blue.

Nonetheless, even with this very rudimentary algorithm, the emergent behavior of dozens of ants was already quite interesting to watch. I played around with the values a lot to try to fine tune how the "ant art" looked; the final version use these values:

- The "trail radius" was set to 2 pixels
- When looking ahead or to the sides, the ant looks about 4 pixels in that direction (the "lookout distance", twice the "trail radius")
- When inspecting the sides, the ant looks 60 degrees to the right and left (the "lookout angle")
- When turning to the sides, the ant only turns 30 degrees (half of the "lookout angle").

## Animation

I wanted ants that were more than black dots on the screen, so I tried to learn [how ants walk](https://www.youtube.com/watch?v=DLczo4N3CPI). Essentially they walk 3 legs at a time.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/91yw9wxf26kcse9s9blg.png)

I used Inkscape to create a basic model of the ants, and then moved their legs a little. I figured  8 frames for the whole movement should be enough, given the small size of the sprites. Using Kontra, it was trivial to implement the sprite animation. You just provide the sprite dimensions, the frame rate, and the frames that correspond to each animation, and the engine does the rest.

## Kontra

[Kontra](https://straker.github.io/kontra/) is a lightweight library for creating javascript games. It's the first time I have used any sort of game engine in this competition, but I found it immensely helpful in allowing me to quickly prototype my game without worrying about the basics.

Kontra provides a game loop, a sprite-based character system, events, input controls, as well as helpful utilities to check if sprites are colliding and move them easily.

The documentation is a bit lacking at times, but for such a tiny library, it's really not that much of a problem.

## Next steps

Maybe because this was a very relaxing game to make and play, for the first time I actually feel like continuing the development of this project. Here are some extra ideas I have.

### Sense of direction

I want to improve the sense of direction of the ants. In the real world, ants seem to know in which direction home is on a trail. My ants just follow the path mindlessly. One way to do this would be to make the strength of the trail weaker as they move forward, creating a tendency for ants to return home vs move farther away.

### Feed the ants

I want ants to explore the space with a purpose. I want to add bits of food that they want to carry home. For this I will need to create a different trail for them to follow that indicates the presence of food.

### Smarter explorers

Some ants in nature follow an interesting exploration algorithm: if they bump into many ants, turn more frequently; if they don't, follow a more straight line. This simple tactic allows ants to cover a bigger area more efficiently without a map. They will naturally venture outwards.
