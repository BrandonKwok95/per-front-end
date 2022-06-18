FROM mysql/mysql-server

LABEL maintainer=a397270206@gmail.com

WORKDIR /mysql

#ENV MYSQL_ROOT_PASSWORD kwok95
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

COPY setup.sh /mysql/setup.sh
COPY schema.sql /tmp/schema.sql
COPY privileges.sql /tmp/privileges.sql

RUN mv /tmp/*.sql /docker-entrypoint-initdb.d

EXPOSE 3306



#CMD ["mysql", '<', '/mysql/privileges.sql']
#CMD ["mysql", '<', '/mysql/schema.sql']
