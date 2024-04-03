import json
class WeatherStation:
    def __init__(self, state, longtitude, latitude):
        self.state = state
        self.longtitude = longtitude
        self.latitude = latitude
    def toJSON(self):
        return f"""{{"state": { f'"{self.state}"'}, "longtitude": {self.longtitude}, "latitude": {self.latitude}}}"""
