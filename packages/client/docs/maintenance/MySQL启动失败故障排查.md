# MySQL启动失败故障排查

## 1、查看mysql配置文件

```bash
vi /etc/my.cnf
```

得到类似如下的内容：

```
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
innodb_buffer_pool_size = 512M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
join_buffer_size = 512M
sort_buffer_size = 16M
read_rnd_buffer_size = 16M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

在文件底部可看到`log-error=/var/log/mysqld.log`，说明可通过`/var/log/mysqld.log`文件查看mysql错误日志。


## 查看mysql错误日志

```bash
vi /var/log/mysqld.log
```

将日志文件拉到底部查看最新日志，得到如下内容：

```
2018-05-31T09:21:12.658310Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2018-05-31T09:21:12.662935Z 0 [Note] /usr/sbin/mysqld (mysqld 5.7.20) starting as process 7606 ...
2018-05-31T09:21:12.670651Z 0 [Note] InnoDB: PUNCH HOLE support available
2018-05-31T09:21:12.670730Z 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2018-05-31T09:21:12.670744Z 0 [Note] InnoDB: Uses event mutexes
2018-05-31T09:21:12.670797Z 0 [Note] InnoDB: GCC builtin __atomic_thread_fence() is used for memory barrier
2018-05-31T09:21:12.670820Z 0 [Note] InnoDB: Compressed tables use zlib 1.2.3
2018-05-31T09:21:12.670834Z 0 [Note] InnoDB: Using Linux native AIO
2018-05-31T09:21:12.671543Z 0 [Note] InnoDB: Number of pools: 1
2018-05-31T09:21:12.671846Z 0 [Note] InnoDB: Using CPU crc32 instructions
2018-05-31T09:21:12.675677Z 0 [Note] InnoDB: Initializing buffer pool, total size = 512M, instances = 1, chunk size = 128M
2018-05-31T09:21:12.675802Z 0 [ERROR] InnoDB: mmap(137428992 bytes) failed; errno 12
2018-05-31T09:21:12.675827Z 0 [ERROR] InnoDB: Cannot allocate memory for the buffer pool
2018-05-31T09:21:12.675847Z 0 [ERROR] InnoDB: Plugin initialization aborted with error Generic error
2018-05-31T09:21:12.675871Z 0 [ERROR] Plugin 'InnoDB' init function returned error.
2018-05-31T09:21:12.675883Z 0 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2018-05-31T09:21:12.675900Z 0 [ERROR] Failed to initialize plugins.
2018-05-31T09:21:12.675911Z 0 [ERROR] Aborting

2018-05-31T09:21:12.675976Z 0 [Note] Binlog end
2018-05-31T09:21:12.676874Z 0 [Note] Shutting down plugin 'CSV'
2018-05-31T09:21:12.677837Z 0 [Note] /usr/sbin/mysqld: Shutdown complete
```

发现：
```
2018-05-31T09:21:12.675677Z 0 [Note] InnoDB: Initializing buffer pool, total size = 512M, instances = 1, chunk size = 128M
2018-05-31T09:21:12.675802Z 0 [ERROR] InnoDB: mmap(137428992 bytes) failed; errno 12
2018-05-31T09:21:12.675827Z 0 [ERROR] InnoDB: Cannot allocate memory for the buffer pool
```

应该是内存不够启动mysql服务了。

注意：报错信息里所需内存大小为：137428992 bytes = 137428992 / 1024 / 1024 M = 131.0625 M


## 查询内存情况

```bash
# 以M为单位显示内存情况
free -m
```

得到：

```
# free -m
              total        used        free      shared  buff/cache   available
Mem:           1946        1829          16           4         100          70
Swap:          1023        1001          22
```

发现此时服务器相关内存情况为：

- free: 16 M
- buff/cache: 100 M
- available: 70 M

这几个数据量都很可怜了。所以我们可以增大可用内存，停掉一些不用的服务，或者减少mysql所需内存。


## 修改mysql配置文件

```bash
vi /etc/my.cnf
```

然后：

- 将`innodb_buffer_pool_size = 512M`修改为`innodb_buffer_pool_size = 64M`
- 将`join_buffer_size = 512M`改为`join_buffer_size = 64M`


## 重启mysql服务

```bash
service mysqld restart
```


## 验证mysql服务是否正常

打开网站，发现数据展示正常

完毕