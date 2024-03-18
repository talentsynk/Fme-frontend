import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { OtpCompStyles } from "./style";
import OTPInput from "react-otp-input";


interface IOtpComp{
    setUserOtp : Dispatch<SetStateAction<string>>;
    isError ?: boolean;
}
let regex = /^[a-zA-Z]+$/;

export const OtpComp:React.FC<IOtpComp> = ({setUserOtp, isError}) => {
  const [otp, setOtp] = useState("");
  const setOtpValue = (value: string) => {
    setOtp(value);
    setUserOtp(value);
  };
  return (
    <OtpCompStyles $isError={isError} >
      <OTPInput
        value={otp}
        onChange={(value) => setOtpValue(value)}
        numInputs={5}
        renderInput={(props) => <input {...props} />}
        skipDefaultStyles={true}
        placeholder="*****"
        inputType="tel"
      />
    </OtpCompStyles>
  );
};
