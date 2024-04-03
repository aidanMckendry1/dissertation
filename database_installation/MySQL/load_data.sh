service mysql start

rootpsw='1q2w3e4r'
usertest='mydb'
passtest='#1A2b%3C4d5E!'
tabletest='mytab'

mysql -uroot -p$rootpsw <<MYSQL_SCRIPT
CREATE DATABASE $usertest;
CREATE USER'$usertest'@'localhost'IDENTIFIED BY'$passtest';
CREATE USER'$usertest'@'%'IDENTIFIED BY'$passtest';
GRANT ALL PRIVILEGES ON *.* TO'$usertest'@'localhost'WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO'$usertest'@'%'WITH GRANT OPTION;
FLUSH PRIVILEGES;
MYSQL_SCRIPT

echo "MySQL user created."
echo "Username:   $usertest"
echo "Password:   $passtest"

# BELOW COLUMN NAMES AND DATA TYPES FOR DATASET
mysql -u$usertest -p$passtest -D$usertest <<MYSQL_SCRIPT
CREATE TABLE $tabletest (STATE VARCHAR(30), LATITUDE VARCHAR(10), LONGTITUDE VARCHAR(10));
LOAD DATA LOCAL INFILE'/home/diicc/mydockerbuild/WeatherStations.txt'INTO TABLE $tabletest CHARACTER SET utf8 FIELDS TERMINATED BY'\t'LINES TERMINATED BY'\n';
MYSQL_SCRIPT

service mysql stop
