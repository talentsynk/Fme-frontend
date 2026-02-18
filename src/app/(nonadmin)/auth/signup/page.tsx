"use client";

import { Ierror } from "@/app/recovery/page";
import { SelectUserComp } from "@/components/auth/auth";
import { IAdmin, Users } from "@/components/auth/data";
import {
  AdminlistStyle,
  LinkStyles,
  UserLoginStyles,
} from "@/components/auth/style";
import { States } from "@/components/fme/mda/data";
import {
  StateCompStyles,
  StatesDropdownStyles,
} from "@/components/fme/mda/styles";
import { EmployerIcon, NinIcon, PhoneIcon } from "@/components/icons/auth";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import {
  CheckedIcon,
  EmailIcon,
  EyeIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { ButtonLoader } from "@/components/recovery/style";
import { BACKEND_URL } from "@/lib/config";
import { validateEmail } from "@/utils/validateEmail";
import { isStrongPassword } from "@/utils/validatePwd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IForm {
  email: string;
  pwd: string;
  fname: string;
  lname: string;
  number: string;
  nin: string;
  state: string;
  lga: string;
  cacRegNo : string;
  companyName : string;
}
export default function Signup() {
  const router = useRouter();
  // for form
  const [form, setForm] = useState<IForm>({
    email: "",
    pwd: "",
    fname: "",
    lname: "",
    number: "",
    nin: "",
    state: "",
    lga: "",
    cacRegNo : "",
    companyName : ""
  });

  // For Email
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");
  const [nin, setNin] = useState<string>("");
  const [cacReg, setCacReg] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<Ierror>({
    active: false,
    text: "",
  });

  // form state 1
  const [users, setAdmins] = useState<IAdmin[] | null>(Users);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const handleUserStatus = () => {
    const status = users?.find((ele) => ele.isSelected == true)?.name;
    if (status) {
      if (status === "Employer") {
        setUserStatus(status);
        setFormState(1);
      } else {
        router.push("/auth/login");
      }
    }
  };
  const selectUser = (id: string) => {
    const newUsersList = users?.map((ele) => {
      return { ...ele, isSelected: id === ele.name };
    });
    if (newUsersList) {
      setAdmins(newUsersList);
    }
  };

  // login button loader state
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(0);
  // handle validation as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Perform email validation
    if (!validateEmail(value)) {
      setEmailError({ active: true, text: "Invalid email address." });
    } else {
      setEmailError({ active: false, text: "" });
      setForm({ ...form, email: value });
    }
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = e.target.value;
    if (id === "fname") {
      setFname(value);
      if (value.length < 2) {
        setFNameError({ active: true, text: "First Name is too short" });
      } else {
        setForm({ ...form, fname: value });
        setFNameError({ active: false, text: "" });
      }
    } else if (id === "lname") {
      setLname(value);
      if (value.length < 2) {
        setLNameError({ active: true, text: "Last Name is too short" });
      } else {
        setForm({ ...form, lname: value });
        setLNameError({ active: false, text: "" });
      }
    } else if (id === "cac") {
      setCacReg(value);
      if (value.length < 5) {
        setCacError({ active: true, text: "CAC number is too short" });
      } else {
        setForm({ ...form, cacRegNo: value });
        setCacError({ active: false, text: "" });
      }
    }  else if (id === "companyName") {
      setCompanyName(value);
      if (value.length < 1 ) {
        setCompanyNameError({ active: true, text: "Company Name cannot be empty" });
      } else {
        setForm({ ...form, companyName: value });
        setCompanyNameError({ active: false, text: "" });
      }
    }
  };
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = e.target.value;
    if (id === "number") {
      setPhoneNumber(value);
      if (value.length < 11) {
        setNumberError({ active: true, text: "Number is too short" });
      } else if (value.length == 11) {
        setForm({ ...form, number: value });
        setNumberError({ active: false, text: "" });
      }
    } else if (id === "nin") {
      setNin(value);
      if (value.length < 11) {
        setNinError({ active: true, text: "NIN is not valid" });
      } else if (value.length == 11) {
        setForm({ ...form, nin: value });
        setNinError({ active: false, text: "" });
      } else {
        setNinError({ active: true, text: "NIN is not valid" });
      }
    }
  };

  //   for pwd
  const [pwd, setPwd] = useState<string>("");
  // to handle hiding and showing passwords
  const [showPwd, setShowPwd] = useState(false);
  //  for error handling
  const [pwdError, setPwdError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [pwd2Error, setPwd2Error] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [fnameError, setFNameError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [lnameError, setLNameError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [numberError, setNumberError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [ninError, setNinError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [cacError, setCacError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [companyNameError, setCompanyNameError] = useState<Ierror>({
    active: false,
    text: "",
  });


  // for states
  const [state, setState] = useState("");
  const [states, setStates] = useState(States);

  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [options, setOptions] = useState([true, false]);

  const [selectedOption, setSelectedOption] = useState(false);

  const handleStateSelection = (name: string) => {
    console.log(name);
    setForm({ ...form, state: name });
    setState(name);
    setLga(""); // when a new state is selected, it sets the lga selected to empty
    setShowStateDropdown(false);
  };

  // formstate 2
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    let msg: string | null = isStrongPassword(value);
    // this handles when the password is a match and then pwd1 value changes
    if (pwd2.length > 0) {
      if (pwd2 == value) {
        setPwd2Error({
          active: false,
          text: "Password is a match!",
        });
        // setForm({ ...form, pwd2: pwd2 });
      } else {
        setPwd2Error({
          active: true,
          text: "Password is not a match!",
        });
      }
    }

    if (msg !== null) {
      setPwdError({
        active: true,
        text: msg,
      });
    } else {
      setPwdError({
        active: false,
        text: "",
      });
      setForm({ ...form, pwd: value });
    }
  };
  const [pwd2, setPwd2] = useState<string>("");
  const [showPwd2, setShowPwd2] = useState(false);
  const handlePwd2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd2(value);
    if (value == pwd) {
      setPwd2Error({
        active: false,
        text: "",
      });
      // setForm({ ...form, pwd2: value });
    } else {
      setPwd2Error({
        active: true,
        text: "Password is not a match!",
      });
    }
  };
  const resetForm = () => {
    setForm({
      email: "",
      pwd: "",
      fname: "",
      lname: "",
      number: "",
      nin: "",
      state: "",
      lga: "",
      cacRegNo : "",
      companyName : ""
    });
    setEmail("");
    setFname("");
    setLname("");
    setLga("");
    setPhoneNumber("");
    setState("");
    setNin("");
    setCacReg("");
    setCompanyName("");
  };
  const handleSubmit1 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      form.email !== "" &&
      form.fname !== "" &&
      form.lga !== "" &&
      form.lname !== "" &&
      form.state !== "" &&
      form.nin !== ""
    ) {
      if(selectedOption && cacError.active){
        toast.error("Please enter a valid CAC registration number");
        return;
      }
      if(selectedOption && companyNameError.active){
        toast.error("Please enter a valid Company Name");
        return;
      }
      if(selectedOption && !form.companyName){
        toast.error("Please enter a valid Company Name");
        return;
      }
      if(selectedOption && !form.cacRegNo){
        toast.error("Please enter a valid CAC registration number");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setFormState(2);
      }, 1200);
    }
  };
  const handleSubmit2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.pwd !== "") {
      try {
        const body = {
          FirstName: form.fname,
          LastName: form.fname,
          Email: form.email,
          PhoneNumber: form.number,
          NIN: form.nin,
          State: form.state,
          LGA: form.lga,
          Password: form.pwd,
          IsCompany : selectedOption,
          CompanyCAC : form.cacRegNo,
          CompanyName : form.companyName
        };
        setIsLoading(true);
        const { data } = await axios.post(
          `${BACKEND_URL}/employer/create-employer`,
          body
        );
        if (data) {
          // use a toastify message then redirect to login page
          setIsLoading(false);
          toast.success("Account Created successfully");
          setTimeout(() => {
            router.push("/auth/login");
          }, 1200);
        }
      } catch (error: any) {
        setIsLoading(false);
        setFormState(1);
        // reset password field
        setPwd("");
        setPwd2("");
        setForm({ ...form, pwd: "" });
        if (error.response) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error(`${error.message}`);
        }
      }
    }
  };

  // lga stuff
  const [showLGADropdown, setShowLGADropdown] = useState(false);
  const NaijaStates = require("naija-state-local-government");
  const [lgas, setLgas] = useState([]);
  const [lga, setLga] = useState("");

  const handleLGASelection = (name: string) => {
    setForm({ ...form, lga: name });
    setLga(name);
    setShowLGADropdown(false);
  };

  // get lga based on state selected
  useEffect(() => {
    if (state) {
      const newLgas = NaijaStates.lgas(state).lgas;
      setLgas(newLgas);
    }
  }, [state]);

  return (
    <UserLoginStyles>
      <ToastContainer />
      {formState === 0 && (
        <div className="form">
          <div className="head">
            <h3>Welcome to NASIC!</h3>
            <p>Kindly pick the option that is most suitable to you</p>
          </div>
          <div className="form-input">
            <AdminlistStyle>
              {users?.map((ele, index) => (
                <SelectUserComp
                  key={index}
                  {...ele}
                  handleSelect={() => selectUser(ele.name)}
                />
              ))}
            </AdminlistStyle>
          </div>
          <div className="btn">
            <button
              type="submit"
              onClick={handleUserStatus}
              disabled={
                users?.find((ele) => ele.isSelected == true)?.isSelected !==
                true
              }
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {formState === 1 && (
        <form className="form" onSubmit={handleSubmit1}>
          <div className="head">
            <h3>Welcome to NASIC!</h3>
            <p>
              Welcome back to your account, get more hirings like you never
              left. Kindly pick the option that is most suitable to you
            </p>
          </div>
          <div className="form-input">
            <div className="form-ele">
              <label htmlFor="fname">First Name</label>
              <div className="inp">
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter First Name"
                  value={fname}
                  onChange={(e) => handleNameChange(e, "fname")}
                  className={fnameError.active ? "error-bdr" : ""}
                />
                <div className="ind">
                  {fnameError.active === false && fname !== "" && (
                    <CheckedIcon />
                  )}
                  {fnameError.active === true && <FormErrorIcon />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={fnameError.active ? "error-msg" : "correct"}
                >
                  {fnameError.text}
                </p>
              </div>
            </div>
            <div className="form-ele">
              <label htmlFor="fname">Last Name</label>
              <div className="inp">
                <input
                  type="text"
                  name="lname"
                  placeholder="Enter Last Name"
                  value={lname}
                  onChange={(e) => handleNameChange(e, "lname")}
                  className={lnameError.active ? "error-bdr" : ""}
                />
                <div className="ind">
                  {lnameError.active === false && lname !== "" && (
                    <CheckedIcon />
                  )}
                  {lnameError.active === true && <FormErrorIcon />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={lnameError.active ? "error-msg" : "correct"}
                >
                  {lnameError.text}
                </p>
              </div>
            </div>
            <div className="form-ele">
              <label htmlFor="email">E-mail address</label>
              <div className="inp">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter Email Address"
                  className={emailError.active ? "error-bdr" : ""}
                  autoComplete="email"
                />
                <div className="ind">
                  {emailError.active === false && email === "" && <EmailIcon />}
                  {emailError.active === false && email !== "" && (
                    <CheckedIcon />
                  )}
                  {emailError.active === true && <FormErrorIcon />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={emailError.active ? "error-msg" : "correct"}
                >
                  {emailError.text}
                </p>
              </div>
            </div>
            <div className="form-ele">
              <label htmlFor="num">Phone Number</label>
              <div className="inp">
                <input
                  type="number"
                  name="num"
                  placeholder="Enter First Name"
                  value={phonenumber}
                  onChange={(e) => handleNumberChange(e, "number")}
                  className={numberError.active ? "error-bdr" : ""}
                />
                <div className="ind">
                  {numberError.active === false && phonenumber === "" && (
                    <PhoneIcon />
                  )}
                  {numberError.active === false && phonenumber !== "" && (
                    <CheckedIcon />
                  )}
                  {numberError.active === true && <FormErrorIcon />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={numberError.active ? "error-msg" : "correct"}
                >
                  {numberError.text}
                </p>
              </div>
            </div>
            <div className="form-ele">
              <label htmlFor="fname">
                NIN (National Identification Number)
              </label>
              <div className="inp">
                <input
                  type="number"
                  name="nin"
                  value={nin}
                  placeholder="Enter First Name"
                  onChange={(e) => handleNumberChange(e, "nin")}
                  className={ninError.active ? "error-bdr" : ""}
                />
                <div className="ind">
                  {ninError.active === false && nin === "" && <NinIcon />}
                  {ninError.active === false && nin !== "" && <CheckedIcon />}
                  {ninError.active === true && <FormErrorIcon />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={ninError.active ? "error-msg" : "correct"}
                >
                  {ninError.text}
                </p>
              </div>
            </div>
            <div className="form-ele">
              <label htmlFor="state">State of Residence</label>
              <StatesDropdownStyles className="max">
                <div
                  className="head"
                  onClick={() => setShowStateDropdown(!showStateDropdown)}
                >
                  <>
                    {state == "" ? (
                      <p className="placeholder">
                        Please select your state of residence
                      </p>
                    ) : (
                      <p className="state-name">{state}</p>
                    )}
                  </>
                  <AngleDownStyles $isSelected={showStateDropdown}>
                    <AngleDown />
                  </AngleDownStyles>
                </div>
                {showStateDropdown && (
                  <div className="dropdown">
                    {states.map((ele, index) => (
                      <StateCompStyles
                        $isSelected={state == ele.name}
                        key={index}
                        onClick={() => handleStateSelection(ele.name)}
                      >
                        <p>{ele.name}</p>
                      </StateCompStyles>
                    ))}
                  </div>
                )}
              </StatesDropdownStyles>
            </div>
            <div className="form-ele">
              <label htmlFor="lga">L.G.A (Local Government Area)</label>
              <StatesDropdownStyles style={{zIndex : 5}}>
                <div
                  className="head"
                  onClick={() => setShowLGADropdown(!showLGADropdown)}
                >
                  <>
                    {lga === "" ? (
                      <p className="placeholder">
                        Please select local government area
                      </p>
                    ) : (
                      <p className="state-name">{lga}</p>
                    )}
                  </>
                  <AngleDownStyles $isSelected={showLGADropdown}>
                    <AngleDown />
                  </AngleDownStyles>
                </div>
                {showLGADropdown && (
                  <div className="dropdown">
                    {lgas.map((ele, index) => (
                      <StateCompStyles
                        $isSelected={lga === ele}
                        key={index}
                        onClick={() => handleLGASelection(ele)}
                      >
                        <p>{ele}</p>
                      </StateCompStyles>
                    ))}
                  </div>
                )}
              </StatesDropdownStyles>
            </div>
            <div className="form-ele split">
              <div className="form-ele">
                <label htmlFor="state">Register as Organization</label>
                <StatesDropdownStyles className="max" style={{zIndex : 1}}>
                  <div
                    className="head"
                    onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                  >
                    <>
                    <p className="state-name">{selectedOption ? "True" : "False"}</p>
                    </>
                    <AngleDownStyles $isSelected={showOrgDropdown}>
                      <AngleDown />
                    </AngleDownStyles>
                  </div>
                  {showOrgDropdown && (
                    <div className="dropdown">
                      {options.map((ele, index) => (
                        <StateCompStyles
                          $isSelected={selectedOption == ele}
                          key={index}
                          onClick={() => {
                            setSelectedOption(ele);
                            setShowOrgDropdown(false);
                          }}
                        >
                          <p>{ele ? "True" : "False"}</p>
                        </StateCompStyles>
                      ))}
                    </div>
                  )}
                </StatesDropdownStyles>
              </div>
              <div className="form-ele">
                <label htmlFor="fname">CAC Registration Number</label>
                <div className="inp">
                  <input
                    type="text"
                    name="cacRegNo"
                    value={cacReg}
                    placeholder="Enter Registration Number"
                    onChange={(e) => handleNameChange(e, "cac")}
                    className={cacError.active ? "error-bdr" : ""}
                  />
                  <div className="ind">
                    {cacError.active === false && cacReg === "" && (
                      <EmployerIcon />
                    )}
                    {cacError.active === false && cacReg !== "" && <CheckedIcon />}
                    {cacError.active === true && <FormErrorIcon />}
                  </div>
                  <p
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    className={ninError.active ? "error-msg" : "correct"}
                  >
                    {ninError.text}
                  </p>
                </div>
              </div>
            </div>
              { selectedOption &&
                <div className="form-ele">
                <label htmlFor="fname">Company Name</label>
                <div className="inp">
                  <input
                    type="text"
                    name="lname"
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={(e) => handleNameChange(e, "companyName")}
                    className={companyNameError.active ? "error-bdr" : ""}
                  />
                  <div className="ind">
                    {companyNameError.active === false && lname !== "" && (
                      <CheckedIcon />
                    )}
                    {companyNameError.active === true && <FormErrorIcon />}
                  </div>
                  <p
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    className={companyNameError.active ? "error-msg" : "correct"}
                  >
                    {companyNameError.text}
                  </p>
                </div>
              </div>
              }
          </div>
          <div className="btn">
            <button
              type="submit"
              disabled={
                fname == "" ||
                lname == "" ||
                phonenumber == "" ||
                nin == "" ||
                email == "" ||
                pwdError.active !== false ||
                fnameError.active !== false ||
                lnameError.active !== false ||
                numberError.active !== false ||
                ninError.active !== false ||
                emailError.active !== false ||
                state === "" ||
                lga === ""
              }
            >
              {isLoading ? <ButtonLoader /> : "Continue"}
            </button>
          </div>
        </form>
      )}
      {formState === 2 && (
        <form className="form" onSubmit={handleSubmit2}>
          <div className="head">
            <h3>Welcome to NASIC!</h3>
            <p>Complete the fields below and start finding jobs!</p>
          </div>
          <div className="form-input">
            <div className="form-ele">
              <label htmlFor="pwd">Password</label>
              <div className="inp">
                <input
                  type={showPwd ? "text" : "password"}
                  name="pwd"
                  value={pwd}
                  onChange={handlePwdChange}
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  className={pwdError.active ? "error-bdr" : ""}
                />
                <div className="ind" onClick={() => setShowPwd(!showPwd)}>
                  {pwdError.active === false && pwdError.text === "" && (
                    <EyeIcon isShown={showPwd} />
                  )}
                  {pwdError.active === false && pwdError.text !== "" && (
                    <CheckedIcon />
                  )}
                  {pwdError.active === true && <EyeIcon isShown={showPwd} />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={pwdError.active ? "error-msg" : "correct"}
                >
                  {pwdError.text}
                </p>
              </div>
            </div>
            <div className="form-ele">
              <label htmlFor="pwd">Confirm Password</label>
              <div className="inp">
                <input
                  type={showPwd2 ? "text" : "password"}
                  name="pwd"
                  value={pwd2}
                  onChange={handlePwd2Change}
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  className={pwd2Error.active ? "error-bdr" : ""}
                />
                <div className="ind" onClick={() => setShowPwd2(!showPwd2)}>
                  {pwdError.active === false && pwdError.text === "" && (
                    <EyeIcon isShown={showPwd2} />
                  )}
                  {pwdError.active === false && pwdError.text !== "" && (
                    <CheckedIcon />
                  )}
                  {pwdError.active === true && <EyeIcon isShown={showPwd2} />}
                </div>
                <p
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  className={pwd2Error.active ? "error-msg" : "correct"}
                >
                  {pwd2Error.text}
                </p>
              </div>
            </div>
          </div>
          <div className="btn">
            <button
              type="submit"
              disabled={
                pwd == "" ||
                pwd2 == "" ||
                pwdError.active !== false ||
                pwd2Error.active !== false
              }
            >
              {isLoading ? <ButtonLoader /> : "Create Account"}
            </button>
          </div>
        </form>
      )}
      <div className="btm">
        <p>Have an account already?</p>
        <button type="button" onClick={() => router.push("/auth/login")}>
          Login here
        </button>
      </div>
    </UserLoginStyles>
  );
}
