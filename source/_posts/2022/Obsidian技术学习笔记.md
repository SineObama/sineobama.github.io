---
title: 'Obsidian技术学习笔记'
date: '2022-10-28 23:10'
updated: '2022-10-30 11:44'
tags:
  - 学习笔记
  - Obsidian
alias: []
---

## 前置

预置了插件库：[Obsidian新手免配置开箱即用库 2022-4-13.rar](https://wws.lanzoul.com/b0273yjmd?pwd=55qz)，部分插件会影响软件功能，所以特此说明。

该库中还有 [MarkDown超级教程 Obsidian版 2022.1.12](../../300_资源/生活技能类笔记/MarkDown超级教程%20Obsidian版%202022.1.12.md)（[网址](https://blog.csdn.net/qq_57187936/article/details/123923511)）、[Markdown语法速查（适用于Obsidian）](Markdown语法速查（适用于Obsidian）.md) 文档可以学习。

## 界面基础操作

- `Ctrl`/`Shift` 等按键配合鼠标或其他按键时，经常会有额外效果，例如打开页面时，默认是跳转页面，按住 `Ctrl` 可以在新窗口打开。

## 存储文件变量（文件头部/元数据）

[YAML front matter - Obsidian Help](https://help.obsidian.md/Advanced+topics/YAML+front+matter)，目前支持以下四种附带功能的元数据：

- tags (标签)
- aliases (别名)
- cssclass
- publish

## YAML 语法

[YAML语法介绍 - 知乎](https://zhuanlan.zhihu.com/p/75067291)

[YAML、YML在线编辑器(格式化校验)-BeJSON.com](https://www.bejson.com/validators/yaml_editor/)

obsidian 中常用的基础要点：

- key: value 格式，井号#后面是注释。
- 特殊字符需要用单引号或双引号包裹（也表示字符串类型数据）。
- 要让 ob 正常标识标签，只需要在引号包裹中连续编写即可（如：`'#a/b #c'`，可以省略井号，但井号可以触发自动补全，也可能便于迁移维护），也可以用最普通的行内数组写法（如：`[a/b, c]`）。

## markdown 相关注意事项

支持 markdown 通用快捷键：

- 列表缩进：`Ctrl + ]`、`Ctrl + [`

## callout blocks (admonitions) 兼容性更好的写法

本节已迁移到：[Obsidian-Callouts与Admonitions插件写法对比](Obsidian-Callouts与Admonitions插件写法对比.md)

## 尚未研究的

- Dataview 插件
- 其他可用插件
- 学习：[我的Obsidian入门之旅 | 二丫讲梵](http://wiki.eryajf.net/pages/6ed7fe)

### 拓展阅读

- [用Obsidian记账 - 知乎](https://zhuanlan.zhihu.com/p/422876369) 使用元数据记账
- [Obsidian 的 YAML Front matter 介绍 - 知乎](https://zhuanlan.zhihu.com/p/370113792)（2021-07-22）使用元数据的插件，相关高级用法。
- [CommonMark Spec](https://spec.commonmark.org/) 大概是一套社区定义的 markdown 标准。
