#!/bin/bash

echo '导入数据结构'
mysql -uroot < /mysql/privileges.sql
echo '修改权限'
mysql -uroot < /mysql/schema.sql


