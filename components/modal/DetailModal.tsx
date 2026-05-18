
// date받아서 해당 날짜의 기록 보여주기

import { getStudyData } from "@/lib/data";
import { formatDurationShort } from "@/lib/format";


export default function DetailModal({date}:{date:string}){
    const studyData = getStudyData();
    const records = studyData[date] || [];

    return(
        <div className="fixed inset-0  flex items-center justify-center">
            <div className="bg-zinc-50 border border-gray-300 p-4 rounded  w-1/3 m-auto h-2/3 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Study Details for {date}</h2>
                <div>
                    {records.length === 0 ? (
                        <p>No study records for {date}</p>
                    ) : (
                        records.map((record, index) => (
                            <div key={index} className="py-2">
                                <h3 className="font-semibold">TITLE : {record.title}</h3>
                                <p className="text-gray-600 border-b mb-2">Duration : {formatDurationShort(record.duration)}</p>
                                <textarea className="w-full h-20 p-2 border rounded" readOnly value={record.description} />
                                <div>
                                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Edit
                                    </button>
                                    <button type="button" className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}