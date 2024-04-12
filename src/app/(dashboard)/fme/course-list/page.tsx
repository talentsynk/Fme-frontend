"use client";
interface MyComponentProps {
	currentItems: number[];
}
import { NewMdaModal } from "@/components/fme/course_list/modals";
import { useState, FormEvent } from "react";
// import ReactPaginate from 'react-paginate';
import CourseCard from "@/components/fme/course_list/CourseCard";
import CurrentCourse from "@/components/fme/course_list/CurrentCourse";
// import SearchSection from "@/components/stc/SearchSection";
import {
	ActiveIcon,
	CancelInputIcon,
	CopyIcon,
	FilterIcon,
	InactiveIcon,
	MagnifyingGlassIcon,
	PlusIcon,
	SortIcon,
	TotalIcon,
	UploadIcon,
} from "@/components/icons/fme/mda";
import {
	DropdownOptionsStyle,
	FilterBtnStyles,
	SearchAndResultStyle,
	SortOptionsStyle,
	StatListItemStyle,
	StatListStyle,
	TabSwitchStyle,
	TableStyles,
	TopStyles,
	WhiteContainer,
} from "@/components/fme/mda/styles";
import { Ierror } from "@/app/recovery/page";
import { ICourseData } from "@/components/fme/course_list/data";
import { SortItemDropdownList } from "@/components/fme/mda/data";
import { sortCourseDataAlphabetically } from "@/components/fme/course_list/data";

// export const metadata: Metadata = {
//   title: "dashboard",
//   description: "dashboard for setting courses",
// };
const mockArray = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
	40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
];

const Items: React.FC<MyComponentProps> = ({ currentItems }) => {
	return <>{currentItems && currentItems.map((coursecard) => <CourseCard key={coursecard} post={coursecard} />)}</>;
};

export default function Home() {
	// const mappedArray=mockArray.map(coursecard=>(<CourseCard key={coursecard} />))
	//mock data
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
	const [unchangedCourseList, setUnchangedCourseList] = useState<ICourseData[] | null>(null);
	// for dynamic student data
	const [courseListDuplicate, setCourseListDuplicate] = useState<ICourseData[] | null>(null);
	const [showCancel, setShowCancel] = useState(false);

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission
		if (query.trim().length >= 1) {
			// filter from the unchanged stc list
			const newCourseList = unchangedCourseList?.filter((ele) => ele.course.toLowerCase().includes(query.toLowerCase()));
			if (newCourseList && newCourseList.length > 0) {
				// set sort filter to default;
				const sortStatus = SortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
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
		if (sortStatus && unchangedCourseList !== null) {
			const sortedSTCData = sortDataAlphabetically(unchangedCourseList, sortStatus == "-1");
			setCourseListDuplicate(sortedSTCData);
			setCourseList(unchangedCourseList);
		} else {
			setCourseListDuplicate(unchangedCourseList);
			setCourseList(unchangedCourseList);
		}
		setShowCancel(false);
	};
	//

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
					<button type="button" className="import">
						<UploadIcon />
						<span>Import CSV</span>
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

				<div className="pad">
					<div className="options">
						{studentTabSwitches.map((ele, index) => (
							<TabSwitchStyle key={index} $tabIndex={ele.tabIndex} $isSelected={ele.isSelected} onClick={() => handleTabSwitch(ele.tabIndex)}>
								<div className="no">
									<p>{ele.text}</p>
									{ele.isSelected && studentListDuplicate && (
										<div className="num">
											<span>{studentListDuplicate?.length}</span>
										</div>
									)}
								</div>
								{ele.isSelected && <motion.div className="underline" layoutId="underline"></motion.div>}
							</TabSwitchStyle>
						))}
					</div>
				</div>
				<div className="pad scroll">
					<div className="result">
						<TableStyles>
							<thead>
								<tr>
									<th>STUDENT PROFILE</th>
									<th>STUDENT ID</th>
									<th>COURSES TAKEN</th>
									<th>ADDRESS</th>
									<th className="faint">STATUS</th>
								</tr>
							</thead>
							<tbody>
								{studentListDuplicate &&
									studentListDuplicate.map((ele, index) => (
										<StudentTableRow
											key={index}
											isActive={ele.isActive}
											profile={ele.profile}
											coursesNo={ele.coursesNo}
											studentId={ele.studentId}
											state={ele.state}
											id={ele.id}
										/>
									))}
							</tbody>
						</TableStyles>
					</div>
				</div>
			</SearchAndResultStyle>
			<section className="p-4 rounded-lg bg-white">
				<CurrentCourse />
				<div className=" flex flex-wrap gap-4 p-4 justify-evenly ">
					<Items currentItems={currentItems} />
				</div>
				{/* <ReactPaginate
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          nextClassName={"item next "}
          pageClassName={'item pagination-page '}
          previousClassName={"item previous"}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
			</section>
			{showNewMdaFormModal && <NewMdaModal cancelModal={() => setShowNewMdaFormModal(false)} />}
		</section>
	);
}
