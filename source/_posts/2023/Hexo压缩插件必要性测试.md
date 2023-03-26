---
title: 'Hexo压缩插件必要性测试'
date: '2023-03-26 00:52'
updated: '2023-03-26 08:45'
tags:
  - Hexo
alias: []
---

## 配置

参考了文章：

https://blog.jijian.link/2020-03-05/hexo-compress/

安装和配置 3 个插件：

- [hexo-clean-css](https://github.com/hexojs/hexo-clean-css)
- [hexo-html-minifier](https://github.com/hexojs/hexo-html-minifier)
- [hexo-uglify](https://github.com/hexojs/hexo-uglify)

## 压缩初步发布的 27 个文件

- 压缩前 2.78M
	- html 2.11M
- 压缩后 2.56M
	- html 1.94M

## 压缩所有 1000 余文件

- 压缩前 4.6s 29.2M
	- html 27M

- 压缩后 22s 27M
	- html 24.9M

## 结论

压缩率不怎么好，比较影响性能（就算不影响本地 server，那篇文章的做法也不太好），暂不使用。
