FROM ubuntu:20.04

RUN apt-get update -y && apt-get install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa

RUN apt-get install -y python3.9 python3-pip
RUN apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db
RUN curl -LsS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | bash
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get dist-upgrade -y

RUN apt-get install -y libmariadb3
RUN apt-get install -y libmariadb-dev

COPY ./requirement.txt /app/requirement.txt
WORKDIR /app
RUN pip3 install -r requirement.txt
COPY ./src /app

EXPOSE 3007

ENTRYPOINT ["python3"]
CMD ["WildfireControllerApp.py"]
