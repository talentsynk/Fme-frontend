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
				</div>
			</div>
			<GridCard />
		</section>
	);
}
