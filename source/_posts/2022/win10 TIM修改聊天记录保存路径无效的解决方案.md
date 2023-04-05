---
title: 'win10 TIM修改聊天记录保存路径无效的解决方案'
date: '2022-01-17 23:18'
updated: '2022-01-17 23:18'
tags:
  - 实例记录/联想拯救者
  - Windows
alias: []
copyright: false
---

问题描述：新买的win11电脑也是如题。

原文地址:[win10 TIM修改聊天记录保存路径无效的解决方案 - 简书](https://www.jianshu.com/p/40d2e604d5fa)

总结如下：创建文件`C:\Users\Public\Documents\Tencent\QQ\UserDataInfo.ini`填写如下内容：

```Ini
[UserDataImportSet]

NeedImport=0

OldVersion=

OldVerDataPathType=

OldVerDataPath=

OldQQInstallPath=C:\Program Files (x86)\Tencent\QQ

[UserDataSet]

UserDataSavePathType=2

UserDataSavePath=D:\MyAppData\Tencent Files

NewVersion=
```

倒数第二行就是自定义的新路径。

> 我又看了这一篇，文件只需要最后4行，也成功了:[https://www.cnblogs.com/zhihe514/p/15146187.html](https://www.cnblogs.com/zhihe514/p/15146187.html)

保存后重启TIM即可。
