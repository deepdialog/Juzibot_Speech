#!/bin/bash

docker stop juzibot_0_2 || true
docker rm juzibot_0_2 || true
docker run -d \
    --name=juzibot_0_2 \
    -e WEB_PORT=10010 \
    -e TZ=Asia/Shanghai \
    -e WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT=true \
    -e WECHATY_LOG=verbose \
    -e WECHATY_PUPPET=wechaty-puppet-service \
    -e WECHATY_PUPPET_SERVICE_TOKEN=xxxxxxxxxx \
    --network=host \
    --restart=always \
    qhduan/juzibot:0.2

