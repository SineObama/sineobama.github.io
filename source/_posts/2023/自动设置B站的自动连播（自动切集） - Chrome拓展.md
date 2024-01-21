---
title: 自动设置B站的自动连播（自动切集） - Chrome拓展
date: 2023-12-23 19:25
updated: 2023-12-23 19:27
tags:
  - 代码存档/浏览器拓展程序代码
aliases:
---

篡改猴脚本，目前也发布到了[greasyfork](https://greasyfork.org/zh-CN/scripts/482935-%E8%87%AA%E5%8A%A8%E8%AE%BE%E7%BD%AEb%E7%AB%99%E7%9A%84%E8%87%AA%E5%8A%A8%E8%BF%9E%E6%92%AD-%E8%87%AA%E5%8A%A8%E5%88%87%E9%9B%86)和[github](https://github.com/SineObama/bilibili-player-auto-set-playtype)。这里存个档：

```js
// ==UserScript==
// @name         自动设置B站的自动连播（自动切集）
// @namespace    https://github.com/SineObama/bilibili-player-auto-set-playtype
// @homepage     https://github.com/SineObama/bilibili-player-auto-set-playtype
// @version      0.1
// @description  默认的配置内容是我个人喜好（脚本运行后可在存储中修改）：进入自己的收藏等列表、番剧页面时，改为自动连播；普通视频页面/稍后再看，不自动连播；其余情况默认也不自动连播。
// @author       SineObama
// @match        https://www.bilibili.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAuCAMAAABteatCAAADAFBMVEX///////n4+fzuz7Wpuc7q///x2L+zwdTx///89e3x8uDd4u3uy6yUn7XV9f///+3IqaCeweDqxamUpsH/5cizuLmsqaaboaaboaOXm6CUmaCUm6Obrsju/////ePBp6CUp8Hn/ebBpqD/5c6+vrKisb/P087d17+epL/d9PbEtbnZ8v//9dGwn6Cbu9fx9O3x8uPIrKCUr8jq8u3x8u3x9Pb/7cipoaabnKCboa/I7f//6cGim6a+4/z/6sGipsHq//znxann/f//////6d3j+v+imaO23fz/27ybobzZ////8tS+uLmwp6OUnqmwuL/V493S087Itqysw8vSybKbobLI08vBr6yzy87g8f////PSs6OUq8j/17WUmbXV//+Unqa62/+UmanB6v//7cWimaCUnKObnqCXoaapy+bj8ePu+f////zx1bWbmaOwxbyiprzBuKaUn7LL7Pn/+vPx37+eman/+ePZ087SvqyUmay6087Z6fb/+u3VuKbE6ebSuKmUm6a22/Pq//Pgwaypxdfx+v+imanuza+Uobzd8tSzn6Cbq7WspqCUm6DB6ubIrqb/5dHL4urjw6nx7NS+pqCbtcWbmazS08WwoaCw1/z//f/B6vbn2s7S093//+aewNqembLL8u3x8tq+pKCw1///4Lyw1fObn6Oim6Cepqaz0+b8//+ixeaimbX/6cWlm6CbtdH1//zny6+bm6CUnKaptbmzuL/I087Sz8HP5f//+ubn5+aUp8WXp7Kzs6mXmaapuLmzuLKinqCzrsHdyb+zta+eoaaboazB5f///9q6n6Clyeb49O31+fz1+v/a3N62ub+fpKqXnKLNz9KZnqWan6aUmZ/r7O2jqK6anqW8v8Tc3uDy8/T+/v7i5ObR09YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACS5VUPAAAACXBIWXMAAAsTAAALEwEAmpwYAAACjElEQVQ4y2NgoAlgZAJTzCysUAE2dg4oi5OLG0khDy8fkOQXEIQJCAmzioiKiUtISklJy8giFMrJKygqSUGBMCtYobKKqpq6hqacljay3Tq6evoGhkbGJkBgymBmbiFtaWVtY2tn7+Co4ARV4+zsDCRdXBns3Nw9PL1AQt4+vn7+AYFBwSGhYeERgZHIChkYoqJjZGPj4uFu9BAXB7pQKkFcPBGuMFZKKik5JTVNPF0qQ1w8E6wwKzsnNy+/oLComAFhdYlJaVlyeUVgYGVVdWBgDQNDbZ1UUn1DY5OdfXNLY2sbktV27ckgNtTqDkmpzq5uqR5REOjtE0RR2D9BXBxitafXxEmThVmnTJ0WGDK9esbMWbNRFM6ZGwi1eh4H2DPzlRaYlC5ctHjJUuTgWZa3HMlqqMI08RVSGRKSyAqtV65qXL0GXeFaBrt18fOVkBSu37Bx0+YtW7dt3wG0PnDnrt176vbKzlfaJ7r/wMFDh5EU6hwBRlP50WPHxUHgxMlTp6XPMMxXmgbSNmMmihuxgJyz5yDUebJT74WLly5LoYDLly5ewFB25eo1KanrqAqB3GtXr6Aou3HzltTtO3fv3bt75zaqYqlbN28g1N2/LHX7LoxzF13p5ftw8y5LPUA2/wG6SpiZN1HVYaq8CfXHrdvoXkOz/RbER1el7qIrvItm5FVw+F27jRmoaEZeA4XnRak7mArvoBl5ESh2CdNmTLsvAcUuX7+HqfAeWhxdBopJSRFWKCUFNpGw1WATLxHjmUtgXxMOHrCvL1wjHODgcATGDKEohMQMMK4JJQpoXANTD/5kBks9oPSIL+Ei0iMohUvhygrIKRySZ3AAlDxDfC4kIV+TA5yxAgBl3Dfmj9YMtwAAAABJRU5ErkJggg==
// @downloadURL https://update.greasyfork.org/scripts/482935/%E8%87%AA%E5%8A%A8%E8%AE%BE%E7%BD%AEB%E7%AB%99%E7%9A%84%E8%87%AA%E5%8A%A8%E8%BF%9E%E6%92%AD%EF%BC%88%E8%87%AA%E5%8A%A8%E5%88%87%E9%9B%86%EF%BC%89.user.js
// @updateURL https://update.greasyfork.org/scripts/482935/%E8%87%AA%E5%8A%A8%E8%AE%BE%E7%BD%AEB%E7%AB%99%E7%9A%84%E8%87%AA%E5%8A%A8%E8%BF%9E%E6%92%AD%EF%BC%88%E8%87%AA%E5%8A%A8%E5%88%87%E9%9B%86%EF%BC%89.meta.js
// ==/UserScript==

'use strict';

// 方便自己随时修改代码，固定使用代码中的最新配置内容
var reset = loadStorage('__ALWAYS_RESET_CONFIG__', false);
// 配置需要开启功能的页面
var urlsToOpen = loadStorage('urlsToOpen', [
    'bilibili.com/list',
    'bilibili.com/bangumi',
], reset);
// 配置需要关闭功能的页面
var urlsToClose = loadStorage('urlsToClose', [
    'bilibili.com/video',
    'bilibili.com/list/watchlater',
], reset);
// 配置默认行为（没有匹配以上规则时）：true/false 设置为开启/关闭； null 不修改
var unmatchBehavior = loadStorage('unmatchBehavior', false, reset);

// ==== 配置结束 ====

doCheck(unmatchBehavior);

function doCheck(isOpen) {

    isOpen = travelList(urlsToOpen, true, isOpen);
    isOpen = travelList(urlsToClose, false, isOpen);

    if (isOpen === null) {
        return;
    }

    var radioIdx = isOpen ? 0 : 1;
    // 需要多次检查结果，避免被B站设置覆盖
    var keepCount = 0;
    var id = setInterval(function () {
        var el = document.getElementsByClassName('bpx-player-ctrl-setting-handoff')[0];
        if (el) {
            console.debug('video_status.playtype radioIdx', radioIdx, 'keep', keepCount);
            if (el.getElementsByClassName('bui-radio-input')[radioIdx].checked) {
                keepCount++;
                if (keepCount > 2) {
                    clearInterval(id);
                }
            } else {
                el.getElementsByClassName('bui-radio-item')[radioIdx].click();
                keepCount = 0;
            }
        }
    }, 1000);
}

function loadStorage(key, defaultValue, isReset) {
    if (!isReset) {
        var value = GM_getValue(key);
        if (value !== undefined) {
            return value;
        }
    }
    GM_setValue(key, defaultValue);
    return defaultValue;
}

function travelList(list, target, defaultResult) {
    var result = defaultResult;
    for (var i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string') {
            if (location.href.indexOf(list[i]) > -1) {
                result = target;
                break;
            }
        } else {
            if (list[i].test(location.href)) {
                result = target;
                break;
            }
        }
    }
    return result;
}

// 失败方法：

// var settings = JSON.parse(localStorage.getItem('bilibili_player_settings'));
// if (/bilibili.com\/list/.test(location.href) && location.href.indexOf('bilibili.com/list/watchlater') < 0) {
//     if (settings.video_status.playtype === 2) {
//         settings.video_status.playtype = 1;
//         localStorage.setItem('bilibili_player_settings', JSON.stringify(settings));
//     }
// } else {
//     if (settings.video_status.playtype === 1) {
//         settings.video_status.playtype = 2;
//         localStorage.setItem('bilibili_player_settings', JSON.stringify(settings));
//     }
// }
```