import { FabricationSvg } from "./Svg"
import Link from "next/link"
interface Post{
  post:number;
}

const CourseCard:React.FC<Post> = ({post}) => {
  return (
    <Link href={`/fme/course-list/${post}`} className="bg-[#F1F5FF] rounded-[10px] px-8 py-[18px] flex flex-col justify-center items-center gap-[19px] w-fit">
      <FabricationSvg />
      <p className=" text-sm font-semibold text-[#344054]">Fabrication and Welding</p>
    </Link>
  )
}

export default CourseCard
