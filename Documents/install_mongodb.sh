sudo apt-get install gnupg
wget -q0 - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
#sudo apt-get install -y mongodb-org
sudo apt-get install -y mongodb-org=6.0.2 mongodb-org-database=6.0.2 mongodb-org-server=6.0.2 mongodb-mongosh=6.0.2 mongodb-org-mongos=6.0.2 mongodb-org-tools=6.0.2
sudo -i
wget http://archive.ubuntu.com.ubuntu/pool/main/o/openssl/libssl1.1._1.1.1f-1ubuntu2_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo apt-get install -y mongodb-org