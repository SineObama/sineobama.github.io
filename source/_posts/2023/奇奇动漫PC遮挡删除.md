---
title: '奇奇动漫PC遮挡删除'
date: '2023-01-27 23:39'
updated: '2023-01-27 23:51'
tags:
  - 代码存档/浏览器拓展程序代码
  - Tampermonkey
alias: []
---

```js
// ==UserScript==
// @name         奇奇动漫PC遮挡删除
// @namespace
// @version      0.1
// @description  none
// @author       SineObama
// @match        https://www.qiqidongman.com/*
// @icon
// @connect
// @grant        unsafeWindow
// @license MIT
// @run-at document-end
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// ==/UserScript==

setTimeout(function() {
    $('#main-frame-error').remove();
    $('body').css('overflow', 'auto');
}, 1000);

```
