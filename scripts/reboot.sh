#!/bin/bash

set -e
cd /opt/JuziBot-assist
git reset --hard
git pull origin master
./scripts/build.sh
./scripts/update.sh
(cd fronts && yarn build)
