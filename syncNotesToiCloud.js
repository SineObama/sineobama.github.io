// 从我的文章存储目录同步文件到本项目的文章目录

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const sourceFolder = 'D:\\ob_main\\主笔记本';
//const targetFolder = 'D:\\iCloudDrive\\主笔记本';
const targetFolder = 'D:\\iCloudDrive\\iCloud~md~obsidian\\ob_main\\主笔记本';

// 简单实现忽略文件夹与文件，不做删除
const ignoreFolders = [];
const ignoreFiles = [];

console.log('from', sourceFolder, 'to', targetFolder);

syncFolderRecursive(sourceFolder, targetFolder);

// 递归比较两个文件夹的内容
// 同步文件夹内容
function syncFolderRecursive(sourceFolder, targetFolder) {
    // 检查文件夹必须存在
    if (!fs.statSync(sourceFolder).isDirectory()) {
        console.error('Error: not a folder:', sourceFolder);
        return;
    }
    if (!fs.statSync(targetFolder).isDirectory()) {
        console.error('Error: not a folder:', targetFolder);
        return;
    }

    // 创建目标文件夹中缺失的文件夹
    const sourceFiles = fs.readdirSync(sourceFolder);
    sourceFiles.forEach((file) => {
        const sourceFilePath = path.join(sourceFolder, file);
        const targetFilePath = path.join(targetFolder, file);

        if (fs.statSync(sourceFilePath).isDirectory() && !fs.existsSync(targetFilePath)) {
            // 如果目标文件夹中缺失源文件夹中存在的文件夹，则执行创建操作
            fs.mkdirSync(targetFilePath);
        }
    });

    // 比较两个文件夹的内容
    const files = fs.readdirSync(sourceFolder);
    files.forEach((file) => {
        const sourceFilePath = path.join(sourceFolder, file);
        const targetFilePath = path.join(targetFolder, file);

        if (fs.statSync(sourceFilePath).isDirectory()) {
            // 如果是文件夹，则递归比较
            syncFolderRecursive(sourceFilePath, targetFilePath);
        } else {
            // 如果是文件，则比较hash值
            const sourceFileHash = crypto.createHash('md5').update(fs.readFileSync(sourceFilePath)).digest('hex');
            let targetFileHash = '';
            if (fs.existsSync(targetFilePath)) {
                targetFileHash = crypto.createHash('md5').update(fs.readFileSync(targetFilePath)).digest('hex');
            }

            if (sourceFileHash !== targetFileHash) {
                // 如果hash值不相同，则执行覆盖操作
                console.log('copy to:', targetFilePath);
                fs.copyFileSync(sourceFilePath, targetFilePath);
            }
        }
    });

    // 删除目标文件夹中多余的文件
    const targetFiles = fs.readdirSync(targetFolder);
    targetFiles.forEach((file) => {
        const targetFilePath = path.join(targetFolder, file);
        const sourceFilePath = path.join(sourceFolder, file);

        if (!fs.existsSync(sourceFilePath)) {
            // 如果目标文件夹中有源文件夹中没有的文件，则执行删除操作
            if (fs.statSync(targetFilePath).isDirectory()) {
                if (isEndsWith(targetFilePath, ignoreFolders)) {
                    return;
                }
                // 如果目标文件夹中的项目是文件夹，则递归删除
                fs.rm(targetFilePath, {recursive: true}, (err) => {
                    if (err) {
                        console.error('Error occurred while deleting folder:', err);
                    } else {
                        console.log('remove:', targetFilePath);
                    }
                });
            } else {
                if (isEndsWith(targetFilePath, ignoreFiles)) {
                    return;
                }
                // 否则执行删除操作
                console.log('remove:', targetFilePath);
                fs.unlinkSync(targetFilePath);
            }
        }
    });
}

function isEndsWith(str, matchList) {
    if (str && matchList && matchList.length) {
        for (let i = 0; i < matchList.length; i++) {
            if (str.endsWith(matchList[i])) {
                return true;
            }
        }
    }
    return false;
}

function syncFolder(sourceFolder, targetFolder) {
    return isDirectory(sourceFolder).then(value => {
        syncFolderRecursive(sourceFolder, targetFolder);
    });
}

function isDirectory(folderPath) {
    return new Promise((resolve, reject) => {
        // 使用 fs.stat 方法检查文件夹是否存在
        fs.stat(folderPath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject('文件夹不存在');
                } else {
                    reject('发生错误:', err);
                }
            } else {
                if (stats.isDirectory()) {
                    resolve('文件夹存在');
                } else {
                    reject('路径存在，但不是文件夹');
                }
            }
        });
    });
}


