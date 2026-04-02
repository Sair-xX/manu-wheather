import {useWeather} from "./hooks/useWeather.ts";
import {Timer} from "./components/Timer.tsx";
import {Weather} from "./components/Weather.tsx";


export function App(){
  const{time,weather,loading,error,fetchWeather}=useWeather()

  return (<>
    <Weather error={error} loading={loading} weather={weather}/>
    <Timer time={time}/>
  </>)
}