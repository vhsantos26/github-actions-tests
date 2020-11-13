#!/bin/bash

set -o errexit
set -o nounset

. /scripts/logger.sh

INFO "Disconnect OpenVPN"

sudo pkill openvpn