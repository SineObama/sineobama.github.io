---
title: '关闭win11开始菜单的网络搜索'
date: '2023-02-18 12:02'
updated: '2023-02-18 12:02'
tags:
  - Windows
alias: []
copyright: false
---

原文：[关闭win11_开始菜单_的网络_搜索_-腾讯电脑管家官网](https://guanjia.qq.com/web_clinic/s7/2445.html) （百度`开始菜单不搜索网页`结果）

> [!note]- 文章摘要
>
> 在开始菜单直接键入文字可以搜索程序、文件或者直接运行某些系统命令，但是如果没有相关的搜索结果则会展示网络搜索结果，这个网络搜索强行使用bing搜索引擎且如果点击搜索结果会使用edge浏览器打开，很多小伙伴表示根本不需要这种网络搜索，那么如何将其关闭呢？1.    打开开始菜单，输入“regedit”回车打开注册表编辑器2.    在注册表编辑器中找到位置“计算机\HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows”3.    在左侧窗格中的“Windows”上点击右键，新建一项4.    将其命名为“Explorer”，选中该项，在右侧新建一个“DOWRD（32位）值”5.    将其命名为“DisableSearchBoxSuggestions”，双击打开，修改数值数据为“1”6.    保存后在任务管理器中重新启动资源管理器即可生效7.    这样开始菜单的网络搜索功能就禁用了，不再出现没有用的搜索结果，增加流畅度
