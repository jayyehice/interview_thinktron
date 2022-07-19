# -*- coding: utf-8 -*-
"""
Created on Tue Jul 19 13:17:50 2022

@author: Tibame_T14
"""

from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    value = {
        "language": 0,
        "company": 1,
        "Itemid": 2,
        "price": 3
    }
    return json.dumps(value)