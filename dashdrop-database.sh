#!/bin/bash

#password = 1234

export $(cat .env)

sudo apt install postgresql-client-common
sudo apt install postgresql-client-14

docker ps | awk 'NR > 1 {print $1}' | xargs docker kill

docker rm -f postgres

docker run --name postgres -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres

docker ps

sleep 3

psql -h 127.0.0.1 -U postgres -f database.sql

