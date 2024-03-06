

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

### 数 {#python-number}

#### 整数 {#python-integer}

可对整数执行加（+）、减（-）、乘（*）、除（/）运算。

使用两个乘号表示乘方运算：

```python
# 3^2 => 9
3 ** 2

# 10^6 = 1000000
10 ** 6
```

#### 浮点数 {#python-float}

Python 将所有带小数点的数称为浮点数。但需要注意的是，结果包含的小数位数可能是不确定的：

```python
# 得到 0.30000000000000004
0.2 + 0.1
```

所有语言都存在这种问题，没有什么可担心的。

#### 整数和浮点数 {#python-integer-float}

将任意两个数相除时，结果总是浮点数，即便这两个数都是整数且能整除：

```python
# 得到 2.0
4 / 2
```

在其他任何运算中，如果一个操作数是整数，另一个操作数是浮点数，结果也总是浮点数。

无论是哪种运算，只要有操作数是浮点数，Python默认得到的总是浮点数，即便结果原本为整数也是如此。

#### 数中的下划线 {#python-number-underline}

书写很大的数时，可使用下划线将其中的数字分组，使其更清晰易读（Python 3.6开始支持）：

```python
universe_age = 14_000_000_000
```

当你打印这种使用下划线定义的数时，Python不会打印其中的下划线：

```python
print(universe_age)
# 得到 14000000000
```

#### 同时给多个变量赋值 {#python-multiple-variable-assignment}

可在一行代码中给多个变量赋值，这有助于缩短程序并提高其可读性。这种做法最常用于将一系列数赋给一组变量。

```python
可在一行代码中给多个变量赋值，这有助于缩短程序并提高其可读性。这种做法最常用于将一系列数赋给一组变量。
```

#### 常亮 {#python-constant}

常量类似于变量，但其值在程序的整个生命周期内保持不变。Python没有内置的常量类型，但Python程序员会使用全大写来指出应将某个变量视为常量，其值应始终不变。

### 注释 {#python-comment}

在Python中，注释用井号(#)标识。井号后面的内容都会被Python解释器忽略。

### Python之禅 {#zen-of-python}

在控制台执行 `import this`，可以看到全文：

```text
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```


### 列表 {#python-list}

### if {#python-if}

### 字典 {#python-dictionary}

遍历键值对：

```python
user = {
    'username': 'efermi',
}
for key,value in user.items():
    print(f"\nkey: {key}")
    print(f"Value: {value}")
```

遍历键：

```python
# .keys() 是可以省略的，默认就是遍历所有键
for name in fvorite_languages.keys():
    print(name.title())
```

遍历值：

```python
for language in favorite_languages.values():
    print(language.title())

# 对值进行去重后再遍历
for language in set(favorate_languages.values):
    print(language.title())
```

### 用户输入和while循环 {#python-while}
