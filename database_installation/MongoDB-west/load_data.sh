#!/bin/bash

systemctl start mongod

systemctl status mongod

mongoimport --type=csv --headerline --file=TmpRecordsWest.csv

systemctl stop mongod
