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
    SuspendIcon,
    ThreedotsIcon,
    TotalCoursesIcon,
    TotalSTCIcon,
    TotalStudentsIcon,
    TryAgainIcon,
    UncheckedBoxIcon,
  } from "@/components/icons/fme/mda";
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
  import { XIcon } from "@/components/icons/sidebar";
  import {
    CheckedIcon,
    EmailIcon,
    FormErrorIcon,
  } from "@/components/icons/recovery";
  import { BackBtn } from "@/components/recovery/recovery";
  import { FormEvent, ReactNode, useState } from "react";
  import { usePathname, useRouter } from "next/navigation";
  import { StatusComp } from "../mda/mda";
  import { Ierror } from "@/app/recovery/page";
  import { validateEmail } from "@/utils/validateEmail";
  import { AngleDown, AngleDownStyles } from "@/components/icons/header";
  import { Courses } from "./data";
  
  interface IOneButtonModal {
    cancelModal: () => void;
  }
  
  interface IForm {
    courseTitle: string;
    course: string;
    courseDescription: string;
  }
  
  export const NewMdaModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
    const [form, setForm] = useState<IForm>({
      courseTitle: "",
      courseDescription: "",
      course: "",
    });
  
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<Ierror>({
      active: false,
      text: "",
    });
   
    const [courseTitle, setCourseTitle] = useState("");
    const [courseError, setCourseError] = useState<Ierror>({
      active: false,
      text: "",
    });
    const [courseDescription, setCourseDescription] = useState("");
const [courseDescriptionError, setCourseDescriptionError] = useState<Ierror>({
    active: false,
    text: "",
});
  
    const handleInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      input: string
    ) => {
      const value = e.target.value;
      if (input == "courseTitle") {
        setCourseTitle(value);
        if (value.trim().length < 1) {
        setCourseError({ active: true, text: "Course title is required" });
        } else {
          setCourseError({ active: false, text: "Course title is valid" });
          setForm({ ...form, courseTitle: value });
        }
      }
      if (input == "courseDescription") {
        setCourseDescription(value);
        if (value.trim().length < 1) {
          setCourseDescriptionError({ active: true, text: "Course description  is required" });
        } else {
          setCourseDescriptionError({ active: false, text: "Course description  is valid" });
          setForm({ ...form, courseDescription: value });
        }
      }
    };
    // for states
    const [course, setCourse] = useState("");
    const [courses, setCourses ] = useState(Courses);
  
    const [showDropdown, setShowDropdown] = useState(false);
    const handleCourseSelection = (name: string) => {
        setCourse(name);
      setShowDropdown(false);
    };
  
    const [isSuccess, setIsSuccess] = useState(false);
    const handleCreateCourse = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent default form submission
      // check if the username and pwd match the DB using the APIendpoint, setup the user session using redux and navigate to the respective dashboard
      if (
        
        !courseDescriptionError.active &&
        !courseError.active &&
        courseDescriptionError.text !== "" &&
        course !== "" &&
        courseError.text !== ""
      ) {
        // call createCourse API
        console.log(form);
        setIsSuccess(true);
      }
    };
  
    const router = useRouter();
    return (
      <>
        {isSuccess == false && (
          <NewMdaAbsoluteStyles>
            <div className="form">
              <NewMdaFormStyles className="bd">
                <div className="fl">
                  <div className="form-head">
                    <h3>Add New Course</h3>
                    <p>Fill in the necessary details to add a new course</p>
                  </div>
                  <IconWrapper onClick={cancelModal}>
                    <XIcon />
                  </IconWrapper>
                </div>
                <form className="form" onSubmit={handleCreateCourse}>
                  <div className="form-input">
                  <div className="form-ele">
                    <label htmlFor="address">Course category</label>
                    <StatesDropdownStyles>
                      <div
                        className="head"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <>
                          {course == "" ? (
                            <p className="placeholder">
                              Please select the course category
                            </p>
                          ) : (
                            <p className="state-name">{course}</p>
                          )}
                        </>
                        <AngleDownStyles $isSelected={showDropdown}>
                          <AngleDown />
                        </AngleDownStyles>
                      </div>
                      {showDropdown && (
                        <div className="dropdown">
                          {courses.map((ele, index) => (
                            <StateCompStyles
                              $isSelected={course == ele.name}
                              key={index}
                              onClick={() => handleCourseSelection(ele.name)}
                            >
                              <p>{ele.name}</p>
                            </StateCompStyles>
                          ))}
                        </div>
                      )}
                    </StatesDropdownStyles>
                  </div>
                    <div className="form-ele">
                      <label htmlFor="name">Course Title</label>
                      <div className="inp">
                        <input
                          type="text"
                          name="courseTitle"
                          value={courseTitle}
                          className={courseError.active ? "error-bdr" : ""}
                          onChange={(e) => handleInput(e, "courseTitle")}
                          placeholder="Please type in the course title"
                        />
                        <div className="abs">
                          {courseError.active === false &&
                            courseError.text === "" && <NameIcon />}
                          {courseError.active === false &&
                            courseError.text !== "" && <CheckedIcon />}
                          {courseError.active === true && <FormErrorIcon />}
                        </div>
                        <p
                          role="alert"
                          aria-live="assertive"
                          aria-atomic="true"
                          className={courseError.active ? "error-msg" : "correct"}
                        >
                          {courseError.text}
                        </p>
                      </div>
                    </div>
                    <div className="form-ele">
                      <label htmlFor="address">Course Description</label>
                      <div className="inp">
                      <textarea 
                        name="courseDescription"
                        
                        id=""
                        value={courseDescription}
                        onChange={(e) => handleInput(e, "courseDescription")}
                        className={courseDescriptionError.active ? "error-bdr" : ""}
                        placeholder="Please type in course description"
                        />

                        <p
                          role="alert"
                          aria-live="assertive"
                          aria-atomic="true"
                          className={
                            courseDescriptionError.active ? "error-msg" : "correct"
                          }
                        >
                          {courseDescriptionError.text}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="btn-m">
                    <button
                      type="submit"
                      disabled={
                        courseError.text == "" ||
                        courseDescriptionError.text == "" ||
                        courseError.active !== false ||
                        courseDescriptionError.active !== false ||
                        course == ""
                      }
                    >
                      Create Course
                    </button>
                  </div>
                </form>
              </NewMdaFormStyles>
            </div>
          </NewMdaAbsoluteStyles>
        )}
        {isSuccess && (
          <FlexAbsoluteModalStyles>
            <SuccessModal
              head="New Course has been successfully created !"
              msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
              cancelModal={cancelModal}
              icon={<CreationSuccessIcon />}
              navigationText="Go back to Dashboard"
              hasCancel={true}
              navigationFunction={() => router.push("/fme")}
            />
          </FlexAbsoluteModalStyles>
        )}
      </>
    );
  };
  
  export const MdaDetailModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
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
                    <p>NI</p>
                  </div>
                  <div className="deet">
                    <h4>NITDA</h4>
                    <p>Added on Jul 11, 2023</p>
                  </div>
                </div>
              </div>
              <div className="r-2">
                <div className="totals">
                  <div className="total">
                    <IconWrapper>
                      <TotalSTCIcon />
                    </IconWrapper>
                    <div className="title">Total STCs</div>
                    <div className="numer">
                      <p>1000</p>
                      <GraphIcon />
                    </div>
                  </div>
                  <div className="total">
                    <IconWrapper>
                      <TotalCoursesIcon />
                    </IconWrapper>
                    <div className="title">Total No of Courses</div>
                    <div className="numer">
                      <p>1000</p>
                      <GraphIcon />
                    </div>
                  </div>
                  <div className="total">
                    <IconWrapper>
                      <TotalStudentsIcon />
                    </IconWrapper>
                    <div className="title">Total No of Students</div>
                    <div className="numer">
                      <p>1000</p>
                      <GraphIcon />
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="dx">
                    <div className="name">
                      <span>Name of MDA</span>
                      <p>NITDA</p>
                    </div>
                    <CopyIcon text="NITDA" />
                  </div>
                  <div className="dx">
                    <div className="name">
                      <span>MDA Address</span>
                      <p className="nm">
                        124, Oyediran Estate, Lagos, Nigeria, 5432
                      </p>
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
                <h4>Suspend MDA</h4>
                <div className="btn">
                  <button type="button" onClick={() => setShowSuspendModal(true)}>
                    <SuspendIcon />
                    <p>Suspend MDA</p>
                  </button>
                </div>
              </div>
            </div>
          </MDADetailStyle>
        )}
        {showSuspendModal && (
          <SuspendMdaComp
            handleModalAction={() => console.log("handler")}
            cancelModal={() => setShowSuspendModal(false)}
          />
        )}
      </>
    );
  };
  
  interface ITwoActions {
    cancelModal: () => void;
    handleModalAction: () => void;
  }
  
  export const SuspendMdaComp: React.FC<ITwoActions> = ({
    cancelModal,
    handleModalAction,
  }) => {
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
                  <h4>Suspend MDA?</h4>
                  <p>
                    Are you sure you want to suspend this MDA? It will no longer
                    be visible and not able to take any course for.
                  </p>
                </div>
                <div className="down">
                  <button type="button" onClick={cancelModal} className="cancel">
                    Cancel
                  </button>
                  <button type="button" onClick={suspend}>
                    Suspend MDA
                  </button>
                </div>
              </div>
            </TwoButtonModalStyles>
          )}
          {isSuccess && (
            <SuccessModal
              head="MDA has been successfully suspended !"
              msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
              cancelModal={cancelModal}
              navigationText="Go back to Dashboard"
              hasCancel={true}
              navigationFunction={() => router.push("/fme")}
            />
          )}
        </FlexAbsoluteModalStyles>
      </>
    );
  };
  
  export const ReactivateMdaComp: React.FC<ITwoActions> = ({
    cancelModal,
    handleModalAction,
  }) => {
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
                  <h4>Re-activate MDA?</h4>
                  <p>
                    Are you sure you want to suspend this MDA? It will no longer
                    be visible and not able to take any course for.
                  </p>
                </div>
                <div className="down">
                  <button type="button" onClick={cancelModal} className="cancel">
                    Cancel
                  </button>
                  <button type="button" onClick={reactivate}>
                    Re-activate MDA
                  </button>
                </div>
              </div>
            </TwoButtonModalStyles>
          )}
          {isSuccess && (
            <SuccessModal
              head="MDA has been successfully re-activated !"
              msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
              cancelModal={() => window.location.reload()}
              navigationText="Go back to Dashboard"
              hasCancel={true}
              navigationFunction={() => router.push("/fme")}
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
    navigationFunction : ()=> void;
  }
  
  export const SuccessModal: React.FC<IMessageModal> = ({
    cancelModal,
    head,
    msg,
    icon,
    navigationText,
    navigationFunction
  }) => {
    const router = useRouter();
    return (
      <OneButtonModalStyles>
        <div className="pop">
          <div className="up">
            <div className="x" onClick={cancelModal}>
              {" "}
              <XIcon />
            </div>
            <div className="l">{icon ? icon : <LargeCheckedIcon />}</div>
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
  
  export const FailureModal: React.FC<IMessageModal> = ({
    cancelModal,
    head,
    msg,
    navigationText,
    hasCancel,
    navigationFunction
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
  