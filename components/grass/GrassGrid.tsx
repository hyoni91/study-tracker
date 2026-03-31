"use client";

import { StudyRecord } from "@/types/study";
import GrassCell from "./GrassCell";

//365일 날짜 생성 함수 (오늘부터 과거 1년), 날짜는 임의값 생성 가능 (30일, 60일단위 등)
const getDates = (days: number) => {
  const dates = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(); // 나중에 기준점 바꿔야함, 오늘부터 과거로 가야하니까
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    dates.push(dateString);
  }
  return dates;
};

//7일 단위로 날짜를 나누는 함수 (주 단위로 그리드 구성하기 위해)
const chunkDates = (dates: string[]) => {
  const result = [];

  for (let i = 0; i < dates.length; i += 7) {
    result.push(dates.slice(i, i + 7));
  }
  return result;
};

const getStudyData=()=>{
    //로컬 스토리지에서 데이터 가져오기
    const stored = localStorage.getItem("studyData");
    const data:StudyRecord = stored ? JSON.parse(stored) : {};
    return data;
}

export default function GrassGrid() {

  const tates = getDates(365);
  const weeks = chunkDates(tates);
  const studyData = getStudyData();
  console.log(studyData);
  console.log("dates:", tates);
  console.log("weeks:", weeks);

  return (
    <div className="flex gap-1">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((date) => {
            const records = studyData[date] || []; // 해당 날짜의 기록이 없으면 빈 배열
            return (
              <GrassCell key={date} date={date} studyData={records} />
            );
          })}
        </div>
      ))}
    </div>
  );
}
