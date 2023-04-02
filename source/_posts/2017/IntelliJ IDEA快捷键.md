---
title: 'IntelliJ IDEA快捷键'
date: '2017-11-27 09:29'
updated: '2017-11-27 09:29'
tags:
  - 学习笔记/快捷键
alias: []
---

## 1 智能提示

Ctrl+Space    基本的代码提示

Ctrl+Shift+Space    更智能地按类型信息提示

**F2**    移动到错误代码

**Alt+Enter**    快速修复

Ctrl+Shift+Enter    自动补全末尾的字符。而且不只是括号，例如敲完 if/for 时也可以自动补上 {} 花括号。

## 2 重构

Ctrl+Shift+Alt+T    重构功能大汇总，Refactor This

Shift+F6    改名

Ctrl+Alt+V    **提取变量？**

## 3 代码生成

Ctrl+J    查看所有模板

后缀自动补全功能 (Postfix Completion)，例如：

for(User user : users) 只需输入 user.for

Date birthday = user.getBirthday(); 只需输入 user.getBirthday().var。

## 4 编辑

Ctrl+W    按语法选中代码

Ctrl+Left/Right    移动光标到前/后单词，加上 Shift 选中代码

**Ctrl+[/]**    移动到前/后代码块，加上 Shift 选中代码

**Alt+Up/Down**    移动到前/后方法。

Ctrl+Y    删除行

Ctrl+D    复制行

Ctrl+>    折叠代码

关于光标移动，还可以安装 ideaVim 或者 emacsIDEAs 享受到 Vim 的快速移动和 Emacs 的 AceJump 功能 (超爽！)。

书签功能：

**Ctrl+Shift+Num** 定义 1-10 书签 (再次按删除)

**Ctrl+Num**    跳转

Alt+Shift+Up/Down    行移动

## 5 查找打开

Ctrl+N/Ctrl+Shift+N    打开类或资源（模糊匹配）

双击 Shift    搜索任何东西

Ctrl+H    类层次窗口，在继承层次上跳转则用 Ctrl+B/Ctrl+Alt+B 分别对应父类或父方法定义和子类或子方法实现

(Ctrl+/Ctrl+Alt)+(B/Button 1)    *类型* 跳转声明/定义，*变量* 跳转用法

Ctrl+Shift+(B/Button 1)    *变量* 跳转类型声明

Ctrl+F12    查看当前类的所有方法

**Alt+F7**    找类或方法

Ctrl+F/Ctrl+Shift+F    在当前窗口或全工程中查找

F3    下一匹配处

Ctrl+Alt+Shift+Up/Down    跳转并选择前后一个代码修改处（版本控制）

Ctrl+Alt+Z    回退所选代码（版本控制）

Alt+J    选择同名标识符

## 6 其他辅助

Ø命令：Ctrl+Shift+A 可以查找所有 Intellij 的命令，并且每个命令后面还有其快捷键。所以它不仅是一大神键，也是查找学习快捷键的工具。

Ø新建：Alt+Insert 可以新建类、方法等任何东西。

Ø格式化代码：~~格式化 import 列表~~Ctrl+Alt+O，格式化代码 Ctrl+Alt+L。

Ø切换窗口：Alt+Num，常用的有 1- 项目结构，3- 搜索结果，4/5- 运行调试。Ctrl+Tab 切换标签页，Ctrl+E/Ctrl+Shift+E 打开最近打开过的或编辑过的文件。

Ø单元测试：Ctrl+Alt+T 创建单元测试用例。

Ø运行：Alt+Shift+F10 运行程序，Shift+F9 启动调试，Ctrl+F2 停止。

Ø调试：F7/F8/F9 分别对应 Step into，Step over，Continue。

此外还有些我自定义的，例如水平分屏 Ctrl+|等，和一些神奇的小功能 Ctrl+Shift+V 粘贴很早以前拷贝过的，Alt+Shift+Insert 进入到列模式进行按列选中。

## 7 最终榜单

这榜单阵容太豪华了，后几名都是如此有用，毫不示弱。

ØTop 10 切来切去：Ctrl+Tab

ØTop 9 选你所想：Ctrl+W

ØTop 8 代码生成：Template/Postfix +Tab

ØTop 7 发号施令：Ctrl+Shift+A

ØTop 6 无处藏身：Shift+Shift

ØTop 5 自动完成：Ctrl+Shift+Enter

ØTop 4 创造万物：Alt+Insert

太难割舍，前三名并列吧！

ØTop 1 智能补全：Ctrl+Shift+Space

ØTop 1 自我修复：Alt+Enter

ØTop 1 重构一切：Ctrl+Shift+Alt+T

来源： [http://blog.csdn.net/dc_726/article/details/42784275](http://blog.csdn.net/dc_726/article/details/42784275)

## 个人发现

多个光标（多处同时输入）：Shift+Alt+ 左键
