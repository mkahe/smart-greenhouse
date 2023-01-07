from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import sqlalchemy as sa


db = SQLAlchemy()

def init_db_context(app):
    db.init_app(app)

def createDatabase(app):
    with app.app_context():
        db.create_all()
    print("Database created")

class Sensor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    humidity = db.Column(db.Integer, nullable=False)
    light = db.Column(db.Integer, nullable=False)
    temperature = db.Column(db.Integer, nullable=False)
    co2 = db.Column(db.Integer, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, humidity, light, temperature, co2):
        self.humidity = humidity
        self.light = light
        self.temperature = temperature
        self.co2 = co2
        self.created = datetime.utcnow()
    
    def json(self):
        return {
            'humidity': self.humidity,
            'light': self.light,
            'temperature': self.temperature,
            'co2': self.co2,
            "lastUpdate": self.created
        }

class Servo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    angle = db.Column(db.Integer, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, angle):
        self.angle = angle
        self.created = datetime.utcnow()
    
    def json(self):
        return {
            'angle': self.angle,
            'lastUpdate': self.created
        }

class Light(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    on = db.Column(db.Boolean, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, on):
        self.on = on
        self.created = datetime.utcnow()
    
    def json(self):
        return {
            'lightOn': self.on,
            'lastUpdate': self.created
        }

class Hvac(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    on = db.Column(db.Boolean, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, on):
        self.on = on
        self.created = datetime.utcnow()
    
    def json(self):
        return {
            'hvacOn': self.on,
            'lastUpdate': self.created
        }

def updateSensorData(humidity, light, temperature, co2):
    model = Sensor(humidity, light, temperature, co2)
    db.session.add(model)
    db.session.commit()

def getLastSensorData():
    model = db.first_or_404(db.select(Sensor).order_by(Sensor.created.desc()))
    return model

def getAllSensorData():
    model = db.session.execute(db.select(Sensor).order_by(Sensor.created)).scalars()
    return model

def updateServo(angle):
    model = Servo(angle)
    db.session.add(model)
    db.session.commit()

def getLastServoData():
    model = db.first_or_404(db.select(Servo).order_by(Servo.created.desc()))
    return model

def updateHvac(on):
    model = Hvac(on)
    db.session.add(model)
    db.session.commit()

def updateLight(on):
    model = Light(on)
    db.session.add(model)
    db.session.commit()

def getLastLightData():
    model = db.first_or_404(db.select(Light).order_by(Light.created.desc()))
    return model    

def getLastHvacData():
    model = db.first_or_404(db.select(Hvac).order_by(Hvac.created.desc()))
    return model
