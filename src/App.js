import "./styles.css";

import React, { useRef, useState } from "react";

export default function App(props) {
  const intervalId = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [time, setTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  function handleStart() {
    setStartTime(Date.now());
    setTime(Date.now());
    clearInterval(intervalId.current);
    setIsRunning(true);
    intervalId.current = setInterval(() => {
      setTime(Date.now());
    }, 10);
  }

  function handlePauseTimer() {
    clearInterval(intervalId.current);
    setIsRunning(false);
    if (startTime && time) {
      setElapsedTime((prev) => prev + (time - startTime));
      setStartTime(null);
    }
  }

  function handleStopTimer() {
    clearInterval(intervalId.current);
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setTime(null);
  }

  let secondsPassed = 0;
  if (startTime && time) {
    secondsPassed = (elapsedTime + (time - startTime)) / 1000;
  } else {
    secondsPassed = elapsedTime / 1000;
  }
  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>Time lapsed: {secondsPassed.toFixed(3)}</p>
      <button onClick={handleStart} disabled={isRunning}>
        {elapsedTime !== 0 ? "Restart" : "Start"}
      </button>
      <button onClick={handlePauseTimer}>Pause</button>
      <button onClick={handleStopTimer}>Stop</button>
    </div>
  );
}
