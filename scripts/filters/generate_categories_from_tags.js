/**
 * 对没有设置分类的文章，将该文章的“多级”标签转为多级分类。
 * 具体做法是找到包含斜杠'/'的多级标签，拆分转换成多级分类，并删除这些标签。
 * 这么做是因为在 Obsidian 编写文章时没有分类的概念，但是有使用斜杠'/'划分的多级标签功能，恰好可以对应 Hexo 的多级分类的概念。
 */

'use strict';

const {config} = hexo;

hexo.config.generate_categories_from_tags = Object.assign({
    enable: false,
    warnNoTag: false,
    warnNoCategory: false
}, hexo.config.generate_categories_from_tags);

const {generate_categories_from_tags: {enable,warnNoTag,warnNoCategory}} = config;

if (enable) {
    hexo.extend.filter.register('before_post_render', generateCategoriesFromTags);
    hexo.extend.filter.register('after_post_render', filterSiteTag);
}

function generateCategoriesFromTags(data) {
    const logger = hexo.log;

    // 没有标签和分类的，不是文章（post），不进行处理
    if (!data.tags || !data.categories) {
        return data;
    }

    // 文章已经有分类的，保留，不作修改
    if (data.categories.length > 0) {
        return data;
    }

    // 开始设置分类

    // 取所有标签名称
    let tags = data.tags.data.map(i => i.name);
    // 支持多级的分类是个双层数组
    let tagsNew = [];
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
            // 标签只保留单级
            tagsNew.push(tag);
            continue;
        }
        categories.push(items);
    }

    data.setTags(tagsNew);
    logger.debug(`title: ${data.title}, set tags:`, tagsNew);

    if (categories.length > 0) {
        data.setCategories(categories);
        logger.debug(`title: ${data.title}, set categories:`, categories);
    } else if (warnNoCategory) {
        logger.warn('post has no category: ' + data.title);
    } else if (warnNoTag && tags.length === 0) {
        logger.warn('post has no tag: ' + data.title);
    }

    return data;
};

let _filterSiteTagOnce = false;

/**
 * Temporarily solve my issue for hexo 7.0: https://github.com/hexojs/hexo/issues/5380
 * related PR: https://github.com/hexojs/hexo/pull/5119
 */
function filterSiteTag(data) {
    if (!_filterSiteTagOnce) {
        _filterSiteTagOnce = true;
        this.locals.set('tags', () => {
            // Ignore tags with zero posts
            return this.database.model('Tag').filter(tag => tag.length);
        });
    }
    return data;
}
