/**
 * 解决问题：原始文章中内部链接拓展名（.md）被转换为网页后保留了原链接地址，但与实际网页链接拓展名（.html）不一致导致链接失效问题。
 * 顺便（在开发环境）把文章中的链接检查一遍，对于没有路由的给予警告。
 * <p>
 *     已启用方案一：
 *     文章渲染前，在{@link https://hexo.io/zh-cn/api/filter#before-post-render before_post_render}过滤器使用正则替换Markdown链接格式，修复拓展名，
 *     统一排除条件：以绝对路径/开头、协议+冒号开头、#开头的链接，只匹配内部相对链接，
 *     额外考虑括号内侧有空格（不可见字符），
 *     暂不考虑被转义而无效的链接、链接包含右括号的情况。
 * <p>
 *     后备方案二：
 *     文章渲染后，在{@link https://hexo.io/zh-cn/api/rendering#after-render-过滤器 after_render:html}过滤器使用第三方插件解析Html中的超链接元素，修复拓展名，
 *     解析链接时，会碰到外部链接、内部资源链接，需要进行排除，
 *     统一排除条件：以绝对路径/开头、协议+冒号开头、#开头的链接，只匹配内部相对链接，
 *     再检查是否有路由，因为没有针对markdown拓展名，比如碰到内部资源已有路由可以跳过，无则尝试修复，
 *     根据永久链接的拓展名来修复（估计只能是.html），
 *     修复后仍然没有路由的，可能是源文件缺失文章或其他错误，会给予警告，提醒修复链接，
 *     此方案作为后备时，方案一应当修复了所有内链，所以这里仍需要修复时会给予警告。
 * <p>
 *     排除了绝对路径一方面是因为生成的很多链接都是绝对路径，不需要检查，就算检查也要注意把上下文 root 变量值排除掉才能找到录音；另一方面是我确实都用相对路径，文章之间不用管根目录，相对路径就能找到。
 */

'use strict';

const pathFn = require('path');
const logger = hexo.log;

// 方案二过滤器需要第三方依赖如下。目前把它们作为开发环境依赖，以示并非强依赖
const cheerio = require('cheerio');
const url = require('url');

hexo.extend.filter.register('after_init', function () {
    const {config, route} = this;
    const {root, permalink, fix_internal_links} = config;
    let permalinkExtname = pathFn.extname(permalink);

    // 官方文档的几个示例中，不是以/结尾就是以.html结尾，
    if (permalink.endsWith('/')) {
        // 根据相对路径寻路所需，永久链接不能使用/结尾，否则多了一级路径，所有原本的相对链接就都找不到目标
        logger.warn('permalink ends with "/", all internal relative links may be invalid!');
    } else if (!permalinkExtname) {
        // 我试过正常情况没有拓展名即代表生成的文件也没有拓展名，浏览器会无法识别页面文件，浏览会变成下载
        logger.warn('permalink has no extname, all post pages may be invalid!');
    }
    logger.debug('ready to use "' + permalinkExtname + '" to fix internal post links in rendered posts\' html');

    // 启用方案一
    const dev_first = true;

    if (dev_first) {
        const mdLinkExp = /(\[.*?]\(\s*(?!\/)(?![a-zA-Z]+:)(?!#)\S*?)\.(md|markdown)\s*\)/g;
        const mdLinkReplace = '$1' + permalinkExtname + ')';
        hexo.extend.filter.register('before_post_render', function (data) {
            data.content = data.content.replace(mdLinkExp, mdLinkReplace);
            return data;
        });
    }

    // 依赖存在时才能执行
    if (cheerio && url) {

        const protocolExp = /^[a-zA-Z]+:/;

        hexo.extend.filter.register('after_render:html', function (str, data) {

            // 没有标签和分类的，不是文章（post），不进行处理
            if (!data.page.tags || !data.page.categories) {
                return str;
            }

            // str 是渲染后的html文本
            const $ = cheerio.load(str, {
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: false
            });
            // 获取所有超链接元素
            const els = $('a[href]');
            // 标记是否有修复处理
            let fixed = false;
            for (let i = 0; i < els.length; i++) {
                const el = $(els[i]);
                let href = el.attr('href');
                if (!href) {
                    continue;
                }
                href = href.trim();
                // 排除条件
                if (href.startsWith('/') || protocolExp.test(href) || href.startsWith('#')) {
                    continue;
                }
                // 如果已经有路由了，不需要修复，比如除了文章以外的资源
                if (getRoute(data.path, href)) {
                    continue;
                }
                const originHref = href;
                // 截取掉原拓展名，使用永久链接的拓展名来尝试修复
                let extname = pathFn.extname(href);
                href = originHref.substr(0, originHref.length - extname.length) + permalinkExtname;
                if (!getRoute(data.path, href)) {
                    // 修复失败也可能是链接的文章不在源文件中，这个也用来警告无效文章链接
                    logger.warn('page "' + (data.page.title || data.page.source) + '" invalid link: ' + originHref);
                    continue;
                }
                if (dev_first) {
                    // 因为文章渲染前已经用正则替换过链接了，这里不应该再需要修复，给出一个警告
                    logger.warn('unexpected link fixed: ', href);
                } else {
                    logger.debug('link fixed: ', href);
                }
                href = encodeURI(href);
                el.attr('href', href);
                fixed = true;
            }

            // 有修复时才调用方法生成html，减少性能消耗
            return fixed ? $.html() : str;
        });

    }

    /**
     * 根据当前文章路径与相对路径，计算最终路径，获取路由对象
     * @param source 当前文章路径
     * @param relative 相对路径链接地址
     */
    function getRoute(source, relative) {
        // 转换方式参考 hexo-server/lib/middlewares/route.js
        const finalHref = route.format(decodeURIComponent(url.resolve(source, relative)));
        return route.get(finalHref);
    }

});

