
interface Progress{
    progress:number;
}


const ProgressBar:React.FC<Progress> = ({ progress }) => { 
    return ( 
<div className="w-[240px] bg-gray-200 rounded-full h-3"> <div className="bg-[#00932E] h-3 rounded-full" style={{ width: `${progress}%` }} ></div> </div> 
);
 }; 

export default ProgressBar;