#!/bin/bash

systemctl start mongod

systemctl status mongod

mongoimport --type=csv --headerline --file=TmpRecordsMidWest.csv

systemctl stop mongod
