export interface CurrentWeather{
    temperature:number;
    weathercode:number;
    windspeed:number;
}

export type Res={
    current_weather:CurrentWeather;
}