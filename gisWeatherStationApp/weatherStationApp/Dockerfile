FROM ubuntu:20.04
RUN apt-get update -y && apt-get install -y python3 python3-pip

COPY ./requirement.txt /app/requirement.txt
WORKDIR /app
RUN pip3 install -r requirement.txt
COPY ./src /app

EXPOSE 3006

ENTRYPOINT ["python3"]
CMD ["WeatherStationLocationsApp.py"]
