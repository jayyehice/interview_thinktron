# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""


import psycopg2
from connection import Connection



d, u, p =  Connection();
conn = psycopg2.connect(database=d, user=u, password=p, host="127.0.0.1", port="5432")
cur = conn.cursor()

cur.execute( "SELECT * FROM station;" )
rows = cur.fetchall()

conn.commit()
conn.close()


for i in range(len(rows)):
    print(rows[i][1])