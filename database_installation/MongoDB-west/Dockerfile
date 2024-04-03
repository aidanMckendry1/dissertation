FROM ubuntu:20.04
RUN apt-get update -y && apt-get install -y gnupg
RUN apt-get update -y && apt-get install -y ca-certificates
RUN apt-get update -y && apt-get install -y wget
RUN apt-get update -y && apt-get install -y systemctl

COPY ./install_mongodb.sh /app/install_mongodb.sh
COPY ./load_data.sh /app/load_data.sh
COPY ./select_data.sh /app/select_data.sh
COPY ./TmpRecordsWest.csv /app/TmpRecordsWest.csv
WORKDIR /app
RUN chmod a+x ./install_mongodb.sh ./load_data.sh ./install_mongodb.sh ./select_data.sh
RUN ./install_mongodb.sh
RUN rm -f ./install_mongodb.sh
RUN ./load_data.sh
RUN mkdir -p /data/db
CMD ./select_data.sh

EXPOSE 27017
