# -*- coding: utf-8 -*-
"""
Created on Tue Jul 19 13:17:50 2022

@author: Tibame_T14
"""

import psycopg2
from connection import Connection

from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


#資料庫連線資訊
d, u, p =  Connection();


@app.route("/")
def hello():
    value = {
        "language": 0,
        "company": 1,
        "Itemid": 2,
        "price": 3
    }
    return json.dumps(value)


@app.route("/station/")
def station():
    conn = psycopg2.connect(database=d, user=u, password=p, host="127.0.0.1", port="5432")
    cur = conn.cursor()

    cur.execute( "SELECT * FROM station;" )
    rows = cur.fetchall()

    conn.commit()
    conn.close()
    
    station_data = {}
    
    for i in range(len(rows)):
        station_data[rows[i][0]]=list(map(str, (rows[i])));
        
    return json.dumps(station_data)


@app.route('/rainfall')
def rainfall():
    #get 參數
    stationid = request.args.get('id')
    
    conn = psycopg2.connect(database=d, user=u, password=p, host="127.0.0.1", port="5432")
    cur = conn.cursor()

    cur.execute( "SELECT * FROM rainfall where stationid = '"+stationid+"' ORDER BY recordtime LIMIT 24;" )
    rows = cur.fetchall()

    conn.commit()
    conn.close()
    
    station_data = {}
    
    for i in range(len(rows)):
        station_data[i]=list(map(str, (rows[i])));
        
    return json.dumps(station_data)




@app.route('/rainfallnow/')
def rainfallnow():
    
    conn = psycopg2.connect(database=d, user=u, password=p, host="127.0.0.1", port="5432")
    cur = conn.cursor()

    cur.execute( "SELECT * FROM rainfall LIMIT 1;" )
    rows = cur.fetchall()

    cur.execute( "SELECT * FROM rainfall WHERE recordtime = '"+str(rows[0][2])+"';" )
    rows = cur.fetchall()

    conn.commit()
    conn.close()
    
    station_data = {}
    
    for i in range(len(rows)):
        station_data[rows[i][1]]=list(map(str, (rows[i])));
        
    return json.dumps(station_data)
    