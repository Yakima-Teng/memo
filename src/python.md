[[toc]]

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

遍历列表，可以使用 for 语句。for语句末尾的冒号告诉Python，下一行是循环的第一行。如果不小心遗漏了冒号，将导致语法错误，因为Python不知道你意欲何为。

```python
magicians = ['alice','david','carolina']
for magician in magicians:
    print(magician)
```

Python函数range()让你能够轻松地生成一系列数。例如，可以像下面这样使用函数range()来打印一系列数：

```python
for value in range(1,5):
    print(value)
```

上述代码会输出1~4，不会输出5：

```text
1
2
3
4
```

调用函数range()时，也可只指定一个参数，这样它将从0开始。例如，range(6)返回数0～5。

要创建数字列表，可使用函数list()将range()的结果直接转换为列表。如果将range()作为list()的参数，输出将是一个数字列表。

```python
numbers = list(range(1,6))

# [1,2,3,4,5]
print(numbers)
```

使用函数range()时，还可指定步长。为此，可给这个函数指定第三个参数，Python将根据这个步长来生成数。

```python
even_numbers = list(range(2,11,2))

# [2,4,6,8,10]
print(even_numbers)
```

使用函数range()几乎能够创建任何需要的数集。例如，如何创建一个列表，其中包含前10个整数(1～10)的平方呢？在Python中，用两个星号(**)表示乘方运算。下面的代码演示了如何将前10个整数的平方加入一个列表中：

```python
squares = []
for value in range(1,11):
    squares.append(value ** 2)

# [1,4,9,16,25,36,49,64,81,100]
print(squares)
```

有几个专门用于处理数字列表的Python函数。例如，你可以轻松地找出数字列表的最大值、最小值和总和：

```python
digits = [1,2,3,4,5,6,7,8,9,0]

# 0
min(digits)

# 9
max(digits)

# 45
sum(digits)
```

前面介绍的生成列表squares的方式包含三四行代码，而列表解析让你只需编写一行代码就能生成这样的列表。列表解析将for循环和创建新元素的代码合并成一行，并自动附加新元素。

```python
# 请注意，这里的for语句末尾没有冒号。
squares = [value**2 for value in range(1,11)]

# [1,4,9,16,25,36,49,64,81,100]
print(squares)
```

除了处理整个列表，你还可以处理列表的部分元素，Python称之为切片。

要创建切片，可指定要使用的第一个元素和最后一个元素的索引。与函数range()一样，Python在到达第二个索引之前的元素后停止。

```python
players = ['charles','martina','michael','florence','eli']

# ['charles','martina','michael']
print(players[0:3])
```

如果没有指定第一个索引，Python将自动从列表开头开始：

```python
players = ['charles','martina','michael','florence','eli']

# ['charles','martina','michael','florence']
print(players[:4])
```

要让切片终止于列表末尾，也可使用类似的语法。例如，如果要提取从第三个元素到列表末尾的所有元素，可将起始索引指定为2，并省略终止索引：

```python
players = ['charles','martina','michael','florence','eli']

# ['michael','florence','eli']
print(players[2:])
```

前面说过，负数索引返回离列表末尾相应距离的元素，因此你可以输出列表末尾的任意切片。例如，如果要输出名单上的最后三名队员，可使用切片players[-3:]：

```python
players = ['charles','martina','michael','florence','eli']
print(players[-3:])
```

::: tip 注意

注意：可在表示切片的方括号内指定第三个值。这个值告诉Python在指定范围内每隔多少元素提取一个。

:::

遍历切片：

```python
players = ['charles','martina','michael','florence','eli']

print("Here are the first three players on my team:")
for player in players[:3]:
    print(player.title())
```

打印内容如下：

```text
Here are the first three players on my team:
Charles
Martina
Michael
```

要复制列表，可创建一个包含整个列表的切片，方法是同时省略起始索引和终止索引([:])。

::: tip 元组

Python将不能修改的值称为不可变的，而不可变的列表被称为元组。元组看起来很像列表，但使用圆括号而非中括号来标识。定义元组后，就可使用索引来访问其元素，就像访问列表元素一样。

注意：严格地说，元组是由逗号标识的，圆括号只是让元组看起来更整洁、更清晰。如果你要定义只包含一个元素的元组，必须在这个元素后面加上逗号：

```python
my_t = (3,)
```

遍历元组中的所有值：

```python
dimensions = (200,50)
for dimension in dimensions:
    print(dimension)
```

相比于列表，元组是更简单的数据结构。如果需要存储的一组值在程序的整个生命周期内都不变，就可以使用元组。

:::

### if {#python-if}

```python
cars = ['audi','bmw','subaru','toyota']

for car in cars:
    if car == 'bmw':
        print(car.upper())
    else:
        print(car.title())
```

要检查是否两个条件都为True，可使用关键字and将两个条件测试合而为一。

关键字or也能够让你检查多个条件，但只要至少一个条件满足，就能通过整个测试。仅当两个测试都没有通过时，使用or的表达式才为False。

要判断特定的值是否已包含在列表中，可使用关键字in。

```python
requested_toppings = ['mushrooms','onions','pineapple']

# True
'mushrooms'in requested_toppings

# False
'pepperoni'in requested_toppings
```

还有些时候，确定特定的值未包含在列表中很重要。在这种情况下，可使用关键字not in。

```python
banned_users = ['andrew','carolina','david']
user = 'marie'

if user not in banned_users:
    print(f"{user.title()},you can post a response if you wish.")
```

布尔表达式：

```python
game_active = True
can_edit = False
```

最简单的if语句只有一个测试和一个操作：

```python
if conditional_test:
    do something
```

if-else语句：

```python
age = 17
if age >= 18:
    print("You are old enough to vote!")
    print("Have you registered to vote yet?")
else:
    print("Sorry,you are too young to vote.")
    print("Please register to vote as soon as you turn 18!")
```

```python
requested_toppings = ['mushrooms','green peppers','extra cheese']

for requested_topping in requested_toppings:
    if requested_topping == 'green peppers':
        print("Sorry,we are out of green peppers right now.")
    else:
        print(f"Adding {requested_topping}.")

print("\nFinished making your pizza!")
```

if-elif-else结构：

```python
age = 12

if age <4:
    print("Your admission cost is $0.")
elif age <18:
    print("Your admission cost is $25.")
else:
    print("Your admission cost is $40.")
```

```python
age = 12

if age <4:
    price = 0
elif age <18:
    price = 25
elif age <65:
    price = 40
else:
    price = 20

print(f"Your admission cost is ${price}.")
```

else 代码块是可以省略的：

```python
age = 12

if age <4:
    price = 0
elif age <18:
    price = 25
elif age <65:
    price = 40
elif age >= 65:
    price = 20

print(f"Your admission cost is ${price}.")
```

在if语句中将列表名用作条件表达式时，Python将在列表至少包含一个元素时返回True，并在列表为空时返回False（**这点和JavaScript中的空数组的布尔值判断逻辑不一样**）。

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

### 字典 {#python-dictionary}

在Python中，字典是一系列键值对。每个键都与一个值相关联，你可使用键来访问相关联的值。与键相关联的值可以是数、字符串、列表乃至字典。事实上，可将任何Python对象用作字典中的值。

在Python 3.7中，字典中元素的排列顺序与定义时相同。如果将字典打印出来或遍历其元素，将发现元素的排列顺序与添加顺序相同。

```python
alien_0 = {'color':'green','points':5}
```

对于字典中不再需要的信息，可使用del语句将相应的键值对彻底删除。使用del语句时，必须指定字典名和要删除的键。

```python
alien_0 = {'color':'green','points':5}
print(alien_0)

del alien_0['points']
print(alien_0)
```

使用放在方括号内的键从字典中获取感兴趣的值时，可能会引发问题：如果指定的键不存在就会出错。就字典而言，可使用方法get()在指定的键不存在时返回一个默认值，从而避免这样的错误。方法get()的第一个参数用于指定键，是必不可少的；第二个参数为指定的键不存在时要返回的值，是可选的。

```python
alien_0 = {'color':'green','speed':'slow'}

point_value = alien_0.get('points','No point value assigned.')
print(point_value)
```

遍历所有键值对：

```python
user_0 = {
    'username':'efermi',
    'first':'enrico',
    'last':'fermi',
}

for key,value in user_0.items():
    print(f"\nKey:{key}")
    print(f"Value:{value}")
```

遍历字典中的所有键：

```python
favorite_languages = {
    'jen':'python',
    'sarah':'c',
    'edward':'ruby',
    'phil':'python',
}

for name in favorite_languages.keys():
    print(name.title())
```

遍历字典时，会默认遍历所有的键。即 `for name in favorite_languages:` 等价于 `for name in favorite_languages.keys():`。显式地使用方法keys()可让代码更容易理解，你可以选择这样做，但是也可以省略它。

要以特定顺序返回元素，一种办法是在for循环中对返回的键进行排序。为此，可使用函数sorted()来获得按特定顺序排列的键列表的副本：

```python
favorite_languages = {
    'jen':'python',
    'sarah':'c',
    'edward':'ruby',
    'phil':'python',
}

for name in sorted(favorite_languages.keys()):
    print(f"{name.title()},thank you for taking the poll.")
```

遍历字典中的所有值：

```python
favorite_languages = {
    'jen':'python',
    'sarah':'c',
    'edward':'ruby',
    'phil':'python',
}

print("The following languages have been mentioned:")
for language in favorite_languages.values():
    print(language.title())
```

通过对包含重复元素的列表调用set()，可让Python找出列表中独一无二的元素，并使用这些元素来创建一个**集合**。

```python
favorite_languages = {
    --snip--
}

print("The following languages have been mentioned:")
for language in set(favorite_languages.values()):
    print(language.title())
```

可使用一对花括号直接创建集合，并在其中用逗号分隔元素：

```python
languages = {'python','ruby','python','c'}

# {'ruby','python','c'}
languages
```

### 用户输入和while循环 {#python-while}

函数input()让程序暂停运行，等待用户输入一些文本。获取用户输入后，Python将其赋给一个变量，以方便你使用。

```python
message = input("Tell me something,and I will repeat it back to you:")
print(message)
```

函数input()接受一个参数——要向用户显示的提示(prompt)或说明，让用户知道该如何做。在本例中，Python运行第一行代码时，用户将看到提示Tell me something,and I will repeat it back to you:。程序等待用户输入，并在用户按回车键后继续运行。输入被赋给变量message，接下来的print(message)将输入呈现给用户。

函数int()将数的字符串表示转换为数值表示，如下所示：

```python
age = input("How old are you?")
# How old are you?21

age = int(age)

# True
age >= 18
```

```python
prompt = "\nTell me something,and I will repeat it back to you:"
prompt += "\nEnter 'quit'to end the program."
message = ""
while message != 'quit':
    message = input(prompt)
    print(message)
```

删除为特定值的所有列表元素：

```python
pets = ['dog','cat','dog','goldfish','cat','rabbit','cat']
print(pets)

while 'cat'in pets:
    pets.remove('cat')

print(pets)
```

### 函数 {#python-function}

有时候，预先不知道函数需要接受多少个实参，好在Python允许函数从调用语句中收集任意数量的实参。例如，来看一个制作比萨的函数，它需要接受很多配料，但无法预先确定顾客要多少种配料。下面的函数只有一个形参*toppings，但不管调用语句提供了多少实参，这个形参会将它们统统收入囊中：

```python
def make_pizza(*toppings):
    """打印顾客点的所有配料。"""
    print(toppings)

make_pizza('pepperoni')
make_pizza('mushrooms','green peppers','extra cheese')
```

形参名*toppings中的星号让Python创建一个名为toppings的空元组，并将收到的所有值都封装到这个元组中。函数体内的函数调用print()通过生成输出，证明Python能够处理使用一个值来调用函数的情形，也能处理使用三个值来调用函数的情形。它以类似的方式处理不同的调用。注意，Python将实参封装到一个元组中，即便函数只收到一个值：

```python
('pepperoni',)
('mushrooms','green peppers','extra cheese')
```

如果要遍历其中的具体元素：

```python
def make_pizza(*toppings):
    """概述要制作的比萨。"""
    print("\nMaking a pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")

make_pizza('pepperoni')
make_pizza('mushrooms','green peppers','extra cheese')
```

结合使用位置实参和任意数量实参：

```python
def make_pizza(size,*toppings):
    """概述要制作的比萨。"""
    print(f"\nMaking a {size}-inch pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")

make_pizza(16,'pepperoni')
make_pizza(12,'mushrooms','green peppers','extra cheese')
```

::: tip *args

你经常会看到通用形参名*args，它也收集任意数量的位置实参。

:::

使用任意数量的关键字实参：

```python
def build_profile(first,last,**user_info):
    """创建一个字典，其中包含我们知道的有关用户的一切。"""
    user_info['first_name'] = first
    user_info['last_name'] = last
    return user_info

user_profile = build_profile('albert','einstein',
                             location='princeton',
                             field='physics')
print(user_profile)
```

上例得到内容如下：

```text
{'location':'princeton','field':'physics',
 'first_name':'albert','last_name':'einstein'}
```

::: tip **kwargs

注意　你经常会看到形参名**kwargs，它用于收集任意数量的关键字实参。

:::

import语句允许在当前运行的程序文件中使用模块中的代码。

假定现在有文件 `pizza.py`：

```python
def make_pizza(size,*toppings):
    """概述要制作的比萨。"""
    print(f"\nMaking a {size}-inch pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")
```

导入整个模块（只需编写一条import语句并在其中指定模块名，就可在程序中使用该模块中的所有函数）：

```python
import pizza

pizza.make_pizza(16,'pepperoni')
pizza.make_pizza(12,'mushrooms','green peppers','extra cheese')
```

还可以导入模块中的特定函数，这种导入方法的语法如下：

```python
from module_name import function_name
```

通过用逗号分隔函数名，可根据需要从模块中导入任意数量的函数：

```python
from module_name import function_0,function_1,function_2
```

使用 `as` 给函数指定别名：

```python
from pizza import make_pizza as mp

mp(16,'pepperoni')
mp(12,'mushrooms','green peppers','extra cheese')
```

使用as给模块指定别名：

```python
import pizza as p

p.make_pizza(16,'pepperoni')
p.make_pizza(12,'mushrooms','green peppers','extra cheese')
```

使用星号(*)运算符可让Python导入模块中的所有函数：

```python
from pizza import *

make_pizza(16,'pepperoni')
make_pizza(12,'mushrooms','green peppers','extra cheese')
```

给形参指定默认值时，等号两边不要有空格：

```python
def function_name(parameter_0,parameter_1='default value')
```

对于函数调用中的关键字实参，也应遵循这种约定：

```python
function_name(value_0,parameter_1='value')
```
