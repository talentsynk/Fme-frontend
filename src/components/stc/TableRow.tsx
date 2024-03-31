import StcMenu from "./StcMenu"
// import { DotsSvg } from "./Svg"
interface RowData{
  name:string;
  courses:string;
  total_students:number;  
  address:string;   
  state:string;
  status:string;
}


const TableRow:React.FC<RowData> = ({name,courses,total_students,address, state, status}) => {
  return (
   <tr className="border-[#F9FAFB] border-2">
    <td className="w-[33.3%] p-4"><input type="checkbox" className="mr-2" name="" id="" />{name}</td>
    <td className="w-[11.1%] p-4">{courses}</td>
    <td className="w-[11.1%] p-4">{total_students}</td>
    <td className="w-[11.1%] p-4">{address}</td>
    <td className="w-[11.1%] p-4">{state}</td>
    <td className="w-[22.22%] p-4 text-center"><div className={`text-sm font-bold text-[#099137] inline-block px-2 py-1 bg-[#E7F6EC] rounded-xl`}>{status} </div><div className=" text-center inline-block ml-16 w-10 h-10 rounded-[4px] border border-[#E4E7EC]  items-center"><StcMenu /></div></td>
   </tr>
  )
}

export default TableRow
