# -*- coding: utf-8 -*-
"""
Created on Tue Jul 19 13:17:50 2022

@author: Tibame_T14
"""

import psycopg2
from connection import Connection

from flask import Flask
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
        station_data[i]=list(map(str, (rows[i])));
        
    return json.dumps(station_data)