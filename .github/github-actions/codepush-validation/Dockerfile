FROM node:alpine

RUN apk update && apk add git

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]