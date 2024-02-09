import { useState, useEffect } from "react";
import { CountdownTimerProps } from "../util";


function CountdownTimer({ targetDate: targetDateString }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date(targetDateString);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      const totalHours = Math.floor(difference / (1000 * 60 * 60));
      const timeLeft = {
        hours: totalHours,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      return timeLeft;
    }

    return { hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateString]);

  return (
    <div className="bg-accent rounded-xl ">
    <div className="grid grid-flow-col gap-2 py-1 text-center justify-center auto-cols-max">
      <div className="flex flex-col p-1 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-3xl">
          <span style={{ "--value": timeLeft.hours } as React.CSSProperties}/>
        </span>
        hours
      </div>
      <div className="flex flex-col p-1 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-3xl">
        <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}/>
        </span>
        min
      </div>
      <div className="flex flex-col p-1 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-3xl">
        <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}/>
        </span>
        sec
      </div>
    </div>
    </div>
  );
}

export default CountdownTimer;