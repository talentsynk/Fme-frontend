"use client";
import { Ierror } from "@/app/recovery/page";
import {
	SearchAndResultStyle,
	StatListItemStyle,
	StatListStyle,
	TabSwitchStyle,
	TopStyles,
	WhiteContainer,
	TableStyles,
	SortOptionsStyle,
} from "@/components/fme/mda/styles";
import { IStudentData, StudentData, StudentsTabSwitches } from "@/components/fme/students/data";
import { ActiveIcon, CancelInputIcon, InactiveIcon, MagnifyingGlassIcon, PlusIcon, TotalIcon, UploadIcon } from "@/components/icons/fme/mda";
import { sortStudentListDataAlphabetically } from "@/utils/sortData";
import { SortItemDropdownList } from "@/components/fme/mda/data";
import { motion } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { StudentTableRow } from "@/components/mda/students/students";
import { NewStudentModal } from "@/components/mda/students/modal";
import { FilterBtns } from "@/components/fme/mda/data";
import { FilterBtnComp, MdaItemComp } from "@/components/fme/mda/mda";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";
import { setUnchangedStudentsList, setSelectedStudentId, mdaSelector, setFakeNewStudentId } from "@/redux/mda/mdaSlice";
import Cookies from "js-cookie";
import { IStudentCompData } from "@/types/Student";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TRSkeleton } from "@/components/fme/skeleton/TrSkeleton";
import { BACKEND_URL } from "@/lib/config";
import { Paginator } from "@/components/fme/paginator/Paginator";
import { setPageNo } from "@/redux/mda/mdaSlice";


export default function Home() {
	
	const [showCancel, setShowCancel] = useState(false);
	const [studentTabSwitches, setStudentTabSwitches] = useState(StudentsTabSwitches);
	const [total, setTotal] = useState({
		totalStudents: 0,
		totalActive: 0,
		totalInactive: 0,
	});
	const { unchangedStudentsList, fakeNewStudentId } = useAppSelector(mdaSelector);
	const dispatch = useAppDispatch();
	const [studentsListDuplicate, setStudentsListDuplicate] = useState<IStudentCompData[] | null>(null);

	const handleTabSwitch = (tabIndex: number) => {
		const newMdaTabSwitches = studentTabSwitches.map((ele) => {
			return { ...ele, isSelected: tabIndex == ele.tabIndex };
		});
		setStudentTabSwitches(newMdaTabSwitches);

		const sortStatus = sortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
		if (tabIndex == 0) {
			if (sortStatus && studentList !== null) {
				const sortedStudentListData = sortStudentListDataAlphabetically(studentList, sortStatus == "-1");
				setStudentsListDuplicate(sortedStudentListData);
			} else {
				setStudentsListDuplicate(studentList);
			}
		} else if (tabIndex == 1) {
			const newStudentsList = studentList?.filter((ele) => ele.IsActive);
			if (newStudentsList) {
				if (sortStatus) {
					const sortedStudentsData = sortStudentListDataAlphabetically(newStudentsList, sortStatus == "-1");
					setStudentsListDuplicate(sortedStudentsData);
				} else {
					setStudentsListDuplicate(newStudentsList);
				}
			}
		} else if (tabIndex == 2) {
			const newStudentsList = studentList?.filter((ele) => ele.IsActive == false);
			if (newStudentsList) {
				if (sortStatus) {
					const sortedStudentsData = sortStudentListDataAlphabetically(newStudentsList, sortStatus == "-1");
					setStudentsListDuplicate(sortedStudentsData);
				} else {
					setStudentsListDuplicate(newStudentsList);
				}
			}
		}
	};

	useEffect(() => {
		let token = Cookies.get("token");
		console.log(token)
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/student/all`, config)
			.then((res) => {
				const data = res.data.students;
				setStudentList(data);
				setStudentsListDuplicate(data);
				// store data in redux so it can reused across components for easy lookup
				dispatch(setUnchangedStudentsList(data));
				dispatch(setSelectedStudentId(null));
				const maxStudentId = data.reduce((max: number, obj: IStudentCompData) => Math.max(max, obj.ID), 0);
				dispatch(setFakeNewStudentId(maxStudentId));
			})
			.catch((error) => console.log(error));

		axios
			.get(`${BACKEND_URL}/student/all?active=true`, config)
			.then((res) => {
				const activeStudents = res.data;
				console.log(activeStudents);
				axios
					.get(`${BACKEND_URL}/student/all?active=false`, config)
					.then((res) => {
						const inactiveStudents = res.data;
						console.log(inactiveStudents);
						const totalActive = activeStudents?.students?.length;
						const totalInactive = inactiveStudents?.students!==null? inactiveStudents?.students?.length:0;
						const totalStudents = totalActive + totalInactive;
						console.log(totalActive,totalInactive)

						setTotal({
							totalStudents: totalStudents,
							totalActive: totalActive,
							totalInactive: totalInactive,
						});
					})
					.catch((error) => {
						console.error("Error fetching inactive students:", error);
					});
			})
			.catch((error) => {
				console.error("Error fetching active students:", error);
			});
	}, [dispatch, fakeNewStudentId]);

	useEffect(() => {
		setStudentList(unchangedStudentsList);
		setStudentsListDuplicate(unchangedStudentsList);
		dispatch(setSelectedStudentId(null));
		setStudentTabSwitches(StudentsTabSwitches);
		let token = Cookies.get("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		// handle suspend and activate here

		axios
			.get(`${BACKEND_URL}/student/all?active=true`, config)
			.then((res) => {
				const activeStudents = res.data;
				axios
					.get(`${BACKEND_URL}/student/all?active=false`, config)
					.then((res) => {
						const inactiveStudents = res.data;

						const totalActive = activeStudents.students.length;
						const totalInactive = inactiveStudents?.students!==null? inactiveStudents?.students.length:0;
						const totalStudents = totalActive + totalInactive;

						setTotal({
							totalStudents: totalStudents,
							totalActive: totalActive,
							totalInactive: totalInactive,
						});
					})
					.catch((error) => {
						console.error("Error fetching inactive students:", error);
					});
			})
			.catch((error) => {
				console.error("Error fetching active students:", error);
			});
	}, [unchangedStudentsList]);

	const [showNewStudentFormModal, setShowNewStudentFormModal] = useState(false);
	// for search
	const [query, setQuery] = useState("");
	const [queryError, setQueryError] = useState<Ierror>({
		active: false,
		text: "",
	});

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
		// return stcList and listDuplicate to default - might involve calling the api
		const sortStatus = sortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
		if (sortStatus && unchangedStudentsList !== null) {
			const sortedSTCData = sortStudentListDataAlphabetically(unchangedStudentsList, sortStatus == "-1");
			setStudentsListDuplicate(sortedSTCData);
			setStudentList(unchangedStudentsList);
		} else {
			setStudentsListDuplicate(unchangedStudentsList);
			setStudentList(unchangedStudentsList);
		}
		setShowCancel(false);
	};
	// student data
	const [studentList, setStudentList] = useState<IStudentCompData[] | null>(null);
	// stores the unchanged student initial data, this is useful to prevent multiple API calls when no data is changing

	// for dynamic student data
	// const [studentListDuplicate, setStudentListDuplicate] = useState<IStudentCompData[] | null>(null);

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission
		if (query.trim().length >= 1) {
			// filter from the unchanged stc list
			const newStudentList = unchangedStudentsList?.filter((ele) => ele.LastName.toLowerCase().includes(query.toLowerCase()));
			if (newStudentList && newStudentList.length > 0) {
				// set sort filter to default;
				const sortStatus = sortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
				if (sortStatus) {
					const sortedStudentData = sortStudentListDataAlphabetically(newStudentList, sortStatus == "-1");
					setStudentsListDuplicate(sortedStudentData);
					setStudentList(newStudentList);
				} else {
					setStudentsListDuplicate(newStudentList);
					setStudentList(newStudentList);
				}
			} else {
				setQueryError({
					active: true,
					text: "Name not found! Please check your spelling",
				});
			}
		}
	};

	// filter and sort
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [sortItemDropdownList, setSortItemDropdownList] = useState(SortItemDropdownList);

	const [filterBtns, setFilterBtns] = useState(FilterBtns);
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
			const newMdaList = sortItemDropdownList.map((ele) => {
				return { ...ele, isSelected: ele.id === id };
			});
			if (id == "1" && studentsListDuplicate !== null) {
				const sortedMDAData = sortStudentListDataAlphabetically(studentsListDuplicate);
				setStudentsListDuplicate(sortedMDAData);
				console.log(studentsListDuplicate);
			} else if (id == "-1" && studentsListDuplicate !== null) {
				const sortedMDAData = sortStudentListDataAlphabetically(studentsListDuplicate, true);
				setStudentsListDuplicate(sortedMDAData);
			} else if (id == "0") {
				setStudentsListDuplicate(studentList);
				setFilterBtns(FilterBtns);
			}
			setSortItemDropdownList(newMdaList);
			setShowSortDropdown(false);
		}
	};

	return (
		<>
			<TopStyles>
				<div className="text">
					<h1>Students List</h1>
					<p>Take a look at your policies and the new policy to see what is covered</p>
				</div>
				<div className="buttons">
					<button type="button" className="add" onClick={() => setShowNewStudentFormModal(true)}>
						<PlusIcon />
						<span>Add New Student</span>
					</button>
					<button type="button" className="import">
						<UploadIcon />
						<span>Import CSV</span>
					</button>
				</div>
			</TopStyles>
			<WhiteContainer>
				<StatListStyle>
					<StatListItemStyle>
						<div className="stat">
							<span>Total No of Students</span>
							<p>{typeof(total.totalStudents)==='number'?total.totalStudents:<Skeleton />}</p>
						</div>
						<TotalIcon />
					</StatListItemStyle>
					<StatListItemStyle>
						<div className="stat">
							<span>Active Students</span>
							<p>{typeof(total.totalActive)==='number'?total.totalActive:<Skeleton />}</p>
						</div>
						<ActiveIcon />
					</StatListItemStyle>
					<StatListItemStyle>
						<div className="stat">
							<span>Inactive Students</span>
							<p>{typeof(total.totalInactive)==='number'?total.totalInactive:<Skeleton />}</p>
						</div>
						<InactiveIcon />
					</StatListItemStyle>
				</StatListStyle>
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
									handleFilterFunc={() => {}}
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
										{ele.isSelected && studentsListDuplicate && (
											<div className="num">
												<span>{studentsListDuplicate?.length}</span>
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
									{studentsListDuplicate && studentsListDuplicate.map((ele, index) => <StudentTableRow key={index} {...ele} />)}
									{studentsListDuplicate === null && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => <TRSkeleton key={index} />)}
								</tbody>
							</TableStyles>
						</div>
					</div>
				</SearchAndResultStyle>
			</WhiteContainer>
			{showNewStudentFormModal && <NewStudentModal cancelModal={() => setShowNewStudentFormModal(false)} />}
		</>
	);
}
