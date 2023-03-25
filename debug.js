// 简单调试Hexo入口，执行Hexo命令用于调试脚本/插件

var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

hexo.init().then(function(){
    hexo.call('generate', {}).then(function(){
        return hexo.exit();
    }).catch(function(err){
        return hexo.exit(err);
    });
});
