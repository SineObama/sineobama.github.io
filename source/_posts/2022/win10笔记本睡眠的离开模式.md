---
title: 'win10笔记本睡眠的离开模式'
date: '2022-01-13'
updated: '2022-01-28'
tags:
  - Windows
alias: []
---

发现最近笔记本睡眠不会断电，电源灯和鼠标还亮着，动一下鼠标就能打开，就像只是关闭了屏幕。

[Windows7各种睡眠模式详细讲解 - 知乎](https://zhuanlan.zhihu.com/p/45629547)

看了上文发现似乎是电脑自动开启使用了“离开模式”，也不知道关不关比较好。

关闭的具体操作是打开 regedit 注册表，找到 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power下面的AwayModeEnabled` 设置为 0。

2022 年 1 月 28 日：最近关了离开模式，反而开始担心会不会离开模式对电脑更好了，但听说耗电也不会少很多：

[再论关机以及睡眠-月光博客](https://www.williamlong.info/archives/3074.html)
