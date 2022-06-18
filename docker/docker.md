# docker基本使用学习

### 1. docker三大概念

### 2. docker主要特点

### 3. 基本指令

1. `run`  创建容器并执行一个命令

   ```
   -i 以交互的形式运行容器，常与-t同时使用
   
   -t 给容器分配一个为终端
   
   -d 后台运行容器，并返回容器id
   
   --name 给容器制定名字（与git中tag打标形式类似）
   
   -e 环境变量
   
   -p 端口映射 主机端口:容器端口
   
   -v 在容器中暴露宿主机相应的文件夹
   
   e.g.
   docker run --name mysql1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=kwok95 -d brandonkwok/mysql:1.0
   ```

2. `start / stop/ restart`   启动/停止/重启容器

3. `exec`  容器中执行命令

   ```
   -d 后台运行
   
   -it 分配终端并
   ```

4. `login / pull / push / commit`  登陆/拉取/推送/打标签

5. `rm / rmi` rm删除容器 / rmi删除镜像

6. `logs -f`  可以持续输出日志

7. `inspect / version / info` 查看容器硬件 / 版本号 / docker进程

   Tm0/FuT6ip7dhtIPPPIOxXGbYUCk8uSNDF5LkzkNjjg=



https://www.cnblogs.com/chinasoft/articles/12970035.html

```
i. gitlab 配置表
# SMTP configuartion
gitlab_rails['smtp_enable'] = true

gitlab_rails['smtp_address'] = "smtp.qq.com"

gitlab_rails['smtp_port'] = 25

gitlab_rails['smtp_user_name'] = "397270206@qq.com"

gitlab_rails['smtp_password'] = "jwmuxcfpdhyzbhfj"

gitlab_rails['smtp_domain'] = "qq.com"

gitlab_rails['smtp_authentication'] = :login

gitlab_rails['smtp_enable_starttls_auto'] = true

gitlab_rails['gitlab_email_from'] = "397270206@qq.com"

user["git_user_email"] = "397270206@qq.com"

# ssh configuration
external_url 'http://124.222.34.59'

gitlab_rails['gitlab_shell_ssh_port'] = 222

gitlab_rails['gitlab_ssh_host'] = '124.222.34.59'

ii. smtp根据参考获取

iii. 管理员账号可以通过
```

