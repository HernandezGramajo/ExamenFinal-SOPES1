#!/bin/bash
docker login
docker build -t pagina-we-login .
docker tag pagina-we-login $1/pagina-we-login
docker push $1/pagina-we-login