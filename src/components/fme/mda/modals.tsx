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
} from "./styles";
import { XIcon } from "@/components/icons/sidebar";
import {
  CheckedIcon,
  EmailIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { FormEvent, ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { StatusComp } from "./mda";
import { Ierror } from "@/app/recovery/page";
import { validateEmail } from "@/utils/validateEmail";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { States } from "./data";

interface IOneButtonModal {
  cancelModal: () => void;
}

interface IForm {
  email: string;
  name: string;
  address: string;
  state: string;
}

export const NewMdaModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
  const [form, setForm] = useState<IForm>({
    email: "",
    name: "",
    address: "",
    state: "",
  });

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
      setEmailError({ active: true, text: "Invalid email address" });
    } else {
      setEmailError({ active: false, text: "Valid Email" });
      setForm({ ...form, email: value });
    }
  };
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = e.target.value;
    if (input == "name") {
      setName(value);
      if (value.trim().length < 1) {
        setNameError({ active: true, text: "Name is required" });
      } else {
        setNameError({ active: false, text: "Name is valid" });
        setForm({ ...form, name: value });
      }
    }
    if (input == "address") {
      setAddress(value);
      if (value.trim().length < 1) {
        setAddressError({ active: true, text: "Address is required" });
      } else {
        setAddressError({ active: false, text: "Address is valid" });
        setForm({ ...form, name: value });
      }
    }
  };
  // for states
  const [state, setState] = useState("");
  const [states, setStates] = useState(States);

  const [showDropdown, setShowDropdown] = useState(false);
  const handleStateSelection = (name: string) => {
    setState(name);
    setShowDropdown(false);
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const handleCreateMda = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    // check if the username and pwd match the DB using the APIendpoint, setup the user session using redux and navigate to the respective dashboard
    if (
      !emailError.active &&
      !addressError.active &&
      !nameError.active &&
      emailError.text !== "" &&
      addressError.text !== "" &&
      state !== "" &&
      nameError.text !== ""
    ) {
      // call createMDA API
      console.log(form);
      setIsSuccess(true);
    }
  };
  return (
    <>
      {isSuccess == false && (
        <NewMdaAbsoluteStyles>
          <div className="form">
            <NewMdaFormStyles className="bd">
              <div className="fl">
                <div className="form-head">
                  <h3>Add New MDA</h3>
                  <p>Fill in the necessary details to add a new MDA</p>
                </div>
                <IconWrapper onClick={cancelModal}>
                  <XIcon />
                </IconWrapper>
              </div>
              <form className="form" onSubmit={handleCreateMda}>
                <div className="form-input">
                  <div className="form-ele">
                    <label htmlFor="name">Registered Name</label>
                    <div className="inp">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        className={nameError.active ? "error-bdr" : ""}
                        onChange={(e) => handleInput(e, "name")}
                        placeholder="Please type in MDA’s registered name"
                      />
                      <div className="abs">
                        {nameError.active === false &&
                          nameError.text === "" && <NameIcon />}
                        {nameError.active === false &&
                          nameError.text !== "" && <CheckedIcon />}
                        {nameError.active === true && <FormErrorIcon />}
                      </div>
                      <p
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        className={nameError.active ? "error-msg" : "correct"}
                      >
                        {nameError.text}
                      </p>
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
                        placeholder="Please type in MDA’s email address"
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
                        className={emailError.active ? "error-msg" : "correct"}
                      >
                        {emailError.text}
                      </p>
                    </div>
                  </div>
                  <div className="form-ele">
                    <label htmlFor="address">Address</label>
                    <div className="inp">
                      <input
                        type="text"
                        name="address"
                        id=""
                        value={address}
                        onChange={(e) => handleInput(e, "address")}
                        className={addressError.active ? "error-bdr" : ""}
                        placeholder="Please type in MDA’s address here"
                      />
                      <div className="abs">
                        {addressError.active === false &&
                          addressError.text === "" && <LocationIcon />}
                        {addressError.active === false &&
                          addressError.text !== "" && <CheckedIcon />}
                        {addressError.active === true && <FormErrorIcon />}
                      </div>
                      <p
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        className={
                          addressError.active ? "error-msg" : "correct"
                        }
                      >
                        {addressError.text}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-ele">
                  <label htmlFor="address">State of Operation</label>
                  <StatesDropdownStyles>
                    <div
                      className="head"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <>
                        {state == "" ? (
                          <p className="placeholder">
                            Please select MDA’s state of operation
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
                <div className="btn-m">
                  <button
                    type="submit"
                    disabled={
                      nameError.text == "" ||
                      emailError.text == "" ||
                      addressError.text == "" ||
                      nameError.active !== false ||
                      addressError.active !== false ||
                      emailError.active !== false ||
                      state == ""
                    }
                  >
                    Create MDA
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
            head="New MDA has been successfully created !"
            msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
            cancelModal={cancelModal}
            icon={<CreationSuccessIcon />}
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
}

export const SuccessModal: React.FC<IMessageModal> = ({
  cancelModal,
  head,
  msg,
  icon,
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
          <button type="button" onClick={()=> router.push("/fme")}>
            Go back to Dashboard
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
}) => {
    const router = useRouter();
  return (
    <OneButtonModalStyles $isError={true}>
      <div className="pop">
        <div className="up">
          <div className="x" onClick={cancelModal}>
            {" "}
            <XIcon />
          </div>
          <div className="l">
            <TryAgainIcon />
          </div>
          <h4>
            {head}
            {/* Failed to suspend MDA ! */}
          </h4>
          <p>
            {msg}
            {/* MDA failed to suspend due to network error. Re-try or logout and
              login to restore sessions */}
          </p>
        </div>
        <div className="down">
          <button type="button" onClick={()=> router.push("/fme")}>
            Go back to Dashboard
          </button>
        </div>
      </div>
    </OneButtonModalStyles>
  );
};
export const NewComp = () => {
  return <></>;
};
