---
title: 'python中logging模块使用示例和设置格式'
date: '2018-01-11 11:42'
updated: '2018-01-11 11:42'
tags:
  - Python
  - 代码存档
alias: []
---

```python
import logging as _logging
_ch = _logging.StreamHandler()
_formatter = _logging.Formatter("%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s") 
_ch.setFormatter(_formatter)
_log = _logging.getLogger(__name__)
_log.addHandler(_ch)
_log.setLevel(_logging.DEBUG)
```
