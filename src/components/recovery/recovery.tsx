import React, { useEffect, useState } from "react";
import { ArrowLeft } from "../icons/recovery";
import { BackBtnStyles } from "./style";
import Cookies from "js-cookie";

interface IBackBtn {
  backFunction: () => void;
  text?: string;
}

export const BackBtn: React.FC<IBackBtn> = ({ backFunction, text }) => {
  return (
    <BackBtnStyles onClick={backFunction}>
      <ArrowLeft />
      <p>{text ? text : "Back"}</p>
    </BackBtnStyles>
  );
};

interface ICountdownProps {
  onExpire: () => void;
}

export const CountdownTimer: React.FC<ICountdownProps> = ({ onExpire }) => {
  const duration = 2 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(duration);
    const [hasExpired, setHasExpired] = useState(false);
  useEffect(() => {
    const otpRequestTime = Cookies.get("otpRequestTime");
    if (otpRequestTime) {
      const requestTime = new Date(otpRequestTime).getTime();
      const expiryTime = requestTime + duration;
      const timeRemaining = Math.max(expiryTime - Date.now(), 0); // Ensure timeRemaining is not negative
      setTimeLeft(timeRemaining);
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(intervalId);
          setHasExpired(true);
          return 0;
        }
        return Math.max(prevTimeLeft - 1000, 0); // Decrease by 1 second
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup
  }, [duration]);

  useEffect(()=>{
    if(hasExpired){
        onExpire();
    }
  },[hasExpired]);

  // Calculate minutes and seconds
  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <>
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </>
  );
};

//  component (`AccountRecovery`) while rendering a different component (`CountdownTimer`). To locate the bad setState() call inside `CountdownTimer`,
