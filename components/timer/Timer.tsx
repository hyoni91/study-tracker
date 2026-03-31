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
    <div>
      {isRunning ? (
        <button type="button" onClick={endHandler}>
          End
        </button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="what are you studying?"
            value={input}
            onChange={inputHandler}
          />
          <button type="button" onClick={start}>
            Start
          </button>
        </div>
      )}
      <GrassGrid />
    </div>
  );
}
