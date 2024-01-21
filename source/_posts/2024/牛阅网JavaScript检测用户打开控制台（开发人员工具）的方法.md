---
title: 牛阅网JavaScript检测用户打开控制台（开发人员工具）的方法
date: 2024-01-13 19:21
updated: 2024-01-13 19:21
tags:
  - 代码存档/浏览器拓展程序代码
  - JavaScript
aliases:
---

## 背景

网站会使用一种一次性方法，保证当用户打开控制台的瞬间，网站能收到“通知”（然后自动跳转到网站首页，阻碍用户查看页面元素）。

本来我不是很熟Web前端技术，但还是从网络里找到触发页面跳转的js代码了。

## 原理说明

示例代码如下，我通过打印时间可以观测到代码实际被执行的时间，两个时间是有间隔的：

```js
var t = new Error;
Object.defineProperty(t, "message", {
    get: function() {
        // 首次打开控制台时会执行这里
        console.log(new Date());
    }
});
console.log(t);
console.log(new Date());
```

找到了以上代码后，按照我的理解来解释就是：代码利用了控制台打印`Error`对象的行为，在网站加载时就使用`console.log`记录一个特殊的自定义`Error`，它的`message`属性被改造为使用*getter*方式获取。当用户首次打开控制台时，`Error`的内容才会真正被打印出来，此时就是`get`方法被执行的时候，所以这里就能写入自定义逻辑。

## 应对方法

发现这个原理之后，本来想通过改造`console.log`方法来阻止它的检测，但我使用篡改猴脚本，就算设置为document-start都好像没办法赶在它前面执行：

```js
// ==UserScript==
// @name         阻止牛阅网打开F12时自动跳转页面
// @author       SineObama
// @match        https://www.niuyueshu.com/*
// @run-at       document-start
// ==/UserScript==

var logOrigin = console.log;

Object.defineProperty(console, 'log', {
    value: function () {
        if (arguments.length && Object.getOwnPropertyDescriptors(arguments[0]).message) {
            return;
        }
        logOrigin.apply(this, arguments);
    }
});
```

只好另寻方法，暂时发布到 https://greasyfork.org/zh-CN/scripts/484738 以下存档一份代码：

```js
// ==UserScript==
// @name         暴力阻止牛阅网的自动跳转首页（打开F12控制台时）
// @version      0.1.0
// @description  仅作为参考脚本，我技术有限，但搜不到相关插件就只能自己写了。采用离开页面（unload）之前弹窗提醒的方式阻止跳转。
// @author       SineObama
// @match        https://www.niuyueshu.com/*
// @run-at       document-start
// @license      MIT
// @namespace https://greasyfork.org/users/1238190
// @downloadURL https://update.greasyfork.org/scripts/484738/%E6%9A%B4%E5%8A%9B%E9%98%BB%E6%AD%A2%E7%89%9B%E9%98%85%E7%BD%91%E7%9A%84%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC%E9%A6%96%E9%A1%B5%EF%BC%88%E6%89%93%E5%BC%80F12%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%97%B6%EF%BC%89.user.js
// @updateURL https://update.greasyfork.org/scripts/484738/%E6%9A%B4%E5%8A%9B%E9%98%BB%E6%AD%A2%E7%89%9B%E9%98%85%E7%BD%91%E7%9A%84%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC%E9%A6%96%E9%A1%B5%EF%BC%88%E6%89%93%E5%BC%80F12%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%97%B6%EF%BC%89.meta.js
// ==/UserScript==

'use strict';

// 全局上下文
var ctx = {
    // 是否启用阻止跳转（状态）
    myBlockJump: true
};

doBlockJump();

function doBlockJump() {

    // 这种方式会同时阻止所有离开页面的操作，包括用户自己关闭网页的操作，所以后面做了一些优化。
    window.addEventListener('beforeunload', function (event) {
        if (ctx.myBlockJump) {
            console.log('prevent window unload', event);
            event.preventDefault();
        }
    });

    // 如果是用户点击操作，则允许页面跳转
    window.addEventListener('click', releaseJump, true);

    var reBlockNum;

    function releaseJump(e) {
        if (!ctx.myBlockJump) {
            return;
        }

        // 不管点击的是什么，实际可能有很多情况，
        // 通过暂时关闭阻止功能来允许页面跳转
        ctx.myBlockJump = false;
        clearTimeout(reBlockNum);
        reBlockNum = setTimeout(function () {
            ctx.myBlockJump = true;
        }, 500);
    }

    optMyBlock();
}

// 针对各种场景优化拦截方法
function optMyBlock() {
    // 允许在浏览器中关闭后台网页，避免弹窗
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            console.debug('用户离开了当前窗口');
            ctx.myBlockJump = false;
        } else if (document.visibilityState === 'visible') {
            console.debug('用户回到了当前窗口');
            ctx.myBlockJump = true;
        }
    });

    // 鼠标离开网页范围后，可能是准备点击网页页签的关闭按钮，也可能使用其他快捷键关闭，允许这种操作，
    // 但同时做个延迟，有可能是打开F12的瞬间鼠标离开了，此时仍然保持一下阻止跳转
    var mouseleaveUnblockNum;
    document.addEventListener('mouseleave', function () {
        clearTimeout(mouseleaveUnblockNum);
        mouseleaveUnblockNum = setTimeout(function () {
            console.debug('鼠标离开了当前窗口');
            ctx.myBlockJump = false;
        }, 200);
    });
    document.addEventListener('mouseover', function (event) {
        if (event.target === document.body.parentElement) {
            clearTimeout(mouseleaveUnblockNum);
            console.debug('鼠标回到了当前窗口');
            ctx.myBlockJump = true;
        }
    });

    // 在页面中按下Ctrl很可能是使用快捷键，可能想关闭网页，此时不阻止跳转
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && ctx.myBlockJump) {
            console.debug("Ctrl键被按下！");
            ctx.myBlockJump = false;
        }
    });
    document.addEventListener('keyup', function (event) {
        if (!event.ctrlKey && !ctx.myBlockJump) {
            console.debug("Ctrl键松开！");
            ctx.myBlockJump = true;
        }
    });
}
```
