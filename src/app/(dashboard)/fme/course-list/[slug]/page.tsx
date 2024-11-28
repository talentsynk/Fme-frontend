"use client";
import { BackSvg, CertifiedStudent, MDA, STC, TotalStudent } from "@/components/fme/course_list/Svg";
import { CourseBarChartComp } from "@/components/fme/index";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CourseGraphOptions } from "@/components/fme/index/data";

interface ICourse {
	course_id: number;
	total_students: number;
	unique_mda_count: number;
	unique_stc_count: number;
	graduated_count: number;
	course_name: string;
}

export default function Slug() {
	useEffect(() => {
		const token = Cookies.get("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		// test api call
		// setIsLoading(true);
		axios
			.get(`${BACKEND_URL}/course/1/top-5-mda`, config)
			.then((res) => {
				const data=res.data
			
			})
			.catch((error) => console.log(error));
	});
	//the unique page for each courses
	const searchParams = useSearchParams();

	const [selectedGraphOption, setSelectedGraphOption] = useState(CourseGraphOptions.find((ele) => ele.isSelected === true));

	const courseID = searchParams.get("course");


	const [Course, setCourse] = useState<ICourse | null>(null);

	useEffect(() => {
		let token = Cookies.get("token");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/course/details/${courseID}`, config)
			.then((res) => {
				const data = res.data;
				setCourse(data);
			;
	
			
			})
			.catch((error) => console.log(error));
	}, []);



	const GridCard = () => {
		
		

		return (
			<section className=" flex mt-4 gap-4">
				<section className=" flex-1 space-y-2">
					<section className="flex justify-between">
						<div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[33%] rounded-[10px] border border-[#00932E] bg-[#E7F6EC]">
							<div className="">
								<p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of Students</p>
								<p className=" text-lg font-semibold text-[#344054] leading-6">
									{Course?.total_students !== undefined ? Course?.total_students : <Skeleton />}
								</p>
							</div>
							<TotalStudent />
						</div>
						<div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[63%] rounded-[10px] border border-[#7168C8] bg-[#F5F4FF]">
							<div className="">
								<p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of MDAs</p>
								<p className=" text-lg font-semibold text-[#344054] leading-6">{Course?.unique_mda_count !== undefined ? Course?.unique_mda_count : <Skeleton />}</p>
							</div>
							<CertifiedStudent />
						</div>
					</section>
					<section className="flex justify-between">
						<div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[63%] rounded-[10px] border border-[#81A2F4] bg-[#F1F5FF]">
							<div className="">
								<p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of STCs</p>
								<p className=" text-lg font-semibold text-[#344054] leading-6">{Course?.unique_stc_count !== undefined ? Course?.unique_stc_count : <Skeleton />}</p>
							</div>
							<MDA />
						</div>
						<div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[33%] rounded-[10px] border border-[#E3C54D] bg-[#FFFBEB]">
							<div className="">
								<p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of Certified Students</p>
								<p className=" text-lg font-semibold text-[#344054] leading-6">{Course?.graduated_count==null? <Skeleton />:Course?.graduated_count}</p>
							</div>
							<STC />
						</div>
					</section>
				</section>
				<section className=" flex-1 border border-[#E4E7EC] rounded-[10px] px-5 py-[18px]">
					<div className="graph">
						<CourseBarChartComp option={selectedGraphOption?.name} api={selectedGraphOption?.api} />
					</div>
				</section>
			</section>
		);
	};

	return (
		<section className="py-4">
			<div className="">
				<Link
					href="/fme/course-list"
					className=" p-[10px] rounded-[20px] flex gap-2.5 border border-[#EBEDF4] justify-center items-center w-[125px] h-[42px]">
					<BackSvg />
					<span className=" text-[#768396] font-medium text-[12px]">Back</span>
				</Link>
			</div>
			<div className="flex justify-between items-center">
				<div className="mt-4">
					<h5 className=" text-2xl font-bold text-[#101928] leading-[32px]">{Course?.course_name==null? <Skeleton />:Course?.course_name}</h5>
					<p className=" text-sm text-[#667185] leading-[20px]">Take a look at your policies and see what is covered</p>
				</div>
				<div className=" flex  gap-4">
					{/* <button className=" bg-[#00932E] px-3 py-2 rounded-md flex space-x-2.5">
						<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M9.9987 11.7084C10.3439 11.7084 10.6237 11.9882 10.6237 12.3334V15.8245L11.2234 15.2248C11.4675 14.9807 11.8632 14.9807 12.1073 15.2248C12.3514 15.4689 12.3514 15.8646 12.1073 16.1087L10.4406 17.7754C10.1966 18.0194 9.80083 18.0194 9.55676 17.7754L7.89009 16.1087C7.64601 15.8646 7.64601 15.4689 7.89009 15.2248C8.13417 14.9807 8.5299 14.9807 8.77397 15.2248L9.3737 15.8245V12.3334C9.3737 11.9882 9.65352 11.7084 9.9987 11.7084Z"
								fill="white"
							/>
							<path
								d="M10.1872 1.91675C7.89545 1.91675 6.05029 3.75077 6.05029 5.99763C6.05029 6.38277 6.1042 6.75468 6.20477 7.10685C6.6191 7.22643 7.00696 7.40749 7.35741 7.63932C7.6453 7.82976 7.7243 8.21752 7.53386 8.50541C7.34342 8.7933 6.95565 8.8723 6.66776 8.68186C6.35042 8.47194 5.98967 8.32136 5.60144 8.24603C5.41659 8.21016 5.22507 8.19126 5.02846 8.19126C3.3942 8.19126 2.08203 9.49856 2.08203 11.0957C2.08203 12.6928 3.3942 14.0001 5.02846 14.0001C5.37364 14.0001 5.65346 14.2799 5.65346 14.6251C5.65346 14.9703 5.37364 15.2501 5.02846 15.2501C2.71783 15.2501 0.832031 13.397 0.832031 11.0957C0.832031 8.84213 2.64026 7.01848 4.88496 6.94365C4.8293 6.63637 4.80029 6.32019 4.80029 5.99763C4.80029 3.04651 7.21908 0.666748 10.1872 0.666748C12.8189 0.666748 15.0174 2.53649 15.4832 5.0178C17.3998 5.83134 18.7487 7.71616 18.7487 9.9192C18.7487 12.4808 16.9256 14.612 14.5044 15.1298C14.1669 15.202 13.8347 14.9869 13.7625 14.6493C13.6903 14.3118 13.9054 13.9796 14.243 13.9074C16.1094 13.5083 17.4987 11.8692 17.4987 9.9192C17.4987 8.1386 16.341 6.61747 14.7174 6.06228C14.2936 5.91735 13.8377 5.83832 13.3618 5.83832C12.8763 5.83832 12.4116 5.92057 11.9806 6.07113C11.6547 6.18496 11.2983 6.01306 11.1845 5.68719C11.0706 5.36132 11.2425 5.00487 11.5684 4.89105C12.1303 4.69479 12.7342 4.58832 13.3618 4.58832C13.608 4.58832 13.8506 4.60471 14.0884 4.63647C13.5212 3.05534 11.9922 1.91675 10.1872 1.91675Z"
								fill="white"
							/>
						</svg>
						<span className="font-bold text-white  text-sm">Export CSV</span>
					</button> */}
				</div>
			</div>
			<GridCard />
		</section>
	);
}
