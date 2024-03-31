import Image from "next/image"

const StcCard = () => {
  return (
    <div className=" rounded-[10px] px-4 py-[18px] flex justify-between items-center border-[#E4E7EC] border-[1px] basis-0 flex-grow">
      <div className="">
        <p className=" text-sm leading-[20px] font-medium text-[#475467]">Total No of STCs</p>
        <p className=" text-lg leading-[24px] font-bold text-[#344054]">2000</p>
      </div>
      <Image src="/images/stc/Featured icon (1).png" width={40} height={40} alt="image denoting number of STC"/>
    </div>
  )
}

export default StcCard
