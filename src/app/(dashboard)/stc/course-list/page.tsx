"use client";
interface MyComponentProps {
	currentItems: number[];
}
import { NewMdaModal } from "@/components/stc/course_list/modals";

import axios from "axios";
import Cookies from "js-cookie";
import { FormEvent, useEffect, useState } from "react";
// import ReactPaginate from 'react-paginate';
import CourseCard from "@/components/stc/course_list/CourseCard";
import { FilterBtnComp } from "@/components/fme/mda/mda";
// import SearchSection from "@/components/stc/SearchSection";
import { Ierror } from "@/app/recovery/page";
import { CoursesTabSwitches, ICourseData, sortCourseDataAlphabetically } from "@/components/fme/course_list/data";
import { FilterBtns, SortItemDropdownList } from "@/components/fme/mda/data";
import { MdaItemComp } from "@/components/fme/mda/mda";
import { SearchAndResultStyle, SortOptionsStyle, TopStyles } from "@/components/fme/mda/styles";
import { CourseItemSkeleton } from "@/components/fme/skeleton/CourseItemSkeleton";
import { CancelInputIcon, MagnifyingGlassIcon, PlusIcon, UploadIcon } from "@/components/icons/fme/mda";
import { BACKEND_URL } from "@/lib/config";
import { stcSelector, setFakeNewCourseId, setSelectedCourseId, setUnchangedCoursesList } from "@/redux/stc/stcSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { ICourseCompData } from "@/types/Course";
import "react-loading-skeleton/dist/skeleton.css";
// export const metadata: Metadata = {
//   title: "dashboard",
//   description: "dashboard for setting courses",
// };
const mockArray = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
	40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
];

export default function Home() {
	// use app dispatch
	const { unchangedCoursesList, fakeNewCourseId } = useAppSelector(stcSelector);
	const dispatch = useAppDispatch();
	const [Courses, setCourses] = useState<ICourseCompData[] | null>(null);

	useEffect(() => {
		let token = Cookies.get("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/course/all`, config)
			.then((res) => {
				const data = res.data.course;
				setCourses(data);
				setCourseList(data);
				setCourseListDuplicate(data);
				// store data in redux so it can reused across components for easy lookup
				dispatch(setUnchangedCoursesList(data));
				dispatch(setSelectedCourseId(null));

				// store data in redux so it can reused across components for easy lookup
				// dispatch(setUnchangedMdaList(data));
				// dispatch(setSelectedMdaId(null));
				const maxMdaId = data.reduce((max: number, obj: ICourseCompData) => Math.max(max, obj.Id), 0);
				dispatch(setFakeNewCourseId(maxMdaId));
			})
			.catch((error) => console.log(error));
	}, [dispatch, fakeNewCourseId]);

	const [sortItemDropdownList, setSortItemDropdownList] = useState(SortItemDropdownList);
	const [filterBtns, setFilterBtns] = useState(FilterBtns);
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + 35;
	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const currentItems = mockArray.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(mockArray.length / 35);
	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * 35) % mockArray.length;
		setItemOffset(newOffset);
	};
	const [showNewMdaFormModal, setShowNewMdaFormModal] = useState(false);
	const [query, setQuery] = useState("");
	const [queryError, setQueryError] = useState<Ierror>({
		active: false,
		text: "",
	});
	// student data
	const [courseList, setCourseList] = useState<ICourseData[] | null>(null);
	// stores the unchanged student initial data, this is useful to prevent multiple API calls when no data is changing

	// for dynamic student data
	const [courseListDuplicate, setCourseListDuplicate] = useState<ICourseData[] | null>(null);
	const [showCancel, setShowCancel] = useState(false);
	const [courseTabSwitches, setCourseTabSwitches] = useState(CoursesTabSwitches);

	const handleTabSwitch = (tabIndex: number) => {
		const newMdaTabSwitches = courseTabSwitches.map((ele) => {
			return { ...ele, isSelected: tabIndex == ele.tabIndex };
		});
		setCourseTabSwitches(newMdaTabSwitches);
	};

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (query.trim().length >= 1) {
			const newCourseList = unchangedCoursesList?.filter((ele) => ele.Name.toLowerCase().includes(query.toLowerCase()));
			if (newCourseList && newCourseList.length > 0) {
				// set sort filter to default;
				const sortStatus = sortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
				if (sortStatus) {
					const sortedStudentData = sortCourseDataAlphabetically(newCourseList, sortStatus == "-1");
					setCourseListDuplicate(sortedStudentData);
					setCourseList(newCourseList);
				} else {
					setCourseListDuplicate(newCourseList);
					setCourseList(newCourseList);
				}
			} else {
				setQueryError({
					active: true,
					text: "Name not found! Please check your spelling",
				});
			}
		}
	};

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.trim().length < 1) {
			setQueryError({ active: true, text: "Query cannot be empty" });
			setQuery(value);
		} else {
			setQuery(value);
			setQueryError({ active: false, text: "Press enter to search" });
		}
	};

	const CancelQuerySearch = () => {
		setQuery("");
		setQueryError({ active: false, text: "" });
		// return courseList and listDuplicate to default - might involve calling the api
		const sortStatus = SortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
		if (sortStatus && unchangedCoursesList !== null) {
			const sortedSTCData = sortCourseDataAlphabetically(unchangedCoursesList, sortStatus == "-1");
			setCourseListDuplicate(sortedSTCData);
			setCourseList(unchangedCoursesList);
		} else {
			setCourseListDuplicate(unchangedCoursesList);
			setCourseList(unchangedCoursesList);
		}
		setShowCancel(false);
	};
	//
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const handleClickFilterBtns = (text: string) => {
		const newFilterBtns = filterBtns.map((ele) => {
			return { ...ele, isSelected: ele.text == text };
		});
		if (text == "Sort") {
			setShowFilterDropdown(!showFilterDropdown);
			setShowSortDropdown(!showSortDropdown);
		}
		setFilterBtns(newFilterBtns);
	};

	const handleSelectSortDropdownItem = (id: string | undefined) => {
		if (id) {
			const newCourseList = sortItemDropdownList.map((ele) => {
				return { ...ele, isSelected: ele.id === id };
			});
			if (id == "1" && courseListDuplicate !== null) {
				const sortedCourseData = sortCourseDataAlphabetically(courseListDuplicate);
				setCourseListDuplicate(sortedCourseData);
			} else if (id == "-1" && courseListDuplicate !== null) {
				const sortedCourseData = sortCourseDataAlphabetically(courseListDuplicate, true);
				setCourseListDuplicate(sortedCourseData);
			} else if (id == "0") {
				setCourseListDuplicate(courseList);
				setFilterBtns(FilterBtns);
			}
			setSortItemDropdownList(newCourseList);
			setShowSortDropdown(false);
		}
	};

	console.log(Courses);
	// const Items = courseListDuplicate && courseListDuplicate?.map((course) => <CourseCard key={course.Id.toString()} id={course.Id} name={course.Name} />);

	const CurrentCourse = () => {
		const [activeDiv, setActiveDiv] = useState(1);

		return (
			<div className="  flex gap-4 border-[#E4E7EC] border-b-2">
				<div
					className={` flex items-center gap-1 p-4 cursor-pointer ${
						activeDiv === 1 ? "text-[#00932E] border-b-2 border-b-[#00932E] font-bold" : "text-[#344054] border-inherit"
					}`}
					onClick={() => setActiveDiv(1)}>
					<p className=" text-sm ">Current Course List</p>
					{activeDiv === 1 && <div className=" text-[12px] font-medium bg-[#E7F6EC] rounded-[10px] py-1 px-2">{courseListDuplicate?.length}</div>}
				</div>
				{/* <div
					className={`flex gap-1 p-4 cursor-pointer ${
						activeDiv === 2 ? "text-[#00932E] border-b-2 border-b-[#00932E] font-bold" : "text-[#344054] border-inherit"
					}`}
					onClick={() => setActiveDiv(2)}>
					<p className=" text-sm">Analytics of all Course</p>
					{activeDiv === 2 && <div className=" text-[12px] font-medium bg-[#E7F6EC] rounded-[10px] py-1 px-2">4</div>}
				</div> */}
			</div>
		);
	};

	return (
		<section className="">
			<TopStyles>
				<div className="text">
					<h1>Course List</h1>
					<p>This shows all the courses that are being offered by STCs </p>
				</div>
				<div className="buttons">
					<button type="button" className="add" onClick={() => setShowNewMdaFormModal(true)}>
						<PlusIcon />
						<span>Add New Course</span>
					</button>
					
				</div>
			</TopStyles>

			{/* <SearchSection /> */}
			<SearchAndResultStyle>
				<div className="searchbar">
					<div className="input">
						<div className="glass">
							<MagnifyingGlassIcon />
						</div>
						<form onSubmit={handleSearch}>
							<input
								type="text"
								name="query"
								id=""
								placeholder="Search All Students"
								value={query} 
								className={queryError.active ? "error-bdr" : ""}
								onChange={handleQueryChange}
								onFocus={() => setShowCancel(true)}
							/>
						</form>

						{showCancel && (
							<div className="abs" onClick={CancelQuerySearch}>
								<CancelInputIcon isError={queryError.active} />
							</div>
						)}
						<p className={`msg ${queryError.active ? "error" : "correct"}`}>{queryError.text}</p>
					</div>
					<div className="filsort">
						{/* filterBtns includes both Sort & Filter */}
						{filterBtns.map((ele, index) => (
							<FilterBtnComp
								key={index}
								icon={ele.icon}
								activeIcon={ele.activeIcon}
								text={ele.text}
								isSelected={ele.isSelected}
								handleFilterFunc={() => console.log("I will handle Filter/Sort")}
								handleClick={() => handleClickFilterBtns(ele.text)}
							/>
						))}
						{showSortDropdown && (
							<SortOptionsStyle>
								<div className="options">
									{sortItemDropdownList.map((ele, index) => (
										<MdaItemComp
											key={index}
											id={ele.id}
											isSelected={ele.isSelected}
											text={ele.text}
											hasBorder={ele.hasBorder}
											handleSelect={() => handleSelectSortDropdownItem(ele.id)}
										/>
									))}
								</div>
							</SortOptionsStyle>
						)}
					</div>
				</div>
			</SearchAndResultStyle>
			<section className="p-4 rounded-lg bg-white mt-4">
				<CurrentCourse />
				<div className=" flex flex-wrap gap-2 p-4  ">
					{courseListDuplicate && courseListDuplicate?.map((course) => <CourseCard key={course.Id.toString()} id={course.Id} name={course.Name} />)}
					{courseListDuplicate === null && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => <CourseItemSkeleton key={index} />)}
				</div>
			</section>
			{showNewMdaFormModal && <NewMdaModal cancelModal={() => setShowNewMdaFormModal(false)} />}
		</section>
	);
}
