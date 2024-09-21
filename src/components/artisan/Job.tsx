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
interface ISimilarJobs{
  Id: number;
  JobTitle: string;
  Description: string;
  Amount: string;
  JobType: string;
  Status?: string;
  CreatedAt?:string
}

export const JobComp: React.FC<ISimilarJobs> = ({
  Id,
  JobTitle,
  Description,
  JobType,
  Amount,
  CreatedAt
}) => {
  const router = useRouter();
  const getDaysAgo = (date: string|undefined|number): number => {
    if (!date) {
      // Handle undefined case, perhaps returning 0 or a default value
      return 0;
    }
    
    const currentDate = new Date();
    const createdDate = new Date(date); // This is now safe because `date` is checked

    // Calculate the difference in time between the two dates in milliseconds
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    // Convert time difference from milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysAgo;
};
const lol= getDaysAgo(CreatedAt)
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
          <p>posted {lol} days ago</p>
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
          <button type="button" onClick={() => router.push(`/dashboard/artisan/jobs/${Id}`)}>
            Apply Now
          </button>
        </div>
      </div>
    </JobCompStyles>
  );
};

interface ILocationModal {
  closeModal: () => void;
  applyFilter?: (state: string, lga: string) => void; // New prop for applying the filter
}

export const SelectLocationModal: React.FC<ILocationModal> = ({
  closeModal,
  applyFilter, // Accept the applyFilter function
}) => {
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showLGADropdown, setShowLGADropdown] = useState(false);
  const NaijaStates = require("naija-state-local-government");
  const [states, setStates] = useState(States);
  const [lgas, setLgas] = useState([]);

  // useEffect(() => {
  //   if (state) {
  //     const newLgas = NaijaStates.lgas(state).lgas;
  //     setLgas(newLgas);
  //   }
  // }, [state]);

  const handleStateSelection = (name: string) => {
    setState(name);
    setLga(""); // Reset LGA when state changes
    setShowStateDropdown(false);
  };

  const handleLGASelection = (name: string) => {
    setLga(name);
    setShowLGADropdown(false);
  };

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
            {state === "" ? <p>Please select your state</p> : <p>{state}</p>}
            <AngleDownStyles $isSelected={showStateDropdown}>
              <AngleDown />
            </AngleDownStyles>
          </div>
          {showStateDropdown && (
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
      </div>
      {/* <div className="form-ele">
        <label htmlFor="lga">L.G.A</label>
        <StatesDropdownStyles>
          <div
            className="head"
            onClick={() => setShowLGADropdown(!showLGADropdown)}
          >
            {lga === "" ? <p>Please select L.G.A</p> : <p>{lga}</p>}
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
      </div> */}
      <div className="btns">
      {applyFilter && (
  <button type="button" className=" text-white" onClick={() => applyFilter(state, lga)}>
    Apply Filter
  </button>
)}

        <button type="button" className="clear" onClick={() => { setState(''); setLga(''); }}>
          Clear Filter
        </button>
      </div>
    </LocationModalStyle>
  );
};

