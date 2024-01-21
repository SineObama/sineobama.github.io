---
title: Hexo渲染Markdown脚注语法的插件优化研究
date: 2024-01-20 19:34
updated: 2024-01-20 19:34
tags:
  - Hexo
aliases:
---

## 背景与需求

Hexo默认使用的**hexo-renderer-marked**不支持脚注，百度发现有些其他插件。

而且我希望像维基百科网站那样，鼠标悬浮时会弹出tooltip可以查看脚注内容，更可以移动鼠标点击其中的内容（链接）。

**当前情况**：未解决。暂时改用了markdown-it渲染，功能相对完善但没有tooltip。（就差没有我自己动手改代码了）

## 已知插件

### hexo-reference

[hexo-reference](https://github.com/kchen0x/hexo-reference)[^1]虽然支持鼠标悬浮查看，但看到的是原文的渲染前内容，无法点击链接。另外找到作者的文章[Hexo 里的脚注插件 - KChen's Blog](https://kchen.cc/2016/11/10/footnotes-in-hexo/)但没什么用。

[hexo-footnote](https://github.com/guorant/hexo-footnote)是另一个人二次改造的，试了一下也是差不多。而且不支持行内(inline)脚注。

### hexo-renderer-markdown-it

[hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)支持很多Markdown语法，脚注可以正常跳转但没有鼠标悬浮功能。

> 找了issue都没看到解决方案

另外可能会与我使用的主题的渲染有些冲突（覆盖），会有些影响页面样式和交互，已发现的是：

- [使用 hexo-renderer-markdown-it 作为渲染器不能渲染出 anchor button · jerryc127/hexo-theme-butterfly · Discussion #1263](https://github.com/jerryc127/hexo-theme-butterfly/discussions/1263)

但不巧又发现一些好处：

- 一个列表中的`简悦(simpread)`使用斜体语法能正常渲染，但在默认插件中没有渲染。

### hexo-footnotes

[hexo-footnotes](https://github.com/LouisBarranqueiro/hexo-footnotes)官网插件列表，但不再维护，推荐使用markdown-it。

[hexo-markdown-it-tippy](https://github.com/Ritsuka314/hexo-markdown-it-tippy)官网插件列表，但不再维护。虽然支持鼠标悬浮查看，但看到的是原文的渲染前内容。

### hexo-markdown-it-tippy

[hexo-markdown-it-tippy](https://github.com/Ritsuka314/hexo-markdown-it-tippy)老旧不维护了，需要自己研究配置，说是支持富文本，结果只能悬浮显示，鼠标离开就消失，不能点击。

作者基于另一个渲染引擎pandoc的插件[hexo-pandoc-tippy](https://github.com/Ritsuka314/hexo-pandoc-tippy)，但[听说](https://blog.csdn.net/xieyan0811/article/details/132655852)pandoc好像有些语法不一样需要改文章，就没去用。

## 未知情况/未采用

在（个人？）主题[hexo-theme-book](https://github.com/kaiiiz/hexo-theme-book)的[demo](https://kaiiiz.github.io/hexo-theme-book-demo/demo/render/footnotes-demo/)中看到了仅悬浮，但好像没什么意义，他不一定是用插件。

甚至可能换主题 hexo-fluid 吗？


[^1]: 旧地址 https://github.com/quentin-chen/hexo-reference 来自 https://sspai.com/post/59337
