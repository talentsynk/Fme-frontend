import { useEffect, useState } from "react";
import { StateCompStyles, StatesDropdownStyles } from "../fme/mda/styles";
import { SmallBriefCaseIcon, TinyLocationIcon } from "../icons/artisan/icons";
import { AngleDown, AngleDownStyles } from "../icons/header";
import { JobCompStyles, LocationModalStyle, TinySVGBg } from "./style";
import { States } from "../fme/mda/data";
import { XIcon } from "../icons/sidebar";
import { truncateString } from "@/utils/truncateString";
import { useRouter } from "next/navigation";

export interface IJob {
  Id: string;
  JobTitle: string;
  // date: string; // would be parsed properly
  // Location: string;
  Description: string;
  JobType: string;
  Amount: string;
  // isClosed: boolean;
}

export const JobComp: React.FC<IJob> = ({
  Id,
  JobTitle,

  Description,
  JobType,
  Amount,
}) => {
  const router = useRouter();
  return (
    <JobCompStyles>
      <div className="fir">
        <TinySVGBg>
          <SmallBriefCaseIcon />
        </TinySVGBg>
      </div>
      <div className="sec">
        <div className="v">
          <h4>{JobTitle}</h4>
          <p>posted 2 days ago</p>
        </div>
        <div className="r">
          <p>{truncateString(Description, 100)}</p>
          <div className="r-w">
            <h4>{Amount}</h4>
            <h4>• {JobType} Job</h4>
          </div>
        </div>
        <div className="btn">
          <div className="bg">
            <TinyLocationIcon />
            <p>Oyo State</p>
          </div>
          <button type="button" onClick={() => router.push(`jobs/${Id}`)}>
            Apply Now
          </button>
        </div>
      </div>
    </JobCompStyles>
  );
};

interface ILocationModal {
  closeModal: () => void;
}
export const SelectLocationModal: React.FC<ILocationModal> = ({
  closeModal,
}) => {
  // for states
  const [state, setState] = useState("");
  const [states, setStates] = useState(States);

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const handleStateSelection = (name: string) => {
    setState(name);
    setLga(""); // when a new state is selected, it sets the lga selected to empty
    setShowStateDropdown(false);
  };
  // lga stuff
  const [showLGADropdown, setShowLGADropdown] = useState(false);
  const NaijaStates = require("naija-state-local-government");
  const [lgas, setLgas] = useState([]);
  const [lga, setLga] = useState("");

  const handleLGASelection = (name: string) => {
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
    <LocationModalStyle>
      <div className="one">
        <div className="x" onClick={closeModal}>
          <XIcon />
        </div>
        <h3>LOCATION</h3>
      </div>
      <div className="form-ele">
        <label htmlFor="state">State</label>
        <StatesDropdownStyles className="max">
          <div
            className="head"
            onClick={() => setShowStateDropdown(!showStateDropdown)}
          >
            <>
              {state == "" ? (
                <p className="placeholder">Please select your state</p>
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
        <label htmlFor="lga">L.G.A</label>
        <StatesDropdownStyles>
          <div
            className="head"
            onClick={() => setShowLGADropdown(!showLGADropdown)}
          >
            <>
              {lga === "" ? (
                <p className="placeholder">Please select L.G.A</p>
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
      <div className="btns">
        <button type="button" className="apply">
          Apply Filter
        </button>
        <button type="button" className="clear">
          Clear Filter
        </button>
      </div>
    </LocationModalStyle>
  );
};
