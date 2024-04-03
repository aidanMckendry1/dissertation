FROM ubuntu:20.04

RUN apt-get update -y && apt-get install -y systemctl

COPY . /home/diicc/mydockerbuild
WORKDIR /home/diicc/mydockerbuild
RUN apt-get update -y
RUN apt-get install --assume-yes apt-utils
RUN chmod a+x ./install_mariadb.sh ./load_data.sh ./select_data.sh
RUN ./install_mariadb.sh
RUN ./load_data.sh
RUN rm -f ./install_mariadb.sh
CMD ./select_data.sh
