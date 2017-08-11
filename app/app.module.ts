import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule } from '@angular/http';

import { AppComponent} from './app.component';
import { WeatherComponent} from './weather-widget/component/weather.component';
import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit.pipe';
import { TempUnitPipe } from './weather-widget/pipe/temp-unit.pipe';

// jsonpmodule is used to bypass the browser's cross domain restriction for http get requests.
// it does it using xhr request instead.

@NgModule({
    imports: [ BrowserModule, JsonpModule, HttpModule ],
    declarations: [ AppComponent, WeatherComponent, SpeedUnitPipe, TempUnitPipe ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
