#!/bin/bash

systemctl start mongod

tail -F /../var/log/mongodb/mongod.log
