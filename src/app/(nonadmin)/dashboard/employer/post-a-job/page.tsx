'use client'
interface IForm{
  JobTitle:string;
  Location:string;
  JobType:string;
  Budget:any;
  Category:string;
  Requirement:string;
  Description:string;
  Responsibilities:string;
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
import { PostJobComp } from "@/components/fme/students/modal";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { ButtonLoader } from "@/components/recovery/style";


const PostAJob = () => {
	const [showJobModal, setShowJobModal] = useState(false);
	const cancelModal=()=>{
		console.log(1)
	  }
	  interface ICate{
		Id:number;
		Name:string;
		Description:string;
	  }
	const [cate,setCate]=useState<ICate[]|null>(null)
	
	useEffect(() => {
		let token = Cookies.get("token");
    
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.get(`${BACKEND_URL}/category/all`, config)
			.then((res) => {
        
				const data = res.data.Categories;
				console.log(data)
				setCate(data);
			})
			.catch((error) => console.log(error));

		
	}, []);

  const [formData, setFormData] = useState<IForm>({
		JobTitle:"",
		Location:"",
		JobType:"",
		Category:"",
		Description:"",
        Budget:null,
        Requirement:"",
        Responsibilities:"",
	})

	const isEmpty = () => {
		return Object.values(formData).every((value) => value === "");
	};
	// const isEmpty = () => {
	// 	const requiredFields = ["JobTitle", "Location", "JobType", "Category", "Description"];
	// 	return requiredFields.some(field => formData[field as keyof IForm] === "" || formData[field as keyof IForm] === null);
	//   };
	  
  const [state, setState] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
	const [stateOfOrigin, setStateOfOrigin] = useState("");
const [categories,setCategories]=useState(["engineering","plumbing"]);
	const [jobTypes,setJobTypes]=useState(["part-time","full-time"])
	const [statesOfOrigin, setStatesOfOrigin] = useState(States);
	const [states, setStates] = useState(States);
	const NaijaStates = require('naija-state-local-government');
	const [lgas, setLgas] = useState([]);
	const [lga, setLga] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
	const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
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
	const handleJobTypesSelection = (name: string) => {
		setJobType(name);
		setShowJobTypeDropdown(false);
	};

	const handleChangee = (name:string, value:string|number) => {
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
	  const [isLoading,setIsLoading]= useState(false)

	  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		setIsLoading(true);
		e.preventDefault();
		try {
		  const token = Cookies.get("token"); // Adjust token retrieval as needed
	  
		  // Log the data you're about to send
		  const jobData = {
			JobTitle: formData.JobTitle,
			Location: `${stateOfOrigin},${lga}`,
			JobType: jobType,
			Budget: formData.Budget,
			Category: category,
			Description: formData.Description,
			Requirement: formData.Requirement,
			Responsibilities: formData.Responsibilities,
		  };
		  
		  console.log("Data being sent to backend:", jobData);
	  
		  const response = await axios.post(
			`${BACKEND_URL}/job/create-job`,
			jobData,
			{
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			}
		  );
		  console.log("Job posted successfully", response.data);
		  setShowJobModal(true);
		} catch (error) {
		  console.error("Error posting job", error);
		}finally {
			setIsLoading(false);
		  }
	  };
	  



  return (
    <section className="p-4 md:p-8">
        <div className="flex gap-1 items-center">
            <Link href="/dashboard/employer">
              <p className=" text-[16px] leading-[24px] font-medium text-black-25">Dashboard</p>
            </Link>
            <GreyArrowRight />
            <p className="text-[16px] leading-[24px] font-bold text-[#00932E]">Post a job</p>
          </div>
        <div className="flex justify-center gap-2 py-6 md:py-4">
            <DarkGreenBag />
            <h2 className=" text-[36px] leading-[44px] font-medium">Post a job</h2>
        </div>
        <section className=" flex flex-col-reverse md:flex-row gap-4 md:gap-8">
          <div className="bg-[#00932E] spiral h-[690px] rounded-[10px] px-4 pt-6 relative">
            <h3 className="text-center md:text-[24px] text-[18px] font-bold leading-[32px] text-white">Post your job on N.A.S.I.C seamlessly</h3>
            <p className="text-center  md:text-[14px] text-[12px] font-medium leading-[20px] text-white">Check “   ” all the boxes to stand out in the market with your profile</p>
            <div className="h-[50px] absolute right-6 top-[25%] flex justify-center items-center w-[50px] rounded-[50%] bg-white"><HandMoney /></div>
            <div className="h-[50px] absolute left-8 top-[35%] flex justify-center items-center w-[50px] rounded-[50%] bg-white"><Bag /></div>
            <Image src="/images/landing/post-a-job.png"  alt=" Post a job" width={400} height={690} />
          </div>
          <form action="" className=" flex-1">
            <h5 className="text-left text-[18px] md:text-[24px] leading-[32px] text-[#101928] font-bold">Fill in the necessary details</h5>
            <p className="text-left  md:text-[18px] text-[14px] font-medium leading-[24px] text-[#667185]">Take a look at your policy and the new policy to see what is covered</p>
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
									name="JobTitle"
									onChange={(e) => handleChangee('JobTitle', e.target.value)}
									value={formData.JobTitle}
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
								  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.JobTitle ? "border-green" : formData.JobTitle === "" ? "border-red" : ""}`}
								/>
								<div className=" absolute right-2 top-[40%]"><Bag /></div>
							</div>
							
						</div>
            <div className="form-ele">
											<label htmlFor="state" className=" font-semibold text-sm text-[#101928]">Job Type</label>
											<StatesDropdownStyles>
												<div className="head" onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}>
													<>
														{jobType === "" ? <p className="placeholder">Please select Job Type</p> : <p className="state-name">{jobType}</p>}
													</>
													<AngleDownStyles $isSelected={showJobTypeDropdown}>
														<AngleDown />
													</AngleDownStyles>
												</div>
												{showJobTypeDropdown && (
													<div className="profile-dropdown z-50 bg-red-800">
														{jobTypes.map((ele, index) => (
															<StateCompStyles $isSelected={jobType === ele} key={index} onClick={() => handleJobTypesSelection(ele)}>
																<p>{ele}</p>
															</StateCompStyles>
														))}
													</div>
												)}
											</StatesDropdownStyles>
											
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
														{cate&&cate?.map((ele, index) => (
															<StateCompStyles $isSelected={category === ele?.Name} key={index} onClick={() => handleCategorySelection(ele?.Name)}>
																<p>{ele?.Name}</p>
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
								placeholder="Please input the budget"
									type="text"
									id="Budget"
									name="Budget"
									onChange={(e) => handleChangee('Budget', Number(e.target.value))}
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
								  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.Budget ? "border-green" : formData.Budget === 0 ? "border-red" : ""}`}
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
        value={formData.Description}
		name="job_desc"
onChange={(e) => handleChangee('Description', e.target.value)}
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
  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.Description ? "border-green" : formData.JobTitle === "" ? "border-red" : ""}`}
      />
						</div>
            <div className="">
							<label htmlFor="about" className="text-[#101928] font-semibold text-sm">
								List any job requirements if any (optional)
							</label>
	
	   <textarea
  rows={5}
  placeholder="List job requirements, each on a new line"
  value={formData.Requirement}
  name="Requirement"
  onChange={(e) => {
    const input = e.target.value;
    handleChangee('Requirement', input);
  }}
  onBlur={() => {
    const bulletPointRequirements = formData.Requirement
      .split("\n") // Split the input by new lines
      .filter(line => line.trim() !== "") // Remove any empty lines
      .map(line => `- ${line.trim()}`) // Prefix each line with a bullet point
      .join("\n"); // Join them back into a single string with new lines

    handleChangee('Requirement', bulletPointRequirements);
  }}
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
  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.Requirement ? "border-green" : formData.JobTitle === "" ? "border-red" : ""}`}
/>
						</div>		
            <div className="">
							<label htmlFor="about" className="text-[#101928] font-semibold text-sm">
								List the job responsibilities
							</label>
			
	  <textarea
  rows={5}
  placeholder="List job responsibilities, each on a new line"
  value={formData.Responsibilities}
  name="Responsibilities"
  onChange={(e) => {
    const input = e.target.value;
    handleChangee('Responsibilities', input);
  }}
  onBlur={() => {
    const bulletPointResponsibilities = formData.Responsibilities
      .split("\n") // Split the input by new lines
      .filter(line => line.trim() !== "") // Remove any empty lines
      .map(line => `- ${line.trim()}`) // Prefix each line with a bullet point
      .join("\n"); // Join them back into a single string with new lines

    handleChangee('Responsibilities', bulletPointResponsibilities);
  }}
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
  className={`w-full border-gray border-solid rounded-md p-4 border ${formData.Requirement ? "border-green" : formData.JobTitle === "" ? "border-red" : ""}`}
/>

						</div>		
            </section>
            <button onClick={handleSubmit}
							className={`w-full mt-4 h-9 text-white font-semibold border-[1px] rounded-md ${
								isEmpty() 
									? "bg-[#D0D5DD] cursor-not-allowed"
									: "bg-[#00932E] border-[#00932E] hover:bg-[#007427]"
							}`}
							disabled={isLoading || isEmpty()} 
							type="submit">
							{isLoading ? <ButtonLoader /> : "Post a Job"}
						</button>
          </form>
		  {showJobModal && <PostJobComp handleModalAction={cancelModal} cancelModal={() => setShowJobModal(false)} />}
        </section>
    </section>
  )
}

export default PostAJob