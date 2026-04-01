import type {Res,CurrentWeather} from "../types";
import {WHEATHER_API} from "../constants";
import {useState,useRef,useEffect} from "react";

export function useWeather(){
    const [time, setTime]=useState<Date>(new Date())
    const [weather, setWeather]=useState<null|Res>(null)
    const [loading, setLoading]=useState<boolean>(false)
    const [error, setError]=useState<null|string>(null)

    //useRefに入れるのはstateじゃなくてsetIntervalのID
    const timeRef=useRef<ReturnType<typeof setInterval>>(null)

    useEffect(()=>{
        timeRef.current=setInterval(()=>{
            setTime(new Date())
        },1000);
    return()=>{
        clearInterval(timeRef.current);
    };
    },[]);


    //fetchWeather に引数は不要です。URLは WEATHER_API から取るので
    //setWeather(data) は data.current_weather を入れるべきです。Res 型全体じゃなくて current_weather の中身だけ使うので

    function fetchWeather(){
        setLoading(true)
        fetch(WEATHER_API)

            .then(res => res.json())
            .then(data =>{
                setWeather(data.current_weather);
            })
            .catch(e=>{
                setError( "天気の取得に失敗しました。")
            })
            .finally(()=>{
                setLoading(false)
            })
    }

    useEffect(()=>{
        fetchWeather();
    },[])

    return{time,weather,loading,error,fetchWeather};
}