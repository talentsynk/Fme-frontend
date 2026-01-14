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
  ReactivateIcon,
  SuspendIcon,
  ThreedotsIcon,
  TotalCoursesIcon,
  TotalSTCIcon,
  TotalStudentsIcon,
  TryAgainIcon,
  UncheckedBoxIcon,
} from "@/components/icons/fme/mda";
import { XIcon } from "@/components/icons/sidebar";
import {
  CheckedIcon,
  EmailIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { FormEvent, ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Ierror } from "@/app/recovery/page";
import { validateEmail } from "@/utils/validateEmail";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { States } from "@/components/fme/mda/data";
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
} from "@/components/fme/mda/styles";
import { HasGraduatedStatusComp, StatusComp } from "@/components/fme/mda/mda";
import {
  CertifiedStudentIcon,
  UncertifiedStudentIcon,
} from "@/components/icons/fme/stc";
import { SuccessModal } from "@/components/fme/mda/modals";
import { truncateString } from "@/utils/truncateString";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  mdaSelector,
  setFakeNewStudentId,
  setUnchangedStudentsList,
} from "@/redux/mda/mdaSlice";
import { formatDate } from "@/utils/formatDate";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";
import { ButtonLoader } from "@/components/recovery/style";
import { fmeSelector } from "@/redux/fme/fmeSlice";
import ClickOutsideWrapper from "@/components/auth/wrapper";

interface IOneButtonModal {
  cancelModal: () => void;
}

//The interface for the form,, come back to it
interface IForm {
  Email: string;
  Lastname: string;
  Gender: string;
  StateOfResidence: string;
  StateOfOrigin: string;
  Address: string;
  LocalGovernment: string;
  PhoneNumber: string;
  DOBstring: string;
  SID: string;
  Firstname: string;
  CourseID: number;
  NationalIdentityNumber: string;
  DisabilityName: string;
  IsDisabled: boolean;
}

export const NewStudentModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
  const [form, setForm] = useState<IForm>({
    Email: "",
    Lastname: "",
    Gender: "",
    StateOfResidence: "",
    StateOfOrigin: "",
    Address: "",
    LocalGovernment: "",
    NationalIdentityNumber: "",
    PhoneNumber: "",
    DOBstring: "",
    SID: "",
    Firstname: "",
    CourseID: 1,
    DisabilityName: "",
    IsDisabled: false,
  });

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError({ active: true, text: "Invalid email address" });
    } else {
      setEmailError({ active: false, text: "Valid Email" });
      setForm({ ...form, Email: value });
    }
  };

  const [Firstname, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [Lastname, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [Phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [SID, setSID] = useState("");
  const [SIDError, setSIDError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const [NationalIdentityNumber, setNationalIdentityNumber] = useState("");
  const [NationalIdentityNumberError, setNationalIdentityNumberError] =
    useState<Ierror>({
      active: false,
      text: "",
    });

  const [Address, setAddress] = useState("");
  const [AddressError, setAddressError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const [NsqLevel, setNsqLevel] = useState("");
  const [NsqLevelError, setNsqLevelError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const [CourseID, setCourseID] = useState<number>();
  const [CourseIDError, setCourseIDError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const [DOBstring, setDOBstring] = useState("");
  const [DOBstringError, setDOBstringError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState({ active: false, text: "" });

  const [otherError, setOtherError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = e.target.value;
    if (input == "Firstname") {
      setFirstName(value);
      if (value.trim().length < 1) {
        setFirstNameError({ active: true, text: "First Name is required" });
      } else {
        setFirstNameError({ active: false, text: "First Name is valid" });
        setForm({ ...form, Firstname: value });
      }
    }
    if (input == "Lastname") {
      setLastName(value);
      if (value.trim().length < 1) {
        setLastNameError({ active: true, text: "LastName is required" });
      } else {
        setLastNameError({ active: false, text: "Last Name is valid" });
        setForm({ ...form, Lastname: value });
      }
    }
    if (input == "Phone") {
      setPhone(value);
      if (value.trim().length < 1) {
        setPhoneError({ active: true, text: "Phone Number is required" });
      } else {
        setPhoneError({ active: false, text: "Phone Number is valid" });
        setForm({ ...form, PhoneNumber: value });
      }
    }
    if (input == "SID") {
      setSID(value);
      if (value.trim().length < 1) {
        setPhoneError({ active: true, text: "Student ID is required" });
      } else {
        setSIDError({ active: false, text: "Student ID is valid" });
        setForm({ ...form, SID: value });
      }
    }

    if (input == "Address") {
      setAddress(value);
      if (value.trim().length < 1) {
        setAddressError({ active: true, text: "Address is required" });
      } else {
        setAddressError({ active: false, text: "Address is valid" });
        setForm({ ...form, Address: value });
      }
    }
    if (input == "NationalIdentityNumber") {
      setNationalIdentityNumber(value);
      if (value.trim().length < 1) {
        setNationalIdentityNumberError({
          active: true,
          text: "NIN is required",
        });
      } else {
        setNationalIdentityNumberError({ active: false, text: "NIN is valid" });
        setForm({ ...form, NationalIdentityNumber: value });
      }
    }
    if (input == "gender") {
      setGender(value);
      if (value.trim().length < 1) {
        setGenderError({ active: true, text: "Gender is required" });
      } else {
        setGenderError({ active: false, text: "Gender is valid" });
        setForm({ ...form, Gender: value });
      }
    }
    if (input == "CourseID") {
      setCourseID(Number(value));
      if (value.trim().length < 1) {
        setCourseIDError({ active: true, text: "Course ID is required" });
      } else {
        setCourseIDError({ active: false, text: "Course ID is valid" });
        setForm({ ...form, CourseID: Number(value) });
      }
    }
    if (input === "DOBstring") {
      // Convert YYYY-MM-DD to MM/DD/YYYY
      const parts = value.split("-");
      const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
      setDOBstring(value);
      if (!isValidDate(formattedDate)) {
        setDOBstringError({
          active: true,
          text: "Invalid date format. Please enter MM/DD/YYYY",
        });
      } else {
        setDOBstringError({ active: false, text: "Date of Birth is valid" });
        setForm({ ...form, DOBstring: formattedDate });
      }
    }
  };

  const isValidDate = (dateString: string) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  };
  // for states

  const [showLGADropdown, setShowLGADropdown] = useState(false);

  interface ICourse {
    Id: number;
    Name: string;
    Description: string;
  }
  interface IDis {
    id: number;
    name: string;
  }
  const [course, setCourse] = useState<string>("");
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    // Fetch states from API when component mounts
    fetchCourses();
    fetchDisabilities();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BACKEND_URL}/course/all`, config);

      setCourses(response.data.course);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchDisabilities = async () => {
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${BACKEND_URL}/student/disabilities`,
        config
      );
      setDisabilities(response.data);
    } catch (error) {
      console.error("Error fetching disabilities:", error);
    }
  };
  const [showDisabilityDropdown, setShowDisabilityDropdown] = useState(false);
  const [disability, setDisability] = useState<string>("");
  const [disabilities, setDisabilities] = useState<IDis[]>([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const handleCourseSelection = (name: string, value: number) => {
    setForm({ ...form, CourseID: value });
    setCourse(name);
    setShowCourseDropdown(false);
  };
  const handleDisabilitySelection = (name: string) => {
    setForm({ ...form, DisabilityName: name });
    setDisability(name);
    setShowDisabilityDropdown(false);
  };
  const handleStateSelection = (name: string) => {
    setForm({ ...form, StateOfResidence: name });
    setState(name);
    setShowDropdown(false);
  };

  const [state, setState] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const NaijaStates = require("naija-state-local-government");
  const [states, setStates] = useState(States);
  const [lgas, setLgas] = useState([]);
  const [lga, setLga] = useState("");
  const [statesOfOrigin, setStatesOfOrigin] = useState(States);

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const handleStateOfOriginSelection = (name: string) => {
    setForm({ ...form, StateOfOrigin: name });
    setStateOfOrigin(name);
    setShowStateDropdown(false);
  };

  const handleLGASelection = (name: string) => {
    setForm({ ...form, LocalGovernment: name });
    setLga(name);
    setShowLGADropdown(false);
  };

  useEffect(() => {
    if (stateOfOrigin) {
      const newLgas = NaijaStates.lgas(stateOfOrigin).lgas;
      setLgas(newLgas);
    }
  }, [stateOfOrigin]);

  // login button loader state
  const [isLoading, setIsLoading] = useState(false);
  const { fakeNewStudentId } = useAppSelector(mdaSelector);
  const dispatch = useAppDispatch();

  const [isSuccess, setIsSuccess] = useState(false);

  const isFormValid = () => {
    return (
      !emailError.active &&
      !firstNameError.active &&
      !lastNameError.active &&
      emailError.text !== "" &&
      lastNameError.text !== "" &&
      firstNameError.text !== ""
    );
  };
  const isFormValid2 = () => {
    return NationalIdentityNumber !== "";
  };

  const handleCreateStc = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !emailError.active &&
      !firstNameError.active &&
      !lastNameError.active &&
      emailError.text !== "" &&
      lastNameError.text !== "" &&
      state !== "" &&
      firstNameError.text !== ""
    ) {
      // call createMDA API
      const token = Cookies.get("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const body = {
          Email: form.Email,
          Lastname: form.Lastname,
          Gender: form.Gender,
          StateOfResidence: form.StateOfResidence,
          StateOfOrigin: form.StateOfOrigin,
          Address: form.Address,
          LocalGovernment: form.LocalGovernment,
          PhoneNumber: form.PhoneNumber,
          DOBstring: form.DOBstring,
          SID: form.SID,
          CourseID: form.CourseID,
          DisabilityName: form.DisabilityName,
          Firstname: form.Firstname,
          NationalIdentityNumber: form.NationalIdentityNumber,
          IsDisabled: disability ? true : false,
        };

        setIsLoading(true);
        const { data } = await axios.post(
          `${BACKEND_URL}/student/create-mda`,
          body,
          config
        );
        if (data) {
          setIsLoading(false);
          // update fakeMdaId
          let newFakeId = fakeNewStudentId ? fakeNewStudentId + 1 : 1;
          dispatch(setFakeNewStudentId(newFakeId));
          setIsSuccess(true);
        }
      } catch (error: any) {
        if (error.response) {
          setEmailError({
            active: true,
            text: error.response.data.error,
          });
          setFirstNameError({
            active: true,
            text: error.response.data.error,
          });
          setLastNameError({
            active: true,
            text: error.response.data.error,
          });
        } else {
          setOtherError({
            active: true,
            text: error.message,
          });
        }
        setIsLoading(false);
      }
    }
  };
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const handleContinue = () => {
    // Assuming formData is already populated with the first modal's data
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };
  const handleContinue2 = () => {
    // Assuming formData is already populated with the first modal's data
    setIsSecondModalOpen(false);
    setIsThirdModalOpen(true);
  };

  const handlePrevious = () => {
    setIsFirstModalOpen(true);
    setIsSecondModalOpen(false);
  };
  const handlePrevious2 = () => {
    setIsSecondModalOpen(true);
    setIsThirdModalOpen(false);
  };

  const router = useRouter();

  return (
    <>
      {isSuccess === false && (
        <NewMdaAbsoluteStyles>
          <div className="form">
            <ClickOutsideWrapper onClickOutside={cancelModal}>
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
                              name="Firstname"
                              value={Firstname}
                              className={
                                firstNameError.active ? "error-bdr" : ""
                              }
                              onChange={(e) => handleInput(e, "Firstname")}
                              placeholder="Please type in your first name here"
                            />
                            <div className="abs">
                              {firstNameError.active === false &&
                                firstNameError.text === "" && <NameIcon />}
                              {firstNameError.active === false &&
                                firstNameError.text !== "" && <CheckedIcon />}
                              {firstNameError.active === true && (
                                <FormErrorIcon />
                              )}
                            </div>
                            <p
                              role="alert"
                              aria-live="assertive"
                              aria-atomic="true"
                              className={
                                firstNameError.active ? "error-msg" : "correct"
                              }
                            >
                              {firstNameError.text}
                            </p>
                          </div>
                        </div>
                        <div className="form-ele flex-1">
                          <label htmlFor="lastName">Last Name</label>
                          <div className="inp">
                            <input
                              type="text"
                              name="Lastname"
                              value={Lastname}
                              className={
                                lastNameError.active ? "error-bdr" : ""
                              }
                              onChange={(e) => handleInput(e, "Lastname")}
                              placeholder="Please type in your last name here"
                            />
                            <div className="abs">
                              {lastNameError.active === false &&
                                lastNameError.text === "" && <NameIcon />}
                              {lastNameError.active === false &&
                                lastNameError.text !== "" && <CheckedIcon />}
                              {lastNameError.active === true && (
                                <FormErrorIcon />
                              )}
                            </div>
                            <p
                              role="alert"
                              aria-live="assertive"
                              aria-atomic="true"
                              className={
                                lastNameError.active ? "error-msg" : "correct"
                              }
                            >
                              {lastNameError.text}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="form-ele">
                        <label htmlFor="otherNames">Phone Number</label>
                        <div className="inp">
                          <input
                            type="text"
                            name="Phone"
                            value={Phone}
                            onChange={(e) => handleInput(e, "Phone")}
                            placeholder="Please type in your Phone Number here"
                          />
                          <div className="abs">
                            {phoneError.active === false &&
                              phoneError.text === "" && <NameIcon />}
                            {phoneError.active === false &&
                              phoneError.text !== "" && <CheckedIcon />}
                            {phoneError.active === true && <FormErrorIcon />}
                          </div>
                        </div>
                      </div>
                      <div className="form-ele">
                        <label htmlFor="email">Email Address</label>
                        <div className="inp">
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Please type in your Email Address"
                            className={emailError.active ? "error-bdr" : ""}
                            autoComplete="email"
                          />
                          <div className="abs">
                            {emailError.active === false &&
                              emailError.text === "" && <EmailIcon />}
                            {emailError.active === false &&
                              emailError.text !== "" && <CheckedIcon />}
                            {emailError.active === true && <FormErrorIcon />}
                          </div>
                          <p
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            className={
                              emailError.active ? "error-msg" : "correct"
                            }
                          >
                            {emailError.text}
                          </p>
                        </div>
                      </div>
                      <div className="form-ele ">
                        <label htmlFor="address">Date Of Birth</label>
                        <div className="inp">
                          <input
                            type="date"
                            name="DOB"
                            value={DOBstring}
                            onChange={(e) => handleInput(e, "DOBstring")}
                            className={DOBstringError.active ? "error-bdr" : ""}
                            placeholder="MM/DD/YYYY"
                          />
                          <div className="abs">
                            {DOBstringError.active === false &&
                              DOBstringError.text === "" && <LocationIcon />}
                            {DOBstringError.active === false &&
                              DOBstringError.text !== "" && <CheckedIcon />}
                            {DOBstringError.active === true && (
                              <FormErrorIcon />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-ele">
                        <label htmlFor="state">State of Origin</label>
                        <StatesDropdownStyles>
                          <div
                            className="head"
                            onClick={() =>
                              setShowStateDropdown(!showStateDropdown)
                            }
                          >
                            <>
                              {stateOfOrigin === "" ? (
                                <p className="placeholder">
                                  Please select state of residence
                                </p>
                              ) : (
                                <p className="state-name">{stateOfOrigin}</p>
                              )}
                            </>
                            <AngleDownStyles $isSelected={showStateDropdown}>
                              <AngleDown />
                            </AngleDownStyles>
                          </div>
                          {showStateDropdown && (
                            <div className="dropdown">
                              {statesOfOrigin.map((ele, index) => (
                                <StateCompStyles
                                  $isSelected={stateOfOrigin === ele.name}
                                  key={index}
                                  onClick={() =>
                                    handleStateOfOriginSelection(ele.name)
                                  }
                                >
                                  <p>{ele.name}</p>
                                </StateCompStyles>
                              ))}
                            </div>
                          )}
                        </StatesDropdownStyles>
                        {otherError.active && (
                          <p
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            className="error-msg"
                          >
                            {otherError.text}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {isSecondModalOpen && (
                    <div className="form-input">
                      <div className="form-ele">
                        <label htmlFor="state">State of Operation</label>
                        <StatesDropdownStyles>
                          <div
                            className="head"
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            <>
                              {state === "" ? (
                                <p className="placeholder">
                                  Please select state of residence
                                </p>
                              ) : (
                                <p className="state-name">{state}</p>
                              )}
                            </>
                            <AngleDownStyles $isSelected={showDropdown}>
                              <AngleDown />
                            </AngleDownStyles>
                          </div>
                          {showDropdown && (
                            <div className="dropdown">
                              {states.map((ele, index) => (
                                <StateCompStyles
                                  $isSelected={state === ele.name}
                                  key={index}
                                  onClick={() => handleStateSelection(ele.name)}
                                >
                                  <p>{ele.name}</p>
                                </StateCompStyles>
                              ))}
                            </div>
                          )}
                        </StatesDropdownStyles>
                        {otherError.active && (
                          <p
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            className="error-msg"
                          >
                            {otherError.text}
                          </p>
                        )}
                      </div>
                      <div className="form-ele flex-1">
                        <label htmlFor="Nin">NIN</label>
                        <div className="inp">
                          <input
                            type="text"
                            name="Nin"
                            id="Nin"
                            value={NationalIdentityNumber}
                            className={
                              NationalIdentityNumberError.active
                                ? "error-bdr"
                                : ""
                            }
                            onChange={(e) =>
                              handleInput(e, "NationalIdentityNumber")
                            }
                            placeholder="Please input NIN"
                          />
                          <div className="abs">
                            {NationalIdentityNumberError.active === false &&
                              NationalIdentityNumberError.text === "" && (
                                <NameIcon />
                              )}
                            {NationalIdentityNumberError.active === false &&
                              NationalIdentityNumberError.text !== "" && (
                                <CheckedIcon />
                              )}
                            {NationalIdentityNumberError.active === true && (
                              <FormErrorIcon />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-ele">
                        <label htmlFor="state">Local Government Area</label>
                        <StatesDropdownStyles>
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
                        {otherError.active && (
                          <p
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            className="error-msg"
                          >
                            {otherError.text}
                          </p>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor="gender"
                          className=" text-[#101928] font-semibold"
                        >
                          Gender
                        </label>
                        <div className="">
                          <div className=" flex gap-4">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              id="gender"
                              checked={gender === "male"}
                              onChange={(e) => handleInput(e, "gender")}
                            />{" "}
                            <span>Male</span>
                          </div>
                          <div className="flex gap-4">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              id="gender"
                              checked={gender === "female"}
                              onChange={(e) => handleInput(e, "gender")}
                            />{" "}
                            <span>Female</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isThirdModalOpen && (
                    <div className="form-input">
                      <div className="form-ele">
                        <label htmlFor="state">Training/Skill Program</label>
                        <StatesDropdownStyles>
                          <div
                            className="head"
                            onClick={() =>
                              setShowCourseDropdown(!showCourseDropdown)
                            }
                          >
                            <>
                              {course === "" ? (
                                <p className="placeholder">
                                  Please select the course taken
                                </p>
                              ) : (
                                <p className="state-name">{course}</p>
                              )}
                            </>
                            <AngleDownStyles $isSelected={showCourseDropdown}>
                              <AngleDown />
                            </AngleDownStyles>
                          </div>
                          {showCourseDropdown && (
                            <div className="dropdown">
                              {courses.map((ele, index) => (
                                <StateCompStyles
                                  $isSelected={course === ele.Name}
                                  key={index}
                                  onClick={() =>
                                    handleCourseSelection(ele.Name, ele.Id)
                                  }
                                >
                                  <p>{ele.Name}</p>
                                </StateCompStyles>
                              ))}
                            </div>
                          )}
                        </StatesDropdownStyles>
                        {otherError.active && (
                          <p
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            className="error-msg"
                          >
                            {otherError.text}
                          </p>
                        )}
                      </div>

                      <div className="form-ele flex-1">
                        <label htmlFor="firstName">Student ID</label>
                        <div className="inp">
                          <input
                            type="text"
                            name="studentID"
                            value={SID}
                            className={SIDError.active ? "error-bdr" : ""}
                            onChange={(e) => handleInput(e, "SID")}
                            placeholder="Please type in your Student ID"
                          />
                          <div className="abs">
                            {SIDError.active === false &&
                              SIDError.text === "" && <NameIcon />}
                            {SIDError.active === false &&
                              SIDError.text !== "" && <CheckedIcon />}
                            {SIDError.active === true && <FormErrorIcon />}
                          </div>
                        </div>
                      </div>
                      <div className="form-ele flex-1">
                        <label htmlFor="firstName">Address</label>
                        <div className="inp">
                          <input
                            type="text"
                            name="Address"
                            value={Address}
                            className={AddressError.active ? "error-bdr" : ""}
                            onChange={(e) => handleInput(e, "Address")}
                            placeholder="Please type in your Address"
                          />
                          <div className="abs">
                            {AddressError.active === false &&
                              AddressError.text === "" && <NameIcon />}
                            {AddressError.active === false &&
                              AddressError.text !== "" && <CheckedIcon />}
                            {AddressError.active === true && <FormErrorIcon />}
                          </div>
                        </div>
                      </div>
                      <div className="form-ele">
                        <label htmlFor="state">Disabilities</label>
                        <StatesDropdownStyles>
                          <div
                            className="head"
                            onClick={() =>
                              setShowDisabilityDropdown(!showDisabilityDropdown)
                            }
                          >
                            <>
                              {disability === "" ? (
                                <p className="placeholder">
                                  {" "}
                                  select the disability
                                </p>
                              ) : (
                                <p className="state-name">{disability}</p>
                              )}
                            </>
                            <AngleDownStyles
                              $isSelected={showDisabilityDropdown}
                            >
                              <AngleDown />
                            </AngleDownStyles>
                          </div>
                          {showDisabilityDropdown && (
                            <div className="dropdown">
                              {disabilities.map((ele, index) => (
                                <StateCompStyles
                                  $isSelected={disability === ele.name}
                                  key={index}
                                  onClick={() =>
                                    handleDisabilitySelection(ele.name)
                                  }
                                >
                                  <p>{ele.name}</p>
                                </StateCompStyles>
                              ))}
                            </div>
                          )}
                        </StatesDropdownStyles>
                        {otherError.active && (
                          <p
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            className="error-msg"
                          >
                            {otherError.text}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {isFirstModalOpen && (
                    <div className="flex gap-4">
                      <button
                        className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
                        onClick={cancelModal}
                      >
                        Cancel
                      </button>
                      <button
                        className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
                          isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={handleContinue}
                        disabled={!isFormValid()}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                  {isSecondModalOpen && (
                    <div className="flex gap-4">
                      <button
                        className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                      <button
                        className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
                          isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={handleContinue2}
                        disabled={!isFormValid2()}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                  {isThirdModalOpen && (
                    <div className="flex gap-4">
                      <button
                        className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
                        onClick={handlePrevious2}
                      >
                        Previous Page
                      </button>
                      <button
                        className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
                          isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                        type="submit"
                        disabled={
                          firstNameError.text == "" ||
                          lastNameError.text == "" ||
                          emailError.text == "" ||
                          phoneError.text == "" ||
                          firstNameError.active !== false ||
                          lastNameError.active !== false ||
                          emailError.active !== false ||
                          phoneError.active !== false ||
                          state == "" ||
                          DOBstring == "" ||
                          Address == ""
                        }
                      >
                        {isLoading ? <ButtonLoader /> : "Create Student"}
                      </button>
                    </div>
                  )}
                </form>
              </NewMdaFormStyles>
            </ClickOutsideWrapper>
          </div>
        </NewMdaAbsoluteStyles>

        // 			<ClickOutsideWrapper onClickOutside={cancelModal}>
        // 			<NewMdaFormStyles className="bd">
        // 				<div className="fl">
        // 					<div className="form-head">
        // 						<h3>Add New Student</h3>
        // 						<p>Fill in the necessary details to add a new Student</p>
        // 					</div>
        // 					<IconWrapper onClick={cancelModal}>
        // 						<XIcon />
        // 					</IconWrapper>
        // 				</div>
        // 				<form className="form" onSubmit={handleCreateStc}>
        // 					{isFirstModalOpen && (
        // 						<div className="form-input">
        // 							<div className="flex justify-between gap-4">
        // 								<div className="form-ele flex-1">
        // 									<label htmlFor="firstName">First Name</label>
        // 									<div className="inp">
        // 										<input
        // 											type="text"
        // 											name="Firstname"
        // 											value={Firstname}
        // 											className={firstNameError.active ? "error-bdr" : ""}
        // 											onChange={(e) => handleInput(e, "Firstname")}
        // 											placeholder="Please type in your first name here"
        // 										/>
        // 										<div className="abs">
        // 											{firstNameError.active === false && firstNameError.text === "" && <NameIcon />}
        // 											{firstNameError.active === false && firstNameError.text !== "" && <CheckedIcon />}
        // 											{firstNameError.active === true && <FormErrorIcon />}
        // 										</div>
        // 										<p role="alert" aria-live="assertive" aria-atomic="true" className={firstNameError.active ? "error-msg" : "correct"}>
        // 											{firstNameError.text}
        // 										</p>
        // 									</div>
        // 								</div>
        // 								<div className="form-ele flex-1">
        // 									<label htmlFor="lastName">Last Name</label>
        // 									<div className="inp">
        // 										<input
        // 											type="text"
        // 											name="Lastname"
        // 											value={Lastname}
        // 											className={lastNameError.active ? "error-bdr" : ""}
        // 											onChange={(e) => handleInput(e, "Lastname")}
        // 											placeholder="Please type in your last name here"
        // 										/>
        // 										<div className="abs">
        // 											{lastNameError.active === false && lastNameError.text === "" && <NameIcon />}
        // 											{lastNameError.active === false && lastNameError.text !== "" && <CheckedIcon />}
        // 											{lastNameError.active === true && <FormErrorIcon />}
        // 										</div>
        // 										<p role="alert" aria-live="assertive" aria-atomic="true" className={lastNameError.active ? "error-msg" : "correct"}>
        // 											{lastNameError.text}
        // 										</p>
        // 									</div>
        // 								</div>
        // 							</div>
        // 							<div className="form-ele">
        // 								<label htmlFor="otherNames">Phone Number</label>
        // 								<div className="inp">
        // 									<input
        // 										type="text"
        // 										name="Phone"
        // 										value={Phone}
        // 										onChange={(e) => handleInput(e, "Phone")}
        // 										placeholder="Please type in your Phone Number here"
        // 									/>
        // 									<div className="abs">
        // 										{phoneError.active === false && phoneError.text === "" && <NameIcon />}
        // 										{phoneError.active === false && phoneError.text !== "" && <CheckedIcon />}
        // 										{phoneError.active === true && <FormErrorIcon />}
        // 									</div>
        // 								</div>
        // 							</div>
        // 							<div className="form-ele">
        // 								<label htmlFor="email">Email Address</label>
        // 								<div className="inp">
        // 									<input
        // 										type="email"
        // 										name="email"
        // 										value={email}
        // 										onChange={handleEmailChange}
        // 										placeholder="Please type in your Email Address"
        // 										className={emailError.active ? "error-bdr" : ""}
        // 										autoComplete="email"
        // 									/>
        // 									<div className="abs">
        // 										{emailError.active === false && emailError.text === "" && <EmailIcon />}
        // 										{emailError.active === false && emailError.text !== "" && <CheckedIcon />}
        // 										{emailError.active === true && <FormErrorIcon />}
        // 									</div>
        // 									<p role="alert" aria-live="assertive" aria-atomic="true" className={emailError.active ? "error-msg" : "correct"}>
        // 										{emailError.text}
        // 									</p>
        // 								</div>
        // 							</div>
        // 							<div className="form-ele ">
        // 								<label htmlFor="address">Date Of Birth</label>
        // 								<div className="inp">
        // 									<input
        // 										type="date"
        // 										name="DOB"
        // 										value={DOBstring}
        // 										onChange={(e) => handleInput(e, "DOBstring")}
        // 										className={DOBstringError.active ? "error-bdr" : ""}
        // 										placeholder="MM/DD/YYYY"
        // 									/>
        // 									<div className="abs">
        // 										{DOBstringError.active === false && DOBstringError.text === "" && <LocationIcon />}
        // 										{DOBstringError.active === false && DOBstringError.text !== "" && <CheckedIcon />}
        // 										{DOBstringError.active === true && <FormErrorIcon />}
        // 									</div>
        // 								</div>
        // 							</div>

        // 							<div className="form-ele">
        // 								<label htmlFor="state">State of Origin</label>
        // 								<StatesDropdownStyles>
        // 									<div className="head" onClick={() => setShowStateDropdown(!showStateDropdown)}>
        // 										<>
        // 											{stateOfOrigin === "" ? <p className="placeholder">Please select state of residence</p> : <p className="state-name">{stateOfOrigin}</p>}
        // 										</>
        // 										<AngleDownStyles $isSelected={showStateDropdown}>
        // 											<AngleDown />
        // 										</AngleDownStyles>
        // 									</div>
        // 									{showStateDropdown && (
        // 										<div className="dropdown">
        // 											{statesOfOrigin.map((ele, index) => (
        // 												<StateCompStyles $isSelected={stateOfOrigin === ele.name} key={index} onClick={() => handleStateOfOriginSelection(ele.name)}>
        // 													<p>{ele.name}</p>
        // 												</StateCompStyles>
        // 											))}
        // 										</div>
        // 									)}
        // 								</StatesDropdownStyles>
        // 								{otherError.active && (
        // 									<p role="alert" aria-live="assertive" aria-atomic="true" className="error-msg">
        // 										{otherError.text}
        // 									</p>
        // 								)}
        // 							</div>

        // 						</div>
        // 					)}
        // 					{isSecondModalOpen && (
        // 						<div className="form-input">
        // 							<div className="form-ele">
        // 								<label htmlFor="state">State of Operation</label>
        // 								<StatesDropdownStyles>
        // 									<div className="head" onClick={() => setShowDropdown(!showDropdown)}>
        // 										<>
        // 											{state === "" ? <p className="placeholder">Please select state of residence</p> : <p className="state-name">{state}</p>}
        // 										</>
        // 										<AngleDownStyles $isSelected={showDropdown}>
        // 											<AngleDown />
        // 										</AngleDownStyles>
        // 									</div>
        // 									{showDropdown && (
        // 										<div className="dropdown">
        // 											{states.map((ele, index) => (
        // 												<StateCompStyles $isSelected={state === ele.name} key={index} onClick={() => handleStateSelection(ele.name)}>
        // 													<p>{ele.name}</p>
        // 												</StateCompStyles>
        // 											))}
        // 										</div>
        // 									)}
        // 								</StatesDropdownStyles>
        // 								{otherError.active && (
        // 									<p role="alert" aria-live="assertive" aria-atomic="true" className="error-msg">
        // 										{otherError.text}
        // 									</p>
        // 								)}
        // 							</div>
        // 							<div className="form-ele flex-1">
        // 								<label htmlFor="Nin">NIN</label>
        // 								<div className="inp">
        // 									<input
        // 										type="text"
        // 										name="Nin"
        // 										id="Nin"
        // 										value={NationalIdentityNumber}
        // 										className={NationalIdentityNumberError.active ? "error-bdr" : ""}
        // 										onChange={(e) => handleInput(e, "NationalIdentityNumber")}
        // 										placeholder="Please input NIN"
        // 									/>
        // 									<div className="abs">
        // 										{NationalIdentityNumberError.active === false && NationalIdentityNumberError.text === "" && <NameIcon />}
        // 										{NationalIdentityNumberError.active === false && NationalIdentityNumberError.text !== "" && <CheckedIcon />}
        // 										{NationalIdentityNumberError.active === true && <FormErrorIcon />}
        // 									</div>
        // 								</div>
        // 							</div>
        // 							<div className="form-ele">
        // 								<label htmlFor="state">Local Government Area</label>
        // 								<StatesDropdownStyles>
        // 									<div className="head" onClick={() => setShowLGADropdown(!showLGADropdown)}>
        // 										<>
        // 											{lga === "" ? <p className="placeholder">Please select local government area</p> : <p className="state-name">{lga}</p>}
        // 										</>
        // 										<AngleDownStyles $isSelected={showLGADropdown}>
        // 											<AngleDown />
        // 										</AngleDownStyles>
        // 									</div>
        // 									{showLGADropdown && (
        // 										<div className="dropdown">
        // 											{lgas.map((ele, index) => (
        // 												<StateCompStyles $isSelected={lga === ele} key={index} onClick={() => handleLGASelection(ele)}>
        // 													<p>{ele}</p>
        // 												</StateCompStyles>
        // 											))}
        // 										</div>
        // 									)}
        // 								</StatesDropdownStyles>
        // 								{otherError.active && (
        // 									<p role="alert" aria-live="assertive" aria-atomic="true" className="error-msg">
        // 										{otherError.text}
        // 									</p>
        // 								)}
        // 							</div>
        // 		<div className="">
        // 								<label htmlFor="gender" className=" text-[#101928] font-semibold">
        // 									Gender
        // 								</label>
        // 								<div className="">
        // 									<div className=" flex gap-4">
        // 										<input
        // 											type="radio"
        // 											name="gender"
        // 											value="male"
        // 											id="gender"
        // 											checked={gender === "male"}
        // 											onChange={(e) => handleInput(e, "gender")}
        // 										/>{" "}
        // 										<span>Male</span>
        // 									</div>
        // 									<div className="flex gap-4">
        // 										<input
        // 											type="radio"
        // 											name="gender"
        // 											value="female"
        // 											id="gender"
        // 											checked={gender === "female"}
        // 											onChange={(e) => handleInput(e, "gender")}
        // 										/>{" "}
        // 										<span>Female</span>
        // 									</div>
        // 								</div>
        // 							</div>

        // 						</div>
        // 					)}
        // 					{isThirdModalOpen && (

        // 						<div className="form-input">

        // 		<div className="form-ele">
        // 								<label htmlFor="state">Training/Skill Program</label>
        // 								<StatesDropdownStyles>
        // 									<div className="head" onClick={() => setShowCourseDropdown(!showCourseDropdown)}>
        // 										<>
        // 											{course === "" ? <p className="placeholder">Please select the course taken</p> : <p className="state-name">{course}</p>}
        // 										</>
        // 										<AngleDownStyles $isSelected={showCourseDropdown}>
        // 											<AngleDown />
        // 										</AngleDownStyles>
        // 									</div>
        // 									{showCourseDropdown && (
        // 										<div className="dropdown">
        // 											{courses.map((ele, index) => (
        // 												<StateCompStyles $isSelected={course === ele.Name} key={index} onClick={() => handleCourseSelection(ele.Name, ele.Id)}>
        // 													<p>{ele.Name}</p>
        // 												</StateCompStyles>
        // 											))}
        // 										</div>
        // 									)}
        // 								</StatesDropdownStyles>
        // 								{otherError.active && (
        // 									<p role="alert" aria-live="assertive" aria-atomic="true" className="error-msg">
        // 										{otherError.text}
        // 									</p>
        // 								)}
        // 							</div>

        // 							<div className="form-ele flex-1">
        // 								<label htmlFor="firstName">Student ID</label>
        // 								<div className="inp">
        // 									<input
        // 										type="text"
        // 										name="studentID"
        // 										value={SID}
        // 										className={SIDError.active ? "error-bdr" : ""}
        // 										onChange={(e) => handleInput(e, "SID")}
        // 										placeholder="Please type in your Student ID"
        // 									/>
        // 									<div className="abs">
        // 										{SIDError.active === false && SIDError.text === "" && <NameIcon />}
        // 										{SIDError.active === false && SIDError.text !== "" && <CheckedIcon />}
        // 										{SIDError.active === true && <FormErrorIcon />}
        // 									</div>
        // 								</div>
        // 							</div>
        // 							<div className="form-ele flex-1">
        // 								<label htmlFor="firstName">Address</label>
        // 								<div className="inp">
        // 									<input
        // 										type="text"
        // 										name="Address"
        // 										value={Address}
        // 										className={AddressError.active ? "error-bdr" : ""}
        // 										onChange={(e) => handleInput(e, "Address")}
        // 										placeholder="Please type in your Address"
        // 									/>
        // 									<div className="abs">
        // 										{AddressError.active === false && AddressError.text === "" && <NameIcon />}
        // 										{AddressError.active === false && AddressError.text !== "" && <CheckedIcon />}
        // 										{AddressError.active === true && <FormErrorIcon />}
        // 									</div>
        // 								</div>
        // 							</div>
        // 							<div className="form-ele">
        // 								<label htmlFor="state">Disabilities</label>
        // 								<StatesDropdownStyles>
        // 									<div className="head" onClick={() => setShowDisabilityDropdown(!showDisabilityDropdown)}>
        // 										<>
        // 											{disability === "" ? <p className="placeholder"> select the disability</p> : <p className="state-name">{disability}</p>}
        // 										</>
        // 										<AngleDownStyles $isSelected={showDisabilityDropdown}>
        // 											<AngleDown />
        // 										</AngleDownStyles>
        // 									</div>
        // 									{showDisabilityDropdown && (
        // 										<div className="dropdown">
        // 											{disabilities.map((ele, index) => (
        // 												<StateCompStyles $isSelected={disability === ele.name} key={index} onClick={() => handleDisabilitySelection(ele.name)}>
        // 													<p>{ele.name}</p>
        // 												</StateCompStyles>
        // 											))}
        // 										</div>
        // 									)}
        // 								</StatesDropdownStyles>
        // 								{otherError.active && (
        // 									<p role="alert" aria-live="assertive" aria-atomic="true" className="error-msg">
        // 										{otherError.text}
        // 									</p>
        // 								)}
        // 							</div>

        // 						</div>
        // 					)}
        // 					{isFirstModalOpen && (
        // 						<div className="flex gap-4">
        // 							<button
        // 								className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
        // 								onClick={cancelModal}>
        // 								Cancel
        // 							</button>
        // 							<button
        // 								className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
        // 									isFormValid() ? "" : "opacity-50 cursor-not-allowed"
        // 								}`}
        // 								onClick={handleContinue}
        // 								disabled={!isFormValid()}>
        // 								Continue
        // 							</button>
        // 						</div>
        // 					)}
        // 					{isSecondModalOpen && (
        // 						<div className="flex gap-4">
        // 							<button
        // 								className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
        // 								onClick={handlePrevious}>
        // 								Previous
        // 							</button>
        // 							<button
        // 								className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
        // 									isFormValid() ? "" : "opacity-50 cursor-not-allowed"
        // 								}`}
        // 								onClick={handleContinue2}
        // 								disabled={!isFormValid2()}>
        // 								Continue
        // 							</button>
        // 						</div>
        // 					)}
        // 					{isThirdModalOpen && (
        // 						<div className="flex gap-4">
        // 							<button
        // 								className="flex-1 h-12 rounded-[10px] text-[#00932E] border-2 border-solid font-bold bg-white border-[#00932E]"
        // 								onClick={handlePrevious2}>
        // 								Previous Page
        // 							</button>
        // 							<button
        // 								className={`flex-1 h-12 rounded-[10px] bg-[#00932E] border-2 border-solid font-bold text-white border-[#00932E] ${
        // 									isFormValid() ? "" : "opacity-50 cursor-not-allowed"
        // 								}`}
        // 								type="submit"
        // 								disabled={
        // 									firstNameError.text == "" ||
        // 									lastNameError.text == "" ||
        // 									emailError.text == "" ||
        // 									phoneError.text == "" ||
        // 									firstNameError.active !== false ||
        // 									lastNameError.active !== false ||
        // 									emailError.active !== false ||
        // 									phoneError.active !== false ||
        // 									state == ""||
        // 									DOBstring==""||
        // 			Address==""
        // 								}>
        // 								{isLoading ? <ButtonLoader /> : "Create Student"}
        // 							</button>
        // 						</div>
        // 					)}
        // 				</form>
        // 			</NewMdaFormStyles>
        // </ClickOutsideWrapper>
      )}
      {isSuccess && (
        <ClickOutsideWrapper onClickOutside={cancelModal}>
          <FlexAbsoluteModalStyles>
            <SuccessModal
              head="New Student has been successfully created !"
              msg="THe new student was created successfully. Have a lovely day!"
              cancelModal={cancelModal}
              icon={<CreationSuccessIcon />}
              hasCancel={true}
              navigationFunction={cancelModal}
              navigationText="Go back to Dashboard"
            />
          </FlexAbsoluteModalStyles>
        </ClickOutsideWrapper>
      )}
    </>
  );
};

export const StudentsDetailModal: React.FC<IOneButtonModal> = ({
  cancelModal,
}) => {
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActiveModal, setShowActivateModal] = useState(false);
  const [showGraduateModal, setShowGraduateModal] = useState(false);
  const { selectedStudentId, unchangedStudentsList } =
    useAppSelector(mdaSelector);

  const [studentDetails, setStudentDetails] = useState(
    unchangedStudentsList?.find((ele) => ele.ID == selectedStudentId)
  );
  useEffect(() => {
    console.log(studentDetails);
    setStudentDetails(
      unchangedStudentsList?.find((ele) => ele.ID == selectedStudentId)
    );
  }, [unchangedStudentsList, selectedStudentId]);
  const fullName = `${studentDetails?.FirstName || ""} ${
    studentDetails?.LastName || ""
  }`;

  return (
    <>
      {!showSuspendModal && studentDetails && (
        <MDADetailStyle>
          <div className="left" onClick={cancelModal}></div>
          <div className="right">
            <div className="r-1">
              <BackBtn backFunction={cancelModal} />
              <div className="name">
                <div className="avatar">
                  <p>{fullName.slice(0, 2).toUpperCase()}</p>
                </div>
                <div className="deet">
                  <h4>{truncateString(fullName, 40)}</h4>
                  <p>
                    Added on{" "}
                    {studentDetails.CreatedAt
                      ? new Date(studentDetails.CreatedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Date not available"}
                  </p>
                </div>
              </div>
            </div>
            <div className="r-2">
              <div className="details">
                <div className="dx">
                  <div className="name">
                    <span>Name of Student</span>
                    <p>{truncateString(fullName, 40)}</p>
                  </div>
                  <CopyIcon text={fullName} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>Student ID</span>
                    <p className="nm">#{studentDetails.UserID}</p>
                  </div>
                  <CopyIcon text={studentDetails.UserID.toString()} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>Student Phone Number</span>
                    <p className="nm">{studentDetails.PhoneNumber}</p>
                  </div>
                  <CopyIcon text={studentDetails.PhoneNumber} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>State of Residence</span>
                    <p className="nm">{studentDetails.StateOfResidence}</p>
                  </div>
                  <CopyIcon text={studentDetails.StateOfResidence} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>Course Taken</span>
                    <p className="nm">{studentDetails.CoursesTaken}</p>
                  </div>
                  <CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
                </div>
                {/* <div className="dx">
									<div className="name">
										<span>Student Certificate</span>
										<p className="nm">{studentDetails.profile} PDF.pdf</p>
									</div>
									<CopyIcon text="124, Oyediran Estate, Lagos, Nigeria, 5432" />
								</div> */}
                <div className="dx">
                  <div className="name">
                    <span>Has Graduated?</span>
                    <HasGraduatedStatusComp $isActive={studentDetails.IsGraduated} />
                  </div>
                </div>

                <div className="dx">
                  <div className="name">
                    <span>Status</span>
                    <StatusComp $isActive={studentDetails.IsActive} />
                  </div>
                </div>
              </div>
            </div>
            <div className="r-3">
              <h4>
                {studentDetails.IsActive ? "Suspend Student" : "Re-activate"}
              </h4>
              <div className="btn">
                {studentDetails.IsActive ? (
                  <button
                    type="button"
                    onClick={() => setShowSuspendModal(true)}
                  >
                    <SuspendIcon />
                    <p>Suspend Student</p>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="reactivate"
                    onClick={() => setShowActivateModal(true)}
                  >
                    <ReactivateIcon />
                    <p>Re-Activate Student</p>
                  </button>
                )}
              </div>
            </div>
            {!studentDetails.IsGraduated && (
              <div className="r-3">
                <h4>Graduate Student</h4>
                <div className="btnn">
                  <button
                    type="button"
                    className=""
                    onClick={() => setShowGraduateModal(true)}
                  >
                    <SuspendIcon />
                    <p>Graduate Student</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </MDADetailStyle>
      )}
      {showSuspendModal && (
        <SuspendStudentComp
          handleModalAction={cancelModal}
          cancelModal={() => setShowSuspendModal(false)}
        />
      )}
      {showGraduateModal && (
        <GraduateStudentComp
          handleModalAction={cancelModal}
          cancelModal={() => setShowGraduateModal(false)}
        />
      )}
      {showActiveModal && (
        <ReactivateStudentComp
          handleModalAction={cancelModal}
          cancelModal={() => setShowActivateModal(false)}
        />
      )}
    </>
  );
};

interface ITwoActions {
  cancelModal: () => void;
  handleModalAction?: () => void;
}
export const GraduateStudentComp: React.FC<ITwoActions> = ({
  cancelModal,
  handleModalAction,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [form, setForm] = useState({
    DateOfGrad: "",
    NsqLevel: "",
  });
  const [DateOfGrad, setDateOfGrad] = useState("");
  const [DateOfGradError, setDateOfGradError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [NsqLevel, setNsqLevel] = useState("");
  const [NsqLevelError, setNsqLevelError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = e.target.value;

    if (input == "NsqLevel") {
      setNsqLevel(value);
      if (value.trim().length < 1) {
        setNsqLevelError({ active: true, text: "NSQ Level is required" });
      } else {
        setNsqLevelError({ active: false, text: "NSQ Level is valid" });
        setForm({ ...form, NsqLevel: value });
      }
    }

    if (input === "DateOfGrad") {
      // Convert YYYY-MM-DD to MM/DD/YYYY
      const parts = value.split("-");
      const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
      setDateOfGrad(value);
      if (!isValidDate(formattedDate)) {
        setDateOfGradError({
          active: true,
          text: "Invalid date format. Please enter MM/DD/YYYY",
        });
      } else {
        setDateOfGradError({ active: false, text: "Date of Birth is valid" });
        setForm({ ...form, DateOfGrad: formattedDate });
      }
    }
  };
  const isValidDate = (dateString: string) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  };

  const { selectedStudentId, unchangedStudentsList } =
    useAppSelector(mdaSelector);
  const dispatch = useAppDispatch();
  const suspend = async () => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = unchangedStudentsList?.find(
      (ele) => ele.ID === selectedStudentId
    )?.UserID;
    if (selectedStudentId) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${BACKEND_URL}/student/graduate-student/${selectedStudentId}`,
          form,
          config
        );
        setIsSuccess(true);
        // if (data) {
        // 	if (unchangedStudentsList !== null) {
        // 		const newMdalist = unchangedStudentsList.map((ele) => {
        // 			return {
        // 				...ele,
        // 				is_active: ele.ID === selectedStudentId ? false : ele.IsActive,
        // 			};
        // 		});
        // 		setIsLoading(false);
        // 		// why does this state not update Immediately on the UI?
        // 		dispatch(setUnchangedStudentsList(newMdalist));

        // 	}
        // }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          // if the server responds with an error msg
          setMsgError({
            active: true,
            text: error.response.data.message,
          });
          // error.response.data.message
        } else {
          setMsgError({
            active: true,
            text: error.message,
          });
        }
      }
    }
  };
  const router = useRouter();
  return (
    <>
      <FlexAbsoluteModalStyles>
        {!isSuccess && !msgError.active && (
          <TwoButtonModalStyles>
            <NewMdaFormStyles className="bd">
              <div className="pop">
                <div className="up">
                  <div className="x" onClick={cancelModal}>
                    {" "}
                    <ErrorIconWrapper>
                      <ErrorAlertIcon />
                    </ErrorIconWrapper>
                    <XIcon />
                  </div>
                  <h4>Graduate Student?</h4>
                  <p>
                    Are you sure you want to graduate this Student? He will now
                    be graduated and able to proceed with job applications.
                  </p>
                  <div className="form-ele flex-1">
                    <label htmlFor="lastName">NSQ Level</label>
                    <div className="inp">
                      <input
                        type="text"
                        name="lastName"
                        value={NsqLevel}
                        className={NsqLevelError.active ? "error-bdr" : ""}
                        onChange={(e) => handleInput(e, "NsqLevel")}
                        placeholder="Please input NSQ Level"
                      />
                    </div>
                  </div>
                  <div className="form-ele ">
                    <label htmlFor="address">Date Of Graduation</label>
                    <div className="inp">
                      <input
                        type="date"
                        name="DOB"
                        value={DateOfGrad}
                        onChange={(e) => handleInput(e, "DateOfGrad")}
                        className={DateOfGradError.active ? "error-bdr" : ""}
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                </div>
                <div className="down">
                  <button
                    type="button"
                    onClick={cancelModal}
                    className="cancel"
                  >
                    Cancel
                  </button>
                  <button type="button" id="btnn" onClick={suspend}>
                    {isLoading ? <ButtonLoader /> : "Graduate Student"}
                  </button>
                </div>
              </div>
            </NewMdaFormStyles>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          <SuccessModal
            head="Student has been successfully graduated !"
            msg="Student has been successfully graduated !. Have a lovely day!"
            cancelModal={cancelModal}
            hasCancel={true}
            navigationFunction={
              handleModalAction ? handleModalAction : cancelModal
            }
            navigationText="Go back to Dashboard"
          />
        )}
        {msgError.active && (
          <FailureModal
            cancelModal={() =>
              setMsgError({
                active: false,
                text: "",
              })
            }
            head="Failed to graduate Student !"
            msg={msgError.text}
            navigationFunction={cancelModal}
            navigationText="Go back to Dashboard"
            hasCancel={true}
          />
        )}
      </FlexAbsoluteModalStyles>
    </>
  );
};

export const SuspendStudentComp: React.FC<ITwoActions> = ({
  cancelModal,
  handleModalAction,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const { selectedStudentId, unchangedStudentsList } =
    useAppSelector(mdaSelector);

  const dispatch = useAppDispatch();
  const suspend = async () => {
    // make Suspend STC API call to suspend MDA
    // if successful, change the data on the frontend
    // display error / success message
    // let's assume the API call was successful
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = unchangedStudentsList?.find(
      (ele) => ele.ID === selectedStudentId
    )?.UserID;
    if (userId) {
      try {
        setIsLoading(true);
        // console.log({reason});
        const { data } = await axios.get(
          `${BACKEND_URL}/user/suspend/${userId}`,
          {
            params: { Reason: reason },
            ...config,
          }
        );
        if (data) {
          if (unchangedStudentsList !== null) {
            const newMdalist = unchangedStudentsList.map((ele) => {
              return {
                ...ele,
                is_active: ele.ID === selectedStudentId ? false : ele.IsActive,
              };
            });
            setIsLoading(false);
            // why does this state not update Immediately on the UI?
            dispatch(setUnchangedStudentsList(newMdalist));
            setIsSuccess(true);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          // if the server responds with an error msg
          setMsgError({
            active: true,
            text: error.response.data.message,
          });
          // error.response.data.message
        } else {
          setMsgError({
            active: true,
            text: error.message,
          });
        }
      }
    }
  };
  const router = useRouter();
  return (
    <>
      <FlexAbsoluteModalStyles>
        {!isSuccess && !msgError.active && (
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
                <p>
                  Are you sure you want to suspend this Student? It will no
                  longer be visible and not able to take any course for.
                </p>
                <div className="inp">
                  <input
                    type="text"
                    name="reason"
                    placeholder="Reason for suspension"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
              <div className="down">
                <button type="button" onClick={cancelModal} className="cancel">
                  Cancel
                </button>
                <button type="button" onClick={suspend}>
                  {isLoading ? <ButtonLoader /> : "Suspend Student"}
                </button>
              </div>
            </div>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          <SuccessModal
            head="Student has been successfully suspended !"
            msg="You have successfully suspended a student. Have a lovely day!"
            cancelModal={cancelModal}
            hasCancel={true}
            navigationFunction={
              handleModalAction ? handleModalAction : cancelModal
            }
            navigationText="Go back to Dashboard"
          />
        )}
        {msgError.active && (
          <FailureModal
            cancelModal={() =>
              setMsgError({
                active: false,
                text: "",
              })
            }
            head="Failed to suspend Student !"
            msg={msgError.text}
            navigationFunction={cancelModal}
            navigationText="Go back to Dashboard"
            hasCancel={true}
          />
        )}
      </FlexAbsoluteModalStyles>
    </>
  );
};

export const ReactivateStudentComp: React.FC<ITwoActions> = ({
  cancelModal,
  handleModalAction,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { selectedStudentId, unchangedStudentsList } =
    useAppSelector(mdaSelector);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const reactivate = async () => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = unchangedStudentsList?.find(
      (ele) => ele.ID === selectedStudentId
    )?.UserID;
    if (userId) {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/user/activate/${userId}`,
          config
        );
        if (data) {
          if (unchangedStudentsList !== null) {
            const newMdalist = unchangedStudentsList.map((ele) => {
              return {
                ...ele,
                is_active: ele.ID === selectedStudentId ? true : ele.IsActive,
              };
            });
            setIsLoading(false);
            dispatch(setUnchangedStudentsList(newMdalist));
            setIsSuccess(true);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          // if the server responds with an error msg
          setMsgError({
            active: true,
            text: error.response.data.message,
          });
          // error.response.data.message
        } else {
          setMsgError({
            active: true,
            text: error.message,
          });
        }
      }
    }
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
                <p>
                  You are about to re-activate this student and restore it to
                  its latter glory. Are you sure you want to take this action?
                </p>
              </div>
              <div className="down">
                <button type="button" onClick={cancelModal} className="cancel">
                  Cancel
                </button>
                <button type="button" onClick={reactivate}>
                  {isLoading ? <ButtonLoader /> : "Re-activate"}
                </button>
              </div>
            </div>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          <SuccessModal
            head="Student has been successfully re-activated !"
            msg="You have successfully re-activated a student. Have a lovely day!"
            cancelModal={() => window.location.reload()}
            hasCancel={true}
            navigationFunction={
              handleModalAction ? handleModalAction : cancelModal
            }
            navigationText="Go back to Dashboard"
          />
        )}
        {msgError.active && (
          <FailureModal
            cancelModal={() =>
              setMsgError({
                active: false,
                text: "",
              })
            }
            head="Failed to re-activate Student !"
            msg={msgError.text}
            navigationFunction={cancelModal}
            navigationText="Go back to Dashboard"
            hasCancel={true}
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

export const FailureModal: React.FC<IMessageModal> = ({
  cancelModal,
  head,
  msg,
  navigationText,
  hasCancel,
  navigationFunction,
}) => {
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
