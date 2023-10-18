#!/bin/bash

set -ex

if [ "$#" -ne 1 ]; then
  echo "Usage: build <stage>"
  exit 2
fi

if [ -e artifacts ]; then
  rm -rf artifacts
fi

stages=( 'dev' 'test' 'saip', 'prod' )

STAGE=${1:-test}
BUILDER_IMAGE=fe-builder
APP=efs-monitoring-fe
CONTAINER_NAME=efs_monitoring_fe

cp env/env.$STAGE .env
docker build -f $PWD/build/Dockerfile.builder -t $BUILDER_IMAGE:$STAGE .

mkdir artifacts
docker run -i --rm -iv${PWD}/artifacts:/artifacts -u $(id -u):$(id -g) $BUILDER_IMAGE:$STAGE sh -s <<EOF
cp -r /app/dist/spa/* /artifacts
EOF

docker build -f $PWD/build/Dockerfile.nginx -t $APP:$STAGE .

rm -rf artifacts

docker rmi $BUILDER_IMAGE:$STAGE

docker stop $CONTAINER_NAME
docker container rm $CONTAINER_NAME

docker run -d -p 8280:80 --name $CONTAINER_NAME $APP:$STAGE

