import { useEffect, useState } from "react";
import { StateCompStyles, StatesDropdownStyles } from "../fme/mda/styles";
import { SmallBriefCaseIcon, TinyLocationIcon } from "../icons/artisan/icons";
import { AngleDown, AngleDownStyles } from "../icons/header";
import { JobCompStyles, LocationModalStyle, TinyBriefcaseBg } from "./style";
import { States } from "../fme/mda/data";
import { XIcon } from "../icons/sidebar";

export const JobComp = () => {
  return (
    <JobCompStyles>
      <div className="fir">
        <TinyBriefcaseBg>
          <SmallBriefCaseIcon />
        </TinyBriefcaseBg>
      </div>
      <div className="sec">
        <div className="v">
          <h4>Oragon Confectionaries</h4>
          <p>posted 2 days ago</p>
        </div>
        <div className="r">
          <p>
            I need a caterer for 20 peoples meal in a birthday party that is
            coming up soon. Call +234 817 896.......
          </p>
          <h4>300k • Contract Job</h4>
        </div>
        <div className="btn">
          <div className="bg">
            <TinyLocationIcon />
            <p>Oyo State</p>
          </div>
          <button type="button">Apply Now</button>
        </div>
      </div>
    </JobCompStyles>
  );
};

interface ILocationModal{
  closeModal : () => void;
}
export const SelectLocationModal:React.FC<ILocationModal> = ({closeModal}) => {
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
        <button type="button" className="apply">Apply Filter</button>
        <button type="button" className="clear">Clear Filter</button>
      </div>
    </LocationModalStyle>
  );
};
