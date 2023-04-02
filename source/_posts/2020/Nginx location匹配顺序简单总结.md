---
title: 'Nginx location匹配顺序简单总结'
date: '2020-05-21 22:04'
updated: '2020-05-21 22:10'
tags:
alias: []
---

```nginx
#1.第一步，精确匹配

location =/a/b/c{

#结束

}

#否则继续--

#2.第二步，标准匹配，多条匹配时取最长

location /a{

#匹配后继续第三步

}

#或者

location ^~/a/b{

#匹配后结束。（代表优先于正则，并忽略正则）

}

#3.第三步，正则匹配，按配置顺序匹配第一个

location ~/reg{

#匹配后结束

}

#或者

location ~*\.gif${

#同上，不区分大小写

}

#否则使用第二步结果。
```
