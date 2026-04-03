"use client";

import { useTimer } from "@/hooks/useTimer";
import { saveStudy } from "@/lib/storage";
import { useState } from "react";
import GrassGrid from "../grass/GrassGrid";

export default function Timer() {
  const [input, setInput] = useState("");
  const { start, end, isRunning, startTime } = useTimer();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const endHandler = () => {
    const endData = end();
    if (!endData) return;
    saveStudy({
      id: crypto.randomUUID(), //PK (new Date()도 가능하지만, 중복 방지를 위해 UUID추천)
      date: new Date().toISOString().split("T")[0],
      startTime: endData.startTime,
      endTime: endData.endTime,
      duration: endData.duration,
      title: input,
    });
    setInput(""); //reset input after saving
  };

  return (
  <div className="flex flex-col items-center gap-6 p-6">
    <h1 className="text-2xl font-bold">Study Tracker</h1>
    {/* Timer 영역 */}
    <div className="flex items-center gap-3">
      {isRunning ? (
        <button
          type="button"
          onClick={endHandler}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
        >
          End
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="What are you studying?"
            value={input}
            onChange={inputHandler}
            className="border px-4 py-2 rounded-md w-64 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={start}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Start
          </button>
        </>
      )}
    </div>

    {/* 잔디 */}
    <div className="mt-4">
      <GrassGrid />
    </div>
  </div>
);
}
