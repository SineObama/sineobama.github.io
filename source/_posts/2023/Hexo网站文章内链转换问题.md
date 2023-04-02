---
title: 'Hexo网站文章内链转换问题'
date: '2023-03-25 16:00'
updated: '2023-03-25 16:00'
tags:
  - Hexo
  - 解决方案/代码存档
alias: []
---

## 需求描述

背景：编写文章使用本地软件，内部链接使用 Markdown 标准的链接写法，格式使用相对路径，以追求最高的通用性。

需求：文章直接放入 Hexo 中即可直接发布，能正常使用。但目前存在内链（内部链接）无法正常跳转问题：

- 首先，Markdown 原始链接是链接到原始文件，即拓展名是 `.md`，发布后最简单的场景是文章变成网页，拓展名是 `.html`，所以链接无法正常跳转。
- 其次，文章转换成网页时路径可能会变化，要找到文章和最终路径的关系可能不简单。

> 不确定是否存在的 Hexo 或主题内置提供的便捷方法能解决这个问题。目前只能自己想办法用插件或自己写。

## 解决方法

### 必须的配置

在 Hexo 中永久链接的配置比较灵活，可以直接设置为文件名称（已包括目录路径）：

```yaml
permalink: :title.html
```

这样将所有文章放在同一个上下文中，不包含日期和 hash 等值，保持原模原样，相对路径几乎就能直接生效，只差个拓展名。

> 注意：在最简单的静态部署场景中（例如我用 gitee），我想应该是必须写拓展名 `.html` 的，并且链接也不能支持 `trailing_html: false` 把拓展名省略掉，因为服务器不会有对应的配置来支持这种路由。

### 方法一：渲染前转换 Markdown 链接和渲染后转换 Html 超链接

一开始从渲染后解析转换 Html 角度出发，找了辅助插件：

- 按照 [node.js 如何解析 html 标签，实现 jquery 一样的元素选择操作 - 知乎](https://zhuanlan.zhihu.com/p/412151894) 推荐安装了插件：`npm i -D cheerio`
- 因为要计算当前页面根据相对路径跳转的结果，安装了插件：`npm i -D url`

因为和代码关系比较深，这里就不细说了，在网站源码中正在使用的就是这个方法（脚本 `replace_internal_link.js`）。

其中只要 **渲染前转换 Markdown 链接** 的方法也够用了，这块因为直接用正则，比较短，就贴出来：

```js
// permalinkExtname 可以视为默认是'.html'
const mdLinkExp = /(\[.*?]\(\s*(?!\/)(?![a-zA-Z]+:)(?!#)\S*?)\.(md|markdown)\s*\)/g;  
const mdLinkReplace = '$1' + permalinkExtname + ')';  
hexo.extend.filter.register('before_post_render', function (data) {  
    data.content = data.content.replace(mdLinkExp, mdLinkReplace);  
    return data;  
});
```

> 正则替换没有考虑太复杂的情况，但至少会被替换的都是 `.md` 等拓展名结尾的，只有小概率会替换了不该替换的东西。

#### 内链检查的性能

**渲染后转换 Html 超链接** 时顺便做了链接检查，在此问题之外可以查到无效链接。做了简单试验：

- 我一千余文章 generated 5.34s
- 删掉依赖之后（不解析 Html 检查内链）3.12s

（Files loaded 两者都是 3.83s 左右，忽略不计）

结论：影响不是很大，在接受范围内，可以检查出问题也是不错的。

#### 方法缺点

> 只有它能用了，别想缺点了。

- 需要修改文章原内容或 Html，代码不一定能面面俱到保持稳定，比如说永久链接的格式可能 **多种多样**，与其他插件冲突等等，可能会有兼容性问题，不够通用（当然只是自己用的话问题会少一点）。
- 遍历一遍 Html 可能存在性能问题。上面简单试验了一下。
- 需要引入一个新的插件，不再能只使用官方插件。（影响不大，强迫症不舒服）

### 【无效】方法二：保持文件拓展名.md 并设置响应头

一开始使用时出现一个理解错误，使用了过滤器 `server_middleware` 设置文件响应头，但这其实只在本地开发的 `server` 启动的服务器中生效，发布在网络上后因为是静态的，没有服务器（处理这些内容），是行不通的。

这里保存一份当时的代码：

```js
/**  
 * 【无效方法】一开始使用时出现一个理解错误，使用了过滤器`server_middleware`设置文件响应头，但这其实只在本地开发的`server`启动的服务器中生效，发布在网络上后因为是静态的，没有服务器（处理这些内容），是行不通的。  
 *  
 * 网站永久链接拓展名不使用Html类型时，设置Http响应头"Content-Type: text/html"使浏览器正常渲染页面。  
 *  
 * 是为了实现文章相对路径的内链可以直接发布使用而不用修改的条件之一，需要同时配置文章的永久链接拓展名与源文件拓展名一致(如.md)。  
 *  
 * 本脚本代码参考：hexo-server/lib/middlewares/route.js 也正是因为它使用 mime.getType 根据链接拓展名确定响应头，这里才需要相应的处理。  
 */  
  
'use strict';  
  
const pathFn = require('path');  
const mime = require('mime');  
  
// 我们需要优先于上述过滤器（默认优先级）设置响应头，  
// 同时这不是一个很通用的方案，所以设置靠后的优先级，允许其他过滤器优先设置响应头。  
hexo.extend.filter.register('server_middleware', function(app){  
  const logger = hexo.log;  
  const { config, route } = this;  
  const { root, permalink } = config;  
  const permalinkExtname = pathFn.extname(permalink);  
  
  // 没有拓展名时过滤器不生效  
  if (!permalinkExtname) {  
    logger.debug('no need to set "Content-Type: text/html" with empty permalink extname');  
    return;  
  }  
  
  // 拓展名原本就是对应html返回头的话就无需处理  
  let type = mime.getType(permalinkExtname);  
  if (type && type.indexOf('text/html') !== -1) {  
    logger.debug('no need to set "Content-Type: text/html" with permalink extname: ' + permalinkExtname);  
    return;  
  }  
  
  logger.debug('response header "Content-Type: text/html" when match permalink extname: ' + permalinkExtname);  
  app.use(root, function(req, res, next){  
    const { method, url: requestUrl } = req;  
    if (method !== 'GET' && method !== 'HEAD') return next();  
  
    let url = route.format(decodeURIComponent(requestUrl));  
    let data = route.get(url);  
    let extname = pathFn.extname(url);  
  
    // 判断当路径有效、拓展名与配置匹配、并且未设置响应头时  
    if (data && extname === permalinkExtname && !res.hasHeader('Content-Type')) {  
      res.setHeader('Content-Type', 'text/html');  
    }  
  
    next();  
  });  
}, 9);
```

## 未尝试的方法

### 解析 Markdown 并转换

从渲染前解析转换 markdown 角度出发，暂时找到了：

- [javascript - 在nodejs下调用marked库解析markdown文件速度特别慢？ - SegmentFault 思否](https://segmentfault.com/q/1010000012999205/a-1020000012999531) 对应插件 `npm install marked`，但看起来只能用于转换文本，不能定位和转换。

### 回归原理，找回资源

> 不知道 Hexo 为什么没做链接更新，或者说做了我看不到，但从原理上分析，或许也可以自己写。

找到链接所指向的原始文件路径，再从文件与地址的关系（可能从路由获取）中找回路由地址，重新写回链接中。这种方式也有望兼容任意的永久链接配置。

[hexo-util](https://github.com/hexojs/hexo-util) 插件有些辅助函数会有帮助：

- 判断是否外链：[isExternalLink](https://github.com/hexojs/hexo-util#isexternallinkurl-sitehost-exclude)
- 计算两个网站地址之间的相对路径：[relative_url(from, to)](https://github.com/hexojs/hexo-util#relative_urlfrom-to)
- 给网站地址加上 root 上下文，或者计算和当前页面的相对路径？[url_for](https://github.com/hexojs/hexo-util#url_forpath-option)
