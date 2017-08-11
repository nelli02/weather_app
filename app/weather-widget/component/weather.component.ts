import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
import { WEATHER_COLORS } from '../constants/constants';

//this stops the ide error since js is missing the typescript definition file
declare var Skycons: any;


@Component ({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css'],
    providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit { 
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "mph";
    currentTempUnit = "fa";
    currentCity = "";
    dataReceived = false;
    //skycons is a js library we added to the project
    //the vss ide complains about it since its not familiar with it
    //all js libraries should be accompanied by a typescript definition file
    //which it does not in this case
    //so can we use the skycons.js or not?
    //yes there is a workaround -
    //even if run it and compile it, there is no runtime error
    //its just an ide error
    //when it is compiled to javascript, types don't exist, therefore this is not s
    //showstopper
    //but we could still stop the IDE from throwing the error by using a declare statement 
    icons = new Skycons({"color": ""});

    constructor(private service: WeatherService){
        /*
        the idea was first realized here and then refactored into the methods below
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position
            this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => console.log(weather),
            err => console.error(err));
        },
        err => console.error(err));
        */
    }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position;
            this.getCurrentWeather();
            this.getCurrentCity();
        },
        err => console.error(err));
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.summary = weather["currently"]["summary"],
                this.weatherData.wind = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"]
                console.log("weather data = " , this.weatherData);
                this.setIcon();
                this.dataReceived = true;
            },
            err => console.error(err));
    }

    getCurrentCity() {
        this.service.getCity(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location);
                this.currentCity = location["results"][3]["formatted_address"];
                console.log("city = ", this.currentCity);
            })
    }

    //when you click on the weather component it switch between units
    toggleUnits(){
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    toggleTempUnits(){
        if (this.currentTempUnit == "fa"){
            this.currentTempUnit = "celsius";
        } else {
            this.currentTempUnit = "fa";
        }
    }

    toggleSpeedUnits(){
        if (this.currentSpeedUnit == "mph"){
            this.currentSpeedUnit = "kph";
        } else {
            this.currentSpeedUnit = "mph";
        }
    }

    setIcon(){
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object{
        //in case the service does not return soon enough
        //we need to prepare to render this value immediately without delay
        //since this is called first
        //because ngStyle is going on the template
        //that will be call this method as soon as binding happens or as soon as
        //page is rendered
        // the object returned by this function will be bound by ngStyle
        if (this.weatherData.icon){
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
}