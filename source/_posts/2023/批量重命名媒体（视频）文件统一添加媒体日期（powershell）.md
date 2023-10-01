---
title: 批量重命名媒体（视频）文件统一添加媒体日期（powershell）
date: 2023-09-09 23:53
updated: 2023-09-09 23:53
tags:
  - 计算机/代码存档
aliases:
---

为了将下载的视频文件统一加上文件对应的日期（原名称规则不统一），今天问了几次ChatGPT捣鼓出来了一个脚本，优先按照**文件属性中的媒体日期**来，其次使用文件修改时间。

```powershell
$folderPath = Get-Location  # 获取当前文件夹路径
$scriptName = $MyInvocation.MyCommand.Name  # 获取脚本文件名

# 获取文件夹中的所有文件，排除脚本文件自身和已经以日期格式开头的文件
$files = Get-ChildItem -Path $folderPath | Where-Object { $_.Name -ne $scriptName -and $_.Name -notmatch '^\d{4}-\d{2}-\d{2}_' }

# 定义日期提取的正则表达式
$datePattern = '\d{4}-\d{2}-\d{2}'

# 循环遍历每个文件并重命名
foreach ($file in $files) {
    # 获取创建媒体日期属性
    $folder = New-Object -ComObject Shell.Application
    $folderItem = $folder.NameSpace($file.Directory.FullName)
    $fileItem = $folderItem.ParseName($file.Name)
    $mediaDate = $folderItem.GetDetailsOf($fileItem, 208)  # 208 是创建媒体日期的属性编号
    
    if ($mediaDate) {
        Write-Host "mediaDate:  $mediaDate"
        # 追加 $mediaDate 的值到文本文件中，每个值一行，用于排查特殊字符
        #$mediaDate | Out-File -Append -FilePath ".\output.txt"

        # 提取日期部分并替换特殊字符
        # 因为格式中存在我不清楚的特殊字符，目前找到两个额外的“不可见”字符，分别在日期数字前面和小时前面 -replace '[\u200e\u200f ]', ''
        # 在网上可以查看字符:https://www.lddgo.net/convert/string-unicode
        $formattedMediaDate = $mediaDate -replace '\d{1,2}:\d{1,2}', '' -replace '/', '-' -replace '[\u200e\u200f ]', ''
        
        # 对日期补0
        # 将日期字符串解析为日期对象
        $date = [datetime]::ParseExact($formattedMediaDate, "yyyy-M-d", $null)
        # 将日期对象重新格式化为带零填充的日期字符串
        $formattedMediaDate = $date.ToString("yyyy-MM-dd")
        
        Write-Host "formattedMediaDate:  $formattedMediaDate"
        $newFileName = "${formattedMediaDate}_$($file.Name)"
    }
    else {
        # 如果创建媒体日期不包含有效日期，则使用文件创建时间作为日期
        $modificationDate = $file.LastWriteTime.ToString("yyyy-MM-dd")
        $newFileName = "${modificationDate}_$($file.Name)"
    }
    
    # 检查新文件名是否已存在，如果存在，则添加数字后缀
    $counter = 1
    $finalNewFileName = $newFileName
    while (Test-Path -Path (Join-Path -Path $folderPath -ChildPath $finalNewFileName)) {
        $extension = $file.Extension
        $baseName = $file.BaseName
        $finalNewFileName = "${finalNewFileName}_$counter$extension"
        $counter++
    }
    
    # 打印原始文件名和修改后的文件名
    Write-Host "before: $($file.Name)"
    Write-Host "after:  $newFileName"
    
    # 重命名文件
    Rename-Item -Path $file.FullName -NewName $finalNewFileName
}
```
