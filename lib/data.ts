import { StudyRecord } from "@/types/study";

export const getStudyData=():Record<string, StudyRecord[]>=>{
    //로컬 스토리지에서 데이터 가져오기
    const stored = localStorage.getItem("studyData");
    const data:Record<string, StudyRecord[]> = stored ? JSON.parse(stored) : {};
    return data;
}