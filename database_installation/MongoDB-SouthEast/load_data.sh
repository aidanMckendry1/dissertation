#!/bin/bash

systemctl start mongod

systemctl status mongod

mongoimport --type=csv --headerline --file=TmpRecordsSouthEast.csv

systemctl stop mongod
