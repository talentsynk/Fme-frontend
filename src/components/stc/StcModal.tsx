type StcModalProps = {
  isOpen: boolean;
  onClose: () => void;

};
import Link from "next/link";
import { BackSvg, Profile } from "../course_list/Svg";
import { CopySvg, Delete, Download, FMSvg, PDF, TwoSvg } from "./Svg";

const StcModal:React.FC<StcModalProps> = ({ isOpen, onClose }) => {
    return (
      <>
        {isOpen && (
          <section className="fixed text-left  top-0 right-0 h-full w-1/5 bg-white shadow-lg z-50 p-6">
            <Link href="#" onClick={onClose} className=' p-[10px] rounded-[20px] flex gap-2.5 border border-[#EBEDF4] justify-center items-center w-[125px] h-[42px]'>
              <BackSvg />
              <span className=" text-[#768396] font-medium text-[12px]">Back</span>
              </Link>
              <div className=" flex gap-2 items-center py-4">
                <div className="w-12 h-12 flex justify-center items-center rounded-[50%] bg-[#E7F6EC]"><FMSvg /></div>
                <div className="">
                    <p className=" text-[#344054] font-bold  text-lg leading-6">Fed Ministry of Works & Housing</p>
                    <p className=" text-[#475467]  font-medium text-sm leading-5">Added on July 11, 2023</p>
                </div>
              </div>
              <div className=" bg-[#E4E7EC] h-[1px] mx-[-16px]"></div>
              <section className="  my-2">
                <div className=" flex justify-between">
                  <div className="w-[48%] rounded-[10px] h-[130px] border border-[#EDF2F7] p-2 flex flex-col justify-between">
                    <Profile />
                    <p className=" text-[12px] leading-[145%] text-[#8B8D97] font-medium">Total Students</p>
                    <p className=" leading-[145%] text-[#45464E] font-bold">10,000</p>
                  </div>
                  <div className="w-[48%] rounded-[10px] h-[130px] border border-[#EDF2F7] p-2 flex flex-col justify-between">
                   <TwoSvg />
                    <p className=" text-[12px] leading-[145%] text-[#8B8D97] font-medium">Total Students</p>
                    <p className=" leading-[145%] text-[#45464E] font-bold">10,000</p>
                  </div>
                </div>
                <div className="mt-2 mx-auto w-[48%] rounded-[10px] h-[130px] border border-[#EDF2F7] p-2 flex flex-col justify-between">
                <TwoSvg />
                  <p className=" text-[12px] leading-[145%] text-[#8B8D97] font-medium">Total Students</p>
                  <p className="  leading-[145%] text-[#45464E] font-bold">10,000</p>
                </div>
              </section>
             <section className="flex flex-col gap-2">
             <div className=" flex justify-between items-center">
                <div className=" space-y-1">
                  <p className=" text-[12px] leading-[145%] text-[#475467]">Name of STC</p>
                  <p className=" text-sm leading-5 text-[#344054] font-bold">Fed Ministry of Works & Housing</p>
                </div>
                <CopySvg />
              </div>
              <div className=" flex justify-between items-center">
                <div className="space-y-1">
                  <p className=" text-[12px] leading-[145%] text-[#475467]">STC Address</p>
                  <p className=" text-sm leading-5 text-[#344054] font-bold">124, Oyediran Estate, Lagos, Nigeria, 5432</p>
                </div>
                <CopySvg />
              </div>
              <div className=" flex justify-between items-center">
                <div className="space-y-1">
                  <p className=" text-[12px] leading-[145%] text-[#475467]">STC Document of Operation</p>
                  <div className=" flex gap-1"><PDF /> <p className="text-sm leading-5 text-[#344054] font-bold">Fed Ministry of Works & Housing PDF .pdf</p></div>
                </div>
                <Download />
              </div>
              <div className=" space-y-1">
                <p className=" text-[12px] text-[#475467]">Status</p>
                <div className=" rounded-xl px-3 py-[2px] bg-[#E7F6EC] text-[#099317] text-sm font-bold w-fit">Active</div>
              </div>
              <div className=" bg-[#E4E7EC] h-[1px] mx-[-16px]"></div>
              <section className="py-4 space-y-2">
                <div className=" flex justify-between items-center"><p className="">Suspend this MDA</p> <p className="">Toggle</p></div>
                <div className=" flex justify-between items-center"><p className="">Delete this MDA</p> <Delete /></div>
              </section>
        
             </section>
          </section>
        )}
      </>
    );
  };
  
  export default StcModal;
  