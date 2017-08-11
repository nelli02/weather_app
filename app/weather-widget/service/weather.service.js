"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var constants_1 = require('../constants/constants');
var WeatherService = (function () {
    function WeatherService(jsonp, http) {
        this.jsonp = jsonp;
        this.http = http;
    }
    WeatherService.prototype.getCurrentLocation = function () {
        if (navigator.geolocation) {
            //by default the navigator.geolocation is not an observable
            //but we are creating an observable here for that api
            return Observable_1.Observable.create(function (observer) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    observer.next(pos);
                }),
                    function (err) {
                        return Observable_1.Observable.throw(err);
                    };
            });
        }
        else {
            //console.error("Geolocation is not available");
            return Observable_1.Observable.throw("Geolocation is not available");
        }
    };
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        //this how to define a constant value, but 'let' is an assignemnt
        // const statement is immutable for javascript primitive like string, number etc
        // but a javascript object can still be changed via its properties (so it is mutable even in a const)
        // let statement is mutable
        var url = constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + "/" + lat + "," + long;
        var queryParams = "?callback=JSONP_CALLBACK";
        // the security restrictions on the browser will prevent this cross domain request
        // hence we are using jsonp which provides a workaround
        return this.jsonp.get(url + queryParams)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error("Unable to get weather data - ", err);
            return Observable_1.Observable.throw(err.json());
        });
    };
    WeatherService.prototype.getCity = function (lat, long) {
        //on this service we are using a HTTP GET request instead of a jsonP
        // thats because in the google API, they enable cross origin resource sharing
        // which is basically saying we are aware that calls are made from other domains and we are ok with it
        // to enforce that they send something additional in the response header
        // that informs the browser that its fine that it is a cross-domain http get request
        // , so go ahead and allow the request
        // Google APIs support requests and responses using Cross-origin Resource Sharing (CORS).
        //takeaway point - is some API will have the CORS enabled while others may not
        // so there are 2 ways to make a HTTP GET request successfully depending on the situation
        var url = constants_1.GOOGLE_REVERSE_GEOCODING_ROOT;
        var queryParams = "?latlng=" + lat + "," + long + "&key=" + constants_1.GOOGLE_GEOCODING_KEY;
        return this.http.get(url + queryParams)
            .map(function (loc) { return loc.json(); })
            .catch(function (err) {
            console.error("Unable to get location = ", err);
            return Observable_1.Observable.throw(err);
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map