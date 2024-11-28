import { useState } from "react";
import ClickOutsideWrapper from "@/components/auth/wrapper";
import { ThreedotsIcon } from "@/components/icons/fme/mda";
import { ReactivateStcComp, StcDetailModal, SuspendStcComp } from "./modal";
import { mdaSelector, setSelectedStcId } from "@/redux/mda/mdaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { truncateString } from "@/utils/truncateString";
import { ISTCCompData } from "@/types/Stc";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { StcItemDropdownList } from "@/components/fme/stc/data";
import { DropdownOptionsStyle, TableDropdownStyles, TrStyles } from "@/components/fme/mda/styles";
import { NocenterStyles } from "@/components/fme/stc/styles";
import { MdaItemComp, StatusComp } from "@/components/fme/mda/mda";


export const STCTableRow: React.FC<ISTCCompData> = ({
  Id : id,
  is_active : isActive,
  Name : name,
  student_count : studentNo,
  Address : address,
  StateOfOperation : state,
  CourseCount
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
    setShowDropdown(false)
  };
  const { selectedStcId } = useAppSelector(mdaSelector);
  // set dispatch
  const dispatch = useAppDispatch();
  const handleSelectOptions = () => {
    setShowDropdown(true);
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
        <p>{CourseCount ? CourseCount : 0}</p>
      </td>
      <td>
        <p>{studentNo ? studentNo : 0}</p>
      </td>
      <td className="address">
        <p>{truncateString(address,30)}</p>
      </td>
      <td>
        <p>{state && state.toUpperCase()} STATE</p>
      </td>
      <td className="drop">
        <StatusComp $isActive={isActive} />
        <ClickOutsideWrapper onClickOutside={() => setShowDropdown(false)}>
        <TableDropdownStyles>
          <div className="head" onClick={handleSelectOptions}>
            <ThreedotsIcon />
          </div>
          {selectedStcId === id  && showDropdown && (
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
        </ClickOutsideWrapper>
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
