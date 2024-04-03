import json
class WildfireRecord:
    def __init__(self, state, change_in_burned_area):
        self.state = state
        self.change_in_burned_area = change_in_burned_area
    def toJSON(self):
        return f"""{{"state": { f'"{self.state}"'}, "change_in_burned_area": {self.change_in_burned_area}}}"""
