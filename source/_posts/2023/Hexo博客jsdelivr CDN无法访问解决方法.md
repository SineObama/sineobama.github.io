---
title: 'Hexo博客jsdelivr CDN无法访问解决方法'
date: '2023-04-05 22:22'
updated: '2023-04-08 16:44'
tags:
  - 计算机/代码存档
  - Hexo
alias: []
---

## 自己写代码替换

今天突然发现博客启动后无法访问`cdn.jsdelivr.net`，直接百度它，发现方法：[cdn.jsdelivr.net 挂了？前端静态资源访问出错_cdn.jsdelivr访问不了_kaint的博客-CSDN博客](https://blog.csdn.net/m0_57767508/article/details/124915932)

Hexo具体操作是用脚本添加过滤器做替换，暂时方案如下：

```js
/**  
 * 替换外部链接中无法访问的cdn域名  
 */  
'use strict';  
  
const { parse } = require('url');  
const logger = hexo.log;  
  
hexo.extend.filter.register('after_render:html', function(data) {  
    const filterExternal = (data) => {  
  
        // 试过匹配html标签script和link(css)还是不够，存在js中动态加载的情况，所以用它们共同特征引号来匹配，也是尽可能避免影响可能存在于文章中的内容  
        return data.replace(/['"]https:\/\/cdn.jsdelivr.net/gi, (str) => {  
            return str.replace('https://cdn.jsdelivr.net', 'https://fastly.jsdelivr.net');  
        });  
    };  
  
    data = filterExternal(data);  
  
    return data;  
});
```

## butterfly主题可直接配置CDN

见`CDN`配置，实际用起来可能不一定好用：

- 对于网上的CDN只有几个内置的可以自由切换，如果是其他的则定制起来比较麻烦，但内置的不一定好用，也可能慢。
- 除了网上的CDN，还能设置使用本地local，但是要另外安装依赖，并且生成的文件会大一些，速度得看实际情况。
