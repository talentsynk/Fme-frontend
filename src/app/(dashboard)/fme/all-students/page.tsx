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
import {
	ActiveIcon,
	CancelInputIcon,
	FilterIcon,
	InactiveIcon,
	MagnifyingGlassIcon,
	PlusIcon,
	SortIcon,
	TotalIcon,
	UploadIcon,
} from "@/components/icons/fme/mda";
import { sortStudentListDataAlphabetically } from "@/utils/sortData";
import { SortItemDropdownList } from "@/components/fme/mda/data";
import { motion } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { StudentTableRow } from "@/components/fme/students/students";
import { NewStudentModal } from "@/components/fme/students/modal";
import { sortStudentDataAlphabetically } from "@/components/fme/students/data";
import { FilterBtns } from "@/components/fme/mda/data";
import { FilterBtnComp } from "@/components/fme/mda/mda";
import { MdaItemComp } from "@/components/fme/mda/mda";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fmeSelector } from "@/redux/fme/fmeSlice";
import { setUnchangedStudentsList, setSelectedStudentId } from "@/redux/fme/fmeSlice";

// the first page on the fme dashboard

export default function Home() {
	const [sortItemDropdownList, setSortItemDropdownList] = useState(SortItemDropdownList);
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [filterBtns, setFilterBtns] = useState(FilterBtns);
	const [showCancel, setShowCancel] = useState(false);
	const [studentTabSwitches, setStudentTabSwitches] = useState(StudentsTabSwitches);

	const handleSelectSortDropdownItem = (id: string | undefined) => {
		if (id) {
			const newStudentList = sortItemDropdownList.map((ele) => {
				return { ...ele, isSelected: ele.id === id };
			});
			if (id == "1" && studentListDuplicate !== null) {
				const sortedStudentData = sortStudentDataAlphabetically(studentListDuplicate);
				setStudentListDuplicate(sortedStudentData);
			} else if (id == "-1" && studentListDuplicate !== null) {
				const sortedSTCData = sortStudentDataAlphabetically(studentListDuplicate, true);
				setStudentListDuplicate(sortedSTCData);
			} else if (id == "0") {
				setStudentListDuplicate(studentList);
				setFilterBtns(FilterBtns);
			}
			setSortItemDropdownList(newStudentList);
			setShowSortDropdown(false);
		}
	};
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

	const handleTabSwitch = (tabIndex: number) => {
		const newMdaTabSwitches = studentTabSwitches.map((ele) => {
			return { ...ele, isSelected: tabIndex == ele.tabIndex };
		});
		setStudentTabSwitches(newMdaTabSwitches);

		const sortStatus = SortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
		if (tabIndex == 0) {
			if (sortStatus && studentList !== null) {
				const sortedStudentListData = sortStudentListDataAlphabetically(studentList, sortStatus == "-1");
				setStudentListDuplicate(sortedStudentListData);
			} else {
				setStudentListDuplicate(studentList);
			}
		} else if (tabIndex == 1) {
			const newStudentsList = studentList?.filter((ele) => ele.isActive);
			if (newStudentsList) {
				if (sortStatus) {
					const sortedStudentsData = sortStudentListDataAlphabetically(newStudentsList, sortStatus == "-1");
					setStudentListDuplicate(sortedStudentsData);
				} else {
					setStudentListDuplicate(newStudentsList);
				}
			}
		} else if (tabIndex == 2) {
			const newStudentsList = studentList?.filter((ele) => ele.isActive == false);
			if (newStudentsList) {
				if (sortStatus) {
					const sortedStudentsData = sortStudentListDataAlphabetically(newStudentsList, sortStatus == "-1");
					setStudentListDuplicate(sortedStudentsData);
				} else {
					setStudentListDuplicate(newStudentsList);
				}
			}
		}
	};

	useEffect(() => {
		setStudentList(StudentData);
		setStudentListDuplicate(StudentData);
		setUnchangedStudentsList(StudentData);
	}, []);

	const handleSelect = () => {
		console.log("I was selected");
	};
	const [showNewStudentFormModal, setShowNewStudentFormModal] = useState(false);
	// for search
	const [query, setQuery] = useState("");
	const [queryError, setQueryError] = useState<Ierror>({
		active: false,
		text: "",
	});
	// student data
	const [studentList, setStudentList] = useState<IStudentData[] | null>(null);
	// stores the unchanged student initial data, this is useful to prevent multiple API calls when no data is changing
	const { unchangedStudentsList } = useAppSelector(fmeSelector);
	// for dynamic student data
	const [studentListDuplicate, setStudentListDuplicate] = useState<IStudentData[] | null>(null);

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
		const sortStatus = SortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
		if (sortStatus && unchangedStudentsList !== null) {
			const sortedSTCData = sortStudentDataAlphabetically(unchangedStudentsList, sortStatus == "-1");
			setStudentListDuplicate(sortedSTCData);
			setStudentList(unchangedStudentsList);
		} else {
			setStudentListDuplicate(unchangedStudentsList);
			setStudentList(unchangedStudentsList);
		}
		setShowCancel(false);
	};

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission
		if (query.trim().length >= 1) {
			// filter from the unchanged stc list
			const newStudentList = unchangedStudentsList?.filter((ele) => ele.profile.toLowerCase().includes(query.toLowerCase()));
			if (newStudentList && newStudentList.length > 0) {
				// set sort filter to default;
				const sortStatus = SortItemDropdownList.find((ele) => ele.isSelected == true)?.id;
				if (sortStatus) {
					const sortedStudentData = sortStudentDataAlphabetically(newStudentList, sortStatus == "-1");
					setStudentListDuplicate(sortedStudentData);
					setStudentList(newStudentList);
				} else {
					setStudentListDuplicate(newStudentList);
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

	const dispatch = useAppDispatch();
	useEffect(() => {
		setStudentList(StudentData);
		setStudentListDuplicate(StudentData);
		dispatch(setUnchangedStudentsList(StudentData));
		dispatch(setSelectedStudentId(null));
	}, [dispatch]);

	useEffect(() => {
		setStudentList(unchangedStudentsList);
		setStudentListDuplicate(unchangedStudentsList);
		setStudentTabSwitches(studentTabSwitches);
		dispatch(setSelectedStudentId(null));
	}, [unchangedStudentsList]);

useEffect(() => {
	const fetchData = async () => {
		try {
			const response = await fetch("https://fme-backend-version-1.onrender.com/student/all", {
				method: "GET",
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTYzODM1MDMsInN1YiI6Imp1ZGVAZ21haWwuY29tIn0.WiBYTjJLkDFmDc2EbnQ_4qZgBTbvD6phGCZ0ljq60cU",
				},
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const jsonData = await response.json();
			console.log(jsonData);
		} catch (error:any) {
			console.log(error.message);
		}
	};

	fetchData();
}, []);
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
							<p>4000</p>
						</div>
						<TotalIcon />
					</StatListItemStyle>
					<StatListItemStyle>
						<div className="stat">
							<span>Certified Students</span>
							<p>3000</p>
						</div>
						<ActiveIcon />
					</StatListItemStyle>
					<StatListItemStyle>
						<div className="stat">
							<span>Non-Certified Students</span>
							<p>1000</p>
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
			</WhiteContainer>
			{showNewStudentFormModal && <NewStudentModal cancelModal={() => setShowNewStudentFormModal(false)} />}
		</>
	);
}
