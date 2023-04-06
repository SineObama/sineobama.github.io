/**
 * 替换外部链接中的内容。
 * 比如替换无法访问的cdn域名。我也试过主题的自定义CDN功能，其中cdnjs好像速度不够快就放弃了，而且由于范围路径不规则，主题不能统一使用网上的解决方法自定义CDN为fastly.jsdelivr.net，所以目前脚本还是有用的。
 */
'use strict';

const { parse } = require('url');
const logger = hexo.log;

hexo.config.replace_external_link = Object.assign({
    enable: true
}, hexo.config.replace_external_link);

const {config} = hexo;
const {replace_external_link: {enable}} = config;

if (!enable) return;

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
