FROM node:alpine

RUN apk update && apk add git

COPY entrypoint.sh /entrypoint.sh
COPY common.sh /common.sh

RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]