/**
 * 文章辅助脚本：根据文章变量，在标题前面加上文字标记。
 * 1.【转载】copyright: false
 * 2.【作废】invalid: true
 */

'use strict';

const logger = hexo.log;
const {config} = hexo;

hexo.config.post_title_mark = Object.assign({
    enable: false
}, hexo.config.post_title_mark);

const {post_title_mark: {enable}} = config;

if (enable) {
    hexo.extend.filter.register('before_post_render', generateMarker('【转载】', noCopyright));
    hexo.extend.filter.register('before_post_render', generateMarker('【作废】', isInvalid));
}

function noCopyright(data) {
    // 版权参考：https://butterfly.js.org/posts/4aa8abbe/#%E6%96%87%E7%AB%A0%E7%89%88%E6%AC%8A
    // 文章设置 copyright=false 时代表非原创，没有版权
    return data.copyright === false;
}

function isInvalid(data) {
    // 自定义变量
    return data.invalid === true;
}

/**
 * 生成过滤器函数，用于给标题打上标记
 */
function generateMarker(titleMark, filter) {

    return function (data) {

        // 没有标签和分类的，不是文章（post），不进行处理
        if (!data.tags || !data.categories) {
            return data;
        }

        // 过滤条件
        if (!filter(data)) {
            return data;
        }

        // 标题已经有标记就不再重复处理
        if (data.title.indexOf(titleMark) !== -1) {
            return data;
        }

        // 在标题开头加上标记
        data.title = titleMark + data.title;
        logger.debug('marked title: ' + data.title);

        return data;
    };

}
