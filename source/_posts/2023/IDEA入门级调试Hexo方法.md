---
title: 'Hexo入门级调试方法'
date: '2023-03-25 09:10'
updated: '2023-03-25 09:10'
tags:
  - Hexo
alias: []
---

根据 Hexo 官方 [API](https://hexo.io/zh-cn/api/) 编写 js 脚本来启动。比如调用控制台执行命令，生成网站：

```js
var Hexo = require('hexo');  
var hexo = new Hexo(process.cwd(), {});  
  
hexo.init().then(function(){  
    hexo.call('generate', {}).then(function(){  
        return hexo.exit();  
    }).catch(function(err){  
        return hexo.exit(err);  
    });  
});
```

然后在 IDEA 做 Run 配置，选择 **Node.js** 类型，选好启动位置和这个 js 文件即可。然后就可以对自己的脚本打断点等调试。

目前只成功了这一个，server 命令没成功，不清楚原因。

> 注意：使用过滤器时，某些方法不是每次都会被执行，例如文章已经生成缓存时，不会执行 before_post_render，可以通过修改文章或者执行 Hexo 的 clean 命令清除缓存。
