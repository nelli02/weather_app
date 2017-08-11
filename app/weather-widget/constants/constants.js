"use strict";
exports.FORECAST_KEY = "01423b712943b083493bf87c79f6136b";
exports.FORECAST_ROOT = "https://api.darksky.net/forecast/";
exports.GOOGLE_GEOCODING_KEY = "AIzaSyBDeQpva_j-gMdJdZsTL22O6hETqRONouE";
exports.GOOGLE_REVERSE_GEOCODING_ROOT = "https://maps.googleapis.com/maps/api/geocode/json";
//this is to change the font-colors of the weather component
//based on the 10 icons we receive back from forecastio
exports.WEATHER_COLORS = {
    'default': {
        'background-color': '#00BCD4',
        'color': '#FFF'
    },
    'clear-day': {
        'background-color': '#22A7f0',
        'color': '#FFF'
    },
    'clear-night': {
        'background-color': '#2C3E60',
        'color': '#FFF'
    },
    'rain': {
        'background-color': '#5C97BF',
        'color': '#000'
    },
    'snow': {
        'background-color': '#FFF',
        'color': '#000'
    },
    'sleet': {
        'background-color': '#E4FIFE',
        'color': '#000'
    },
    'wind': {
        'background-color': '#81CFE0',
        'color': '#000'
    },
    'fog': {
        'background-color': '#67809F',
        'color': '#FFF'
    },
    'cloudy': {
        'background-color': '#BDC3C7',
        'color': '#000'
    },
    'partly-cloudy-day': {
        'background-color': '#D2D7D3',
        'color': '#000'
    },
    'partly-cloudy-night': {
        'background-color': '#34495E',
        'color': '#FFF'
    }
};
//# sourceMappingURL=constants.js.map