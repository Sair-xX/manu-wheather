import type {Res} from "../types.ts"

interface Props{
    error:null|string;
    loading:boolean;
    weather:Res|null;
}

export function Weather({error,loading,weather}:Props){
    let wea:string;
    if(weather?.weathercode<2){
        wea="晴れ"
    }else if(weather?.weathercode<46){
        wea="曇り"
    }else{
        wea="雨"
    }


    if(loading){
        return<p>"データを取得中です"</p>
    }else if(error !== null){
        return <p>{error}</p>
    }else{
        return (<>
            <p>{`気温：${weather?.temperature}`}</p>
            <p>{`天気：${wea}`}</p>
            <p>{`風速：${weather?.windspeed}`}</p>
        </>)
    }
}