"use client";

import { StudyRecord } from "@/types/study";
import GrassCell from "./GrassCell";
import DetailModal from "../modal/DetailModal";
import { getStudyData } from "@/lib/data";
import { useState } from "react";

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



export default function GrassGrid() {

  const tates = getDates(365);
  const weeks = chunkDates(tates);
  const studyData = getStudyData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null); //모달에서 사용할 선택된 날짜 상태
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 열림 상태

  console.log(studyData);
  console.log("dates:", tates);
  console.log("weeks:", weeks);


const handleCellClick = (date:string) => {
    //날짜 클릭 시, 해당 날짜의 공부 기록 보여주기 (모달)
    const studyData = getStudyData();
    const records = studyData[date] || [];     
    if(records.length > 0){
        setSelectedDate(date);
        setIsModalOpen(true);
    }

}

  return (
    <div className="flex gap-1">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((date) => {
            const records = studyData[date] || []; // 해당 날짜의 기록이 없으면 빈 배열
            return (
              <GrassCell key={date} date={date} studyData={records} onClick={handleCellClick} />
            );
          })}
          {isModalOpen && selectedDate && ( 
            <DetailModal date={selectedDate} onClose={() => setIsModalOpen(false)} />
           )}
        </div>
      ))}
    </div>
  );
}
