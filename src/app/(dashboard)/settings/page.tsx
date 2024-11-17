"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Profile from "@/components/fme/settings/Profile";
import Security from "@/components/fme/settings/Security";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { Letter } from "../support/Icons";

export default function Home() {
  interface IUser {
    Id: Number;
    Name: string;
    CreatedAt: string;
    CourseCount: number;
    Address: string;
    UserId: number;
    email: string;
    is_active: boolean;
    stc_count: number;
    student_count: number;
  }
  interface IForm {
    name: string | undefined;
    email: string | undefined;
  }
  const [userData, setUserData] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<IForm>({
    name: "",
    email: "",
  });
  const [activeDiv, setActiveDiv] = useState(1);
  const role = Cookies.get("userRole");
  const token = Cookies.get("token");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const isFormEmpty = () => {
    return Object.values(formData).every((value) => value === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "email") {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setIsEmailValid(regex.test(value));
      setEmailError(regex.test(value) ? "" : "Invalid email format");
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
      setIsPasswordValid(passwordRegex.test(value));
      setPasswordError(
        passwordRegex.test(value)
          ? ""
          : "Password must contain at least one letter, one number, and one special character"
      );
    }
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const router = useRouter();
  useEffect(() => {
    if (role === "FME") {
      router.push("/fme");
    }
  }, [role, router]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/mda/profile`, { headers })
      .then((response) => {
        setUserData(response.data);
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    setFormData({
      name: userData?.Name,
      email: userData?.email,
    });
  }, [userData]);

  return (
    <section className="">
      <h3 className=" text-3xl font-semibold leading-[120%] text-[#101928]">
        Settings
      </h3>
      <p className=" text-[12px] text-[#667185] mt-2 mb-4">
        Take a look at your policies and the new policy to see what is covered
      </p>
      {/* <div className=" flex border-[#E4E7EC] border-[1px] w-fit rounded-lg">
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
			</div> */}
      <section className=" p-4 bg-white mt-4 rounded-[10px] ">
        <div className=" flex justify-between px-8 items-center bg-[#E7F6EC] rounded-[10px] h-[200px]">
          <div className=" flex items-center gap-4">
            <div className="avatar w-[120px] h-[120px] rounded-[50%] bg-opacity-10 relative bg-[#34CAA5] flex justify-center items-center">
              <p className=" font-semibold text-xl">
                {userData?.Name ? userData.Name.slice(0, 2).toUpperCase() : ""}
              </p>
              <Image
                src="/images/settings/Verified tick.png"
                width={35}
                height={35}
                alt="verified tick"
                className=" absolute bottom-0 right-0"
              />
            </div>
            <div className=" flex flex-col gap-2">
              {/* fix these lines */}
              <h4 className=" text-[24px] text-[#101928] font-semibold leading-[120%]">
                {userData?.Name ? userData.Name.toUpperCase() : ""}
              </h4>
              <p className=" text-[#667185] text-[12px]">{userData?.email}</p>
              <p className=" text-[#667185] text-[12px]">
                This image will be displayed on your profile
              </p>
            </div>
          </div>
          {/* <div className=" flex items-center gap-4">
						{activeDiv == 1 && (
							<button className="w-[150px] h-12 rounded-md bg-[#00932E] flex justify-center items-center font-semibold text-white">
								Edit Profile
							</button>
						)}
					</div> */}
        </div>
        <div className="flex p-8">
          <div className="w-[30%] space-y-2">
            <h5 className="font-semibold text-[#101928]">
              Account Information
            </h5>
            <p className="text-[14px] text-[#667185]">
              update relevant account information here
            </p>
            <button
              className={`w-[129px] h-9 text-white font-semibold border-[1px] rounded-md ${
                isFormEmpty() || !isEmailValid || !isPasswordValid
                  ? "bg-[#D0D5DD] cursor-not-allowed"
                  : "bg-[#00932E] border-[#00932E] hover:bg-[#007427]"
              }`}
              disabled={isFormEmpty() || !isEmailValid || !isPasswordValid}
              type="submit"
            >
              Save changes{" "}
            </button>
          </div>
          <form action="" className="w-[70%] space-y-4">
            <div className="">
              <label
                htmlFor="firstName"
                className="text-[#101928] font-semibold text-sm"
              >
                {`Name of ${role === "MDA" ? "MDA" : "STC"}`}
              </label>
              <input
                className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
                type="text"
                id="firstName"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="text-[#101928] font-semibold text-sm"
              >
                Email address
              </label>
              <div className="w-full relative">
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
                />
                <Letter />
              </div>
              {!isEmailValid && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="text-[#101928] font-semibold text-sm"
              >
                Password
              </label>
              <input
                className="w-full border-[#D0D5DD] border-solid rounded-md p-4 border focus:border-[#00932E]"
                type="password"
                name="password"
                // value={settingsData.password}
                onChange={handleChange}
                id="password"
              />
              {!isPasswordValid && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
