'use client'
import { useState,useEffect } from "react";
import Security from "@/components/fme/settings/Security";
import { CircularProfile } from "@/components/landing/faqs/Svgs";
import Image from "next/image";


const ArtisanProfile = () => {

	const [formData, setFormData] = useState({
		firstName:"",
		lastName:"",
		aboutText:""
	})

	const isFormEmpty = () => {
		return Object.values(formData).every((value) => value === "");
	};
	const handleChange = (name:string, value:string) => {
		setFormData({
		  ...formData,
		  [name]: value
		});
	  };
  const [activeDiv, setActiveDiv] = useState(1);
  const [borderColor, setBorderColor] = useState<string>('border-[#D0D5DD]');


  return (
    <section className="md:p-4 p-2">
			<h3 className=" text-3xl font-semibold leading-[120%] text-[#101928]">Edit User Profile</h3>
			<p className=" text-[12px] text-[#667185] mt-2 mb-4">Take a look at your policies and the new policy to see what is covered</p>
			<div className=" flex border-[#E4E7EC] border-[1px] w-fit rounded-lg">
				<div
					onClick={() => setActiveDiv(1)}
					className={`" px-4 py-2 border-r-[1px] cursor-pointer border-[#E4E7EC]  ${
						activeDiv == 1 ? "bg-[#E7F6EC] text-[#00932E] font-semibold " : " text-[#98A2B3] font-normal"
					}  "`}>
					Profile
				</div>
				<div
					onClick={() => setActiveDiv(2)}
					className={`${
						activeDiv == 2 ? " text-[#00932E] bg-[#E7F6EC] font-semibold " : " text-[#98A2B3] font-normal"
					} px-4 py-2 border-r-[1px] cursor-pointer border-[#E4E7EC] `}>
					Security
				</div>
				
			</div>
			<div className=" flex justify-between mt-4 px-8 items-center bg-[#E7F6EC] rounded-[10px] h-[200px]">
					<div className=" flex items-center gap-4">
						<div className="avatar w-[120px] h-[120px] rounded-[50%] bg-opacity-10 relative bg-[#34CAA5] flex justify-center items-center">
							{/* <p className=" font-semibold text-xl">{userData?.Name.slice(0, 2).toUpperCase()}</p> */}
							<p className=" font-semibold text-xl">CC</p>
							<Image src="/images/settings/Verified tick.png" width={35} height={35} alt="verified tick" className=" absolute bottom-0 right-0" />
						</div>
						<div className=" flex flex-col gap-2">
							<h4 className="text-[20px] md:text-[24px] text-[#101928] font-semibold leading-[120%]">Caro Confectioneries</h4>
							<p className=" text-[#667185] text-[12px]">alarapetimilehin@gmail.com</p>
							{/* <h4 className=" text-[24px] text-[#101928] font-semibold leading-[120%]">{userData?.Name.toUpperCase()}</h4>
							<p className=" text-[#667185] text-[12px]">{userData?.email}</p> */}
							<p className=" text-[#667185] text-[12px]">This image will be displayed on your profile</p>
						</div>
					</div>
					<div className=" flex items-center gap-4">
						{activeDiv == 1 && (
							<button className="w-[170px] text-sm h-12 rounded-md bg-[#00932E] hidden md:flex justify-center items-center font-semibold text-white">
								Upload Business picture
							</button>
						)}
					</div>
				</div>
			{activeDiv==1&&<section className=" p-4 bg-white mt-4 rounded-[10px] ">
				
				<div className="flex flex-col md:flex-row-reverse p-8">
					
					<form action="" className="md:w-[70%] space-y-4">
						<div className="">
							<label htmlFor="firstName" className="text-[#101928] font-semibold text-sm">
								First Name
							</label>
							<div className="w-full relative flex">
							<input
								className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
								type="text"
								id="firstName"
								name="firstName"
								placeholder="please type in your first name here"
								value={formData.firstName}
								onChange={(e) => handleChange('firstName', e.target.value)}
							/>
							<div className=" absolute right-2 top-[50%]"><CircularProfile /></div>
							</div>
						</div>
						<div className="">
							<label htmlFor="lastName" className="text-[#101928] font-semibold text-sm">
								Last Name
							</label>
							<div className="w-full relative flex">
								<input
								placeholder="please type in your last name here"
									type="text"
									id="lastName"
									name="lastName"
									value={formData.lastName}
									onChange={(e) => handleChange('lastName', e.target.value)}
									className="w-full border-[#d3d6db] border-solid rounded-md p-4 border focus:border-[#00932E]"
								/>
								<div className=" absolute right-2 top-[50%]"><CircularProfile /></div>
								
							</div>

						</div>
						<div className="">
							<label htmlFor="about" className="text-[#101928] font-semibold text-sm">
								About
							</label>
							<textarea
        rows={5}
        placeholder="Please input a short description about yourself and the services you offer to optimise your bio"
        className={`w-full border-solid rounded-md p-4 border focus:outline-none ${borderColor} focus:border-[#00932E]`}
        value={formData.aboutText}
		name="aboutText"
onChange={(e) => handleChange('aboutText', e.target.value)}
      />
						</div>
						
					</form>
					<div className="md:w-[30%] space-y-2">
						<h5 className="hidden md:flex font-semibold text-[#101928]">Account Information</h5>
						<p className="hidden md:flex text-[14px] text-[#667185]">update relevant account information here</p>
						<button
							className={`w-[129px] h-9 text-white font-semibold border-[1px] rounded-md ${
								isFormEmpty() 
									? "bg-[#D0D5DD] cursor-not-allowed"
									: "bg-[#00932E] border-[#00932E] hover:bg-[#007427]"
							}`}
							disabled={isFormEmpty()}
							type="submit">
							Save changes{" "}
						</button>
					</div>
				</div>
			</section>}
			{activeDiv==2&&<Security />}
		</section>
  )
}

export default ArtisanProfile
