---
title: Gotchas while developing a tiny web game 
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/61uhtv6ovwuzulyucqyk.png
original_link: https://dev.to/lopis/gotchas-while-developing-a-tiny-web-game-4528
date: 2024-09-26
tags: js13k, webdev, javascript
---

Another year, another [JS13K Games](https://js13kgames.com/) edition is over, the game jam where you have to develop a game under 13KB ([here's mine 🙌](https://js13kgames.com/2024/games/thirteen-terrible-stunts)). This strict size limitation means that we often have to implement most things from scratch, as most game engines are prohibitively large. This means that we're constantly reimplementing the metaphorical wheel, which leads to fresh new bugs.

As always, we're encouraged to playtest our colleagues' games. The following is a list of a few gotchas, in very limited depth, which I've collected while testing games this year.

## 1. Players don't have the same fonts as you

This should be obvious, but each computer has a different set of fonts installed. This means text will look different for other players. It's not just that individual letters look different, but the whole size occupied by them is different, both in width and height, regardless of font size. Don't rely on text having the same size for other players.

![Screenshot of the same Dungeon of Curse](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vdbct12ref8oql7tvycs.png)

The above screenshot from the great game [Dungeon Of Curse](https://js13kgames.com/2024/games/dungeon-of-curse) is an example of this. The title screen is cut off because the font is unexpectedly wide in my system.

Because embedding whole font files is too expensive, many developers simply create tiny fonts for their own games. But if you go the easy route and use system fonts, be sure to leave enough wiggle room for chunkier fonts.

## 2. There are screens with very high refresh rates

For the longest time, most screens have had refresh rates of 60Hz. And so when calling `requestAnimationFrame` on javascript, you would expect to get 60 updates per second. However, higher refresh rates are very common nowadays, ranging from 75Hz to 120Hz or even 400Hz.

This is important to keep in mind because if you update your game state equally on each frame while disregarding the actual frame rate, your game might become too fast. So you either have to limit your game's refresh rate, or make it so that updates in your game depend on the time interval between updates.

I'm not going to pretend I'm an expert — this issue caught me off guard during this jam — so here is a helpful link on the subject:

<https://gafferongames.com/post/fix_your_timestep/>

## 3. Beware of accessibility features

It's honestly already hard enough to fit a whole game in 13kb and to build it in just a month. But there are people out there who struggle with using technology _every day_. They sometimes use accessibility features in their browser or OS which might clash with the games we create.

One such case is the feature ["search as you type"](https://support.mozilla.org/en-US/kb/advanced-panel-settings-in-firefox?redirectslug=settings-network-updates-and-encryption&redirectlocale=en-US#w_accessibility), which causes typing to initiate finding in the page. This can be circumvented by calling `preventDefault()` while the player is controlling your game with the keyboard.

It's up to you whether and how much you want to prepare for computers with diverse setups. Just keep in mind that not paying attention to those details might mean your game is completely broken for some players, and it's unfair to blame _them_ for it.

## 4. Voice synth

```js
"window.speechSynthesis is undefined"
```

This was a weird one. In case you're not familiar with it, the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis) is a web API that lets you reproduce voice

Apparently on some systems (like mine) this is disabled or absent. It can be toggled in Firefox in `about:config` under `media.webspeech.synth.enabled`.

I didn't penalize any game when this happened, despite their games crashing catastrophically. But the fix is as easy as verifying that `speechSynthesis` with conditional chaining: `window?.speechSynthesis`.

And do keep in mind that the browser is actually using the voice synthesizer of the operating system. No OS voice synthesizer installed, no `speechSynthesis`.

## 4.1 Incorrect voice language

Even if the user has a voice synthesizer, has it enabled on the browser, and even if `window.speechSynthesis` is defined, you're _still_ not off the hook! To everyone's surprise, there are people out there with devices in languages other than English (`</s>`).

When calling [getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices) to use the voice synthesizer, you might not be provided an English voice. Or perhaps not as the primary voice. Hilarity ensues when you try to read an English sentence in another language.

## 5. Browser compatibility is still important

Talking about different setups, many people seem to think that Chrome is the only Internet browser around these days. Or worse, that whoever doesn't use a Chromium-based browser deserves a worse experience.

I'm a strong apologist of the open Web and the current Chrome monoculture is harming it. Google shouldn't get to decide what becomes a standard and what doesn't.

It's your job as a developer to make sure your code runs correctly on the different browsers.

## 6. People are even more diverse than computers

While computers and browsers are diverse, people are even more! While developing a game, you will develop strong biases that can be hard to get rid of without external help. Is the game goal clear enough? Is it too hard, or does it ramp up in difficulty too fast? Are people used to playing games with just their keyboards anymore?

Besides the generous help of playtesters from our community, this year we were lucky to have access to [Poki](https://poki.com) as a playtesting tool. This experience truly humbled me.

- Out of 20 playtesting sessions, 15 players quit within 5 seconds because they didn't understand that the game didn't use the mouse
- If the goal isn't clear without reading instructions, you already lost 90% of the players motivation to try your game. I'm not exaggerating. Like in cinema, you should show, not tell, as no one likes cheap exposition.
- Most players will not read things unless they realize they have to; they must be given time to accommodate to that mindset.
- Players have different backgrounds; while game concepts might be obvious for you, they won't be obvious for everyone.
- A little hand-holding in the beginning is very useful, as letting the player win a little improves their engagement
- However, too much hand-holding or lack of game progression and the game gets boring fast.
