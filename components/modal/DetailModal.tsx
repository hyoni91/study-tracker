
// date받아서 해당 날짜의 기록 보여주기

import { getStudyData } from "@/lib/data";
import { formatDurationShort } from "@/lib/format";
import { useRef, useState } from "react";


export default function DetailModal({date, onClose}:{date:string, onClose:() => void}){
    const studyData = getStudyData();
    const records = studyData[date] || [];
    const [isEditing, setIsEditing] = useState(false);
    const [detailData, setDetailData] = useState(records[0]?.detail || ""); 
    const testAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleEdit = () => {
        setIsEditing(true);
        testAreaRef.current?.focus();
    }


    const handleSave = () => {
        const updatedRecord = {
            ...records[0],
            detail: detailData,
        };
        setDetailData(updatedRecord.detail || "");
        localStorage.setItem("studyData", JSON.stringify({...studyData, [date]: [updatedRecord]}));
        setIsEditing(false);
    }

    return(
        <div className="fixed inset-0  flex items-center justify-center" onClick={onClose}>
            <div className="bg-zinc-50 border border-gray-300 p-4 rounded  w-1/3 m-auto h-auto overflow-y-auto"
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
                                <textarea className="w-full h-20 p-2 border rounded" ref={testAreaRef} readOnly={!isEditing} value={detailData} onChange={(e) => setDetailData(e.target.value)} />
                                <div>
                                    {isEditing ? (
                                        <button type="button" className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-500" onClick={handleSave}>
                                            Save
                                        </button>
                                    ) : (
                                    <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500" onClick={handleEdit}>
                                        Edit
                                    </button>
                                    )}
                                    <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded ml-2 cursor-pointer hover:bg-gray-500" onClick={onClose}>
                                        Done
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