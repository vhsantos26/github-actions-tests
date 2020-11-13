FROM ubuntu:latest

COPY . .

RUN apt-get update \
	&& apt-get install -y sudo \
	&& sudo apt-get install -y --no-install-recommends openvpn

ENTRYPOINT ["/entrypoint.sh"]