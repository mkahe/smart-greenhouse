class SensorInfo:
    temperature: float = None
    humidity: float = None
    co2: float = None
    light: int = None
    def __init__(self, temperature, humidity, co2, light):
        self.temperature = temperature
        self.humidity = humidity
        self.co2 = co2,
        self.light = light