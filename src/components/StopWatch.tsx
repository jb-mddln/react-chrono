import "../App.css";
import { useState, useEffect } from "react";

const formatTime = (value: number) => value.toString().padStart(2, "0");

const StopWatch = () => {
  const [delay, setDelay] = useState(0);
  const [state, setState] = useState({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0
  });

  let intervalId: number = 0;

  useEffect(() => {
    if (delay === 0) {
      clearInterval(intervalId);
      return;
    }

    intervalId = setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        milliseconds: (prevState.milliseconds + 1) % 1000,
        seconds:
          (prevState.seconds +
            Math.floor((prevState.milliseconds + 1) / 1000)) %
          60,
        minutes:
          (prevState.minutes +
            Math.floor(
              (prevState.seconds +
                Math.floor((prevState.milliseconds + 1) / 1000)) /
                60
            )) %
          60,
        hours:
          prevState.hours +
          Math.floor(
            (prevState.minutes +
              Math.floor(
                (prevState.seconds +
                  Math.floor((prevState.milliseconds + 1) / 1000)) /
                  60
              )) /
              60
          ),
      }));
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);

  const handleReset = () => {
    setState({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0
    });
    setDelay(0);
  };

  const handleStart = () => {
    setDelay(1);
  };

  const handlePause = () => {
    setDelay(0);
  };

  const { milliseconds, seconds, minutes, hours } = state;

  return (
    <div>
      <div className="container">
        <span className="time-span">
          {formatTime(hours)} : {formatTime(minutes)} : {formatTime(seconds)} :{" "}
          {formatTime(milliseconds)}
        </span>
      </div>
      <div className="ctrl-btn">
        <button onClick={handleStart} disabled={!!delay}>
          Start
        </button>
        <button onClick={handlePause} disabled={!delay}>
          Pause
        </button>
        <button onClick={handleReset} disabled={!delay && milliseconds === 0}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
