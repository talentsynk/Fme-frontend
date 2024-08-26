import { VerifiedTick } from "../landing/faqs/Svgs"

const Recommendations = () => {
  return (
    <section className=" space-y-2 my-4 border-b-[#EBEDEF] border-b-[1px] p-2 border-solid">
    <div className=" flex justify-between items-center">
    <div className=" flex gap-2">
        <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[rgba(52,202,165,0.1)] ">
                                    {/* <p>{fullName.slice(0, 2).toUpperCase()}</p> */}
                                    <p className="font-semibold text-[16px] leading-[24px] text-[#101928]">OM</p>
                <VerifiedTick />
        </div>
 <div className="">
         <h4 className=" text-black font-bold text-[16px] leading-6">Oluwatimilehin Alarape</h4>
                                    <div className=" flex gap-2 text-[#B9B9B9] font-medium text-[12px] leading-[17.4px]">
                                        <p className="">Artisan</p>
                                        <p className="">Rate:</p>
                                        <p className="">4.5/5.0</p>
                                    </div>
       </div>
    </div>
    <p className=" text-[12px] font-medium text-black-70">Posted two days ago </p>
    </div>
    <p className=" text-black font-medium text-sm">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque torto, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorr
    </p>
</section>
  )
}

export default Recommendations
