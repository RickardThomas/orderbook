import React from 'react'
import { useState } from 'react'

export default function Clock() {

    const [time, setTime] = useState(new Date().toLocaleTimeString());
  
    const tick = () => { setTime(new Date().toLocaleTimeString())}

    setInterval(tick, 1000);

    return (

        <div>{time}</div>

    )
}


 
