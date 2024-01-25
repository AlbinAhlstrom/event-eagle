import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

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
    console.log(targetDateString);

    return () => clearInterval(timer);
  }, [targetDateString]);

  return (
    <div className="grid grid-flow-col gap-5 text-center justify-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.hours } as React.CSSProperties}/>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
        <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}/>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
        <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}/>
        </span>
        sec
      </div>
    </div>
  );
}

export default CountdownTimer;
