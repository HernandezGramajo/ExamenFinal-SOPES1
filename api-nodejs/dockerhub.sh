#!/bin/bash
docker login
docker build -t api-node .
docker tag api-node $1/api-node
docker push $1/api-node