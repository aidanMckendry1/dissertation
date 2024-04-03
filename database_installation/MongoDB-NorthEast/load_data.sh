#!/bin/bash

systemctl start mongod

systemctl status mongod

mongoimport --type=csv --headerline --file=TmpRecordsNorthEast.csv

systemctl stop mongod
