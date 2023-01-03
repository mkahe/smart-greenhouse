from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import sqlalchemy as sa


db = SQLAlchemy()

def init_db_context(app):
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///green-house.db"
    db.init_app(app)

def createDatabase(app):
    with app.app_context():
        db.create_all()
    print('\033[94m' + "Database created")

class Sensor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    humidity = db.Column(db.Integer, nullable=False)
    light = db.Column(db.Integer, nullable=False)
    temperature = db.Column(db.Integer, nullable=False)
    co2 = db.Column(db.Integer, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, humidity, light, temperature, co2):
        print('\033[94m' + "Sensor data: light %i humidity %i temperature %i co2 %i" %(light, humidity, temperature, co2))
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
            "last-update": self.created
        }

def updateSensorData(humidity, light, temperature, co2):
    sensor = Sensor(humidity, light, temperature, co2)
    db.session.add(sensor)
    db.session.commit()

def getLastSensorData():
    sensor = db.first_or_404(db.select(Sensor).order_by(Sensor.created.desc()))
    return sensor

def getAllSensorData():
    sensors = db.session.execute(db.select(Sensor).order_by(Sensor.created)).scalars()
    return sensors