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
import { Dispatch, FormEvent, SetStateAction, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { StatusComp } from "./mda";
import { Ierror } from "@/app/recovery/page";
import { validateEmail } from "@/utils/validateEmail";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { States } from "./data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  fmeSelector,
  setFakeNewMdaId,
  setUnchangedMdaList,
} from "@/redux/fme/fmeSlice";
import { truncateString } from "@/utils/truncateString";
import { formatDate } from "@/utils/formatDate";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";
import { ButtonLoader } from "@/components/recovery/style";
import ClickOutsideWrapper from "@/components/auth/wrapper";

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

  const [otherError, setOtherError] = useState<Ierror>({
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
        setForm({ ...form, address: value });
      }
    }
  };
  // for states
  const [state, setState] = useState("");
  const [states, setStates] = useState(States);

  const [showDropdown, setShowDropdown] = useState(false);
  const handleStateSelection = (name: string) => {
    setForm({ ...form, state: name });
    setState(name);
    setShowDropdown(false);
  };

  // login button loader state
  const [isLoading, setIsLoading] = useState(false);

  const { fakeNewMdaId } = useAppSelector(fmeSelector);
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleCreateMda = async (event: FormEvent<HTMLFormElement>) => {
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
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const body = {
          RegisterName: form.name,
          Email: form.email,
          Address: form.address,
          StateOfOperation: form.state,
        };
        setIsLoading(true);
        const { data } = await axios.post(
          `${BACKEND_URL}/mda/create-mda`,
          body,
          config
        );
        if (data) {
          setIsLoading(false);
          // update fakeMdaId
          let newFakeId = fakeNewMdaId ? fakeNewMdaId + 1 : 1;
          dispatch(setFakeNewMdaId(newFakeId));
          setIsSuccess(true);
        }
      } catch (error: any) {
        if (error.response) {
          setEmailError({
            active: true,
            text: error.response.data.error,
          });
          setNameError({
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

  const router = useRouter();
 
  return (
    <>
      {isSuccess == false && (
        <NewMdaAbsoluteStyles>
          <div className="form">
            <ClickOutsideWrapper onClickOutside={cancelModal}>
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
                    {isLoading ? <ButtonLoader /> : "Create MDA"}
                  </button>
                </div>
              </form>
            </NewMdaFormStyles>
            </ClickOutsideWrapper>
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
            navigationText="Go back to Dashboard"
            hasCancel={true}
            navigationFunction={cancelModal}
          />
        </FlexAbsoluteModalStyles>
      )}
    </>
  );
};

export const MdaDetailModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActiveModal, setShowActivateModal] = useState(false);
  const { selectedMdaId, unchangedMdaList } = useAppSelector(fmeSelector);
  const [mdaDetails, setMdaDetails] = useState(
    unchangedMdaList?.find((ele) => ele.Id == selectedMdaId)
  );
  useEffect(() => {
    setMdaDetails(unchangedMdaList?.find((ele) => ele.Id == selectedMdaId));
  }, [unchangedMdaList, selectedMdaId]);
  return (
    <>
      {!showSuspendModal && mdaDetails && (
        <MDADetailStyle>
          <div className="left" onClick={cancelModal}></div>
          <div className="right">
            <div className="r-1">
              <BackBtn backFunction={cancelModal} />
              <div className="name">
                <div className="avatar">
                  <p>{mdaDetails.Name.slice(0, 2).toUpperCase()}</p>
                </div>
                <div className="deet">
                  <h4>{truncateString(mdaDetails.Name, 40).toUpperCase()}</h4>
                  <p>
                    Added on{" "}
                    {mdaDetails.CreatedAt
                      ? formatDate(mdaDetails.CreatedAt)
                      : "March 20, 2024"}
                  </p>
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
                    <p>{mdaDetails.stc_count ? mdaDetails.stc_count : 0}</p>
                    <GraphIcon />
                  </div>
                </div>
                <div className="total">
                  <IconWrapper>
                    <TotalCoursesIcon />
                  </IconWrapper>
                  <div className="title">Total No of Courses</div>
                  <div className="numer">
                    <p>
                      {mdaDetails.CourseCount ? mdaDetails.CourseCount : 0}
                    </p>
                    <GraphIcon />
                  </div>
                </div>
                <div className="total">
                  <IconWrapper>
                    <TotalStudentsIcon />
                  </IconWrapper>
                  <div className="title">Total No of Students</div>
                  <div className="numer">
                    <p>
                      {mdaDetails.student_count ? mdaDetails.student_count : 0}
                    </p>
                    <GraphIcon />
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="dx">
                  <div className="name">
                    <span>Name of MDA</span>
                    <p>{mdaDetails.Name.toUpperCase()}</p>
                  </div>
                  <CopyIcon text={mdaDetails.Name.toUpperCase()} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>MDA Email</span>
                    <p className="nm">{mdaDetails.email}</p>
                  </div>
                  <CopyIcon text={mdaDetails.email} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>Status</span>
                    <StatusComp $isActive={mdaDetails.is_active} />
                  </div>
                </div>
              </div>
            </div>
            <div className="r-3">
              <h4>{mdaDetails.is_active ? "Suspend MDA" : "Re-activate"}</h4>
              <div className="btn">
                {mdaDetails.is_active ? (
                  <button
                    type="button"
                    onClick={() => setShowSuspendModal(true)}
                  >
                    <SuspendIcon />
                    <p>Suspend MDA</p>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="reactivate"
                    onClick={() => setShowActivateModal(true)}
                  >
                    <ReactivateIcon />
                    <p>Re-Activate MDA</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </MDADetailStyle>
      )}
      {showSuspendModal && (
        <SuspendMdaComp
          handleModalAction={cancelModal}
          cancelModal={() => setShowSuspendModal(false)}
        />
      )}
      {showActiveModal && (
        <ReactivateMdaComp
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

export const SuspendMdaComp: React.FC<ITwoActions> = ({
  handleModalAction,
  cancelModal
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const { unchangedMdaList, selectedMdaId } = useAppSelector(fmeSelector);
  const dispatch = useAppDispatch();
  const suspend = async () => {
    // make Suspend MDA API call to suspend MDA\
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = unchangedMdaList?.find((ele) => ele.Id === selectedMdaId)?.UserId;
    if (userId) {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/user/suspend/${userId}`,
          config
        );
        if (data) {
          if (unchangedMdaList !== null) {
            const newMdalist = unchangedMdaList.map((ele) => {
              return {
                ...ele,
                is_active: ele.Id === selectedMdaId ? false : ele.is_active,
              };
            });
            setIsLoading(false);
            // why does this state not update Immediately on the UI?
            dispatch(setUnchangedMdaList(newMdalist));
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
            <ClickOutsideWrapper onClickOutside={cancelModal}>
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
                  {isLoading ? <ButtonLoader /> : "Suspend MDA"}
                </button>
              </div>
            </div>
        </ClickOutsideWrapper>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          
          <SuccessModal
            head="MDA has been successfully suspended !"
            msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
            cancelModal={cancelModal}
            navigationText="Go back to Dashboard"
            hasCancel={true}
            navigationFunction={
              handleModalAction ? handleModalAction : cancelModal
            }
            // navigationFunction={() => router.push("/fme")}
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
            head="Failed to suspend MDA !"
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

export const ReactivateMdaComp: React.FC<ITwoActions> = ({
  handleModalAction,
  cancelModal,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { unchangedMdaList, selectedMdaId } = useAppSelector(fmeSelector);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const reactivate = async () => {
    // make Reactivate MDA API call to activate MDA
     const token = Cookies.get("token");
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
     const userId = unchangedMdaList?.find((ele) => ele.Id === selectedMdaId)?.UserId;
     if (userId) {
       try {
         setIsLoading(true);
         const { data } = await axios.get(
           `${BACKEND_URL}/user/activate/${userId}`,
           config
         );
         if (data) {
           if (unchangedMdaList !== null) {
             const newMdalist = unchangedMdaList.map((ele) => {
               return {
                 ...ele,
                 is_active: ele.Id === selectedMdaId ? true : ele.is_active,
               };
             });
             setIsLoading(false);
             dispatch(setUnchangedMdaList(newMdalist));
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
            <ClickOutsideWrapper onClickOutside={cancelModal}>
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
                  {isLoading ? <ButtonLoader /> : "Re-activate"}
                </button>
              </div>
            </div>
            </ClickOutsideWrapper>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          <SuccessModal
            head="MDA has been successfully re-activated !"
            msg="Some other message that may be necessary here we’ll think of something. Have a lovely day!"
            cancelModal={cancelModal}
            navigationText="Go back to Dashboard"
            hasCancel={true}
            // navigationFunction={() => router.push("/fme")}
            navigationFunction={
              handleModalAction ? handleModalAction : cancelModal
            }
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
            head="Failed to re-activate MDA !"
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

export const SuccessModal: React.FC<IMessageModal> = ({
  cancelModal,
  head,
  msg,
  icon,
  navigationText,
  navigationFunction,
  hasCancel,
}) => {
  const router = useRouter();
  return (
    <OneButtonModalStyles>
      <ClickOutsideWrapper onClickOutside={cancelModal}>
      <div className="pop">
        <div className="up">
          {hasCancel && (
            <div className="x" onClick={cancelModal}>
              {" "}
              <XIcon />
            </div>
          )}
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
      </ClickOutsideWrapper>
    </OneButtonModalStyles>
  );
};

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
      <ClickOutsideWrapper onClickOutside={cancelModal}>
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
      </ClickOutsideWrapper>
    </OneButtonModalStyles>
  );
};
export const NewComp = () => {
  return <></>;
};
