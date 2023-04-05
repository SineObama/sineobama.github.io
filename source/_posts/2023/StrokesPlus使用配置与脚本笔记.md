---
title: 'StrokesPlus使用配置与脚本笔记'
date: '2023-02-19 21:05'
updated: '2023-02-19 21:05'
tags:
  - 实例记录/静态博客
alias: []
---

对 [StrokesPlus.net](../../232_社会关系/使用/软件/StrokesPlus.net.md) 中个人所使用的脚本代码做笔记。

官网显示是 **Chrome V8 JavaScript engine**，脚本看起来确实就是 js。

目前并没有什么特别的需求，主要是好奇，记录一下。

## 个人配置

- 选项 - 高级 - 全屏窗口上停止捕获。

## 脚本入门

- 注意有几个脚本对象可以在脚本帮助中找到说明，但也就几个而已。

## 脚本代码

### 不明觉厉

有些代码在帮助里可能没有，或者网上找到的，先记下来。

#### 内置代码部分

##### 鼠标滚轮默认脚本

```js
//This is a script I use, but figured I'd leave it for example purposes

if(wheel.Window.Process.MainModule.ModuleName == "chrome.exe" || wheel.Window.Process.MainModule.ModuleName == "notepad++.exe") {
    if(parseInt(wheel.Y) <= (parseInt(wheel.Window.Rectangle.Top) + 64)) {//is the mouse in the top 64 pixel area of the window?
        if(wheel.Delta > 0) {
            //mouse wheel scrolled up
            sp.SendKeys("^{TAB}");
        } else {
            //mouse wheel scrolled down
            sp.SendKeys("^+{TAB}");
        }
    } else if(wheel.X >= (parseInt(wheel.Window.Rectangle.Right) - 25)) { //is the mouse along the right side of the window?
        if(wheel.Delta > 0) {
            //scroll up, send CTRL+Home to go to the top of the page
            sp.SendKeys("^{HOME}");
        } else {
            //scroll up, send CTRL+End to go to the end of the page
            sp.SendKeys("^{END}");
        }
    } else if(wheel.Window.Process.MainModule.ModuleName == "chrome.exe" && wheel.X <= (parseInt(wheel.Window.Rectangle.Left) + 20)) {
        if(wheel.Delta > 0){
            //scroll up, send CTRL+Home to go to the top of the page
            sp.SendKeys("{F5}");
        } else {
            //scroll up, send CTRL+End to go to the end of the page
            sp.SendVKey(vk.BROWSER_BACK);
        }
    } else {
        //Default, pass mouse wheel message onto the original control
        wheel.Control.PostMessage(host.cast(uint, 0x020A), new IntPtr(wheel.WParam), new IntPtr(wheel.LParam));
    }
} else {
    //Default, pass mouse wheel message onto the original control
    wheel.Control.PostMessage(host.cast(uint, 0x020A), new IntPtr(wheel.WParam), new IntPtr(wheel.LParam));
}
```
