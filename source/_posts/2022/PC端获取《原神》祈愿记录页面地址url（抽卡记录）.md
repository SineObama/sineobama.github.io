---
title: 'PC端获取《原神》祈愿记录页面地址url（抽卡记录）'
date: '2022-06-26 22:45:12'
updated: '2022-06-26 22:45:12'
tags:
  - 游戏/原神
  - 解决方案/代码存档
alias: []
invalid: true
---

```bash
cat C:/Users/71418/AppData/LocalLow/miHoYo/原神/output_log.txt | grep \#/log | tail -1 | cut -d: -f2- > ~/Desktop/gacha_url.txt
"D:/Program Files (x86)/Notepad++/notepad++.exe" ~/Desktop/gacha_url.txt
```
