/**
 * 纯经验之谈，如：gitee。
 */

'use strict';

const logger = hexo.log;

const {enable, reg_exp} = hexo.config.forbidden_word_check = Object.assign({
    enable: true,
    reg_exp: []
}, hexo.config.forbidden_word_check);

const regExps = [];

if (enable) {
    for (let i = 0; i < reg_exp.length; i++) {
        // 每个元素代表一组替换配置
        let replacement = reg_exp[i];
        if (!Array.isArray(replacement)) {
            replacement = [replacement];
        }
        // 每组配置中，前面是一到多个检测匹配词，最后一个是替换内容，默认为空
        if (replacement.length === 1) {
            replacement.push(undefined);
        }

        let lastIdx = replacement.length - 1;
        for (let j = 0; j < lastIdx; j++) {
            regExps.push({
                word: replacement[j],
                searchValue: new RegExp(replacement[j], 'gi'),
                replacer: replacement[lastIdx]
            });
        }
    }

    hexo.extend.filter.register('after_render:html', check);

}

function check(str, data) {
    for (let i = 0; i < regExps.length; i++) {
        let {word, searchValue, replacer} = regExps[i];
        if (str.search(searchValue) > -1) {
            logger.warn('检测到:' + word + ' 在文章或页面:' + (data.page.title || data.page.source || data.path));
            if (replacer !== undefined) {
                str = str.replace(searchValue, replacer);
            }
        }
    }
    return str;
}


