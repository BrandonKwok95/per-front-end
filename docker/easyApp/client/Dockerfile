
# node容器打包应用
FROM node:12-alpine as builder

WORKDIR /client

ADD package.json package-lock.json /client/

RUN npm install

ADD public /client/public

ADD src /client/src

RUN npm run build

EXPOSE 3000


# nginx 静态资源服务部署
FROM nginx:stable-alpine

ADD nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder client/build /usr/share/nginx/html