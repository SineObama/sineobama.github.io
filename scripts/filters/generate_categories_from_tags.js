/**
 * 对没有设置分类的文章，从该文章的标签生成多级分类。
 * 具体做法是找到包含斜杠'/'的多级标签，拆分转换成多级分类。
 * 这么做是因为在 Obsidian 编写文章时没有分类的概念，但是有使用斜杠'/'划分的多级标签功能，恰好可以对应 Hexo 的多级分类的概念。
 */

'use strict';

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
        // 拆分多级标签
        let items = tag.split('/');
        // 单级标签不转换
        if (items.length < 2) {
            continue;
        }
        categories.push(items);
    }

    if (categories.length > 0) {
        data.setCategories(categories);
        logger.debug(`title: ${data.title}, set categories:`, categories);
    }

    return data;
});
