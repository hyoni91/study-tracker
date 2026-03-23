import { useRef, useState } from "react";

{/** 최종반환값 */}
{ /* *
  isRunning,
  elapsedTime,
  start,
  end,
  reset
*/}


function useTimer (){


const [startTime, setStartTime] = useState<number | null>();
const [isRunning, setIsRunning] = useState(false);
const [endTime, setEndTime] = useState<number | null>();
const [duration, setDuration] = useState(0);

const start = () =>{

    //오늘 날짜가 있다면 더하기
    if(isRunning) return;

    const now = Date.now();
    setStartTime(now)
    setIsRunning(true)

    }

const End = () =>{

    //오늘 날짜가 있다면 더하기?
    if(!isRunning) return;
    if(startTime == null) return;

    const now = Date.now()
    const elapsed = now - startTime;
    setDuration(elapsed);
    setEndTime(now);
    setIsRunning(false);

}

return{
    startTime, endTime, duration
}


}


{/** end */}



// endTime, duration, return, StudyRecord 저장, isRunning 

{/** Reset */}

//초기화

{/** update */}

//1초마다 elapsedTime 업데이트




