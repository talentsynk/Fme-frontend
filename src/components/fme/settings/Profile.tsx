import { useState } from "react";
import { Letter } from "@/app/(dashboard)/support/Icons";

const Profile = () => {
	const [settingsData, setSettingsData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [emailError, setEmailError] = useState("");
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [passwordError, setPasswordError] = useState("");

	const isFormEmpty = () => {
		return Object.values(settingsData).every((value) => value === "");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSettingsData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		if (name === "email") {
			const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			setIsEmailValid(regex.test(value));
			setEmailError(regex.test(value) ? "" : "Invalid email format");
		}

		if (name === "password") {
			const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
			setIsPasswordValid(passwordRegex.test(value));
			setPasswordError(passwordRegex.test(value) ? "" : "Password must contain at least one letter, one number, and one special character");
		}
	};

	//  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	//     e.preventDefault();
	//     console.log(settingsData);
	//     // Handle form submission logic here
	//  };

	return (
		<div className="flex p-8">
			<div className="w-[30%] space-y-2">
				<h5 className="font-semibold text-[#101928]">Account Information</h5>
				<p className="text-[14px] text-[#667185]">update relevant account information here</p>
				<button
					className={`w-[129px] h-9 text-white font-semibold border-[1px] rounded-md ${
						isFormEmpty() || !isEmailValid || !isPasswordValid
							? "bg-[#D0D5DD] cursor-not-allowed"
							: "bg-[#00932E] border-[#00932E] hover:bg-[#007427]"
					}`}
					disabled={isFormEmpty() || !isEmailValid || !isPasswordValid}
					type="submit">
					Save changes{" "}
				</button>
			</div>
			<form action="" className="w-[70%] space-y-4">
				<div className="">
					<label htmlFor="firstName" className="text-[#101928] font-semibold text-sm">
						Name of FME
					</label>
					<input
						className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
						type="text"
						id="firstName"
						name="name"
						value={settingsData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="">
					<label htmlFor="email" className="text-[#101928] font-semibold text-sm">
						Email address
					</label>
					<div className="w-full relative">
						<input
							onChange={handleChange}
							type="email"
							id="email"
							name="email"
							value={settingsData.email}
							className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
						/>
						<Letter />
					</div>
					{!isEmailValid && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
				</div>
				<div className="">
					<label htmlFor="password" className="text-[#101928] font-semibold text-sm">
						Password
					</label>
					<input
						className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
						type="password"
						name="password"
						value={settingsData.password}
						onChange={handleChange}
						id="password"
					/>
					{!isPasswordValid && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
				</div>
			</form>
		</div>
	);
};

export default Profile;
