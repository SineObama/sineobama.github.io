/**
 * 检测生成html中的外部链接，如果不在已知的排除列表中，则给予警告。
 */
'use strict';

const { parse } = require('url');
const logger = hexo.log;

hexo.config.external_link_check = Object.assign({
    enable: true,
    trusted: []
}, hexo.config.external_link_check);

const config = hexo.config.external_link_check;

if (!config.enable) return;

const trusted = config.trusted;
if (trusted && !Array.isArray(trusted)) {
    config.trusted = [trusted];
}

function isExternal(url, config) {
    const trusted = config.external_link_check.trusted;
    const data = parse(url);
    const host = data.hostname;
    const sitehost = parse(config.url).hostname || config.url;

    if (!data.protocol || !sitehost) return false;

    if (trusted && trusted.length) {
        for (const i of trusted) {
            if (host === i || (host && host.endsWith(i))) return false;
        }
    }

    // 存在javascript:void(0);的解析结果为null
    return host && host !== sitehost;
}

hexo.extend.filter.register('after_render:html', function(data) {
    const {config} = this;

    const filterExternal = (data) => {

        return data.replace(/<a.*?(href=['"](.*?)['"]).*?>/gi, (str, hrefStr, href) => {
            if (!isExternal(href, config)) return str;

            logger.warn('note unlisted external link: ' + href);
            return str;
        });
    };

    // 不做替换，仅记录
    filterExternal(data);

    return data;
});
