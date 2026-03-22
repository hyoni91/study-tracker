
//study
export type StudyRecord = {
    id : string; //PK
    date : string; // "2026-03-21"
    startTime : number;
    endTime : number;
    duration : number;
    title : string;
    detail? : string;
}

//ing 
export type CurrentStudy = {
    startTime : number | null;
    title : string;
    isRunning : boolean;
}


//done
export type StudyData = {
    [data : string] : StudyRecord[];
}