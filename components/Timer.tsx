import React, { useState, useEffect } from "react";

type TimerProps = {
  duration: number; // duration of the timer in seconds
};

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(true);

  const handleReset = () => {
    setIsPaused(false);
    setTimeLeft(duration);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (timeLeft > 0 && !isPaused) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timeLeft, isPaused]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="pomodoro-container">
      <div id="mainClock">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
      <div id="buttons">
        {isPaused ? (
          <button className="button" onClick={handleResume}>
            START
          </button>
        ) : (
          <button className="button" onClick={handlePause}>
            PAUSE
          </button>
        )}
        <button className="button" onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};

export default Timer;
