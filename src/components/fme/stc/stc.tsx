import { useState } from "react";
import { ISTCData, StcItemDropdownList } from "./data";
import {
  DropdownOptionsStyle,
  TableDropdownStyles,
  TrStyles,
} from "../mda/styles";
import { MdaItemComp, StatusComp } from "../mda/mda";
import { ThreedotsIcon } from "@/components/icons/fme/mda";
import { MdaDetailModal } from "../mda/modals";
import { NocenterStyles } from "./styles";
import { ReactivateStcComp, StcDetailModal, SuspendStcComp } from "./modal";
import { fmeSelector, setSelectedStcId } from "@/redux/fme/fmeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { truncateString } from "@/utils/truncateString";
import { ISTCCompData } from "@/types/Stc";

export const STCTableRow: React.FC<ISTCCompData> = ({
  ID : id,
  is_active : isActive,
  RegisterName : name,
  stcNo : coursesNo, // change this to coursesNo
  studentNo,
  Address : address,
  StateOfOperation : state,
}) => {
  const [stcItemList, setStcItemList] = useState(StcItemDropdownList);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetails, setShowdetails] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActiveModal, setShowActivateModal] = useState(false);

  const handleSelectItem = (action: string) => {
    const newStcList = stcItemList.map((ele) => {
      return { ...ele, isSelected: ele.text === action };
    });
    setStcItemList(newStcList);
    if (action === "Clear Selection") {
      setStcItemList(StcItemDropdownList);
      dispatch(setSelectedStcId(null));
    } else if (action === "View STC Profile") {
      setShowdetails(true);
    } else if (action === "Suspend STC") {
      setShowSuspendModal(true);
    }else if(action === "Re-activate STC"){
      setShowActivateModal(true);
    }
  };
  const { selectedStcId } = useAppSelector(fmeSelector);
  // set dispatch
  const dispatch = useAppDispatch();
  const handleSelectOptions = () => {
    setShowDropdown(!showDropdown);
    if (selectedStcId === id) {
      dispatch(setSelectedStcId(null));
    } else {
      // set selected Mda id in redux here
      dispatch(setSelectedStcId(id));
    }
    // reset the dropdown state
    setStcItemList(StcItemDropdownList);
  };

  return (
    <TrStyles>
      <td className="nocenter">
        <NocenterStyles>
          <p>{truncateString(name,37).toUpperCase()}</p>
        </NocenterStyles>
      </td>
      <td>
        <p>{coursesNo ? coursesNo : 10}</p>
      </td>
      <td>
        <p>{studentNo ? studentNo : 20}</p>
      </td>
      <td className="address">
        <p>{truncateString(address,30)}</p>
      </td>
      <td>
        <p>{state.toUpperCase()} STATE</p>
      </td>
      <td className="drop">
        <StatusComp $isActive={isActive} />
        <TableDropdownStyles>
          <div className="head" onClick={handleSelectOptions}>
            <ThreedotsIcon />
          </div>
          {selectedStcId === id  && (
            <DropdownOptionsStyle>
              <div className="options">
                {stcItemList.map((ele, index) => (
                  <MdaItemComp
                    key={index}
                    isSelected={ele.isSelected}
                    text={!isActive && ele.text === "Suspend STC" ? "Re-activate STC" : ele.text}
                    hasBorder={ele.hasBorder}
                    handleSelect={() => handleSelectItem(!isActive && ele.text === "Suspend STC" ? "Re-activate STC" : ele.text)}
                  />
                ))}
              </div>
            </DropdownOptionsStyle>
          )}
        </TableDropdownStyles>
        {showDetails && (
          <StcDetailModal cancelModal={() => setShowdetails(false)} />
        )}
        {showSuspendModal && (
          <SuspendStcComp
            cancelModal={() => setShowSuspendModal(false)}
          />
        )}
        {showActiveModal && (
          <ReactivateStcComp
            cancelModal={() => setShowActivateModal(false)}
          />
        )}
      </td>
    </TrStyles>
  );
};
