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

MySQL 目前仅支持使用 InnoDB 和 NDB 存储引擎对数据表进行分区，不支持其他存储引擎。

使用分区的优点有：

- 数据表被分区后，其中的数据可以分布在不同的物理设备上，从而高效地利用多个硬件设备。
- 分区上的数据更容易维护。例如，想批量删除大量数据时，可以使用清楚整个分区的方式来处理。另外，还可以对一个独立分区进行优化、检查、修复等操作。
- 可以使用分区来避免某些特殊的瓶颈，例如 InnoDB 的单个索引的互斥访问。
- 在大数据集的应用场景下，可以备份和恢复独立的分区，这样能够更好地提高性能。
- 某些查询也可以被极大地优化，因为满足给定 where 子句的数据只能存储在一个或多个分区上，所以会自动搜索相关分区数据，而不是扫描所有的表数据。
- 由于在创建分区后可以更改分区，因此用户可以重新组织数据，提高查询效率。

MySQL 目前支持多种分区：

- 范围（range）分区：基于一个给定连续区间的列值，把区间列值对应的多行分配给分区。
- 列表（list）分区：类似范围分区，不同之处在于列表分区是根据列值域离散集合中的某个值的匹配来选择的。
- 列（column）分区：数据根据某个或多个列的值进行划分，是列表分区和范围分区的变体。
- 哈希（hash）分区：基于用户定义的表达式的返回值进行分区选择，该表达式使用将要插入表中的行的列值来进行计算。哈希函数可以包含**在 MySQL 中有效且产生非负整数的表达式**。
- 键（key）分区：类似哈希分区，区别在于键分区只支持计算一列或多列，并且 MySQL 服务器为此提供了自身的哈希函数。
- 子分区：又称复合分区，是对分区表中每个分区的进一步划分。

#### MySQL 范围分区 {#mysql-partition-by-range}

范围分区应该是连续且不重叠的，使用 value less than 运算符来定义。

创建表，并通过 `partition by range` 子句将表按 `salary` 列进行分区：

```sql
create table employees
(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date,
    salary int
)
partition by range(salary) (
    partition p0 values less than (5000),
    partition p1 values less than (10000),
    partition p2 values less than (15000),
    partition p3 values less than (20000),
    partition p4 values less than maxvalue
);
```

* `maxvalue` 表示是中大于最大可能得整数值。

当员工工资增长到 25000、30000 或更多时，可以使用 `alter table` 语句为 20000~25000 的工资范围添加新分区。

针对上面这个员工表，我们也可以根据员工的出生日期（`birthdate`）进行分区，把同一年出生的员工信息存储在同一个分区中，像下面这样（以 `year(birthdate)` 作为分区依据）。

```sql
create table employees
(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date,
    salary int
)
partition by range(year(birthdate) (
    partition p2018 values less than (2018),
    partition p2019 values less than (2019),
    partition p2020 values less than (2020),
    partition p2021 values less than (2021),
    partition pmax values less than maxvalue
);
```

**查询每个分区中分配的数据量**

```sql
select partition_name as "", table_rows as "" from information_schema.partitions where table_name="employees";
```

得到结果格式如下：

| /  | / |
|----|---|
| p0 | 0 |
| p1 | 1 |
| p2 | 1 |
| p3 | 1 |
| p4 | 0 |

#### MySQL 列表分区 {#mysql-partition-by-list}

```sql
create table employees_list
(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date,
    salary int
)
partition by list(deptno) (
    partition p0 values in (10,20,30),
    partition p1 values in (40,50,60),
    partition p2 values in (70,80,90)
);
```

在列表分区的方案中，如果插入的数据中分区字段的值不在分区列表中，则会报错：`Table has no partition for value blabla`。如果要在一条语句中批量添加多条数据，并忽略错误数据，可以使用 `ignore` 关键字：

```sql
insert ignore into employees_list (empno,empname,deptno,birthdate,salary)
values
(6, 'name1', 10, '2021-06-20', 12998),
(7, 'name2', 100, '2021-06-20', 12998);
```

#### MySQL 列分区 {#mysql-partition-by-column}

列（column）分区是范围分区和列表分区的变体，分为范围列（range column）分区和列表列（list column）分区。

**范围列分区**

```sql
create table rtable(
    a int,
    b int,
    c char(8),
    d int
)
partition by range columns(a,d,c) (
    partition p0 values less than (5,20,'aa'),
    partition p1 values less than (10,30,'cc'),
    partition p2 values less than (15,80,'dd'),
    partition p3 values less than (maxvalue,maxvalue,maxvalue) 
);
```

**列表列分区**

```sql
create table customers (
    name varchar(25),
    street_1 varchar(30),
    street_2 varchar(30),
    city varchar(15),
    renewal date
)
partition by list columns(city) (
    partition pregion_1 values in('河南省', '湖北省', '湖南省'),
    partition pregion_2 values in('广东省', '广西壮族自治区', '海南省'),
    partition pregion_3 values in('上海市', '江苏省', '浙江省'),
    partition pregion_4 values in('北京市', '天津市', '河北省')
);
```

#### MySQL 哈希分区 {#mysql-partition-by-hash}

##### 常规哈希分区 {#mysql-partition-by-normal-hash}

要对表进行哈希分区，必须在 `create table` 语句后附加一个子句，**这个子句可以是一个返回整数的表达式，也可以是 MySQL 整数类型列的名称**。

根据表中 `store_id` 列进行哈希分区，并分为4个分区，示例 SQL 语句如下：

```sql
create table employees (
    id int not null,
    fname varchar(30),
    lname varchar(30),
    hired date not null default '1970-01-01',
    separated date not null default '9999-12-31',
    job_code int,
    store_id int
)
partition by hash(store_id)
partitions 4;
```

如果分区不包含 `partition` 子句，则分区数默认为1；如果分区语句包含 `partition` 子句，则必须在后面指定分区的数量，否则会提示语法错误。

哈希分区中，还可以使用为 SQL 返回整数的表达式，比如：

```sql
create table employees (
    id int not null,
    fname varchar(30),
    lname varchar(30),
    hired date not null default '1970-01-01',
    separated date not null default '9999-12-31',
    job_code int,
    store_id int
)
partition by hash( year(hired) )
partitions 4;
```

##### 线性哈希分区 {#mysql-partition-by-linear-hash}

MySQL 还支持线性哈希，它与常规哈希的不同之处在于：线性哈希使用线性二次幂算法，二常规哈希使用哈希函数值的模数。在语法上，线性哈希分区唯一区别于常规哈希的地方是在 `partition by` 子句中添加了 `linear` 关键字。

```sql
create table employees (
    id int not null,
    fname varchar(30),
    lname varchar(30),
    hired date not null default '1970-01-01',
    separated date not null default '9999-12-31',
    job_code int,
    store_id int
)
partition by linear hash( year(hired) )
partitions 4;
```

#### MySQL 键分区 {#mysql-partition-by-key}

键分区将表中的数据按照特定的键值进行分区。在键分区中，每个分区都包含相同键值的数据，不同键值的数据则存储在不同的分区中。

键分区和哈希分区很像，但有区别：
- 键分区支持除 text 和 blob 类型之外的所有数据类型的列，而哈希分区只支持数字类型的列；
- 键分区不允许使用用户自定义的表达式进行分区，而是使用系统提供的哈希函数进行分区。

当表中存在主键或唯一键时，如果创建键分区时没有指定列，则系统默认会选择主键列作为分区列；如果不存在主键列，则会选择**非空**的唯一键列作为分区列。

::: tip 提示
唯一列作为分区列时，唯一列不能为 `null`。
:::

```sql
create table tb_key (
    id int,
    var char(32)
)
partition by key(var)
partitions 10;
```

#### MySQL 子分区 {#mysql-subpartition}

子分区也称复合分区，是对分区表中的每个分区的进一步划分，分为：
- 范围-哈希复合分区。
- 范围-键复合分区。
- 列表-哈希复合分区。
- 列表-键复合分区。

**范围-哈希（range-hash）复合分区**

```sql
create table emp(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date not null,
    salary int
)
partition by range(salary)
subpartition by hash(year(birthdate))
subpartitions 3(
    partition p1 values less than (2000),
    partition p2 values less than maxvalue
);
```

在上面这个例子中，先按 `salary` 列的薪资范围将表进行分区，并对 `birthdate` 列采用 `year` 进行哈希分区，子分区数为3。在此分区方案中，将数据分成了两个范围分区 p1 和 p2，每个范围分区又分为3个子分区，其中 p1 分区存储 salary 小于 2000 的数据，p2 分区存储所有大于或等于 2000 的数据。

**范围-键（range-key）复合分区**

```sql
create table emp(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date not null,
    salary int
)
partition by range(salary)
subpartition by key(birthdate)
subpartitions 3
(
    partition p1 values less than (2000),
    partition p2 values less than maxvalue
);
```

**列表-哈希（list-hash）复合分区**

```sql
create table emp(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date not null,
    salary int
)
partition by list (deptno)
subpartition by hash(year(birthdate))
subpartitions 3
(
    partition p1 values in (10),
    partition p2 values in (20),
);
```

**列表-键（list-key）复合分区**

```sql
create table emp(
    empno varchar(20) not null,
    empname varchar(20),
    deptno int,
    birthdate date not null,
    salary int
)
partition by list (deptno)
subpartition by key(birthdate)
subpartitions 3
(
    partition p1 values in (10),
    partition p2 values in (20)
);
```

#### MySQL 分区对 `null` 的处理 {#mysql-partition-handling-null}

MySQL 中的分区不会禁止 `null` 作为分区表达式的值，无论列值还是用户提供的表达式的值，都允许 `null` 用作必须产生整数的表达式的值。MySQL 中的分区将 `null` 视为小于任何非 `null` 值。

**范围分区中如何处理 `null`**

要将一行数据插入分区中，如果用于确定范围分区的列值为 `null`，那么该行将插入最低分区中。

**列表分区中如何处理 `null`**

当且仅当定义的分区中存在分区其 `values in` 后跟的值列表中存在 `null` 值时，才允许 `null` 值插入该分区。

```sql
create table ts2 (
    c1 int,
    c2 varchar(20)
)
partition by list(c1) (
    partition p0 values in (0, 3, 6),
    partition p1 values in (1, 4, 7),
    partition p2 values in (2, 5, 8),
    partition p3 values in (null)
);
```

**哈希分区和健分区中如何处理 `null`**

在哈希分区和键分区的表中，任何产生 `null` 值的分区表达式的返回值都为 0。

#### 范围分区和列表分区的管理 {#mysql-partition-management-range-list}

**删除分区**

```sql
# 删除分区
alter table table_name drop partition partition_name;
```

**添加分区（范围分区）**

```sql
CREATE TABLE employees (
  id INT NOT NULL,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  hired DATE NOT NULL
)
PARTITION BY RANGE( YEAR(hired) ) (
  PARTITION p1 VALUES LESS THAN (1991),
  PARTITION p2 VALUES LESS THAN (1996),
  PARTITION p3 VALUES LESS THAN (2001),
  PARTITION p4 VALUES LESS THAN (2005)
);

# 如果要新增的分区的范围值大于之前已有的分区范围值，可以直接添加：
ALTER TABLE employees ADD PARTITION (
    PARTITION p5 VALUES LESS THAN (2010),
    PARTITION p6 VALUES LESS THAN MAXVALUE
);

# 否则需要像下面这样处理：
ALTER TABLE employees
    REORGANIZE PARTITION p1 INTO (
        PARTITION n0 VALUES LESS THAN (1970),
        PARTITION n1 VALUES LESS THAN (1991)
);

# 如果要对上面的操作反向处理：
ALTER TABLE employees REORGANIZE PARTITION n0,n1 INTO (
    PARTITION p1 VALUES LESS THAN (1991)
);
```

**添加分区（列表分区）**

```sql
CREATE TABLE tt (
    id INT,
    data INT
)
PARTITION BY LIST(data) (
    PARTITION p0 VALUES IN (5, 10, 15),
    PARTITION p1 VALUES IN (6, 12, 18)
);

# 如果新增的分区的范围值大于之前已有分区的范围值，可以直接添加：
ALTER TABLE tt ADD PARTITION (
    PARTITION p2 VALUES IN (7, 14, 21)
);
```

**拆分、合并分区**

在保证数据不丢失的情况下，可以拆分、合并分区：

```sql
create table members (
    id int(11) default null,
    fname varchar(25) default null,
    lname varchar(25) default null,
    dob date default null
) engine=InnoDB default charset=latin1
partition by range (year(dob))
(
    partition n0 values less than (1970) engine = InnoDB,
    partition n1 values less than (1980) engine = InnoDB,
    partition p1 values less than (1990) engine = InnoDB,
    partition p2 values less than (2000) engine = InnoDB,
    partition p3 values less than (2010) engine = InnoDB
);

# 把 n0 分区拆分成2个分区：s0、s1
alter table members reorganize partition n0 into (
    partition s0 values less than (1960),
    partition s1 values less than (1970)
);

# 把 s0、s1 分区合并成一个分区
alter table members reorganize s0, s1 into (
    partition p0 values less than (1970)
);
```

* `dob` 是出生日期（date of birth）的缩写。

#### 哈希分区和键分区的管理 {#mysql-partition-management-hash-key}

**哈希分区**

```sql
# 创建一张具有10个哈希分区的数据表
create table clients (
    id int,
    fname varchar(30),
    lname varchar(30),
    signed date
)
partition by hash( month(signed) )
partitions 10;

# 把分区数量从 10 个变成 6 个 （即，合并掉 4 个分区）
alter table clients coalesce partition 4;
```

::: tip `coalesce partition`
需要注意，`coalesce partition` 后面的数字表示要删除的分区数。
:::

**键分区**

```sql
# 创建一张具有 10 个键分区的表
create table clients (
    id int,
    fname varchar(30),
    lname varchar(30),
    signed date
)
partition by linear key(signed)
partitions 10;

# 把键分区数量从 10 个变成 6 个
alter table clients coalesce partition 4;
```

#### 分区管理和维护操作 {#mysql-management-partition}

**删除分区（仅限于范围分区和列表分区，会丢失数据）**

```sql
# 一次性删除一个分区
alter table emp drop partition p1;

# 一次性删除多个分区
alter table emp drop partition p1,p2;
```

**增加分区**

```sql
# 增加范围分区
alter table emp add partition (partition p3 values less than (5000));

# 增加列表分区
alter table emp add partition (partition p3 values in (5000));
```

**分解分区（不会丢失数据）**

`reorganize partition` 关键字可以对表的部分分区或全部分区进行修改，并且不会丢失数据。分解前后分区的整体范围应该一致。

```sql
alter table t
reorganize partition p1 into
(
    partition p1 values less than (1000),
    partition p3 values less than (2000)
);
```

**合并分区（不会丢失数据）**

随着分区数量的增多，有时需要把多个分区合并成一个分区，可以使用 `into` 指令实现。

```sql
alter table t
reorganize partition p1,p3 into
(partition p1 values less than (10000));
```

**重新定义哈希分区（不会丢失数据）**

想要对哈希分区进行扩容或缩容，可以对现有的哈希分区进行重新定义。

```sql
alter table t partition by hash(salary) partitions 8;
```

**重新定义范围分区（不会丢失数据）**

想要对范围分区进行扩容或缩容，可以对现有范围分区进行重新定义。

```sql
alter table t partition by range(salary)
(
    partition p1 values less than (20000),
    partition p2 values less than (30000)
);
```

**删除表的所有分区（不会丢失数据）**

如果要删除表的所有分区，但又不想删除数据，可以执行如下语句：

```sql
# 注意是 `partitioning`，不是 `partition`
alter table emp remove partitioning;
```

**重建分区**

这和先删除保存在分区中的所有记录，然后重新插入它们具有同样的效果，可用于**整理分区碎片**。

```sql
alter table emp rebuild partition p1,p2;
```

**优化分区**

如果从分区中删除了大量的行，或者对一个带有可变长度的行做了许多修改，那么可以使用 `alter table ... optimize partition` 来收回没有使用的空间，并整理分区数据文件的碎片。

```sql
alter table t optimize partition p1,p2;
```

**分析分区**

想要对现有的分区进行分析，可以执行如下语句：

```sql
-- 读取并保存分区的键分布
alter table t analyze partition p1,p2;
```

**修补分区**

```sql
-- 修补被破坏的分区
alter table t repairpartition p1,p2;
```

**检查分区**

想要查看现有的分区是否被破坏，可以执行如下语句：

```sql
-- 检查表指定的分区
alter table t check partition p1,p2;
```

这条语句可以告诉我们表 `t` 的分区 `p1`、`p2` 中的数据或索引个是否已经被破坏了。如果分区被破坏了，那么可以使用 `alter table ... repairpartition` 来修补该分区。

#### 分区的限制 {#mysql-partition-limit}

在业务中可以对分区进行一些限制：

- 分区键必须包含在表的主键、唯一键中。
- MySQL 只能在使用分区函数的列进行比较时才能筛选分区，而不能根据表达式的值去筛选分区，即使这个表达式就是分区函数也不行。
- 不使用NDB存储引擎的数据表的最大分区数为8192。
- InnoDB存储引擎的分区不支持外键。
- 服务器 SQL 模式（可以通过 SQL-MODE 参数进行配置）影响分区表的同步复制。主节点和从节点上不同的SQL模式可能会导致相同的数据存储在主从节点的不同分区中，甚至可能导致数据插入主节点成功，而插入从节点失败。为了获得最佳效果，应该始终在主机和从机上使用相同的服务器SQL模式，强烈建议不要在创建分区后更改服务器SQL模式。
- 分区不支持全文索引，即使是使用 InnoDB 或 MyISAM 存储引擎的分区也不例外。
- 分区无法使用外键约束。
- 临时表不能进行分区。

#### 分区键和主键、唯一键的关系 {#mysql-relationship-partition}

控制分区键与主键、唯一键关系的规则是：分区表达式中使用的所有列必须是该数据表可能具有的每个唯一键的一部分。换句话说，分区键必须包含在表的主键、唯一键中。

##### 错误示例 {#mysql-wrong-examples-relationship-partition}

**唯一键是 `col1` 和 `col2` 的组合，分区键是 `col3`**

```sql
create table t1 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    unique key (col1, col2)
)
partition by hash(col3)
partitions 4;

-- 报错如下：
ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function (prefixed columns are not considered).
```

**两个唯一键分别是 `col1` 和 `col3`，分区键是 `col1 + col3`**


```sql
create table t2 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    unique key (col1),
    unique key (col3)
)
partition by hash(col1 + col3)
partitions 4;

-- 报错如下：
ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function (prefixed columns are not considered).
```

**两个唯一键分别是 `(col1, col2)` 和 `col3`，分区键是 `col1 + col3`**

```sql
create table t3 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    unique key (col1, col2),
    unique key (col3)
)
partition by hash(col1 + col3)
partitions 4;

-- 报错如下：
ERROR 1491 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function.
```

**主键是 `col1` 和 `col2`，分区键是 `col3`**

```sql
create table t4 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    primary key(col1, col2)
)
partition by hash(col3)
partitions 4;

-- 报错如下：
ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function (prefixed columns are not considered).
```

**主键是 `col1` 和 `col3`，唯一键为 `col2`，分区键为 `year(col2)`**

```sql
create table t5 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    primary key(col1, col3),
    unique key(col2)
)
partition by hash( year(col2) )
partitions 4;

-- 报错如下：
ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function (prefixed columns are not considered).
```

##### 正确示例 {#mysql-correct-examples-partition-key-relationship}

```sql
create table t1 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    unique key (col1, col2, col3)
)
partition by hash(col3)
partitions 4;
```

```sql
create table t2 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    unique key (col1, col3)
)
partition by hash(col1 + col3)
partitions 4;
```

```sql
create table t3 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    unique key (col1, col2, col3),
    unique key (col3)
)
partition by hash(col3)
partitions 4;
```

**以下两种情况，主键都不包括分区表达式中引用的所有列，但语句都是有效的**

```sql
create table t4 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    primary key(col1, col2)
)
partition by hash(col1 + year(col2))
partitions 4;
```

```sql
create table t5 (
    col1 int not null,
    col2 date not null,
    col3 int not null,
    col4 int not null,
    primary key (col1, col2, col4),
    unique key (col2, col1)
)
partition by hash(col1 + year(col2))
partitions 4;
```

### MySQL 视图、存储过程 {#mysql-view-procedure}

### MySQL 数据查询优化 {#mysql-query-optimization}

### MySQL 数据运维和读写分离架构 {#mysql-maintenance}

### 函数速查表 {#mysql-function-reference}
