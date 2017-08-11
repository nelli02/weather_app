import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "tempUnit"
})


export class TempUnitPipe implements PipeTransform {
    transform(temp: number, unitType: String){
        switch(unitType){
            case "celsius":
            //current temp is shown as fahrenheit
            const convert = (temp - 32 ) * .5556 ;
            return convert;

            default:
            return temp;
        }
    }
}