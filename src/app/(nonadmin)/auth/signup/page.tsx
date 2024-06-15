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
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import {
  CheckedIcon,
  EmailIcon,
  EyeIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { ButtonLoader } from "@/components/recovery/style";
import { validateEmail } from "@/utils/validateEmail";
import { isStrongPassword } from "@/utils/validatePwd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface IForm {
  email: string;
  pwd: string;
  fname: string;
  lname: string;
  number: string;
  nin: string;
  state: string;
  lga: string;
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
  });

  // For Email
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");
  const [nin, setNin] = useState<string>("");

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

  // for states
  const [state, setState] = useState("");
  const [states, setStates] = useState(States);

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const handleStateSelection = (name: string) => {
    setForm({ ...form, state: name });
    setState(name);
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
  const handleSubmit1 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(form);
      setFormState(2);
    }, 1200);
  };
  const handleSubmit2 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log(form);
      setIsLoading(false);
    }, 1000);
  };
  return (
    <UserLoginStyles>
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
                  {fnameError.active === false && fname === "" && (
                    <EmailIcon />
                  )}
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
                  placeholder="Enter Lastt Name"
                  value={lname}
                  onChange={(e) => handleNameChange(e, "lname")}
                  className={lnameError.active ? "error-bdr" : ""}
                />
                <div className="ind">
                  {lnameError.active === false && lname === "" && (
                    <EmailIcon />
                  )}
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
                  {emailError.active === false && email === "" && (
                    <EmailIcon />
                  )}
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
                    <EmailIcon />
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
                  {ninError.active === false && nin === "" && (
                    <EmailIcon />
                  )}
                  {ninError.active === false && nin !== "" && (
                    <CheckedIcon />
                  )}
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
              <label htmlFor="fname">State of Residence</label>
              <StatesDropdownStyles>
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
              <div className="inp">
                <input type="text" name="lga" placeholder="Enter L.G.A" />
              </div>
            </div>
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
                state === ""
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
              <label htmlFor="pwd">New Password</label>
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
