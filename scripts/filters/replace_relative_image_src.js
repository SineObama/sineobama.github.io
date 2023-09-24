/**
 * 解决问题：原始文章中图片链接使用相对路径引用时，被hexo发布后会变成绝对路径（以斜杠开头）导致无法正确引用。
 * 解决方法：html渲染之后找到图片标签img中的src属性，测试图片路由是否存在，不存在时尝试去掉开头的斜杠。
 */

'use strict';

const pathFn = require('path');
const logger = hexo.log;

hexo.config.replace_relative_image_src = Object.assign({
    enable: true
}, hexo.config.replace_relative_image_src);

const {config, route} = hexo;
const {permalink, replace_relative_image_src: {enable}} = config;

if (!enable) return;

hexo.extend.filter.register('after_render:html', function (html, data) {
    // 没有标签和分类的，不是文章（post），不进行处理
    if (!data.page.tags || !data.page.categories) return html;

    // 标签处理参考 hexo-filter-nofollow/lib/filter.js
    return html.replace(/<img .*?(src=['"](.*?)['"]).*?>/gi, (aTag, hrefStr, href) => {
        // 目前出现的情况是图片路径前面加了斜杠，暂时只处理这种
        if (!href.startsWith('/')) return aTag;
        // 如果已经有路由了，不需要修复，比如除了文章以外的资源
        let from = encodeURI(data.path);
        if (getRoute(from, href)) return aTag;

        // 截掉开头的斜杠
        let hrefNew = href.substr(1);
        if (!getRoute(from, hrefNew)) {
            // 修复失败也可能是链接的文章不在源文件中，这个也用来警告无效文章链接
            let baseUrl = config.url.endsWith('/') ? config.url : config.url + '/';
            hrefNew = limitRelativeLink(from, href, baseUrl);
            if (hrefNew && href !== hrefNew) {
                aTag = aTag.replace(href, hrefNew);
                logger.warn('page "' + (data.page.title || data.page.source) + '" invalid link: ' + decodeURIComponent(hrefNew) + ' (limited in site url)');
            } else {
                logger.warn('page "' + (data.page.title || data.page.source) + '" invalid link: ' + decodeURIComponent(href));
            }
            return aTag;
        }
        return aTag.replace(href, hrefNew);
    });
});

/**
 * 根据当前文章路径与相对路径，计算最终路径，获取路由对象
 * @param source 当前文章路径（已编码）
 * @param relative 相对路径链接地址（已编码）
 */
function getRoute(source, relative) {
    // 转换方式参考 hexo-server/lib/middlewares/route.js
    const finalHref = route.format(decodeURIComponent(resolve(source, relative)));
    return route.get(finalHref);
}

/**
 * @see @deprecated require('url').resolve
 */
function resolve(from, to) {
    const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
    if (resolvedUrl.protocol === 'resolve:') {
        // `from` is a relative URL.
        const {pathname, search, hash} = resolvedUrl;
        return pathname + search + hash;
    }
    return resolvedUrl.toString();
}

/**
 * 如果相对路径链接指向本网站之外，尝试减少寻路路径将其限定在当前网站url寻址之内。
 * 当前用于针对找不到路由的相对路径链接，其实际情况可能指向发布文件之外的位置，会对应访问到网站之外。例如网站 example.com/blog 中有一个相对路径链接 ../other 最终导向了 example.com/other 即跳出了url路径范围，这种一般是不应该出现的，限制之后便于展示本站内的自定义404页面。
 *
 * @param from 当前位置（已编码）
 * @param href 链接（已编码）
 * @param baseUrl 网站根目录
 * @returns 更新后的链接或者undefined
 */
function limitRelativeLink(from, href, baseUrl) {
    if (!href.startsWith('../')) {
        return undefined;
    }
    let absolute = resolve(baseUrl, from);
    let target = resolve(absolute, href);
    if (target.startsWith(baseUrl)) {
        return href;
    }
    return limitRelativeLink(from, href.substr(3), baseUrl);
}
