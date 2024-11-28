import { Letter } from '@/app/(dashboard)/support/Icons';
import { useState } from 'react';
import Image from 'next/image';
import OTP from './OTP';

const Security = () => {
 const [num, setNum] = useState<number>(1);
 const [securityData, setSecurityData] = useState({
    email: '',
 });
 const [isEmailValid, setIsEmailValid] = useState(true);
 const [emailError, setEmailError] = useState('');

 const isFormEmpty = () => {
    return Object.values(securityData).every(value => value === '');
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email') {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setIsEmailValid(regex.test(value));
      setEmailError(regex.test(value) ? '' : 'Invalid email format');
    }
 };

 const handleSubmit = () => {
 
    setNum(2);
 };

 const handleSecondSubmit = () => {
    setNum(3);
 };

 return (
    <section className="flex p-8">
      <div className="w-[30%] space-y-4">
        <h4 className="text-[#101928] font-semibold">Security</h4>
        <p className="text-[#667185] text-sm">This image will be displayed on your profile</p>
        <button
          className={`w-[129px] h-9 text-white font-semibold border-[1px] rounded-md ${isFormEmpty() || !isEmailValid ? 'bg-[#D0D5DD] cursor-not-allowed' : 'bg-[#00932E] border-[#00932E] hover:bg-[#007427]'}`}
          disabled={isFormEmpty() || !isEmailValid}
          onClick={handleSubmit}
        >
          Save changes
        </button>
      </div>
      {num === 1 && (
        <form action="" className="w-[70%] flex flex-col gap-2">
          <h3 className="text-black text-2xl font-bold leading-[32px]">Reset Password</h3>
          <p className="text-[#645D5D] leading-[32px]">Enter your email address and instructions would be sent on how to reset your password</p>
          <div className="">
            <label htmlFor="email" className="">E-mail address</label>
            <div className="w-full relative">
              <input
                placeholder="Enter Email"
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                value={securityData.email}
                className={`w-full border-[#D0D5DD] border-solid rounded-md p-4 border ${isEmailValid?'border-red-500':'border-[#00932E]'}]`}
              />
              <Letter />
            </div>
            {!isEmailValid && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
        </form>
      )}
      {num === 2 && (
        <div className="ml-auto w-[40%] flex flex-col items-center gap-2">
          <Image src="/images/settings/Currency Crush Security.png" width={232} height={167} alt="Currency Crush Security" />
          <h4 className="text-black text-xl font-bold leading-[32px]">Check your Mail</h4>
          <p className="text-center">A mail has been sent to alarrapetiimilehin@ggmail.com. Follow the steps provided in the mail to update your password or select log in if you dont want to change your password at this time</p>
          <button onClick={handleSecondSubmit} className="flex justify-center items-center bg-[#00932E] w-[90%] rounded-[10px] h-12 text-white font-bold">
            Next
          </button>
          <div className="flex gap-2">
            <p className="">I didnt get the mail</p>
            <div className="cursor-pointer rounded-[6px] px-4 bg-[#E7F6EC] text-[#00932E]">Resend mail</div>
          </div>
        </div>
      )}
      {num === 3 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl leading-[32px]">Verify your email address</h3>
          <p className="">Input the OTP that was sent to your mail to verify your own account</p>
          <OTP />
          <button className="flex justify-center items-center bg-[#00932E] w-[90%] rounded-[10px] h-12 text-white font-bold">
            Verify Mail
          </button>
        </div>
      )}
    </section>
 );
};

export default Security;
