FROM node:10

LABEL maintainer=a397270206@gmail.com

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

COPY src ./src

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000

CMD ["node", "src/app.js"]