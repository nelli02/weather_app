import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_GEOCODING_KEY, GOOGLE_REVERSE_GEOCODING_ROOT } from '../constants/constants';

@Injectable()

export class WeatherService { 

    constructor(private jsonp: Jsonp, private http: Http) {  }
    
    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation){
            //by default the navigator.geolocation is not an observable
            //but we are creating an observable here for that api
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos);
                }),
                err => {
                    return Observable.throw(err);
                }
            });
        } else {
            //console.error("Geolocation is not available");
            return Observable.throw("Geolocation is not available");
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        //this how to define a constant value, but 'let' is an assignemnt
        // const statement is immutable for javascript primitive like string, number etc
        // but a javascript object can still be changed via its properties (so it is mutable even in a const)
        // let statement is mutable
        
        const url = FORECAST_ROOT + FORECAST_KEY +"/" + lat +"," + long;
        const queryParams = "?callback=JSONP_CALLBACK";
        // the security restrictions on the browser will prevent this cross domain request
        // hence we are using jsonp which provides a workaround

        return this.jsonp.get(url + queryParams)
        .map(data => data.json())
        .catch(err => {
            console.error("Unable to get weather data - ", err);
            return Observable.throw(err.json());
        });
    }

    getCity(lat: number, long: number): Observable<any> {
        //on this service we are using a HTTP GET request instead of a jsonP
        // thats because in the google API, they enable cross origin resource sharing
        // which is basically saying we are aware that calls are made from other domains and we are ok with it
        // to enforce that they send something additional in the response header
        // that informs the browser that its fine that it is a cross-domain http get request
        // , so go ahead and allow the request
        // Google APIs support requests and responses using Cross-origin Resource Sharing (CORS).
        
        //takeaway point - is some API will have the CORS enabled while others may not
        // so there are 2 ways to make a HTTP GET request successfully depending on the situation

        const url = GOOGLE_REVERSE_GEOCODING_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key=" + GOOGLE_GEOCODING_KEY;

        return this.http.get(url + queryParams)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get location = ", err);
                return Observable.throw(err);
            });
    }
}