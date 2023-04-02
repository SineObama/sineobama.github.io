---
title: 'Hexo+Obsidian从标签自动生成分类的尝试'
date: '2023-03-25 09:23'
updated: '2023-03-25 09:23'
tags:
  - Hexo
  - Obsidian
  - 解决方案/代码存档
alias: []
---

## 最新进展

使用 Hexo 脚本插件功能可以实现在生成网站时自动生成分类，而不用人工写在文件里：

```js
// 使用文章标签给文章设置分类，按照Obsidian多级标签写法拆分设置为多级分类  
hexo.extend.filter.register('before_post_render', function (data) {  
    const logger = hexo.log;  
  
    // 没有标签和分类的，不是文章（post），不进行处理  
    if (!data.tags || !data.categories) {  
        return data;  
    }  
  
    // 文章设置generate_categories_from_tags=false时不进行处理  
    if (data.generate_categories_from_tags === false) {  
        return data;  
    }  
  
    // 文章设置generate_categories_from_tags=true时必定进行处理，否则  
    // 文章已经有分类的，保留，不作修改  
    if (data.generate_categories_from_tags !== true && data.categories.length > 0) {  
        return data;  
    }  
  
    // 开始设置分类  
  
    // 取所有标签名称  
    let tags = data.tags.data.map(i => i.name);  
    // 支持多级的分类是个双层数组  
    let categories = [];  
    logger.debug(`title: ${data.title}, reading tags:`, tags);  
    for (let i = 0; i < tags.length; i++) {  
        const tag = tags[i];  
        if (!tag) {  
            continue;  
        }  
        // 多级标签拆分为多级分类  
        categories.push(tag.split('/'));  
    }  
    data.setCategories(categories);  
    logger.debug(`title: ${data.title}, set categories:`, categories);  
  
    return data;  
});
```

## Hexo 脚本研究过程

尝试了两个过滤器 `before_post_render` 和 `template_locals`，可以看到 `tags` 和 `categories` 是生成好的对象，但通过断点找到了 `setCategories` 方法：

```js
hexo.extend.filter.register('before_post_render', function(data){  
    if (data.title === 'Hello World') {  
        console.log(data.tags);  
        data.setCategories([['两层数组分类']]);
    }  
    return data;  
});  
  
hexo.extend.filter.register('template_locals', function(locals){  
    if (locals.page.title === 'Hello World') {  
        console.log(locals.page.tags);  
    }  
    return locals;  
});
```

## 旧方法

旧方法需要人工设置分类，但利用 Obsidian 插件 templater 功能，首先是使用模板生成 Front-matter：

```yaml
---
title: '<% tp.frontmatter.title || tp.file.title %>'
date: '<% tp.frontmatter.date || tp.file.creation_date() %>'
updated: '<% tp.frontmatter.updated || tp.file.last_modified_date() %>'
tags: <% tp.user.tagsToListTag(tp) %>
categories: <% tp.user.tagsToHexoCategories(tp) %>
alias: <% tp.user.aliasToArrayAlias(tp) %>
---

```

模板中用到的一个用户自定义函数，需要添加进插件设置中：

```js
/**  
 * obsidian templater 模板插件的用户脚本。  
 * 根据当前文件的（支持多级的）标签，重新生成文件头中Hexo框架支持多级的分类(categories)。  
 * @param tp templater engine scoped variables  
 * @returns {string}  
 */  
function tagsToHexoCategories(tp) {  
    let tags = tp.file.tags;  
    if (!tags || !tags.length) {  
        return '';  
    }  
    let text = '';  
    for (let i = 0; i < tags.length; i++) {  
        let tag = tags[i].trim();  
        if (tag.startsWith('#')) {  
            tag = tag.substr(1);  
        }  
        let splited = tag.split('/');  
        let array = ''  
        for (let j = 0; j < splited.length; j++) {  
            if (j > 0) {  
                array += ', ';  
            }  
            array += "'" + splited[j] + "'";  
        }  
        text += '\n- [' + array + ']';  
    }  
    return text;  
}  
  
module.exports = tagsToHexoCategories;
```

## 附录

成功后把之前写的文章分类全局正则替换删除了：`categories:\s+(^-.*\s+)+`。

## 参考资料

[IDEA入门级调试Hexo方法](IDEA入门级调试Hexo方法.md)
