import React from 'react';

const OTP: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4">
      <input
        type="text"
        className="w-12 h-12 text-center border rounded-[16px] border-[#D0D5DD] border-solid"
        maxLength={1}
      />
      <input
        type="text"
        className="w-12 h-12 text-center border rounded-[16px] border-[#D0D5DD] border-solid"
        maxLength={1}
      />
      <input
        type="text"
        className="w-12 h-12 text-center border rounded-[16px] border-[#D0D5DD] border-solid"
        maxLength={1}
      />
      <input
        type="text"
        className="w-12 h-12 text-center border rounded-[16px] border-[#D0D5DD] border-solid"
        maxLength={1}
      />
    </div>
  );
};

export default OTP;
