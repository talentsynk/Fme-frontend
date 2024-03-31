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
import { StcDetailModal, SuspendStcComp } from "./modal";

export const STCTableRow: React.FC<ISTCData> = ({
  isActive,
  name,
  coursesNo,
  studentNo,
  address,
  state,
}) => {
  const [stcItemList, setStcItemList] = useState(StcItemDropdownList);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetails, setShowdetails] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const handleSelectItem = (action: string) => {
    const newStcList = stcItemList.map((ele) => {
      return { ...ele, isSelected: ele.text === action };
    });
    setStcItemList(newStcList);
    if (action === "Clear Selection") {
      setStcItemList(StcItemDropdownList);
    } else if (action === "View STC Profile") {
      setShowdetails(true);
    } else if (action === "Suspend STC") {
      setShowSuspendModal(true);
    }
    setShowDropdown(false);
  };
  return (
    <TrStyles>
      <td className="nocenter">
        <NocenterStyles>
          <p>{name}</p>
        </NocenterStyles>
      </td>
      <td>
        <p>{coursesNo}</p>
      </td>
      <td>
        <p>{studentNo}</p>
      </td>
      <td className="address">
        <p>{address}</p>
      </td>
      <td>
        <p>{state.toUpperCase()} STATE</p>
      </td>
      <td className="drop">
        <StatusComp $isActive={isActive} />
        <TableDropdownStyles>
          <div className="head" onClick={() => setShowDropdown(!showDropdown)}>
            <ThreedotsIcon />
          </div>
          {showDropdown && (
            <DropdownOptionsStyle>
              <div className="options">
                {stcItemList.map((ele, index) => (
                  <MdaItemComp
                    key={index}
                    isSelected={ele.isSelected}
                    text={ele.text}
                    hasBorder={ele.hasBorder}
                    handleSelect={() => handleSelectItem(ele.text)}
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
            handleModalAction={() => console.log("suspend Stc!")}
            cancelModal={() => setShowSuspendModal(false)}
          />
        )}
      </td>
    </TrStyles>
  );
};
