"use client"

import { useState } from "react";

export function useTimer (){

    const [startTime, setStartTime] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const start = () =>{
        //오늘 날짜가 있다면 더하기
        if(isRunning) return;

        const now = Date.now();
        setStartTime(now)
        setIsRunning(true)

     }

    const end = () =>{

        //오늘 날짜가 있다면 더하기?
        if(!isRunning) return;
        if(startTime == null) return;

        const now = Date.now()
        const duration = now - startTime;
        setIsRunning(false);

        return{
            startTime,
            endTime: now,
            duration,

        }
    }

return {
    start,
    end,
    isRunning,
    startTime,
  };


}