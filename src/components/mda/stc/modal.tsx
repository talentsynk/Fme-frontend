import {
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
  TotalCoursesIcon,
  TotalSTCIcon,
  TryAgainIcon,
} from "@/components/icons/fme/mda";
import { XIcon } from "@/components/icons/sidebar";
import ClickOutsideWrapper from "@/components/auth/wrapper";
import {
  CheckedIcon,
  EmailIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Ierror } from "@/app/recovery/page";
import { validateEmail } from "@/utils/validateEmail";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";

import {
  CertifiedStudentIcon,
  UncertifiedStudentIcon,
} from "@/components/icons/fme/stc";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  mdaSelector,
  setFakeNewStcId,
  setUnchangedStcList,
} from "@/redux/mda/mdaSlice";
import { truncateString } from "@/utils/truncateString";
import { formatDate } from "@/utils/formatDate";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";
import { ButtonLoader } from "@/components/recovery/style";
import { States } from "@/components/fme/mda/data";
import { ErrorIconWrapper, FlexAbsoluteModalStyles, MDADetailStyle, NewMdaAbsoluteStyles, NewMdaFormStyles, StateCompStyles, StatesDropdownStyles, TwoButtonModalStyles } from "@/components/fme/mda/styles";
import { FailureModal, SuccessModal } from "@/components/fme/mda/modals";
import { StatusComp } from "@/components/fme/mda/mda";

interface IOneButtonModal {
  cancelModal: () => void;
}

interface IForm {
  email: string;
  name: string;
  address: string;
  state: string;
}

export const NewStcModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
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
  const { fakeNewStcId } = useAppSelector(mdaSelector);
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleCreateStc = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    
    if (
      !emailError.active &&
      !addressError.active &&
      !nameError.active &&
      emailError.text !== "" &&
      addressError.text !== "" &&
      state !== "" &&
      nameError.text !== ""
    ) {
      // call createSTC API
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const body = {
          Name: form.name,
          Email: form.email,
          Address: form.address,
          State: form.state,
        };
        setIsLoading(true);
        const { data } = await axios.post(
          `${BACKEND_URL}/stc/create-mda-stc`, // change this to the actual Mda create Stc endpoint
          body,
          config
        );
        if (data) {
          setIsLoading(false);
          // update fakeMdaId
          let newFakeId = fakeNewStcId ? fakeNewStcId + 1 : 1;
          // this new fakeId value will cause a rerender on the main page
          dispatch(setFakeNewStcId(newFakeId));
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
                  <h3>Add New STC</h3>
                  <p>Fill in the necessary details to add a new STC</p>
                </div>
                <IconWrapper onClick={cancelModal}>
                  <XIcon />
                </IconWrapper>
              </div>
              <form className="form" onSubmit={handleCreateStc}>
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
                        placeholder="Please type in STC’s registered name"
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
                        placeholder="Please type in STC’s email address"
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
                        placeholder="Please type in STC’s address here"
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
                            Please select STC’s state of operation
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
                    {isLoading ? <ButtonLoader /> : "Create STC"}
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
            head="New STC has been successfully created !"
            msg="The new STC has been successfully created. Have a lovely day!"
            cancelModal={cancelModal}
            icon={<CreationSuccessIcon />}
            hasCancel={true}
            navigationFunction={cancelModal}
            navigationText="Go back to Dashboard"
          />
        </FlexAbsoluteModalStyles>
      )}
    </>
  );
};

export const StcDetailModal: React.FC<IOneButtonModal> = ({ cancelModal }) => {
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActiveModal, setShowActivateModal] = useState(false);
  const { selectedStcId, unchangedStcList } = useAppSelector(mdaSelector);
  const [stcDetails, setStcDetails] = useState(
    unchangedStcList?.find((ele) => ele.Id == selectedStcId)
  );
  useEffect(() => {
    setStcDetails(unchangedStcList?.find((ele) => ele.Id == selectedStcId));
  }, [unchangedStcList, selectedStcId]);

  return (
    <>
      {!showSuspendModal && stcDetails && (
        <MDADetailStyle>
          <div className="left" onClick={cancelModal}></div>
          <div className="right">
            <div className="r-1">
              <BackBtn backFunction={cancelModal} />
              <div className="name">
                <div className="avatar">
                  <p>{stcDetails.Name.slice(0, 2).toUpperCase()}</p>
                </div>
                <div className="deet">
                  <h4>{truncateString(stcDetails.Name, 40).toUpperCase()}</h4>
                  <p>
                    Added on{" "}
                    {stcDetails.CreatedAt
                      ? formatDate(stcDetails.CreatedAt)
                      : "March 29, 2024"}
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
                  <div className="title">Total Students</div>
                  <div className="numer">
                    <p>
                      {stcDetails.student_count ? stcDetails.student_count : 0}
                    </p>
                  </div>
                </div>
                <div className="total">
                  <IconWrapper>
                    <TotalCoursesIcon />
                  </IconWrapper>
                  <div className="title">Total No of Courses</div>
                  <div className="numer">
                    <p>{stcDetails.CourseCount ? stcDetails.CourseCount : 0}</p>
                  </div>
                </div>
                <div className="total">
                  <IconWrapper>
                    <CertifiedStudentIcon />
                  </IconWrapper>
                  <div className="title">Total Certified Students</div>
                  <div className="numer">
                    <p>
                      {stcDetails.CertifiedStudentCount
                        ? stcDetails.CertifiedStudentCount
                        : 0}
                    </p>
                  </div>
                </div>
                <div className="total">
                  <IconWrapper>
                    <UncertifiedStudentIcon />
                  </IconWrapper>
                  <div className="title">Total Non-Certified Students</div>
                  <div className="numer">
                    <p>
                      {stcDetails.NonCertifedStudentCount
                        ? stcDetails.NonCertifedStudentCount
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="dx">
                  <div className="name">
                    <span>Name of STC</span>
                    <p>{stcDetails.Name.toUpperCase()}</p>
                  </div>
                  <CopyIcon text={stcDetails.Name.toUpperCase()} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>STC Email</span>
                    <p className="nm">{stcDetails.Email}</p>
                  </div>
                  <CopyIcon text={stcDetails.Email} />
                </div>
                <div className="dx">
                  <div className="name">
                    <span>Status</span>
                    <StatusComp $isActive={stcDetails.is_active} />
                  </div>
                </div>
                {!stcDetails.is_active && (
                  <div className="dx">
                    <div className="name">
                      <span>Reason For Suspension</span>
                      <p className="text-red-500">{stcDetails.SuspendReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="r-3">
              <h4>{stcDetails.is_active ? "Suspend STC" : "Re-activate"}</h4>
              <div className="btn">
                {stcDetails.is_active ? (
                  <button
                    type="button"
                    onClick={() => setShowSuspendModal(true)}
                  >
                    <SuspendIcon />
                    <p>Suspend STC</p>
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
        <SuspendStcComp
          handleModalAction={cancelModal}
          cancelModal={() => setShowSuspendModal(false)}
        />
      )}
      {showActiveModal && (
        <ReactivateStcComp
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

export const SuspendStcComp: React.FC<ITwoActions> = ({
  cancelModal,
  handleModalAction,
}) => {
  const [reason, setReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { selectedStcId, unchangedStcList } = useAppSelector(mdaSelector);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const suspend = async () => {
    // make Suspend MDA API call to suspend MDA\
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = unchangedStcList?.find(
      (ele) => ele.Id === selectedStcId
    )?.UserId;
    if (userId) {
      try {
        setIsLoading(true);
        // console.log({reason});
        const { data } = await axios.get(
          `${BACKEND_URL}/user/suspend/${userId}`,
          {
            params : { Reason: reason },
          ...config
          }
        );
        if (data) {
          if (unchangedStcList !== null) {
            const newStclist = unchangedStcList.map((ele) => {
              return {
                ...ele,
                is_active: ele.Id === selectedStcId ? false : ele.is_active,
              };
            });
            setIsLoading(false);
            // why does this state not update Immediately on the UI?
            dispatch(setUnchangedStcList(newStclist));
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
                <h4>Suspend STC?</h4>
                <p>
                  Are you sure you want to suspend this STC? It will no longer
                  be visible and not able to take any course for.
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
                  {isLoading ? <ButtonLoader /> : "Suspend STC"}
                </button>
              </div>
            </div>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          <SuccessModal
            head="STC has been successfully suspended !"
            msg="You have suspended an STC successfully. Have a lovely day!"
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
            head="Failed to suspend STC !"
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

export const ReactivateStcComp: React.FC<ITwoActions> = ({
  cancelModal,
  handleModalAction,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { selectedStcId, unchangedStcList } = useAppSelector(mdaSelector);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const reactivate = async () => {
    // make Suspend MDA API call to suspend MDA\
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = unchangedStcList?.find(
      (ele) => ele.Id === selectedStcId
    )?.UserId;
    if (userId) {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/user/activate/${userId}`,
          config
        );
        if (data) {
          if (unchangedStcList !== null) {
            const newStclist = unchangedStcList.map((ele) => {
              return {
                ...ele,
                is_active: ele.Id === selectedStcId ? true : ele.is_active,
              };
            });
            setIsLoading(false);
            // why does this state not update Immediately on the UI?
            dispatch(setUnchangedStcList(newStclist));
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
                <h4>Re-activate STC?</h4>
                <p>
                  Are you sure you want to suspend this STC? It will no longer
                  be visible and not able to take any course for.
                </p>
              </div>
              <div className="down">
                <button type="button" onClick={cancelModal} className="cancel">
                  Cancel
                </button>
                <button type="button" onClick={reactivate}>
                  {isLoading ? <ButtonLoader /> : "Re-activate STC"}
                </button>
              </div>
            </div>
          </TwoButtonModalStyles>
        )}
        {isSuccess && (
          <SuccessModal
            head="STC has been successfully re-activated !"
            msg="You have successfully re-activated an STC. Have a lovely day!"
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
            head="Failed to re-activate STC !"
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

export const NewComp = () => {
  return <></>;
};
