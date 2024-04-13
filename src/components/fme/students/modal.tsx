import {
	CopyIcon,
	CreationSuccessIcon,
	ErrorAlertIcon,
	GraphIcon,
	IconWrapper,
	LargeCheckedIcon,
	LocationIcon,
	NameIcon,
	SuspendIcon,
	TotalCoursesIcon,
	TotalSTCIcon,
	TryAgainIcon,
} from "@/components/icons/fme/mda";
import { XIcon } from "@/components/icons/sidebar";
import { CheckedIcon, EmailIcon, FormErrorIcon } from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { FormEvent, ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
//   import { Ierror } from "@/app/recovery/page";
//   import { validateEmail } from "@/utils/validateEmail";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { States } from "../mda/data";
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
import { StatusComp } from "../mda/mda";
import { CertifiedStudentIcon, UncertifiedStudentIcon } from "@/components/icons/fme/stc";
import { SuccessModal } from "../mda/modals";

interface IOneButtonModal {
	cancelModal: () => void;
}

interface IForm {
	email: string;
	name: {
		firstName: string;
		lastName: string;
		otherNames: string;
	};
	address: string;
	state: string;
}

interface Ierror {
	active: boolean;
	text: string;
}

const validateEmail = (email: string): boolean => {
	// Email validation logic
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return regex.test(email);
};

export const NewStudentModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
	const [form, setForm] = useState<IForm>({
		email: "",
		name: {
			firstName: "",
			lastName: "",
			otherNames: "",
		},
		address: "",
		state: "",
	});

	const [emailError, setEmailError] = useState<Ierror>({
		active: false,
		text: "",
	});

	const [nameError, setNameError] = useState<Ierror>({
		active: false,
		text: "",
	});

	const [addressError, setAddressError] = useState<Ierror>({
		active: false,
		text: "",
	});

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!validateEmail(value)) {
			setEmailError({ active: true, text: "Invalid email address" });
		} else {
			setEmailError({ active: false, text: "Valid Email" });
			setForm({ ...form, email: value });
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
		const value = e.target.value;
		if (input === "firstName") {
			const updatedName = { ...form.name, firstName: value };
			setForm({ ...form, name: updatedName });
			if (value.trim().length < 1) {
				setNameError({ active: true, text: "First Name is required" });
			} else {
				setNameError({ active: false, text: "First Name is valid" });
			}
		} else if (input === "lastName") {
			const updatedName = { ...form.name, lastName: value };
			setForm({ ...form, name: updatedName });
			if (value.trim().length < 1) {
				setNameError({ active: true, text: "Last Name is required" });
			} else {
				setNameError({ active: false, text: "Last Name is valid" });
			}
		} else if (input === "otherNames") {
			const updatedName = { ...form.name, otherNames: value };
			setForm({ ...form, name: updatedName });
		} else if (input === "address") {
			setAddressError({
				active: value.trim().length < 1,
				text: value.trim().length < 1 ? "Address is required" : "Address is valid",
			});
			setForm({ ...form, address: value });
		}
	};

	// for states
	const [state, setState] = useState("");
	const [states, setStates] = useState(States);

	const [showDropdown, setShowDropdown] = useState(false);
	const handleStateSelection = (name: string) => {
		setState(name);
		setShowDropdown(false);
	};

	const [isSuccess, setIsSuccess] = useState(false);

	const isFormValid = () => {
		return (
			!emailError.active &&
			!addressError.active &&
			!nameError.active &&
			emailError.text !== "" &&
			addressError.text !== "" &&
			state !== "" &&
			nameError.text !== ""
		);
	};

	const handleCreateStc = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission
		// check if the username and pwd match the DB using the APIendpoint, setup the user session using redux and navigate to the respective dashboard
		if (isFormValid()) {
			// call createSTC API
			console.log(form);
			setIsSuccess(true);
		}
	};
   const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
     const handleContinue = () => {
				// Assuming formData is already populated with the first modal's data
				setIsFirstModalOpen(false);
				setIsSecondModalOpen(true);
			};

			const handlePrevious = () => {
				setIsFirstModalOpen(true);
				setIsSecondModalOpen(false);
			};

	const router = useRouter();

	return (
		<>
			{isSuccess === false && (
				<NewMdaAbsoluteStyles>
					<div className="form">
						<NewMdaFormStyles className="bd">
							<div className="fl">
								<div className="form-head">
									<h3>Add New Student</h3>
									<p>Fill in the necessary details to add a new Student</p>
								</div>
								<IconWrapper onClick={cancelModal}>
									<XIcon />
								</IconWrapper>
							</div>
							<form className="form" onSubmit={handleCreateStc}>
								{isFirstModalOpen && (
									<div className="form-input">
										<div className="flex justify-between gap-4">
											<div className="form-ele flex-1">
												<label htmlFor="firstName">First Name</label>
												<div className="inp">
													<input
														type="text"
														name="firstName"
														value={form.name.firstName}
														className={nameError.active ? "error-bdr" : ""}
														onChange={(e) => handleInput(e, "firstName")}
														placeholder="Please type in your first name here"
													/>
													<div className="abs">
														{nameError.active === false && nameError.text === "" && <NameIcon />}
														{nameError.active === false && nameError.text !== "" && <CheckedIcon />}
														{nameError.active === true && <FormErrorIcon />}
													</div>
													<p role="alert" aria-live="assertive" aria-atomic="true" className={nameError.active ? "error-msg" : "correct"}>
														{nameError.text}
													</p>
												</div>
											</div>
											<div className="form-ele flex-1">
												<label htmlFor="lastName">Last Name</label>
												<div className="inp">
													<input
														type="text"
														name="lastName"
														value={form.name.lastName}
														className={nameError.active ? "error-bdr" : ""}
														onChange={(e) => handleInput(e, "lastName")}
														placeholder="Please type in your last name here"
													/>
													<div className="abs">
														{nameError.active === false && nameError.text === "" && <NameIcon />}
														{nameError.active === false && nameError.text !== "" && <CheckedIcon />}
														{nameError.active === true && <FormErrorIcon />}
													</div>
													<p role="alert" aria-live="assertive" aria-atomic="true" className={nameError.active ? "error-msg" : "correct"}>
														{nameError.text}
													</p>
												</div>
											</div>
										</div>
										<div className="form-ele">
											<label htmlFor="otherNames">Other Names</label>
											<div className="inp">
												<input
													type="text"
													name="otherNames"
													value={form.name.otherNames}
													onChange={(e) => handleInput(e, "otherNames")}
													placeholder="Please type in your other names here"
												/>
												<div className="abs">
													{nameError.active === false && nameError.text === "" && <NameIcon />}
													{nameError.active === false && nameError.text !== "" && <CheckedIcon />}
													{nameError.active === true && <FormErrorIcon />}
												</div>
											</div>
										</div>
										<div className="form-ele">
											<label htmlFor="email">Email</label>
											<div className="inp">
												<input
													type="text"
													name="email"
													value={form.email}
													onChange={handleEmailChange}
													placeholder="Please type in your Email Address"
													className={emailError.active ? "error-bdr" : ""}
													autoComplete="email"
												/>
												<div className="abs">
													{emailError.active === false && emailError.text === "" && <EmailIcon />}
													{emailError.active === false && emailError.text !== "" && <CheckedIcon />}
													{emailError.active === true && <FormErrorIcon />}
												</div>
												<p role="alert" aria-live="assertive" aria-atomic="true" className={emailError.active ? "error-msg" : "correct"}>
													{emailError.text}
												</p>
											</div>
										</div>
										<div className=" flex justify-between gap-4">
											<div className="form-ele flex-1">
												<label htmlFor="address">Address</label>
												<div className="inp">
													<input
														type="text"
														name="address"
														value={form.address}
														onChange={(e) => handleInput(e, "address")}
														className={addressError.active ? "error-bdr" : ""}
														placeholder="Please type in Students address here"
													/>
													<div className="abs">
														{addressError.active === false && addressError.text === "" && <LocationIcon />}
														{addressError.active === false && addressError.text !== "" && <CheckedIcon />}
														{addressError.active === true && <FormErrorIcon />}
													</div>
													<p role="alert" aria-live="assertive" aria-atomic="true" className={addressError.active ? "error-msg" : "correct"}>
														{addressError.text}
													</p>
												</div>
											</div>
											<div className="form-ele flex-1">
												<label htmlFor="state">State of Operation</label>
												<StatesDropdownStyles>
													<div className="head" onClick={() => setShowDropdown(!showDropdown)}>
														<>
															{state === "" ? <p className="placeholder">Please select state of residence</p> : <p className="state-name">{state}</p>}
														</>
														<AngleDownStyles $isSelected={showDropdown}>
															<AngleDown />
														</AngleDownStyles>
													</div>
													{showDropdown && (
														<div className="dropdown">
															{states.map((ele, index) => (
																<StateCompStyles $isSelected={state === ele.name} key={index} onClick={() => handleStateSelection(ele.name)}>
																	<p>{ele.name}</p>
																</StateCompStyles>
															))}
														</div>
													)}
												</StatesDropdownStyles>
											</div>
										</div>
										<div className="">
											<label htmlFor="gender" className=" text-[#101928] font-semibold">
												Gender
											</label>
											<div className="">
												<div className=" flex gap-4">
													<input type="radio" name="gender" value="male" id="gender" /> <span>Male</span>
												</div>
												<div className="flex gap-4">
													<input type="radio" name="gender" value="female" id="gender" /> <span>Female</span>
												</div>
											</div>
										</div>
									</div>
								)}
								{isSecondModalOpen && (
									<div className="form-input">
										<div className="form-ele flex-1">
											<label htmlFor="firstName">Student ID</label>
											<div className="inp">
												<input
													type="text"
													name="studentID"
													value={form.name.firstName}
													className={nameError.active ? "error-bdr" : ""}
													onChange={(e) => handleInput(e, "firstName")}
													placeholder="Please type in your Student ID"
												/>
												<div className="abs">
													{nameError.active === false && nameError.text === "" && <NameIcon />}
													{nameError.active === false && nameError.text !== "" && <CheckedIcon />}
													{nameError.active === true && <FormErrorIcon />}
												</div>
												
											</div>
										</div>
										<div className="form-ele flex-1">
											<label htmlFor="lastName">Training Center attended</label>
											<div className="inp">
												<input
													type="text"
													name="lastName"
													value={form.name.lastName}
													className={nameError.active ? "error-bdr" : ""}
													onChange={(e) => handleInput(e, "lastName")}
													placeholder="Please select Training center"
												/>
												<div className="abs">
													{nameError.active === false && nameError.text === "" && <NameIcon />}
													{nameError.active === false && nameError.text !== "" && <CheckedIcon />}
													{nameError.active === true && <FormErrorIcon />}
												</div>
												
											</div>
										</div>

										<div className="form-ele">
											<label htmlFor="otherNames">NSQ Level attained</label>
											<div className="inp">
												<input
													type="text"
													name="otherNames"
													value={form.name.otherNames}
													onChange={(e) => handleInput(e, "otherNames")}
													placeholder="Please type in your NSQ Level attained"
												/>
												<div className="abs">
													{nameError.active === false && nameError.text === "" && <NameIcon />}
													{nameError.active === false && nameError.text !== "" && <CheckedIcon />}
													{nameError.active === true && <FormErrorIcon />}
												</div>
											</div>
										</div>
										<div className="form-ele">
											<label htmlFor="email">Course taken</label>
											<div className="inp">
												<input
													type="text"
													name="email"
													value={form.email}
													onChange={handleEmailChange}
													placeholder="Please type in courrse taken"
													className={emailError.active ? "error-bdr" : ""}
													autoComplete="email"
												/>
												<div className="abs">
													{emailError.active === false && emailError.text === "" && <EmailIcon />}
													{emailError.active === false && emailError.text !== "" && <CheckedIcon />}
													{emailError.active === true && <FormErrorIcon />}
												</div>
												
											</div>
										</div>
										<div className=" flex justify-between gap-4">
											<div className="form-ele flex-1">
												<label htmlFor="address">Start date</label>
												<div className="inp">
													<input
														type="date"
														name="address"
														value={form.address}
														onChange={(e) => handleInput(e, "address")}
														className={addressError.active ? "error-bdr" : ""}
														placeholder="Please enter yoour start date"
													/>
													<div className="abs">
														{addressError.active === false && addressError.text === "" && <LocationIcon />}
														{addressError.active === false && addressError.text !== "" && <CheckedIcon />}
														{addressError.active === true && <FormErrorIcon />}
													</div>
													
												</div>
											</div>
											<div className="form-ele flex-1">
												<label htmlFor="state">End date</label>
												<div className="inp">
													<input
														type="date"
														name="address"
														value={form.address}
														onChange={(e) => handleInput(e, "address")}
														className={addressError.active ? "error-bdr" : ""}
														placeholder="Please enter yoour start date"
													/>
													<div className="abs">
														{addressError.active === false && addressError.text === "" && <LocationIcon />}
														{addressError.active === false && addressError.text !== "" && <CheckedIcon />}
														{addressError.active === true && <FormErrorIcon />}
													</div>
													
												</div>
											</div>
										</div>
									</div>
								)}
								{isFirstModalOpen && (
									<div className="flex gap-4">
										<button
											className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
											onClick={cancelModal}>
											Cancel
										</button>
										<button
											className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
												isFormValid() ? "" : "opacity-50 cursor-not-allowed"
											}`}
											onClick={handleContinue}
											disabled={!isFormValid()}>
											Continue
										</button>
									</div>
								)}
								{isSecondModalOpen && (
									<div className="flex gap-4">
										<button
											className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
											onClick={handlePrevious}>
											Previous Page
										</button>
										<button
											className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
												isFormValid() ? "" : "opacity-50 cursor-not-allowed"
											}`}
											type="submit"
											disabled={!isFormValid()}>
											Create Student
										</button>
									</div>
								)}
							</form>
						</NewMdaFormStyles>
					</div>
				</NewMdaAbsoluteStyles>
			)}
			{isSuccess && (
				<FlexAbsoluteModalStyles>
					<SuccessModal
						head="New Student has been successfully created !"
						msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
						cancelModal={cancelModal}
						icon={<CreationSuccessIcon />}
						hasCancel={true}
						navigationFunction={() => router.push("/fme")}
						navigationText="Go back to Dashboard"
					/>
				</FlexAbsoluteModalStyles>
			)}
		</>
	);
};

export const StudentsDetailModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
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
									<p>OA</p>
								</div>
								<div className="deet">
									<h4>Oluwatimilehin Alarape</h4>
									<p>Added on Jul 11, 2023</p>
								</div>
							</div>
						</div>
						<div className="r-2">
							<div className="details">
								<div className="dx">
									<div className="name">
										<span>Name of Student</span>
										<p>Oluwatimilehin Alarape</p>
									</div>
									<CopyIcon text="Fed Ministry of Works & Housing" />
								</div>
								<div className="dx">
									<div className="name">
										<span>Student ID</span>
										<p className="nm">#1234567</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div>
								<div className="dx">
									<div className="name">
										<span>Student Phone Number</span>
										<p className="nm">08124524525</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div>
								<div className="dx">
									<div className="name">
										<span>Student Address</span>
										<p className="nm">1, Ajanaku street, Agege, Lagos State.</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div>
								<div className="dx">
									<div className="name">
										<span>State of Residence</span>
										<p className="nm">Lagos State</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div>
								<div className="dx">
									<div className="name">
										<span>Course Taken</span>
										<p className="nm">Fashion Design</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div>
								<div className="dx">
									<div className="name">
										<span>Student Certificate</span>
										<p className="nm">Oluwatimilehin Alarape PDF.pdf</p>
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
							<h4>Suspend Student</h4>
							<div className="btn">
								<button type="button" onClick={() => setShowSuspendModal(true)}>
									<SuspendIcon />
									<p>Suspend this student</p>
								</button>
							</div>
						</div>
					</div>
				</MDADetailStyle>
			)}
			{showSuspendModal && <SuspendStudentComp handleModalAction={() => console.log("handler")} cancelModal={() => setShowSuspendModal(false)} />}
		</>
	);
};

interface ITwoActions {
	cancelModal: () => void;
	handleModalAction: () => void;
}

export const SuspendStudentComp: React.FC<ITwoActions> = ({ cancelModal, handleModalAction }) => {
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
								<h4>Suspend Student?</h4>
								<p>Are you sure you want to suspend this Student? It will no longer be visible and not able to take any course for.</p>
							</div>
							<div className="down">
								<button type="button" onClick={cancelModal} className="cancel">
									Cancel
								</button>
								<button type="button" onClick={suspend}>
									Suspend Student
								</button>
							</div>
						</div>
					</TwoButtonModalStyles>
				)}
				{isSuccess && (
					<SuccessModal
						head="Student has been successfully suspended !"
						msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
						cancelModal={cancelModal}
						hasCancel={true}
						navigationFunction={() => router.push("/fme")}
						navigationText="Go back to Dashboard"
					/>
				)}
			</FlexAbsoluteModalStyles>
		</>
	);
};

export const ReactivateMdaComp: React.FC<ITwoActions> = ({ cancelModal, handleModalAction }) => {
	const [isSuccess, setIsSuccess] = useState(false);
	const reactivate = () => {
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
								<h4>Re-activate Student?</h4>
								<p>You are about to re-activate this student and restore it to its latter glory. Are you sure you want to take this action?</p>
							</div>
							<div className="down">
								<button type="button" onClick={cancelModal} className="cancel">
									Cancel
								</button>
								<button type="button" onClick={reactivate}>
									Re-activate STC
								</button>
							</div>
						</div>
					</TwoButtonModalStyles>
				)}
				{isSuccess && (
					<SuccessModal
						head="STC has been successfully re-activated !"
						msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
						cancelModal={() => window.location.reload()}
						hasCancel={true}
						navigationFunction={() => router.push("/fme")}
						navigationText="Go back to Dashboard"
					/>
				)}
			</FlexAbsoluteModalStyles>
		</>
	);
};

export const NewComp = () => {
	return <></>;
};
