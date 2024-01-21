---
title: '魔爪阅读网PC小说简介不滚动'
date: '2023-01-27 23:39'
updated: '2023-01-27 23:40'
tags:
  - 代码存档/浏览器拓展程序代码
  - Tampermonkey
alias: []
invalid: true
---

> 这个网站大概自己修好了这个问题

```js
// ==UserScript==
// @name         魔爪阅读网PC小说简介不滚动
// @namespace
// @version      0.1
// @description  none
// @author       SineObama
// @match        https://www.mozhao.app/*
// @icon
// @connect
// @grant        unsafeWindow
// @license MIT
// @run-at document-end
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// ==/UserScript==

setTimeout(function() {
    $('#intro').css('overflow-y', 'unset');
    $('#intro').css('max-height', 'unset');
}, 500);

```
