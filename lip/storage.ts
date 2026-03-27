import { StudyRecord } from "@/types/study";

{/** Storage Save 
    data변수에 현재 저장된 전체 데이터를 복사한 후, 기존 날짜의 값이 있으면 push, 없으면 새로 추가 */}

function SaveStudy (studyRecord:StudyRecord){

    //오늘 날짜 
    const now = new Date(); 
    const today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;

    //기존데이터
    const stored = localStorage.getItem("studyData");
    const data = stored ? JSON.parse(stored) : {};

    //날짜별 처리 
     if (data[today]) {
    data[today].push(studyRecord); // 있으면 추가
    } else {
        data[today] = [studyRecord]; // 없으면 새 배열
    }

    //로컬 스토리지에 저장 
    localStorage.setItem("studyData", JSON.stringify(data));

}