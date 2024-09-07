import { GoldStar, VerifiedTick } from "../landing/faqs/Svgs"
interface IReview{
  CreatedAt:string;
  Rating:number;
  EmployerID:number;
  Description:string;
  FirstName:string;
  LastName:string;
}

const Recommendations:React.FC<IReview> = ({FirstName,LastName,Rating,Description,CreatedAt}) => {
  const getDaysAgo = (dat: string): number => {
    const currentDate = new Date();
    const createdDate = new Date(dat);

    // Calculate the difference in time between the two dates in milliseconds
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    // Convert time difference from milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysAgo;
};
  const lol=getDaysAgo(CreatedAt)
  return (
    <section className=" space-y-2 my-4 border-b-[#EBEDEF] border-b-[1px] p-2 border-solid">
    <div className=" flex justify-between items-center">
    <div className=" flex gap-2">
        <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[rgba(52,202,165,0.1)] ">
                                    {/* <p>{fullName.slice(0, 2).toUpperCase()}</p> */}
                                    <p className="font-semibold text-[16px] leading-[24px] text-[#101928]">{FirstName[0]}{LastName[0]}</p>
                <VerifiedTick />
        </div>
 <div className="">
         <h4 className=" text-black font-bold text-[16px] leading-6">{FirstName} {LastName}</h4>
                                    <div className=" flex gap-2 text-[#B9B9B9] font-medium text-[12px] leading-[17.4px]">
                                        <p className="">Artisan</p>
                                        <p className="">Rate:</p>
                                        <GoldStar />
                                        <p className="">{Rating}</p>
                                    </div>
       </div>
    </div>
    <p className=" text-[12px] font-medium text-black-70">Posted {lol} days ago </p>
    </div>
    <p className=" text-black font-medium text-sm">
    {Description}
    </p>
</section>
  )
}

export default Recommendations
