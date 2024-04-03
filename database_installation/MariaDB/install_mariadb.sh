#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
MYSQL_ROOT_PASSWORD='1q2w3e4r'

 apt-get update
 apt-get install software-properties-common -y
 apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
 add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://mirror.netcologne.de/mariadb/repo/10.6/ubuntu bionic main'

# Install MariaDB
 apt-get update
 apt-get install mariadb-server -y

 echo "Installation complete"

service mariadb status
service mariadb start
service mariadb enable
service mariadb status

apt-get -qq install expect > /dev/null

tee ~/secure_our_mysql.sh > /dev/null << EOF
spawn $(which mysql_secure_installation)
expect "Enter password for user root:"
send "$MYSQL_ROOT_PASSWORD\r"
expect "Press y|Y for Yes, any other key for No:"
send "y\r"
expect "Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:"
send "2\r"
expect "Change the password for root ? ((Press y|Y for Yes, any other key for No) :"
send "n\r"
expect "Remove anonymous users? (Press y|Y for Yes, any other key for No) :"
send "y\r"
expect "Disallow root login remotely? (Press y|Y for Yes, any other key for No) :"
send "y\r"
expect "Remove test database and access to it? (Press y|Y for Yes, any other key for No) :"
send "y\r"
expect "Reload privilege tables now? (Press y|Y for Yes, any other key for No) :"
send "y\r"
expect "Reload privilege tables now? (Press y|Y for Yes, any other key for No) :"
send "y\r"
EOF

expect ~/secure_our_mysql.sh

rm -v ~/secure_our_mysql.sh # Remove the generated Expect scrip

sed -i '/bind-address*/c\bind-address=0.0.0.0' /etc/mysql/mariadb.conf.d/50-server.cnf # setting the bind ip to allow remote connections
sed -i '/#log_error*/c\log_error = /var/log/mysql/error.log' /etc/mysql/mariadb.conf.d/50-server.cnf # setting the bind ip to allow remote connections

service mariadb stop
