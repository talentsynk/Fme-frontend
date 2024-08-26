'use client'
interface IForm{
  title:string;
  state:string;
  LocalGovernment:string
} 
import { useState,useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Security from "@/components/fme/settings/Security";
import { CircularProfile, HandMoney, RightCall, RightContent, RightMail } from "@/components/landing/faqs/Svgs";
import { AngleDownStyles } from "@/components/icons/header";
import { States } from "@/components/fme/mda/data";
import { AngleDown } from "@/components/icons/header";
import { DarkGreenBag } from "@/components/landing/faqs/Svgs";
import { StateCompStyles,StatesDropdownStyles } from "@/components/fme/mda/styles";
import { Bag,WhiteBag } from "@/components/landing/faqs/Svgs";
import Link from "next/link";
import { GreyArrowRight } from "@/components/icons/artisan/icons";

const PostAJob = () => {
  const [formData, setFormData] = useState({
		title:"",
		category:"",
		state:"",
		LocalGovernment:"",
        Budget:"",
        job_desc:"",
        job_req:"",
	})
  const isEmpty = () => {
		return Object.values(formData).every((value) => value === "");
	};
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
	const [stateOfOrigin, setStateOfOrigin] = useState("");
const [categories,setCategories]=useState(["full time","part time"])
	const [statesOfOrigin, setStatesOfOrigin] = useState(States);
	const [states, setStates] = useState(States);
	const NaijaStates = require('naija-state-local-government');
	const [lgas, setLgas] = useState([]);
	const [lga, setLga] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
	const [showLGADropdown, setShowLGADropdown] = useState(false);


	const [showStateDropdown, setShowStateDropdown] = useState(false);
	const handleStateOfOriginSelection = (name: string) => {
		setStateOfOrigin(name);
		setShowStateDropdown(false);
	};
	const handleCategorySelection = (name: string) => {
		setCategory(name);
		setShowCategoryDropdown(false);
	};

	const handleChangee = (name:string, value:string) => {
		setFormData({
		  ...formData,
		  [name]: value
		});

		
	  };

	  

	const handleLGASelection = (name: string) => {
		// setForm({ ...form, LocalGovernment: name });
		setLga(name);
		setShowLGADropdown(false);
		console.log(lgas)
		
	};

	useEffect(() => {
		if (stateOfOrigin) {
		  const newLgas = NaijaStates.lgas(stateOfOrigin).lgas;
		  setLgas(newLgas);
		}
	  }, [stateOfOrigin]);



  return (
    <section className=" p-8">
        <div className="flex gap-1 items-center">
            <Link href="/dashboard/employer">
              <p className=" text-[16px] leading-[24px] font-medium text-black-25">Dashboard</p>
            </Link>
            <GreyArrowRight />
            <p className="text-[16px] leading-[24px] font-bold text-[#00932E]">Post a job</p>
          </div>
        <div className="flex justify-center gap-2 pb-4">
            <DarkGreenBag />
            <h2 className=" text-[36px] leading-[44px] font-medium">Post a job</h2>
        </div>
        <section className=" flex flex-col md:flex-row gap-4">
          <div className="bg-[#00932E] h-[490px] rounded-[10px] p-4 relative">
            <h3 className="text-center md:text-[24px] text-[18px] font-bold leading-[32px] text-white">Post your job on M.S.K.I.C seamlessly</h3>
            <p className="text-center  md:text-[14px] text-[12px] font-medium leading-[20px] text-white">Check “   ” all the boxes to stand out in the market with your profile</p>
            <div className="h-[50px] absolute right-6 top-[25%] flex justify-center items-center w-[50px] rounded-[50%] bg-white"><HandMoney /></div>
            <div className="h-[50px] absolute left-8 top-[35%] flex justify-center items-center w-[50px] rounded-[50%] bg-white"><Bag /></div>
            <Image src="/images/landing/post-a-job.png" alt=" Post a job" width={400} height={400} />
          </div>
          <form action="" className=" flex-1">
            <h5 className="text-center md:text-left text-[18px] md:text-[24px] leading-[32px] text-[#101928] font-bold">Fill in the necessary details</h5>
            <p className="text-center md:text-left  md:text-[18px] text-[14px] font-medium leading-[24px] text-[#667185]">Take a look at your policy and the new policy to see what is covered</p>
            <section className=" space-y-2">
            <div className="">
							<label htmlFor="address" className="text-[#101928] font-semibold text-sm">
								Job Title
							</label>
							<div className="w-full relative flex">
								<input
								placeholder="Sales representative needed"
									type="text"
									id="title"
									name="title"
									onChange={(e) => handleChangee('title', e.target.value)}
								value={formData.title}
								onInput={(e) => {
									const target = e.target as HTMLInputElement; // Type assertion
									if (target.value.length > 0) {
									  // Change border to green if not empty
									  target.classList.add("border-green");
									  target.classList.remove("border-red", "border-gray");
									} else if (target.value.length === 0) {
									  // Change border to red if empty
									  target.classList.add("border-red");
									  target.classList.remove("border-green", "border-gray");
									}
								  }}
								  onFocus={(e) => {
									const target = e.target as HTMLInputElement; // Type assertion
									// Reset border to gray when focused
									target.classList.remove("border-green", "border-red");
									target.classList.add("border-gray");
								  }}
								  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.title ? "border-green" : formData.title === "" ? "border-red" : ""}`}
								/>
								<div className=" absolute right-2 top-[40%]"><Bag /></div>
							</div>
							
						</div>
            <div className="form-ele">
											<label htmlFor="state" className=" font-semibold text-sm text-[#101928]">Job category</label>
											<StatesDropdownStyles>
												<div className="head" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
													<>
														{category === "" ? <p className="placeholder">Please select Job Category</p> : <p className="state-name">{category}</p>}
													</>
													<AngleDownStyles $isSelected={showCategoryDropdown}>
														<AngleDown />
													</AngleDownStyles>
												</div>
												{showCategoryDropdown && (
													<div className="profile-dropdown z-50 bg-red-800">
														{categories.map((ele, index) => (
															<StateCompStyles $isSelected={category === ele} key={index} onClick={() => handleCategorySelection(ele)}>
																<p>{ele}</p>
															</StateCompStyles>
														))}
													</div>
												)}
											</StatesDropdownStyles>
											
										</div>
            <div className="form-ele">
											<label htmlFor="state" className=" font-semibold text-sm text-[#101928]">State of Origin</label>
											<StatesDropdownStyles>
												<div className="head" onClick={() => setShowStateDropdown(!showStateDropdown)}>
													<>
														{stateOfOrigin === "" ? <p className="placeholder">Please select state of origin</p> : <p className="state-name">{stateOfOrigin}</p>}
													</>
													<AngleDownStyles $isSelected={showStateDropdown}>
														<AngleDown />
													</AngleDownStyles>
												</div>
												{showStateDropdown && (
													<div className="profile-dropdown z-50 bg-red-800">
														{statesOfOrigin.map((ele, index) => (
															<StateCompStyles $isSelected={stateOfOrigin === ele.name} key={index} onClick={() => handleStateOfOriginSelection(ele.name)}>
																<p>{ele.name}</p>
															</StateCompStyles>
														))}
													</div>
												)}
											</StatesDropdownStyles>
											
										</div>
										<div className="form-ele">
											<label htmlFor="state" className=" font-semibold text-sm text-[#101928]">Local Government Area</label>
											<StatesDropdownStyles>
												<div className="head" onClick={() => setShowLGADropdown(!showLGADropdown)}>
													<>
														{lga === "" ? <p className="placeholder">Please select local government area</p> : <p className="state-name">{lga}</p>}
													</>
													<AngleDownStyles $isSelected={showLGADropdown}>
														<AngleDown />
													</AngleDownStyles>
												</div>
												{showLGADropdown && (
													<div className="profile-dropdown">
														{lgas.map((ele, index) => (
															<StateCompStyles $isSelected={lga === ele} key={index} onClick={() => handleLGASelection(ele)}>
																<p>{ele}</p>
															</StateCompStyles>
														))}
													</div>
												)}
											</StatesDropdownStyles>
											
										</div>
                    <div className="">
							<label htmlFor="address" className="text-[#101928] font-semibold text-sm">	Budget for Job(Optional)</label>
							<div className="w-full relative flex">
								<input
								placeholder="Sales representative needed"
									type="text"
									id="Budget"
									name="Budget"
									onChange={(e) => handleChangee('Budget', e.target.value)}
								value={formData.Budget}
								onInput={(e) => {
									const target = e.target as HTMLInputElement; // Type assertion
									if (target.value.length > 0) {
									  // Change border to green if not empty
									  target.classList.add("border-green");
									  target.classList.remove("border-red", "border-gray");
									} else if (target.value.length === 0) {
									  // Change border to red if empty
									  target.classList.add("border-red");
									  target.classList.remove("border-green", "border-gray");
									}
								  }}
								  onFocus={(e) => {
									const target = e.target as HTMLInputElement; // Type assertion
									// Reset border to gray when focused
									target.classList.remove("border-green", "border-red");
									target.classList.add("border-gray");
								  }}
								  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.Budget ? "border-green" : formData.Budget === "" ? "border-red" : ""}`}
								/>

							</div>
							
						</div>
            <div className="">
							<label htmlFor="about" className="text-[#101928] font-semibold text-sm">
								Job Descripiton
							</label>
							<textarea
        rows={5}
        placeholder="Describe the details of the job"
        value={formData.job_desc}
		name="job_desc"
onChange={(e) => handleChangee('job_desc', e.target.value)}
onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length > 0) {
      target.classList.add("border-green");
      target.classList.remove("border-red", "border-gray");
    } else if (target.value.length === 0) {
      target.classList.add("border-red");
      target.classList.remove("border-green", "border-gray");
    }
  }}
  onFocus={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.classList.remove("border-green", "border-red");
    target.classList.add("border-gray");
  }}
  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.job_desc ? "border-green" : formData.title === "" ? "border-red" : ""}`}
      />
						</div>
            <div className="">
							<label htmlFor="about" className="text-[#101928] font-semibold text-sm">
								List any job requirements if any (optional)
							</label>
							<textarea
        rows={5}
        placeholder="if you have other job requirements, list them here"
        value={formData.job_req}
		name="job_req"
onChange={(e) => handleChangee('job_req', e.target.value)}
onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length > 0) {
      target.classList.add("border-green");
      target.classList.remove("border-red", "border-gray");
    } else if (target.value.length === 0) {
      target.classList.add("border-red");
      target.classList.remove("border-green", "border-gray");
    }
  }}
  onFocus={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.classList.remove("border-green", "border-red");
    target.classList.add("border-gray");
  }}
  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.job_req ? "border-green" : formData.title === "" ? "border-red" : ""}`}
      />
						</div>		
            </section>
            <button
							className={`w-full mt-4 h-9 text-white font-semibold border-[1px] rounded-md ${
								isEmpty() 
									? "bg-[#D0D5DD] cursor-not-allowed"
									: "bg-[#00932E] border-[#00932E] hover:bg-[#007427]"
							}`}
							disabled={isEmpty()}
							type="submit">
							Post a Job{" "}
						</button>
          </form>
        </section>
    </section>
  )
}

export default PostAJob