

## Python {#python}

### 变量 {#python-variable}

在程序中可随时修改变量的值，而Python将始终记录变量的最新值。

```python
message = "Hello Python world!"
print(message)

message = "Hello Python Crash Course world!""
print(message)
```

以上代码将输出：

```python
Hello Python world!
Hello Python Crash Course world!
```

::: tip 变量的命令
1. 变量名只能包含字母、数字和下划线。变量名能以字母或下划线打头，但不能以数字打头。
2. 变量名不能包含空格，但能使用下划线来分隔其中的单词。
3. 不要将Python关键字和函数名用作变量名，即不要使用Python保留用于特殊用途的单词，如print。
4. 变量名应既简短又具有描述性。
5. 变量名应既简短又具有描述性。
6. 要创建良好的变量名，需要经过一定的实践，在程序复杂而有趣时尤其如此。
:::

### 字符串

字符串就是一系列字符。在Python中，用引号括起的都是字符串，其中的引号可以是单引号，也可以是双引号，如下所示：

```python
"This is a string."
'This is also a string.'
```

方法title()以首字母大写的方式显示每个单词，即将每个单词的首字母都改为大写。

```python
name = "Ada Lovelace"
print(name.upper())
print(name.lower())
```

可以用下面的放假将字符串全部转大写或小写：

```python
name = "Ada Lovelace"
print(name.upper())
print(name.lower())

# 输出内容如下
# ADA LOVELACE
# ada lovelace
```

在字符串中使用变量。

```python
first_name = "ada"
last_name = "lovelace"
full_name = f"{first_name} {last_name}"
print(full_name)
```

::: tip `format()` 方法
f字符串是Python 3.6引入的。如果你使用的是Python 3.5或更早的版本，需要使用format()方法，而非这种f语法。要使用方法format()，可在圆括号内列出要在字符串中使用的变量。对于每个变量，都通过一对花括号来引用。这样将按顺序将这些花括号替换为圆括号内列出的变量的值，如下所示：
:::

要在字符串中添加制表符，可使用字符组合 `\t`。

```python
>>>print("Python")
Python
>>>print("\tPython")
  Python
```

要在字符串中添加换行符，可使用字符组合\n：

```python
>>>print("Languages:\nPython\nC\nJavaScript")
Languages:
Python
C
JavaScript
```

删除字符串右边的空白可以用 `rstrip`，删除左边的空白可以用 `lstrip()`，同时删除两边的空白可以用 `strip()`：

```python
favorite_language = 'python '
favorite_language.rstrip()
```

