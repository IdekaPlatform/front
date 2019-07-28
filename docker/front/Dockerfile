FROM node:alpine

WORKDIR /srv/app

COPY docker-entrypoint.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh && chown root:root /entrypoint.sh && \
    apk add python make g++

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]