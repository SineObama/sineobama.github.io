---
title: win10笔记本睡眠的离开模式
date: 2022-01-13
updated: 2023-07-02
tags:
  - Windows
  - 计算机/问题经验
aliases:
---

发现最近笔记本睡眠不会断电，电源灯和鼠标还亮着，动一下鼠标就能打开，就像只是关闭了屏幕。

[Windows7各种睡眠模式详细讲解 - 知乎](https://zhuanlan.zhihu.com/p/45629547)

看了上文发现似乎是电脑自动开启使用了“离开模式”，也不知道关不关比较好。

关闭的具体操作是打开 regedit 注册表，找到 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power下面的AwayModeEnabled` 设置为 0。

2022 年 1 月 28 日：最近关了离开模式，反而开始担心会不会离开模式对电脑更好了，但听说耗电也不会少很多：

[再论关机以及睡眠-月光博客](https://www.williamlong.info/archives/3074.html)

2023年7月2日：最近不知怎的，睡眠后再开盖他就启动了，甚至很快，但的确是断网（睡眠）的。昨晚甚至睡眠后发现鼠标还是亮着的，开盖发现真的还没睡眠，怀疑是什么程序影响但没有头绪，只能试了试把上面的注册表改成1再改回0，可能反而有效果了，睡眠后鼠标很快就熄灭了。
