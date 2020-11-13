#!/bin/bash

set -o errexit
set -o nounset

. /scripts/logger.sh

INFO "Connect OpenVPN"

if [ -z "$CA_CRT" ] || [ -z "$TLS_KEY" ] || [ -z "$USER_CRT" ] || [ -z "$USER_KEY" ]; then
  ERROR "Missing one of the following environment variables to start the OpenVPN:
  - CA_CRT is missing.
  - TLS_KEY is missing.
  - USER_CRT is missing.
  - USER_KEY is missing."
  exit 1
else 
  INFO "All environment variables are setted correctly."
fi

echo "$CA_CRT" | base64 -d >> "ca.crt" && sudo chmod 600 "ca.crt"
echo "$TLS_KEY" | base64 -d >> "tls.key" && sudo chmod 600 "tls.key"
echo "$USER_CRT" | base64 -d >> "user.crt" && sudo chmod 600 "user.crt"
echo "$USER_KEY" | base64 -d >> "user.key" && sudo chmod 600 "user.key"

OPENSSL_ENABLE_MD5_VERIFY=1 sudo openvpn --config ./aj.ovpn 

WAIT_FOR_SUCCESS=true
FORCE_EXIT=0

while [ "$WAIT_FOR_SUCCESS" = "true" ]; do
  
  INFO "Trying to connect on the 172.24.2.99."

  ping -c3 172.24.2.99 > /dev/null

  if [ "$(echo $?)" -eq "0" ]; then
    WAIT_FOR_SUCCESS=false
    INFO "Connection successfully."
  else 
    FORCE_EXIT=$((FORCE_EXIT + 1))
  fi

  if [ "$FORCE_EXIT" -eq "5" ]; then
    ERROR "Exceded the limit of tries"
    exit 1
  fi

  sleep "5"

done
