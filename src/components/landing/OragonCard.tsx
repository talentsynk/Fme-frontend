interface OragonCard{
  title:string;
  text:string;
  status:boolean;
}
interface ISavedOragonCard{
  title:string;
  text:string;
  status:string;
  state:string;
  price:string;
}
import { Clock, Location, Padlock, Star, Tick } from './faqs/Svgs'

const EmployersOragonCard:React.FC<OragonCard> = ({title,text,status}) => {
  return (
    <div className=' border-[#F0F0F0] border border-solid rounded-2xl p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{title}</h5>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{text}</p>
            <div className=" flex justify-between w-full">
              <div className=" space-y-1">
              <h6 className=" text-[12px] font-medium leading-[17px]">Application Status</h6>
            <button className="bg-[#00932E] flex items-center gap-1 text-white rounded-md py-1 px-2 text-[10px] font-bold"><Tick /> <span className="">Job offered</span></button>
              </div>
              <button className=" bg-[#00932E] text-white rounded-md py-1 px-4 text-sm font-medium">View Job</button>
            </div>
        </div>
      
    </div>
  )
}
const OragonCard:React.FC<OragonCard> = ({title,text,status}) => {
  return (
    <div className=' bg-white rounded-2xl p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{title}</h5>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{text}</p>
            <div className=" flex justify-between w-full">
              <div className=" space-y-1">
              <h6 className=" text-[12px] font-medium leading-[17px]">Application Status</h6>
            <button className={` ${status?"bg-[#00932E] text-white" :"bg-[#ffE5DD] text-[#FE764B]"} flex items-center gap-1 rounded-md py-1 px-2 text-[10px] font-bold`}>{status?<Tick />:<Clock />} <span className="">{status?"Job offered":"In Review"}</span></button>
              </div>
              <button className=" bg-[#00932E] text-white rounded-md py-1 px-4 text-sm font-medium">View Job</button>
            </div>
        </div>
      
    </div>
  )
}
const SavedOragonCard:React.FC<ISavedOragonCard> = ({title,text,status,state,price}) => {
  return (
    <div className=' bg-white rounded-2xl border-[#f0f0f0] border border-solid p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <div className=' flex justify-between'>
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{title}</h5>
            <Star />
            </div>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{text}</p>
            <div className=" flex justify-between">
              <div className="">
              <h6 className=" text-[12px] font-medium leading-[17px]">{price} .  {status}</h6>
            <div className=" flex gap-1 bg-[#F5F5F5] rounded p-1 justify-center items-center">
              <Location />
            <p className=" text-[#919191] text-[10px] font-medium">{state}</p>
            </div>
              </div>
              <button className=" bg-[#00932E] text-white rounded-md py-2 px-4 text-sm font-medium">Apply now</button>
            </div>
        </div>
      
    </div>
  )
}

export { EmployersOragonCard, OragonCard, SavedOragonCard }

