---
layout: post
title:  "Please Chill on the Error Messages"
date:   2020-05-12 00:33:05 -0800
categories: blog
---

Twitch has been reworking its clip system for the past few months. I'm sure there are performance benefits, but two things that bother me a lot.

Stop redirecting on errors. Stuff will break. That's fine for most internet users. What sucks is not only breaking but locking the user into a loop where
refreshing does nothing and press back traps you on www.example.com/not_found.

Chill on the errors when your Javascript doesn't work. Randomly when opening a clip in Firefox, the page will load, but then get deleted and replaced with
"Failed to load module." This seems to be related to a part of the CSS not loading properly. It's probably just fluke, but fluke happens.
Given the vagueness of the error, I can assume this is a pretty large "It'll never hit this" try-catch gone wrong. Know your catch will be hit, or don't
bother putting it in. The average person won't really care the alignment is wrong as long as the <Video> tag still works. They will definitely care if
the entire page deletes itself several times a day.

Blarg.