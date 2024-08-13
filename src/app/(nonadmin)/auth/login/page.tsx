"use client";

import { Ierror } from "@/app/recovery/page";
import { LinkStyles, UserLoginStyles } from "@/components/auth/style";
import {
  CheckedIcon,
  EmailIcon,
  EyeIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { ButtonLoader } from "@/components/recovery/style";
import { roles } from "@/constants/roleList";
import { BACKEND_URL } from "@/lib/config";
import { setSessionExpiration } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { validateEmail } from "@/utils/validateEmail";
import { isStrongPassword } from "@/utils/validatePwd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IForm {
  email: string;
  pwd: string;
}
export default function Login() {
  const router = useRouter();
  // for form
  const [form, setForm] = useState<IForm>({ email: "", pwd: "" });
  // For Email
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<Ierror>({
    active: false,
    text: "",
  });

  // handle validation as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Perform email validation
    if (!validateEmail(value)) {
      setEmailError({ active: true, text: "Invalid email address." });
    } else {
      setEmailError({ active: false, text: "Valid Email" });
      setForm({ ...form, email: value });
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
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);

    let msg: string | null = isStrongPassword(value);
    if (msg !== null) {
      setPwdError({
        active: true,
        text: msg,
      });
    } else {
      setPwdError({
        active: false,
        text: "Password is Strong",
      });
      setForm({ ...form, pwd: value });
    }
  };

  // login button loader state
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !emailError.active &&
      !pwdError.active &&
      emailError.text !== "" &&
      pwdError.text !== ""
    ) {
      // call signin api
      try {
        const body = {
          Email: form.email,
          Password: form.pwd,
        };
        setIsLoading(true);
        const { data } = await axios.post(`${BACKEND_URL}/user/login`, body);
        if (data) {
          setIsLoading(false);
          if (data.role == 5 || data.role == 6) {
            const roleString = roles[data.role - 1];
            dispatch(setSessionExpiration(false));
            let inSetTime = new Date(
              new Date().getTime() + data.expires_in * 1000
            );
            Cookies.set("userRole", roleString, { expires: inSetTime });
            Cookies.set("token", data.jwt, { expires: inSetTime });
            toast.success(`Login successful!`);
            setTimeout(() => {
              if (roleString == "ARTISAN") {
                router.push("/dashboard/artisan");
              } else if (roleString == "EMPLOYER") {
                router.push("/dashboard/employer");
              }
            }, 1200);
          } else {
            // toastify message then redirect to the right login
            toast.error(`This login is meant for Artisans and Employers`);
            setTimeout(() => {
              router.push("/admin");
            }, 1300);
          }
        }
      } catch (error: any) {
        if (error.response) {
          setPwdError({
            active: true,
            text: error.response.data.message,
          });
          setEmailError({
            active: true,
            text: error.response.data.message,
          });
        } else {
          setPwdError({
            active: true,
            text: error.message,
          });
          setEmailError({
            active: true,
            text: error.message,
          });
        }
        setIsLoading(false);
      }
    }
  };
  return (
    <UserLoginStyles>
      <ToastContainer />
      <form className="form" onSubmit={handleLogin}>
        <div className="head">
          <h3>Welcome, Login Here!</h3>
          <p>
            Welcome back to your account,This is the portal for Artisans and
            Employers
          </p>
        </div>
        <div className="form-input">
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
                {emailError.active === false && emailError.text === "" && (
                  <EmailIcon />
                )}
                {emailError.active === false && emailError.text !== "" && (
                  <CheckedIcon />
                )}
                {emailError.active === true && <FormErrorIcon />}
              </div>
            </div>
          </div>
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
            </div>
          </div>
        </div>
        <div className="right">
          <LinkStyles>
            <Link href="/recovery">
              <p>Forgot Password?</p>
            </Link>
          </LinkStyles>
        </div>
        <div className="btn">
          <button
            type="submit"
            disabled={
              pwdError.text == "" ||
              emailError.text == "" ||
              pwdError.active !== false ||
              emailError.active !== false
            }
          >
            {isLoading ? <ButtonLoader /> : "Continue"}
          </button>
        </div>
      </form>
      <div className="btm">
        <p>Don’t have an account?</p>
        <button type="button" onClick={() => router.push("/auth/signup")}>
          Sign up
        </button>
      </div>
    </UserLoginStyles>
  );
}
