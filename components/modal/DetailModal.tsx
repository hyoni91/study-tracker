
// date받아서 해당 날짜의 기록 보여주기

import { getStudyData } from "@/lib/data";
import { formatDurationShort } from "@/lib/format";


export default function DetailModal({date}:{date:string}){
    const studyData = getStudyData();
    const records = studyData[date] || [];

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">
                <h2 className="text-xl font-bold mb-4">Study Details for {date}</h2>
                <div>
                    {records.length === 0 ? (
                        <p>No study records for {date}</p>
                    ) : (
                        records.map((record, index) => (
                            <div key={index} className="border-b py-2">
                                <h3 className="font-semibold">{record.title}</h3>
                                <p>Duration: {formatDurationShort(record.duration)}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}