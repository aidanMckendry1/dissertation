import mysql.connector
from model.WeatherStation import WeatherStation
import logging
from flask import Flask, jsonify, Response
import json
n = 2

app = Flask(__name__)
@app.route('/')
#mysql = MySQL(app) -- needed?

#@app.route('/users', methods=['GET'])
def connect_to_database():
    while n >= 0:
        connection = mysql.connector.connect(
            host='mysql',
            port='3306',
            user='mydb',
            password='#1A2b%3C4d5E!',
            database='mydb'
        )
        cursor = connection.cursor()
        # db query
        cursor.execute("SELECT * FROM mytab")
        rowHeaders = [x[0] for x in cursor.description]
        allResults = cursor.fetchall()
        data = []
        for result in allResults:
            app.logger.info('%s result in position 2', result)
            longtitude = result[2].replace('\r', '')
            station = WeatherStation(result[0], result[1], longtitude)
            jsonifiedStation = station.toJSON()
            data.append(jsonifiedStation)
        connection.close()
        #data[len(data) - 1] =data[len(data) - 1][:-1] # remove final comma from manually built jsonify method
        # send json response
        r =  {
            "success": True,
            "count": len(data), # should return correct count of json objects, weather station records ...
            "data": data
        }
        reply = json.dumps(r)
        response = Response(response=reply, status=200, mimetype='appplication/json')
        response.headers["Content-Type"]="application/json"
        response.headers["Access-Control-Allow-Origin"]="*"

        return response



if __name__ =='__main__':
    app.run(debug=True, host='0.0.0.0',port=3006)
