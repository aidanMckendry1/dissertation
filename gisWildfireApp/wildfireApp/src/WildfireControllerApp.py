import mariadb
from model.WildfireRecord import WildfireRecord
import logging
from flask import Flask, jsonify, Response
import json
n = 2

app = Flask(__name__)
@app.route('/')

def connect_to_database():
    while n >= 0:
        connection = mariadb.connect(
            host='mariadb',
            port=3306,
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
            app.logger.info('%s: result', result)
            change_in_burned_area = result[1].replace('\r', '')
            record = WildfireRecord(result[0], change_in_burned_area)
            jsonifiedRecord = record.toJSON()
            data.append(jsonifiedRecord)

        connection.close()
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
    app.run(debug=True, host='0.0.0.0',port=3007)
