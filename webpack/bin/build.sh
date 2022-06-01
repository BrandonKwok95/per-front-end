#!/bin/sh
echo "webpack development执行文件夹: $1"
WORK_FILE="./src"
cd "$WORK_FILE" && cd "$1" || exit
pwd
npx webpack
