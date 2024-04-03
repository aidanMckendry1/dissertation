service mariadb start

rootpsw='1q2w3e4r'
user='mariadbuser'
pass='#1A2b%3C4d5E!'
table='table'

mysql -uroot -p$rootpsw <<MYSQL_SCRIPT
CREATE DATABASE $user;
CREATE USER'$user'@'localhost'IDENTIFIED BY'$pass';
CREATE USER'$user'@'%'IDENTIFIED BY'$pass';
GRANT ALL PRIVILEGES ON *.* TO'$table'@'localhost'WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO'$table'@'%'WITH GRANT OPTION;
FLUSH PRIVILEGES;
MYSQL_SCRIPT

echo "MySQL user created."
echo "Username:   $user"
echo "Password:   $pass"

# BELOW COLUMN NAMES AND DATA TYPES FOR DATASET
mysql <<MYSQL_SCRIPT
USE $user;
CREATE TABLE $table (STATE VARCHAR(30), CHANGE_IN_BURNED_AREA VARCHAR(15));
LOAD DATA LOCAL INFILE'/home/diicc/mydockerbuild/wildfires.txt'INTO TABLE $table CHARACTER SET utf8 FIELDS TERMINATED BY'\t'LINES TERMINATED BY'\n';
MYSQL_SCRIPT

service mariadb stop
