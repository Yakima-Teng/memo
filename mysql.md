[[toc]]

## MySQL {#mysql}

基本上前端的职业发展走到后期，技能点自然而然会点到后端这块的。那么最主流的 MySQL 就是一个必须要熟悉的数据库。

::: tip MySQL
MySQL 是当下流行的关系数据库管理系统（Relational Database Management System, RDBMS），使用 C 和 C++ 语言编写而成。MySQL 支持多线程，可以充分利用CPU资源。
:::

### MySQL 基础知识 {#mysql-basic}

#### 关系数据库设计理论三大范式 {#mysql-3-normal-forms}

- 第一范式（1NF，First Normal Form）：目标是确保每列都是不可再分的最小数据单元（也被称为最小的原子单元），则满足第一范式。
- 第二范式（2NF，Second Normal Form）：要求每张表只描述一件事情。
- 第三范式（3NF，Third Normal Form）：如果一个关系满足第二范式，并且除了主键以外的其他列都不依赖于主键列，则满足第三范式。

#### 连接数据库 {#mysql-connect-database}

```bash
mysql -h host -u user -p

# 如果在运行 MySQL 的同一台机器上登录，则可以省略主机名：
mysql -u user -p
```

#### 创建数据库和表 {#mysql-create-database-table}

**查询当前服务器上存在哪些数据库**

```sql
show databases;
```

**切换使用指定数据库**

```sql
use database_name;
```

**查询当前数据库下的所有表**

```sql
show tables;
```

**创建数据库**

* 在 UNIX 操作系统中，数据库的名称是区分字母大小写的。

```sql
create database database_name;
```

**创建表**

```sql
create table table_name (column_name column_type);
```

例子：

```sql
create table if not exists `userinfo` (
    `id` int unsigned auto_increment,
    `name` varchar(100) not null,
    `age` int not null,
    `date` date,
    primary key ( `id` )) engine=innodb default charset=utf8;
```

说明：
- primary key：用于把列定义为主键，可以使用多列来定义主键，列之间以逗号分隔。
- engine：设置存储引擎。
- charset：设置字符集的编码。

**查询指定表的结构**

```sql
describe table_name;
```

如上面创建的 `userinfo` 表，查询出来的信息如下：

| Field | Type | Null | Key | Default | Extra |
|:----|:----|:----|:----|:----|:----:|
| id | int unsigned | NO | PRI | NULL | auto_increment |
| name | varchar(100) | NO | | NULL | |
| age | int | NO | | NULL | |
| date | date | YES | | NULL | |

#### MySQL 数据类型 {#mysql-data-type}

##### 数字数据类型 {#mysql-data-type-number}

- 整数类型：integer、int、smallint、tinyint、mediumint、bigint。
- 定点类型：decimal、numeric。
- 浮点类型：float、double。
- 位值类型：bit。

整数类型所需的存储空间和取值范围：

| 类型 | 存储空间（字节） | 有符号的最小值 | 无符号的最小值 | 有符号的最大值    | 无符号的最大值 |
|:----|:----|:--------|:--------|:-----------|:-------:|
| tinyint | 1 | -128    | 0    | 127        |   255   |
| smallint | 2 | -32768|0| 32767      |65535|
|mediuminit|3|-8388608|0| 8388607    |16777215|
|int|4|-2147483648|0| 2147483647 |4294967295|
|bigint|8|-2^63|0| 2^63 - 1   |2^64 - 1|

decimal 列声明中，可以指定精度和小数位数：

```sql
# 精度为5，小数位数为2，取值范围为 -999.99 ~ 999.99
salary decimal(5,2)
```

bit 类型的表示方式为 `bit(m)`，m 的取值范围为 1~64（换算成十进制的话，就是 0 ~ 2^64-1）。bit 类型存储的是二进制字符串。

##### 日期和时间数据类型 {#mysql-data-type-date}

表示时间值的日期和时间类型有这样几种：datetime、date、timestamp、time 和 year。每种时间类型都有一个有效值范围和一个“零”值，当指定的日期或时间数据不符合规则时，MySQL 将使用“零”值来替换。MySQL允许将“零”值（`0000-00-00`）存储为“虚拟日期”。在某些情况下，这比使用 `null` 值更方便，并且使用更少的数据和索引空间。

所有日期和时间类型格式的详细说明如下：

|  类型  |  存储字节 |  范围  |  格式  |  用途  |
| --- | --- | --- | --- | --- |
|  date  |  3  |  1000-01-01 到 9999-12-31  |  YYYY-MM-DD  |  日期值  |
|  time  |  3  | '-838:59:59' 到 '838:59:59' | HH:MM:SS | 时间值 |
| year | 1 | 1901 到 2155 | YYYY | 年份值 |
| datetime | 8 | 1000-01-01 00:00:00 到 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 日期和时间值 |
| timestamp | 4 | 1970-01-01 00:00:00 到 2038-01-19 11:14:07 | YYYY-MM-DD HH:MM:SS | 日期和时间值 |

##### 字符串数据类型 {#mysql-data-type-string}

在 MySQL中，字符串数据类型有：char、varchar、text、binary、varbinary、blob、enum 和 set。对于数据类型定位为 char、varchar 和 text 的列，MySQL 以字符为单位定义长度规范。对于数据类型为 binary、varbinary 和 blob 的列，MySQL 以字节为单位定义长度规范。

当列定义为 char、varchar、enum 和 set 的数据类型时，同时还可以指定列的字符集，尤其在存储中文时，建议指定字符集格式为 utf8，以防止出现乱码问题。

```sql
create table mytable
(
    c1 varchar(255) character set utf8,
    c2 text character set latin1 collate latin1_general_cs
);
```

::: tip blob 类型
blob类型的值是一个二进制的大对象，可以容纳可变数量的数据。tinyblob、blob、mediumblob 和 longblob 类型的区别仅在于它们可以存储的值的最大长度不相同。
:::

::: tip enum 类型
enum 类型（即枚举类型）的列值表示一个字符串对象，其值选自定义列时给定的枚举值。enum 类型具有以下优点：
- 在列具有有限的数据集合的情况下压缩数据空间。输入的字符串会自动编码为数字。
- 可读的查询和输出。在查询时，实际存储的数字被转换为相应字符串。

定义时，注意枚举值必须是带引号的字符串。

```sql
create table mytable (
    name varchar(40),
    size enum('x-small', 'small', 'medium')
);
```
:::

::: tip set 类型
set 类型（集合类型）的列值表示可以有零个或多个字符串对象。一个 set 类型的列最多可以有64个不同的成员值，并且每个值都必须从定义列时指定的值列表中选择。set 类型成员值本身不应包含英文逗号。

```sql
create table myset (col set('a', 'b', 'c', 'd'));
```
:::

##### JSON 数据类型 {#mysql-data-type-json}

```sql
create table mytable (jdoc json);
```

MySQL 支持 JSON 数据类型，JSON 数据类型具有如下优点：

- 存储在 JSON 类型列中的 JSON 文档会被自动验证，无效的文档会产生错误。
- 存储在 JSON 类型列中的 JSON 文档会被转换为允许快速读取文档元素的内部格式。
- 在 MySQL 8中，优化器可以执行 JSON 类型列的局部就地更新，而不用删除旧文档后再将整个新文档写入该列。

在 MySQL 中，JSON 类型列的值会被写为字符串。如果字符串不符合 JSON 数据格式，则会产生错误。

### MySQL 基本操作 {#mysql-operation}

### MySQL 高级查询函数 {#mysql-advanced-query}

### MySQL 数据表分区 {#mysql-table-partition}

### MySQL 视图、存储过程 {#mysql-view-procedure}

### MySQL 数据查询优化 {#mysql-query-optimization}

### MySQL 数据运维和读写分离架构 {#mysql-maintenance}

### 函数速查表 {#mysql-function-reference}
