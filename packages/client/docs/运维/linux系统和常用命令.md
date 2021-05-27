# linux系统和常用命令

虽然也有一些服务器是使用windows系统的，但大部分服务器都是使用linux系统发行版的。要想具备一些简单的服务器运维能力，需要对linux有一些基本的了解，知道一些常用的linux系统命令。

Linux系统有众多发行版，包括Debian（及其衍生版本Ubuntu、Linux Mint）、Fedora（及其相关版本Red Hat Enterprise Linux、CentOS）和openSUSE等，它们的使用方式有很多相似之处。限于篇幅限制，本文以CentOS 7.0系统为例进行撰写。


## 获取linux环境

如果你有一台mac苹果笔记本，那么恭喜你，macOS也是基于linux的一个发行版，笔记本自带的终端里就直接可以使用常用的linux命令了。

如果你使用的是window10操作系统，那么也恭喜你，在window10自带的应用商店里，是可以直接安装子系统的，在应用商店里搜一下centos，接下来按提示操作安装Centos子系统了。

如果你有一台装有linux发行版的服务器（或虚拟VPS），在你的个人电脑上通过SSH协议登录服务器后就可以方便的使用linux命令了。


## 常用linux命令

说明，很多命令是有很多选项的，具体的还是需要的时候去查文档比价好，如果你不是专职运维，没有必要去记太详细的东西，等你经常和这些命令打交道的时候，自然而然会记住的。


### 1、系统

- `top`：查看CPU占用

- `free [options]`：查看内存占用，e.g. `free -m`=>以M为单位显示内存情况

- `df [options] [file]`：显示指定文件的磁盘占用情况，若不指定`file`，默认显示当前被挂载的文件系统的磁盘占用情况

- `du [options] [file|path]`：用于显示目录或文件的大小，e.g. `du -h [file|path]`=>以方便阅读的格式显示指定`file|path`的大小

### 2、文件操作

- `cd <path>`：切换到指定`<path>`下

- `clear`：清屏（指的是命令行工具里看到的屏）

- `cat <fileName>`：一次性显示文件所有内容

- `find [pathname] [expression]`：搜索匹配指定条件的文件，e.g. `find *.html`查到html文件

- `rm <fileName>`：删除`<fileName>`文件

- `rm -rf <path>`：删除`<path>`路径下的所有文件, `-r`表示遍历（recursive），`-f`表示强制（force）

- `cp [options] <source> <dest>`：复制文件或目录，e.g. `cp -r ../source ../dest`=>将`../source`目录下的所有文件复制到`../dest`目录下

- `mkdir <path>`：表示创建一个叫`<path>`的路径/文件夹

- `chmod [options] <mode> <filename>`：修改文件读写权限，e.g. `chmod -R 764 path`：对`path`路径下的所有文件设置如下权限=>自己可以读写执行、同组组员可以读写、其他人可以读

- `chown [options] <mode> <filename>`：修改文件所属用户组，e.g. `chown -R user path`：更改`path`路径下的所有文件的所有者为user


### 3、服务管理

- `service <serviceName> start`：启动`<serviceName>`服务，e.g. `service mysqld start`=>启动mysql服务

- `service <serviceName> restart`：重启`<serviceName>`服务，e.g. `service mysqld restart`=>重启mysql服务

- `service <serviceName> stop`：停止`<serviceName>`服务，e.g. `service mysqld stop`=>停止mysql服务

- `lsof -i:<port>`：显示占用指定`<port>`端口号的进程PID，e.g. `lsof -i:3000`=>显示占用3000端口的进程（PID）

- `kill -9 <PID>`：杀掉PID对应的进程
