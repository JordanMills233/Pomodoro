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
    <>
      <div>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
      <div>
        {isPaused ? (
          <button onClick={handleResume}>RESUME</button>
        ) : (
          <button onClick={handlePause}>PAUSE</button>
        )}
      </div>
    </>
  );
};

export default Timer;
