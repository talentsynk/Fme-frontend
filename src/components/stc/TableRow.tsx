import { DotsSvg } from "./Svg"


const TableRow = ({name,courses,total_students,address, state, status}) => {
  return (
   <tr className="border-[#F9FAFB] border-2">
    <td className="w-[33.3%] p-4"><input type="checkbox" className="mr-2" name="" id="" />{name}</td>
    <td className="w-[11.1%] p-4">{courses}</td>
    <td className="w-[11.1%] p-4">{total_students}</td>
    <td className="w-[11.1%] p-4">{address}</td>
    <td className="w-[11.1%] p-4">{state}</td>
    <td className="w-[22.22%] p-4 flex justify-between ">{status} <span className="ml-16"><DotsSvg /></span></td>
   </tr>
  )
}

export default TableRow
