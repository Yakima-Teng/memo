

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

#### 常量 {#python-constant}

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

在Python中，用方括号([])表示列表，并用逗号分隔其中的元素。如果让Python将列表打印出来，Python将打印列表的内部表示，包括方括号：[插图]

```python
bicycles = ['trek','cannondale','redline','specialized']
# 输出：['trek','cannondale','redline','specialized']
print(bicycles)
```

Python为访问最后一个列表元素提供了一种特殊语法。通过将索引指定为-1，可让Python返回最后一个列表元素：

```python
bicycles = ['trek','cannondale','redline','specialized']
print(bicycles[-1])
```

这种约定也适用于其他负数索引。例如，索引-2返回倒数第二个列表元素，索引-3返回倒数第三个列表元素，依此类推。

```python
bicycles = ['trek','cannondale','redline','specialized']
message = f"My first bicycle was a {bicycles[0].title()}."

# 输出内容为：My first bicycle was a Trek.
print(message)
```

要修改列表元素，可指定列表名和要修改的元素的索引，再指定该元素的新值。

```python
motorcycles = ['honda','yamaha','suzuki']

motorcycles[0] = 'ducati'
print(motorcycles)
```

在列表中添加新元素时，最简单的方式是将元素附加(append)到列表。给列表附加元素时，它将添加到列表末尾。

```python
motorcycles = ['honda','yamaha','suzuki']
print(motorcycles)

motorcycles.append('ducati')
```

使用方法 `insert()` 可在列表的任何位置添加新元素。为此，你需要指定新元素的索引和值。

```python
motorcycles = ['honda','yamaha','suzuki']

motorcycles.insert(0,'ducati')

# ['ducati','honda','yamaha','suzuki']
print(motorcycles)
```

如果知道要删除的元素在列表中的位置，可使用del语句。

```python
motorcycles = ['honda','yamaha','suzuki']
print(motorcycles)

del motorcycles[0]
print(motorcycles)
```

方法pop()删除列表末尾的元素，并让你能够接着使用它。术语**弹出**(pop)源自这样的类比：列表就像一个栈，而删除列表末尾的元素相当于弹出栈顶元素。

```python
motorcycles = ['honda','yamaha','suzuki']

popped_motorcycle = motorcycles.pop()

# ['honda','yamaha']
print(motorcycles)

# suzuki
print(popped_motorcycle)
```

实际上，可以使用pop()来删除列表中任意位置的元素，只需在圆括号中指定要删除元素的索引即可。

```python
motorcycles = ['honda','yamaha','suzuki']

first_owned = motorcycles.pop(0)

# The first motorcycle I owned was a Honda.
print(f"The first motorcycle I owned was a {first_owned.title()}.")
```

如果你不确定该使用del语句还是pop()方法，下面是一个简单的判断标准：如果你要从列表中删除一个元素，且不再以任何方式使用它，就使用del语句；如果你要在删除元素后还能继续使用它，就使用方法pop()。

有时候，你不知道要从列表中删除的值所处的位置。如果只知道要删除的元素的值，可使用方法remove()。

```python
motorcycles = ['honda','yamaha','suzuki','ducati']

motorcycles.remove('ducati')
```

Python方法sort()让你能够较为轻松地对列表进行排序（按字母顺序升序排列）。**方法sort()永久性地修改列表元素的排列顺序**。

```python
cars = ['bmw','audi','toyota','subaru']
cars.sort()

# ['audi','bmw','subaru','toyota']
print(cars)
```

还可以按与字母顺序相反的顺序排列列表元素，只需向sort()方法传递参数reverse=True即可。

```python
cars = ['bmw','audi','toyota','subaru']
cars.sort(reverse=True)

# ['toyota','subaru','bmw','audi']
print(cars)
```

要保留列表元素原来的排列顺序，同时以特定的顺序呈现它们，可使用函数sorted()。函数sorted()让你能够按特定顺序显示列表元素，同时不影响它们在列表中的原始排列顺序。

注意，调用函数sorted()后，原始列表元素的排列顺序并没有变。如果要按与字母顺序相反的顺序显示列表，也可向函数sorted()传递参数reverse=True。

要反转列表元素的排列顺序，可使用方法reverse()。注意，reverse()不是按与字母顺序相反的顺序排列列表元素，而只是反转列表元素的排列顺序。方法reverse()永久性地修改列表元素的排列顺序，但可随时恢复到原来的排列顺序，只需对列表再次调用reverse()即可。

使用函数len()可快速获悉列表的长度。

```python
cars = ['bmw','audi','toyota','subaru']

# 4
len(cars)
```

索引错误的话会导致报错，比如下面这段代码：

```python
motorcycles = ['honda','yamaha','suzuki']
print(motorcycles[3])
```

会导致报错：

```text
Traceback (most recent call last):
  File "motorcycles.py",line 2,in <module>
    print(motorcycles[3])
IndexError:list index out of range
```

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
