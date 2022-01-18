#!/bin/bash

DISABLE_VERSION=1 \
WECHATY_LOG=verbose \
TZ='Asia/Shanghai' \
WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true \
WECHATY_PUPPET=wechaty-puppet-service \
WECHATY_PUPPET_SERVICE_TOKEN=xxxxxxxxxx \
WEB_PORT=10000 \
node src/index.js
