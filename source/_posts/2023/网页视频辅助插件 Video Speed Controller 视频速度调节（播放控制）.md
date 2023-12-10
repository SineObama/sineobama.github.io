---
title: 网页视频辅助插件 Video Speed Controller 视频速度调节（播放控制）
date: 2023-12-09 20:21
updated: 2023-12-09 20:21
tags:
  - 电脑常用/浏览器拓展
  - 免费
aliases:
---

## 介绍

[Video Speed Controller 视频速度调节_0.7.3_chrome扩展插件下载_极简插件](https://chrome.zzzmh.cn/info/nffaoalbilbmmfgbnbgppjihopabppdk)

- 自定义按键加速减速播放、前进后退、一键设置为自定义的速度。
- 播放暂停功能，可以用于（冷门）不支持快捷键视频源。
- 可惜我还想要个全屏功能。（见后文）

官网 #开源  https://github.com/igrigorik/videospeed

#来源/网站 [阿虚同学的储物间](阿虚同学的储物间.md)

## 配置

个人快捷键配置：

> 注：目前使用的是后文的其他人重构后的0.8.3版本，可以兼容与B站快捷键功能。而原始0.7.3版本部分功能与B站快捷键功能不兼容，比如会重复生效，所以对于不兼容的我试过使用实验性功能，禁用网站原本的快捷键绑定，以便部分快捷键与B站使用习惯一致。

- 重置：`Z`（恢复/恢复自定）（参考potplayer）
- 减速：`X` 0.2（参考potplayer）
- 加速：`C` 0.2（参考potplayer）
- 后退：`Left` 5
- 前进：`Right` 5
- 自定：`G` 2.5（与B站2倍速区分）
- 暂停：`Space`
- 标记：`B`
- 回到标记：`N`
- 全屏：`F`

B站快捷键参考：[B站隐藏功能用法整理](../2022/B站隐藏功能用法整理.md)

## 探索F键全屏功能

因为有个小网站真的不支持全屏快捷键，所以我想加上这个功能。

最终还是自己上手改了（可能只适用于谷歌浏览器），发布了release，0.8.3版本下载： https://github.com/SineObama/videospeed-refactoring-myfullscreen/releases/download/0.8.3/my_Video_Speed_Controller_-_BETA_Channel.crx

历程如下：

- 发现已有讨论：[Feature Request: F key for full screen · Issue #956 · igrigorik/videospeed](https://github.com/igrigorik/videospeed/issues/956)
    - 试一下隔壁仓库：[gediminasel/videospeed-firefox: HTML5 video speed controller (for Firefox). WebExtensions port of Video Speed Controller Chrome extension.](https://github.com/gediminasel/videospeed-firefox)
        - 谷歌浏览器似乎无效，也没看到是新增的自定义快捷键。
    - 看见别人在讨论重构：[Refactoring Discussion [Input Appreciated] · Issue #963 · igrigorik/videospeed](https://github.com/igrigorik/videospeed/issues/963)
        - 看了别人的仓库源码：[ChadBailey/videospeed-refactoring: This repository is for refactoring the videospeed controller extension. This repo will be archived once the refactoring effort concludes.](https://github.com/ChadBailey/videospeed-refactoring)
            - 发现他只写了测试代码，虽然没注意看他们为什么不上线，还是我亲自上手随便改改，加上这个功能吧： https://github.com/SineObama/videospeed-refactoring-myfullscreen 并回复了讨论： https://github.com/igrigorik/videospeed/issues/956#issuecomment-1848429117
