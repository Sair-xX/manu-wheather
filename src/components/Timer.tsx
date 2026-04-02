interface Props{
    time:Date;
}

export function Timer({time}:Props){
    return(<>
    <p>{`${String(time.getHours()).padStart(2,"0")}:${String(time.getMinutes()).padStart(2,"0")}:${String(time.getSeconds()).padStart(2,"0")}`}</p>
    </>)
}