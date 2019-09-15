---
title: 'How to design a javascript game? (in 13KB or less)'
path: '/how-to-design-a-javascript-game-13kb'
date: 2019-09-13T11:41:01.253Z
original_source: dev.to
original_link: 'https://dev.to/mrlopis/how-to-design-a-javascript-game-in-13kb-or-less-59kn'
description: >-
  Where I describe my struggle to focus on my game idea
image: 'https://thepracticaldev.s3.amazonaws.com/i/mjlcu51rjqj8hi0egfto.png'
---
Another [Js13K](https://js13kgames.com/) has passed. This is my third time participating in this game jam. I like to think that I always learn a thing or two with these. ([You can play the game here](https://js13kgames.com/entries/regresso))

## The game theme

When this year's theme came out ('BACK'), I decided I wanted to make a game about the crew of a ship that wrecked on an island and is trying to go back home. The would need to collect resources to re-build the ship, in a game that would be a mixture of [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/), Minecraft and that old [Grow flash game](https://www.youtube.com/watch?v=BHoT1ig9DdU).

## Prototyping

I immediately started prototyping an island generation algorithm. It was gonna have everything: ocean, sand, grass, trees, ores, animals, fresh water lakes, maybe even rivers (my favourite prototyping tool is https://codepen.io/).

Except I've never done anything remotely like this. After two days of frustrating results, I gave up on the game and went to bed.

The next day I realized all the time I spent on the failed island generator didn't get me closer to the game I set out to build _at all_. So I scraped everything and started over. What _was_ I set out to make? I sat down with a notepad and wrote.

1. **I wanted a clicker.** The game is all about clicking for resources. So I gave it buttons. You click, you get it.
![Picture of the buttons for each resource](https://thepracticaldev.s3.amazonaws.com/i/nzubb9020nxw81el7uwe.png)
2. **I wanted resources to be volatile.** Also, they can't just be free. So I made it so that, every day, people will eat the food. Also, each person takes a few seconds to go grab the food.
![Log showing people's actions](https://thepracticaldev.s3.amazonaws.com/i/1buaapypolhs12ka9no7.png)
3. Finally, **I wanted _drama_**. What happens if you don't feed people?
![People die](https://thepracticaldev.s3.amazonaws.com/i/pza2pwg7zx20m0dsv71q.png) Eventually I dropped the whole "+5 food" when someone dies. The game is morbid enough without the cannibalism. You can test [my final prototype here](https://codepen.io/lopis/pen/yLBVmeG?editors=1010).
4. The fourth component I wanted for my game was **a set of "projects"** that you have to accomplish before you can finally build the ship. Inspired by "Grow", I wanted that the order by which the player completes the projects to influence the end goal. So, for instance, if you develop fishing early on, you get more food, but then you have less people ready to work since one person is now a dedicated fisher.

![List of projects](https://thepracticaldev.s3.amazonaws.com/i/un0vatrtqyaec5huqx26.png)

## Balancing progress and difficulty

Most projects I came up with are a result of trying to balance and rebalance the game.

1. Clicking on forage and hunting all the time leaves little free time to read the game messages and project description; so I created fishing to automate food gathering.

2. With the fishing project done, it's really trivial to stockpile a crap ton of food very quickly; so I created _death by wild animals_ to nerf the hunting action.

3. Stockpiling wood was also very easy. So I also gave logging a small risk of animal attacks.

4. Now animal attacks are too much of a problem! So I countered this with the "Weapons" project, which reduces the chance of animal attack deaths.

5. I was still stock piling lots of wood. So I made it so the people burn a little bit of wood every day (for heating and cooking).

6. After all this I realized that, by the end of the game, _there was no risk of dying_. With a steady food supply, losing the game was impossible. So I sneaked in a "God's Wrath" parameter. God will sink your run-away ship if you don't build Him a chapel and pray a lot. 🙏🙏🙏
![God hates you. You die.](https://thepracticaldev.s3.amazonaws.com/i/prn81xxdjgkgte3yujoc.png)

## The UI

I had totally scraped the plans for a map generator. But I wanted some kind of UI. I decided to keep the log from the prototype and create a sort of small "map" to hint the player to what is happening. I gave the game elements and controls animations to make everything more satisfying to watch (also a bit more chaotic, but that's ok (I hope)). I made the island using SVG. SVG in the times of HTML5 is both a blessing and a curse. But more about that in another article.

![The Game UI](https://thepracticaldev.s3.amazonaws.com/i/3kohzskoh3d1nnpqasbn.png)

The game is hecka confusing at first. You start playing, your people die after two days because everything happens too fast; so your shout at the screen and refresh. You try again, you get distracted reading the project descriptions; every one starved. You refresh. You try again. It's so annoying to refresh the page to restart a game. Quick-death games need to also be very quick to restart. So I added a restart button that resets the game. Adding the reset button was also a very refactoring exercise because it forced me to gather all the game data in the same places and initialize them properly.

## Calculating the score

Finally, my game needed a reward. I felt that the result win/lose was a sad ending and not very engaging. So I developed a score equation:

1. Each person that doesn't die gives you lots of points

2. Each project you complete also gives you some points

3. Final score is inversely proportional to the number of days you take to finish

4. The score is also inversely proportional to God's Wrath

5. You get a bonus just for leaving the island.

In case you're wondering, my best score so far was 349 points

![My best score was 309 points](https://thepracticaldev.s3.amazonaws.com/i/013xojnc7esj2c3bdni4.png)

I believe I managed to make a small entertaining game and I'm looking forward to next year's challenge. Let me know if you can finish in 30 days! I believe it's possible!

## Stats for nerds

I developed my game using Typescript but never got around to actually using types. I used gulp to build my game and to zip my files.

I coded on VSCode, on Ubuntu, on an XPS13.

I worked about 15 hours per week 5 to 6 days per week since day one of the competition.

Apart from the gulp project builder, I made the game from scratch without any libraries. I'm still writing a more technical post-mortem.


