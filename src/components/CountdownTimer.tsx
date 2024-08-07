import React, { useEffect, useState } from "react";

const CountdownTimer = ({ time }: { time?: number }) => {
  const [count, setCount] = useState(time ?? 5);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive && count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (count === 0) {
      setIsActive(false);
    }
  }, [isActive, count]);

  return <div>{isActive ? <h1>{count}</h1> : <h1>시간 종료!</h1>}</div>;
};

export default CountdownTimer;
