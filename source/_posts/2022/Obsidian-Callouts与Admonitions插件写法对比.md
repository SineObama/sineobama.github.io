---
title: 'Obsidian-Callouts与Admonitions插件写法对比'
date: '2022-10-30 11:44'
updated: '2022-10-30 11:44'
tags:
  - Obsidian
alias: []
---

旧的写法是用插件 Admonitions，新版本的 Obsidian 支持 [callouts](https://help.obsidian.md/How+to/Use+callouts)，语法上看起来兼容性更强。

下面对比一下两种写法，先看 **旧的写法**：（以下统一使用新语法展示写法）

> \`\`\`\`ad-info
> 示例 1：插件 Admonitions 写法，是代码块的嵌套，问题是在其他软件里无法正常渲染内层的代码。
> \`\`\`java
>
> ```java
> String = "代码块";
> ```
>
> \`\`\`
> \`\`\`\`

示例 1 效果如下：

> [!info]
> 示例 1：插件 Admonitions 写法，是代码块的嵌套，问题是在其他软件里无法正常渲染内层的代码。
>
> ```java
> String = "代码块";
> ```

**新的写法** 示例 2：

> \> [!note]+ 示例 2：软件原生写法，引述块嵌套代码块，部分软件里也可正常渲染代码块。
> \> \`\`\`java
> `> String = "代码块";`
> \> ```

示例 2 效果如下：

> [!note]+ 示例 2：软件原生写法，引述块嵌套代码块，部分软件里也可正常渲染代码块。
>
> ```java
> String = "代码块";
> ```
>

其他示例：

> \> [!note]- 默认收起示例：前面加一个减号，如果是加号就是默认展开
> \> \`\`\`java
> `> String = "代码块";`
> \> ```
