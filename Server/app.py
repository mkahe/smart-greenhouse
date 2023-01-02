from flask import Flask, jsonify, render_template, request
import json
import random
from datetime import datetime
from services import repository

app = Flask(__name__)
repository.init_db_context(app)

@app.cli.command("init-db")
def initializeDatabase():
    print('\033[94m' + "Initializing the database")
    repository.createDatabase(app)

@app.route('/')
def index():
    return "<p>Hi.. I'm at your service.</p>"

@app.route('/sensor-data', methods=['GET'])
def getSensor():
    sensor = repository.getLastSensorData()
    return jsonify(sensor.json())

@app.route('/sensor-history', methods=['GET'])
def getSensorHistory():
    sensors = repository.getAllSensorData()
    print(sensors, type(sensors))
    return jsonify([sensor.json() for sensor in sensors])

@app.route('/update-sensors', methods=['POST'])
def updateSensors():
    data = json.loads(request.data)
    if data is None:
        return jsonify({ 'error': 'Missing input' }), 400
    humidity = int(data['humidity'])
    light = int(data['light'])
    temperature = int(data['temperature'])
    co2 = int(data['co2'])
    repository.updateSensorData(humidity, light, temperature, co2)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/change-servo', methods=['POST'])
def changeServo():
    data = json.loads(request.data)
    print(data['angle'])
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
