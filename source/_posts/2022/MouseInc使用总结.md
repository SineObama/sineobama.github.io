---
title: MouseInc使用总结
date: 2022-09-12
updated: 2023-12-7
tags:
  - 电脑常用/效率工具
  - 免费
aliases:
---

## 使用心得

支持鼠标手势、全局快捷键等方式进行多种快捷操作（还有双击Ctrl+C这种异想天开的触发方式），可定制程度高，尤其适合电脑技术人员，可以执行内置功能或简单的系统命令。只是程序原本需要联网使用，**现在settings网站也没了，只能使用麻烦的离线包进行设置**。

## 技术分析

2022年9月12日受视频[【𝙈𝙤𝙪𝙨𝙚𝙄𝙣𝙘】只有1M的鼠标增强神器，自带OCR文字识别，提高你的办公效率✅_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1nP4y1Z7o3)推荐了解到MouseInc这款软件，底下似乎有作者[shuax](../../232_社会关系/认识/网络用户/shuax.md)评论：没网软件本身是能用的哈，只是ocr不能用，设置可以通过安装webview2并且放入离线设置包就能正常用了。

win11系统下，在软件中可以选择文字，位置右上角会弹出快捷菜单，选择“隐藏菜单”-“菜单设置”会默认打开程序msedgewebview2.exe访问[edge设置地址](edge://settings/appearance)，虽无法直接打开，但可以转而使用edge浏览器打开。可以猜测这是edge浏览器相关的功能，它应该是用了webview2实现的界面。

如果框选文字，快捷菜单选择“更多操作”-“复制指向突出显示的链接”，可以得到地址如:https://tools.shuax.com/mouseinc/?port=56964#/switch ，在浏览器中打开，可以看到页面正在使用websocket与本地端口进行交互，实现设置的变更。

## 离线使用方法

1. 获取离线界面包：从[MouseInc设置界面的源代码仓库](https://github.com/shuax/MouseInc.Settings)可下载打包好的离线界面包，或者麻烦一点自己打包也可以。次选方法是直接从在线[设置网站](https://tools.shuax.com/mouseinc/)保存，文件名使用index。
2. 发布web服务（需要一些web知识）：发布一个8080端口的web服务访问离线界面即可。因为软件提供了在本地8080端口打开设置界面的方法：托盘右键菜单，按住Shift点击打开设置。简单做法可使用nginx，根据离线包请求的页面资源情况，可构建配置：

```dsconfig
    server {
        listen       8080;
        server_name  localhost;

        location / {
            rewrite (.*) /mouseinc$1;
        }

        location /mouseinc {
            alias   D:\_nginx_root\MouseInc.Settings;
            index  index.html index.htm;
        }
    }
```

## 后记

2022年10月发现主网站已经清空了，目前设置网站还能用，但是难保哪天出问题，fork一下，再记一下[设置页面的基础源代码](https://github.com/iview/iview-admin)（虽然也是几年没更新了）。
