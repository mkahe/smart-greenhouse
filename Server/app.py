from flask import Flask, jsonify, render_template, request
import json
import random

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>Hi.. I'm at your service.</p>"
    # return render_template('index.html')

@app.route('/get-sensors')
def do_get():
    return jsonify(
        {
            'temperature': random.randint(15, 25),
            'humidity': random.randint(15, 25),
            'co2': random.randint(),
            'light': 1234
        })

@app.route('/change-servo', methods=['POST'])
def do_post():
    record = json.loads(request.data)
    return jsonify(record)