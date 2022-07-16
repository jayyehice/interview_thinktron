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


#建立觀測站資料表
d, u, p =  Connection();
conn = psycopg2.connect(database=d, user=u, password=p, host="127.0.0.1", port="5432")
cur = conn.cursor()


for row in data:
    #print(row['lat'])
    cur.execute( "INSERT INTO station (stationid, lat, lon, locationname) VALUES ('"+row['stationId']+"', "+row['lat']+", "+row['lon']+", '"+row['locationName']+"');" )
    conn.commit()
    
    
conn.close()
