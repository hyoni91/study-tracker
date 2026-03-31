"use client";

import { StudyRecord } from "@/types/study";


export default function GrassCell({date , studyData} : {date:string, studyData : StudyRecord[]}){
    
    const todayData = studyData.filter(record => record.date === date);
    const totalDuration = todayData.reduce((sum, record) => sum + record.duration, 0);
    const durationHours = totalDuration / (1000 * 60 * 60); // 밀리초를 시간으로 변환

    let bgColor = "bg-gray-500"; // 기본 색상
    if(durationHours > 0 && durationHours <= 1){
        bgColor = "bg-green-300";
    } else if(durationHours > 1 && durationHours <= 2){
        bgColor = "bg-green-500";
    } else if(durationHours > 2 && durationHours <= 3){
        bgColor = "bg-purple-700";
    }


    return(
        <div className={`w-4 h-4 ${bgColor} rounded-sm`}>
        </div>
    )
}