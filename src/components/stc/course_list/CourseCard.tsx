
import Link from "next/link";
interface Post {
	name: string;
	id: Number;
}

const CourseCard: React.FC<Post> = ({ id, name }) => {
	return (
		<Link
			href={`/stc/course-list/[slug]?course=${id}`}
			className="bg-[#F1F5FF] rounded-[10px] w-[200px] h-[126px]  py-[18px] flex flex-col justify-center items-center gap-[19px]">
			<div className=" h-12 bg-[#e7f6ec]  w-12 rounded-[50%] flex justify-center items-center text-[#00932e] font-bold">
				<p>{name.slice(0, 2).toUpperCase()}</p>
			</div>
			<p className=" text-center text-sm font-semibold text-[#344054]">{name}</p>
		</Link>
	);
};

export default CourseCard;
