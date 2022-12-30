class SensorInfo:
    temperature: float = None # -10-70
    humidity: float = None # 0-100
    co2: float = None # 
    light: int = None # 20-1023
    def __init__(self, temperature, humidity, co2, light):
        self.temperature = temperature
        self.humidity = humidity
        self.co2 = co2,
        self.light = light