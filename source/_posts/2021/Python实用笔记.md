---
title: Python实用笔记
date: 2021-11-14
updated: 2021-11-14
tags:
  - 个人/备忘录
  - Python
aliases:
---

## python程序打包成可执行文件exe（pyinstaller简单使用）

我是用了pyinstaller最简单的功能了。

写一个py脚本，执行需要的功能，例如我的闹钟已经注册成一个包了：

```python
from sine.alarmclock import app
app.mainLoop()
```

然后执行：

```shell
pyinstaller -F 脚本名称.py
```

- -F打包压缩成单个文件。
- -i指定.ico文件图标

### 包含资源文件（只读）

读取文件方法：

```Python
import sys
import os

#生成资源文件目录访问路径
#说明： pyinstaller工具打包的可执行文件，运行时sys。frozen会被设置成True
#      因此可以通过sys.frozen的值区分是开发环境还是打包后的生成环境
#
#      打包后的生产环境，资源文件都放在sys._MEIPASS目录下
#      修改main.spec中的datas，
#      如datas=[('res', 'res')]，意思是当前目录下的res目录加入目标exe中，在运行时放在零时文件的根目录下，名称为res

def resource_path(relative_path):
    if getattr(sys, 'frozen', False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)
    
# 示例：
filename = resource_path(os.path.join("res","a.txt"))
print(filename)

with open(filename) as f:
    lines = f.readlines()
    print(lines)

```

打包方法：

1. 然后可以单独生成中间文件.spec：
   `pyi-makespec -F test.py`
2. 在.spec中的datas添加资源
3. 真正打包：
   `pyinstaller -F test.spec`

## [python3.6 +tkinter GUI编程 实现界面化的文本处理工具](https://www.cnblogs.com/chenyuebai/p/7150382.html)

[https://www.cnblogs.com/chenyuebai/p/7150382.html](https://www.cnblogs.com/chenyuebai/p/7150382.html)

## Python的GUI图形界面工具大全

[https://zhuanlan.zhihu.com/p/347290491?ivk_sa=1024320u](https://zhuanlan.zhihu.com/p/347290491?ivk_sa=1024320u)

## pyautogui 自动化、图像识别、操作键盘鼠标

[https://www.bilibili.com/video/BV1T34y1o73U](https://www.bilibili.com/video/BV1T34y1o73U)

[https://blog.csdn.net/qingfengxd1/article/details/108270159](https://blog.csdn.net/qingfengxd1/article/details/108270159)

## 模块打包setup.py

2021年12月26日笔记：今天新电脑用python 3.10想安装自己项目，跑setup.py install没报错，pip list也显示正确版本，但直接使用python命令执行import会找不到该包，不过用jupyter notebook能找到，不懂，最后换成setup.py develop却可以，是参考了[python项目模块分发打包setup.py](../../300_资源/研发技术类笔记/散装笔记/python项目模块分发打包setup.py.md)

## 常用官方库

```Python
from concurrent.futures import ThreadPoolExecutor # 官方线程池
# functools 模块可以说主要是为函数式编程而设计，用于增强函数功能。
from tqdm import tqdm # 快速，可扩展的进度条，可以在长循环中添加一个进度提示信息
```
