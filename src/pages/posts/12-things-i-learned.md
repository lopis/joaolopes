---
title: 12 things I learned as a volunteer programming teacher
published: true
description: I taught programming in python for a semester to a very diverse class of adults; these are some of the things I learned.
tags: teaching, programming, python, volunteering
original_link: https://dev.to/lopis/12-things-i-learned-as-a-volunteer-programming-teacher-2pd6
date: 2021-07-06
---

For the past semester, I've joined the [ReDI School of Digital Integration](redi-school.org/) as a volunteer teaching Introduction to Programming using Python. ReDI's students [are mainly refugees and migrants who want to learn digital skills](https://www.redi-school.org/mission), so their backgrounds are very diverse. Most of them had never written a single line of code before.

This was not my first experience with teaching. I had taught high-school students to program using the visual programming tool [Alice](https://www.alice.org/) for 2 weeks. I've also taught short workshops before. However, this was my first time teaching a whole semester.

These are 12 things I learned over this semester. I wrote this article over the course of last months, and they are not written on any particular order, other than whatever occurred to me first.

## 1. Avoid imaginary "non sense" program examples

```python
my_var = my_custom_function(some_value, a, b, c)
```

People who never learned programming before don't yet have the same mental model as a seasoned programmer. They are already struggling with the abstractions. If you use nonsense programs that don't mean anything, it's even harder to understand fundamental concepts. They are distracting. What is `my_var`? Is it a function from python? And what about `my_custom_function`? Do I need this function to create a custom function?

## 2. Reduce abstraction of examples

```python
favourite_singers = ['Justin Bieber', 'Lana Del Rey']
```

People respond better to examples based on real concepts like food, cities, or famous people. Everyone will understand that `favourite_singers` is a list of my favourite singers.

## 3. Avoid special syntax that was not taught yet

When teaching introductory programming to newbies, it's important to not overwhelm them with new syntax. Students get confused and frustrated if you keep telling them "just ignore this for now; I will talk about it later". Always try to build on what they learned before.

## 4. Careful with the special meaning of words

Programing is full of jargon. Many of the metaphors' meanings we use today have been lost to time. Take for instance the concept of "return" from a function. What does it mean to return? Return? Return what? From where? Where to? And to Whom?? Back in CS classes we learned about the runtime stack and how programs pass and retrieve data to a from other routines. But these people never heard about this before.

## 5. Mind people's backgrounds

If you are teaching to the general public, specially if you are teaching adults, don't assume they know physics, or that they remember their Math classes from 20 years ago. They might not remember what the value of the number Pi is, let alone what prime numbers are, or how to calculate areas or polygons.

If you want to use these concepts in your examples, introduce  them clearly first.

## 6. Use the minimum viable code in examples

```python
def max(a, b):
  if a > b
    return a
  print('this line still runs! :)')
  return b
```

As I mentioned before, students will invariably get hang up on unexpected bits of your code. For example, if you are teaching loops, avoid mixing if/else blocks, and vice versa. In the example above, do we need `print('this line still runs! :)')` for the function to return from the if? It might sound silly, but this was basically a confusing point in one class!

## 7. Your time is a scarce and valuable resource - use it wisely

In my case, I'm a volunteer teacher. I teach (or assist teaching) 2 hours per week, but am able to give a little bit more if a student needs some 1:1 help.

Spending some time explaining something to a student can be invaluable to their learning. But if you have 20 students, there's no way you can support them all.

It's hard, but giving students tools to learn by themselves is the only fair way. There will always be one or two students that will try to "monopolize" most of your time. It can become a bad habit, and they need to learn to solve problems by themselves.

## 8. Space for questions during class is good, but keep it strict

I tried to open the stage for questions about the last lesson, and about the homework. I believed that it would be useful to everyone and it would foster discussion.

Instead, I got sucked in to reviewing some piece of homework that would only benefit a single student. Another time, the "open stage" led to questions about topics from future classes. This was a time sink and not fair for the other 20 students in the call.

Allowing for questions is great, but you should make it clear about what the questions should be. If the current topic is last week's homework, I'm not answering questions about yesterday's class right now. But maybe we can talk shortly after class.

## 9. The students that ask the most questions, are probably the most advanced

The students that are totally overwhelmed will mostly likely stay quiet the whole time. The ones that make lots of questions, even if they sound totally lost, are probably the ones putting the most effort into understanding the topics and practicing.

## 10. It's really hard work

I never realized how much work it would be to prepare a 2-hour-long class. I've grown a lot of respect for teachers during this semester. I was only required to prepare a class every couple weeks, but it was quite laborious.

I always wanted to make more engaging classes and avoid boring bullet points. However, even a simple pop quiz can take a couple hours to prepare and test.

I also wanted to have the next class slides ready ASAP for students who like to read them beforehand. However that turned out to be quite hard to plan - I have a life and a full-time job who always got in the way.

## 11. Be ready to be disappointed

There will always be students who have a hard time keeping up with the course and the reasons for that can vary widely - from lack of time, to lack of interest. It's really demotivating and it made me feel like a bad teacher. Could I have done better early on to not let them fall behind?

Also, classes will never quite go the way you expect them. As I mentioned, students will get hung up on unexpected things and you need to be prepared to adapt the lesson on the spot.

## 12. Be ready to be amazed

Despite the struggles, people are amazingly creative. My students had to work on a group project for the last 3 weeks of the semester and I was worried if they would be able to do so. In the days before they started the project they seemed to confused and lost!

That's why I was seriously amazed by their drive, creativity and coordination, and how they were able to use the little knowledge of python we provided them and build very interesting prototypes. The final presentations were also very good and entertaining - so many great speakers in the class!

## Final notes

I've always liked teaching, so this experience was very rewarding for me. This semester was completely remote and over Zoom, so not exactly ideal. On the other hand it allowed us to use fun tools like pop quizzes and polls.

If you want to give it a try, ReDI is usually looking for more teachers. I only committed to teach once every few weeks because I was one of 7 teachers. ReDI is currently present in Berlin, Munich, Copenhagen and NRW.

<https://www.redi-school.org>
