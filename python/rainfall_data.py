# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import requests
import psycopg2
from connection import Connection



response = requests.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0002-001?Authorization=rdec-key-123-45678-011121314&format=JSON')
result = response.json()

#獲取觀測站資料
data = result['cwbopendata']['location']


#建立即時雨量資料表

d, u, p =  Connection();
conn = psycopg2.connect(database=d, user=u, password=p, host="127.0.0.1", port="5432")
cur = conn.cursor()

#時間
#str_time = data[0]['time']['obsTime'];
#s = str_time[:10] + " " + str_time[11:19];
#print(s)

#即時雨量
#print(data[0]['weatherElement'][7]['elementValue']['value'])


#觀測站ID
#print(data[0]['stationId'])



for row in data:
    s = ''
    str_time = ''
    str_time = row['time']['obsTime'];
    s = str_time[:10] + " " + str_time[11:19];
    cur.execute( "INSERT INTO rainfall (stationid, recordtime, rain) VALUES ('"+row['stationId']+"', '" +s+ "', "+row['weatherElement'][7]['elementValue']['value']+");" )
    conn.commit()

    
conn.close()

