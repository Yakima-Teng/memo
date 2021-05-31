(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{399:function(e,s,a){"use strict";a.r(s);var t=a(44),n=Object(t.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"mysql启动失败故障排查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql启动失败故障排查"}},[e._v("#")]),e._v(" MySQL启动失败故障排查")]),e._v(" "),a("h2",{attrs:{id:"_1、查看mysql配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、查看mysql配置文件"}},[e._v("#")]),e._v(" 1、查看mysql配置文件")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("vi")]),e._v(" /etc/my.cnf\n")])])]),a("p",[e._v("得到类似如下的内容：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# For advice on how to change settings please see\n# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html\n\n[mysqld]\n#\n# Remove leading # and set to the amount of RAM for the most important data\n# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.\ninnodb_buffer_pool_size = 512M\n#\n# Remove leading # to turn on a very important data integrity option: logging\n# changes to the binary log between backups.\n# log_bin\n#\n# Remove leading # to set options mainly useful for reporting servers.\n# The server defaults are faster for transactions and fast SELECTs.\n# Adjust sizes as needed, experiment to find the optimal values.\njoin_buffer_size = 512M\nsort_buffer_size = 16M\nread_rnd_buffer_size = 16M\ndatadir=/var/lib/mysql\nsocket=/var/lib/mysql/mysql.sock\n\n# Disabling symbolic-links is recommended to prevent assorted security risks\nsymbolic-links=0\n\nlog-error=/var/log/mysqld.log\npid-file=/var/run/mysqld/mysqld.pid\n")])])]),a("p",[e._v("在文件底部可看到"),a("code",[e._v("log-error=/var/log/mysqld.log")]),e._v("，说明可通过"),a("code",[e._v("/var/log/mysqld.log")]),e._v("文件查看mysql错误日志。")]),e._v(" "),a("h2",{attrs:{id:"查看mysql错误日志"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看mysql错误日志"}},[e._v("#")]),e._v(" 查看mysql错误日志")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("vi")]),e._v(" /var/log/mysqld.log\n")])])]),a("p",[e._v("将日志文件拉到底部查看最新日志，得到如下内容：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("2018-05-31T09:21:12.658310Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).\n2018-05-31T09:21:12.662935Z 0 [Note] /usr/sbin/mysqld (mysqld 5.7.20) starting as process 7606 ...\n2018-05-31T09:21:12.670651Z 0 [Note] InnoDB: PUNCH HOLE support available\n2018-05-31T09:21:12.670730Z 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins\n2018-05-31T09:21:12.670744Z 0 [Note] InnoDB: Uses event mutexes\n2018-05-31T09:21:12.670797Z 0 [Note] InnoDB: GCC builtin __atomic_thread_fence() is used for memory barrier\n2018-05-31T09:21:12.670820Z 0 [Note] InnoDB: Compressed tables use zlib 1.2.3\n2018-05-31T09:21:12.670834Z 0 [Note] InnoDB: Using Linux native AIO\n2018-05-31T09:21:12.671543Z 0 [Note] InnoDB: Number of pools: 1\n2018-05-31T09:21:12.671846Z 0 [Note] InnoDB: Using CPU crc32 instructions\n2018-05-31T09:21:12.675677Z 0 [Note] InnoDB: Initializing buffer pool, total size = 512M, instances = 1, chunk size = 128M\n2018-05-31T09:21:12.675802Z 0 [ERROR] InnoDB: mmap(137428992 bytes) failed; errno 12\n2018-05-31T09:21:12.675827Z 0 [ERROR] InnoDB: Cannot allocate memory for the buffer pool\n2018-05-31T09:21:12.675847Z 0 [ERROR] InnoDB: Plugin initialization aborted with error Generic error\n2018-05-31T09:21:12.675871Z 0 [ERROR] Plugin 'InnoDB' init function returned error.\n2018-05-31T09:21:12.675883Z 0 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.\n2018-05-31T09:21:12.675900Z 0 [ERROR] Failed to initialize plugins.\n2018-05-31T09:21:12.675911Z 0 [ERROR] Aborting\n\n2018-05-31T09:21:12.675976Z 0 [Note] Binlog end\n2018-05-31T09:21:12.676874Z 0 [Note] Shutting down plugin 'CSV'\n2018-05-31T09:21:12.677837Z 0 [Note] /usr/sbin/mysqld: Shutdown complete\n")])])]),a("p",[e._v("发现：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("2018-05-31T09:21:12.675677Z 0 [Note] InnoDB: Initializing buffer pool, total size = 512M, instances = 1, chunk size = 128M\n2018-05-31T09:21:12.675802Z 0 [ERROR] InnoDB: mmap(137428992 bytes) failed; errno 12\n2018-05-31T09:21:12.675827Z 0 [ERROR] InnoDB: Cannot allocate memory for the buffer pool\n")])])]),a("p",[e._v("应该是内存不够启动mysql服务了。")]),e._v(" "),a("p",[e._v("注意：报错信息里所需内存大小为：137428992 bytes = 137428992 / 1024 / 1024 M = 131.0625 M")]),e._v(" "),a("h2",{attrs:{id:"查询内存情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询内存情况"}},[e._v("#")]),e._v(" 查询内存情况")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 以M为单位显示内存情况")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("free")]),e._v(" -m\n")])])]),a("p",[e._v("得到：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# free -m\n              total        used        free      shared  buff/cache   available\nMem:           1946        1829          16           4         100          70\nSwap:          1023        1001          22\n")])])]),a("p",[e._v("发现此时服务器相关内存情况为：")]),e._v(" "),a("ul",[a("li",[e._v("free: 16 M")]),e._v(" "),a("li",[e._v("buff/cache: 100 M")]),e._v(" "),a("li",[e._v("available: 70 M")])]),e._v(" "),a("p",[e._v("这几个数据量都很可怜了。所以我们可以增大可用内存，停掉一些不用的服务，或者减少mysql所需内存。")]),e._v(" "),a("h2",{attrs:{id:"修改mysql配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改mysql配置文件"}},[e._v("#")]),e._v(" 修改mysql配置文件")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("vi")]),e._v(" /etc/my.cnf\n")])])]),a("p",[e._v("然后：")]),e._v(" "),a("ul",[a("li",[e._v("将"),a("code",[e._v("innodb_buffer_pool_size = 512M")]),e._v("修改为"),a("code",[e._v("innodb_buffer_pool_size = 64M")])]),e._v(" "),a("li",[e._v("将"),a("code",[e._v("join_buffer_size = 512M")]),e._v("改为"),a("code",[e._v("join_buffer_size = 64M")])])]),e._v(" "),a("h2",{attrs:{id:"重启mysql服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重启mysql服务"}},[e._v("#")]),e._v(" 重启mysql服务")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" mysqld restart\n")])])]),a("h2",{attrs:{id:"验证mysql服务是否正常"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#验证mysql服务是否正常"}},[e._v("#")]),e._v(" 验证mysql服务是否正常")]),e._v(" "),a("p",[e._v("打开网站，发现数据展示正常")]),e._v(" "),a("p",[e._v("完毕")])])}),[],!1,null,null,null);s.default=n.exports}}]);