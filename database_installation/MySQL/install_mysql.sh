export DEBIAN_FRONTEND=noninteractive

MYSQL_ROOT_PASSWORD='1q2w3e4r'

echo debconf mysql-server/root_password password $MYSQL_ROOT_PASSWORD | debconf-set-selections
echo debconf mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD | debconf-set-selections

apt-get -qq install mysql-server > /dev/null # Install MySQL quietly
sed -i '/bind-address*/c\bind-address=0.0.0.0' /etc/mysql/mysql.conf.d/mysqld.cnf # setting the bind ip to allow remote connections


service mysql start

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

rm -v ~/secure_our_mysql.sh # Remove the generated Expect script
echo "MySQL setup completed. Insecure defaults are gone. Please remove this scriptmanually when you are done with it (or at least remove the MySQL root passwordthat you put inside it."

sed -i's/127.0.0.1/0.0.0.0/g'/etc/mysql/mysql.conf.d/mysqld.cnf
sed -i'/max_allowed_packet*/c\max_allowed_packet=1073741824'/etc/mysql/mysql.conf.d/mysqld.cnf
sed -i'/key_buffer_size*/c\key_buffer_size=100M'/etc/mysql/mysql.conf.d/mysqld.cnf
sed -i'/max_connections*/c\max_connections=400'/etc/mysql/mysql.conf.d/mysqld.cnf
sed -i'/\[mysqld\]/a\# Skip reverse DNS lookup\nskip-name-resolve'/etc/mysql/mysql.conf.d/mysqld.cnf

service mysql stop
