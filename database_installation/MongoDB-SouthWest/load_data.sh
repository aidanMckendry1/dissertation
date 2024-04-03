#!/bin/bash

systemctl start mongod

systemctl status mongod

mongoimport --type=csv --headerline --file=TmpRecordsSouthWest.csv

systemctl stop mongod
