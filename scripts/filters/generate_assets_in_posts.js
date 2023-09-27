/**
 * 拷贝_posts文件夹中的资源，使它们表现得就像在sources文件夹中一样。
 * 方法：（取巧）利用处理器找到所需的文件列表，再用生成器返回数据。
 */
'use strict';

const fs = require('hexo-fs');

hexo.config.generate_assets_in_posts = Object.assign({
    enable: false
}, hexo.config.generate_assets_in_posts);

const {log, config, route} = hexo;
const {permalink, generate_assets_in_posts: {enable}} = config;

if (!enable) return;

const innerSources = [];

hexo.extend.processor.register('_posts/**/*', function(file){
    let path = file.path;
    // 初衷是排除普通文章（我只有文章和其他资源）
    if (path.endsWith('.md')) {
        return;
    }
    // 额外检查，暂定一个条件为不在hexo渲染范围内（返回值为空，视为可以拷贝的资源）
    if (path.indexOf("_posts") !== 0 || hexo.render.getOutput(path) !== '') {
        return;
    }
    // 尝试检查有无出现冲突文件，
    // 文件路径删除_posts即代表对应sources文件夹下的文件位置
    let source = file.source;
    let sameTarget = source.replace(/[\\\/]_posts/, '');
    if (fs.existsSync(sameTarget)) {
        // 两个文件很可能会生成到同一个位置，跳过
        log.warn('skip ' + path + ' because exists: ' + sameTarget);
        return;
    }
    innerSources.push({
        path: path.substr(7),
        data: function(){
            return fs.createReadStream(source)
        }
    });
});

hexo.extend.generator.register('generate_assets_in_posts', function(locals){
    // 此时 route 中没有数据，本来想检查路由是否存在的，算了
    log.info('set route to `_posts` assets count: ' + innerSources.length);
    return innerSources;
});
