interface ICourse {
	Id: number;
	Name: string;
	Description: string;
}

import { useEffect, FormEvent, ReactNode, useState } from "react";
import axios from "axios";
import {
	CheckedBoxIcon,
	CopyIcon,
	CreationSuccessIcon,
	ErrorAlertIcon,
	GraphIcon,
	IconWrapper,
	LargeCheckedIcon,
	LocationIcon,
	NameIcon,
	SuspendIcon,
	ThreedotsIcon,
	TotalCoursesIcon,
	TotalSTCIcon,
	TotalStudentsIcon,
	TryAgainIcon,
	UncheckedBoxIcon,
} from "@/components/icons/fme/mda";
import {
	ErrorIconWrapper,
	FlexAbsoluteModalStyles,
	MDADetailStyle,
	NewMdaAbsoluteStyles,
	NewMdaFormStyles,
	OneButtonModalStyles,
	StateCompStyles,
	StatesDropdownStyles,
	TwoButtonModalStyles,
} from "../mda/styles";
import { ButtonLoader } from "@/components/recovery/style";
import { XIcon } from "@/components/icons/sidebar";
import { CheckedIcon, EmailIcon, FormErrorIcon } from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { usePathname, useRouter } from "next/navigation";
import { StatusComp } from "../mda/mda";
import { Ierror } from "@/app/recovery/page";
import { validateEmail } from "@/utils/validateEmail";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { Courses } from "./data";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/config";

interface IOneButtonModal {
	cancelModal: () => void;
}

interface IForm {
	CategoryID: Number;
	Name: string;
	Description: string;
}

export const NewMdaModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
	const [form, setForm] = useState<IForm>({
		CategoryID: 1,
		Description: "",
		Name: "",
	});

	const [Name, setName] = useState("");
	const [NameError, setNameError] = useState<Ierror>({
		active: false,
		text: "",
	});
	const [Description, setDescription] = useState("");
	const [DescriptionError, setDescriptionError] = useState<Ierror>({
		active: false,
		text: "",
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
		const value = e.target.value;
		if (input == "Name") {
			setName(value);
			if (value.trim().length < 1) {
				setNameError({ active: true, text: "Course title is required" });
			} else {
				setNameError({ active: false, text: "Course title is valid" });
				setForm({ ...form, Name: value });
			}
		}
		if (input == "Description") {
			setDescription(value);
			if (value.trim().length < 1) {
				setDescriptionError({ active: true, text: "Course description  is required" });
			} else {
				setDescriptionError({ active: false, text: "Course description  is valid" });
				setForm({ ...form, Description: value });
			}
		}
	};
	// for states
	const [course, setCourse] = useState<string>("");
	const [courses, setCourses] = useState<ICourse[]>([]);

	const [showCourseDropdown, setShowCourseDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleCourseSelection = (name: string, value: number) => {
		setForm({ ...form, CategoryID: value });
		setCourse(name);
		setShowCourseDropdown(false);
	};

	useEffect(() => {
		// Fetch states from API when component mounts
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		try {
			const token = Cookies.get("token");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.get(`${BACKEND_URL}/category/all`, config);
			// Assuming the API response is an array of state names
			console.log(response.data);
			setCourses(response.data.Categories);
		} catch (error) {
			console.error("Error fetching courses:", error);
		}
	};

	const [isSuccess, setIsSuccess] = useState(false);
	const handleCreateCourse = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!DescriptionError.active && !NameError.active && DescriptionError.text !== "" && course !== "" && NameError.text !== "") {
			// call createMDA API
			const token = Cookies.get("token");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const body = {
					Name: form.Name,
					Description: form.Description,
					CategoryID: form.CategoryID,
				};
				console.log("Request Body:", body);
				setIsLoading(true);
				const { data } = await axios.post(`${BACKEND_URL}/course/create`, body, config);
				if (data) {
					setIsLoading(false);
					// update fakeMdaId
					// let newFakeId = fakeNewStudentId ? fakeNewStudentId + 1 : 1;
					// dispatch(setFakeNewStudentId(newFakeId));
					setIsSuccess(true);
				}
			} catch (error: any) {
				if (error.response) {
					setNameError({
						active: true,
						text: error.response.data.error,
					});
					setDescriptionError({
						active: true,
						text: error.response.data.error,
					});
				}
				setIsLoading(false);
			}
		}
	};

	const router = useRouter();
	return (
		<>
			{isSuccess == false && (
				<NewMdaAbsoluteStyles>
					<div className="form">
						<NewMdaFormStyles className="bd">
							<div className="fl">
								<div className="form-head">
									<h3>Add New Course</h3>
									<p>Fill in the necessary details to add a new course</p>
								</div>
								<IconWrapper onClick={cancelModal}>
									<XIcon />
								</IconWrapper>
							</div>
							<form className="form" onSubmit={handleCreateCourse}>
								<div className="form-input">
									<div className="form-ele">
										<label htmlFor="address">Course category</label>
										<StatesDropdownStyles>
											<div className="head" onClick={() => setShowCourseDropdown(!showCourseDropdown)}>
												<>
													{course == "" ? <p className="placeholder">Please select the course category</p> : <p className="state-name">{course}</p>}
												</>
												<AngleDownStyles $isSelected={showCourseDropdown}>
													<AngleDown />
												</AngleDownStyles>
											</div>
											{showCourseDropdown && (
												<div className="dropdown">
													{courses.map((ele, index) => (
														<StateCompStyles $isSelected={course === ele.Name} key={index} onClick={() => handleCourseSelection(ele.Name, ele.Id)}>
															<p>{ele.Name}</p>
														</StateCompStyles>
													))}
												</div>
											)}
										</StatesDropdownStyles>
									</div>
									<div className="form-ele">
										<label htmlFor="name">Course Title</label>
										<div className="inp">
											<input
												type="text"
												name="courseTitle"
												value={Name}
												className={NameError.active ? "error-bdr" : ""}
												onChange={(e) => handleInput(e, "Name")}
												placeholder="Please type in the course title"
											/>
											<div className="abs">
												{NameError.active === false && NameError.text === "" && <NameIcon />}
												{NameError.active === false && NameError.text !== "" && <CheckedIcon />}
												{NameError.active === true && <FormErrorIcon />}
											</div>
											<p role="alert" aria-live="assertive" aria-atomic="true" className={NameError.active ? "error-msg" : "correct"}>
												{NameError.text}
											</p>
										</div>
									</div>
									<div className="form-ele">
										<label htmlFor="address">Course Description</label>
										<div className="inp">
											<textarea
												name="courseDescription"
												id=""
												value={Description}
												onChange={(e: any) => handleInput(e, "Description")}
												className={DescriptionError.active ? "error-bdr" : ""}
												placeholder="Please type in the course  description"
											/>

											<p role="alert" aria-live="assertive" aria-atomic="true" className={DescriptionError.active ? "error-msg" : "correct"}>
												{DescriptionError.text}
											</p>
										</div>
									</div>
								</div>

								<div className="btn-m">
									<button
										type="submit"
										disabled={
											NameError.text == "" ||
											DescriptionError.text == "" ||
											NameError.active !== false ||
											DescriptionError.active !== false ||
											course == ""
										}>
										{isLoading ? <ButtonLoader /> : "Create Course"}
									</button>
								</div>
							</form>
						</NewMdaFormStyles>
					</div>
				</NewMdaAbsoluteStyles>
			)}
			{isSuccess && (
				<FlexAbsoluteModalStyles>
					<SuccessModal
						head="New Course has been successfully created !"
						msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
						cancelModal={cancelModal}
						icon={<CreationSuccessIcon />}
						navigationText="Go back to Dashboard"
						hasCancel={true}
						navigationFunction={() => router.push("/fme/course-list")}
					/>
				</FlexAbsoluteModalStyles>
			)}
		</>
	);
};

export const MdaDetailModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
	const [showSuspendModal, setShowSuspendModal] = useState(false);
	return (
		<>
			{!showSuspendModal && (
				<MDADetailStyle>
					<div className="left" onClick={cancelModal}></div>
					<div className="right">
						<div className="r-1">
							<BackBtn backFunction={cancelModal} />
							<div className="name">
								<div className="avatar">
									<p>NI</p>
								</div>
								<div className="deet">
									<h4>NITDA</h4>
									<p>Added on Jul 11, 2023</p>
								</div>
							</div>
						</div>
						<div className="r-2">
							<div className="totals">
								<div className="total">
									<IconWrapper>
										<TotalSTCIcon />
									</IconWrapper>
									<div className="title">Total STCs</div>
									<div className="numer">
										<p>1000</p>
										<GraphIcon />
									</div>
								</div>
								<div className="total">
									<IconWrapper>
										<TotalCoursesIcon />
									</IconWrapper>
									<div className="title">Total No of Courses</div>
									<div className="numer">
										<p>1000</p>
										<GraphIcon />
									</div>
								</div>
								<div className="total">
									<IconWrapper>
										<TotalStudentsIcon />
									</IconWrapper>
									<div className="title">Total No of Students</div>
									<div className="numer">
										<p>1000</p>
										<GraphIcon />
									</div>
								</div>
							</div>
							<div className="details">
								<div className="dx">
									<div className="name">
										<span>Name of MDA</span>
										<p>NITDA</p>
									</div>
									<CopyIcon text="NITDA" />
								</div>
								<div className="dx">
									<div className="name">
										<span>MDA Address</span>
										<p className="nm">124, Oyediran Estate, Lagos, Nigeria, 5432</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div>
								<div className="dx">
									<div className="name">
										<span>Status</span>
										<StatusComp $isActive={true} />
									</div>
								</div>
							</div>
						</div>
						<div className="r-3">
							<h4>Suspend MDA</h4>
							<div className="btn">
								<button type="button" onClick={() => setShowSuspendModal(true)}>
									<SuspendIcon />
									<p>Suspend MDA</p>
								</button>
							</div>
						</div>
					</div>
				</MDADetailStyle>
			)}
			{showSuspendModal && <SuspendMdaComp handleModalAction={() => console.log("handler")} cancelModal={() => setShowSuspendModal(false)} />}
		</>
	);
};

interface ITwoActions {
	cancelModal: () => void;
	handleModalAction: () => void;
}

export const SuspendMdaComp: React.FC<ITwoActions> = ({ cancelModal, handleModalAction }) => {
	const [isSuccess, setIsSuccess] = useState(false);
	const suspend = () => {
		handleModalAction();
		setIsSuccess(true);
	};
	const router = useRouter();
	return (
		<>
			<FlexAbsoluteModalStyles>
				{!isSuccess && (
					<TwoButtonModalStyles>
						<div className="pop">
							<div className="up">
								<div className="x" onClick={cancelModal}>
									{" "}
									<ErrorIconWrapper>
										<ErrorAlertIcon />
									</ErrorIconWrapper>
									<XIcon />
								</div>
								<h4>Suspend MDA?</h4>
								<p>Are you sure you want to suspend this MDA? It will no longer be visible and not able to take any course for.</p>
							</div>
							<div className="down">
								<button type="button" onClick={cancelModal} className="cancel">
									Cancel
								</button>
								<button type="button" onClick={suspend}>
									Suspend MDA
								</button>
							</div>
						</div>
					</TwoButtonModalStyles>
				)}
				{isSuccess && (
					<SuccessModal
						head="MDA has been successfully suspended !"
						msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
						cancelModal={cancelModal}
						navigationText="Go back to Dashboard"
						hasCancel={true}
						navigationFunction={() => router.push("/fme/course-list")}
					/>
				)}
			</FlexAbsoluteModalStyles>
		</>
	);
};

interface IMessageModal extends IOneButtonModal {
	head: string;
	msg: string;
	icon?: ReactNode;
	hasCancel?: boolean;
	navigationText: string;
	navigationFunction: () => void;
}

export const SuccessModal: React.FC<IMessageModal> = ({ cancelModal, head, msg, icon, navigationText, navigationFunction }) => {
	const router = useRouter();
	return (
		<OneButtonModalStyles>
			<div className="pop">
				<div className="up">
					<div className="x" onClick={cancelModal}>
						{" "}
						<XIcon />
					</div>
					<div className="l">{icon ? icon : <LargeCheckedIcon />}</div>
					<h4>{head}</h4>
					<p>{msg}</p>
				</div>
				<div className="down">
					<button type="button" onClick={navigationFunction}>
						{navigationText}
					</button>
				</div>
			</div>
		</OneButtonModalStyles>
	);
};

export const FailureModal: React.FC<IMessageModal> = ({ cancelModal, head, msg, navigationText, hasCancel, navigationFunction }) => {
	const router = useRouter();
	return (
		<OneButtonModalStyles $isError={true}>
			<div className="pop">
				<div className="up">
					{hasCancel && (
						<div className="x" onClick={cancelModal}>
							{" "}
							<XIcon />
						</div>
					)}
					<div className="l">
						<TryAgainIcon />
					</div>
					<h4>{head}</h4>
					<p>{msg}</p>
				</div>
				<div className="down">
					<button type="button" onClick={navigationFunction}>
						{navigationText}
					</button>
				</div>
			</div>
		</OneButtonModalStyles>
	);
};
export const NewComp = () => {
	return <></>;
};
