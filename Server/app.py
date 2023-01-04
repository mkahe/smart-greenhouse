from flask import Flask, jsonify, render_template, request
import json
import random
from datetime import datetime
from services import repository
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_ADDR", "sqlite:///green-house.db")

repository.init_db_context(app)

@app.cli.command("init-db")
def initializeDatabase():
    print("Initializing the database")
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

@app.route('/servo', methods=['POST'])
def changeServo():
    data = json.loads(request.data)
    if data is None:
        return jsonify({ 'error': 'Missing input' }), 400
    angle = int(data['angle'])
    repository.updateServo(angle)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/servo', methods=['GET'])
def getServoData():
    model = repository.getLastServoData()
    return jsonify(model.json())

@app.route('/hvac', methods=['POST'])
def changeHvac():
    data = json.loads(request.data)
    if data is None:
        return jsonify({ 'error': 'Missing input' }), 400
    on = int(data['on'])
    repository.updateHvac(on)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/light', methods=['POST'])
def changeLight():
    data = json.loads(request.data)
    if data is None:
        return jsonify({ 'error': 'Missing input' }), 400
    on = int(data['on'])
    repository.updateLight(on)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/light', methods=['GET'])
def getLightData():
    model = repository.getLastLightData()
    return jsonify(model.json())

@app.route('/hvac', methods=['GET'])
def getHvacData():
    model = repository.getLastHvacData()
    return jsonify(model.json())
