import mysql.connector
from flask import jsonify, Response
import json


def dbQuery():
    connection = mysql.connector.connect(
        host='mysql',
        port='3306',
        user='mydb',
        password='#1A2b%3C4d5E!',
        database='mydb'
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM mytab")
    row_headers=[x[0] for x in cursor.description]
    rv = cursor.fetchall()
    data=[]
    for result in rv:
        data.append(dict(zip(row_headers,result)))
    jsondata = jsonify(data)
    #response = Response(response=jsondata, status=200, mimetype='appplication/json')

    return jsondata
