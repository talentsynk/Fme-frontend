import {
  CheckedBoxIcon,
  ThreedotsIcon,
  UncheckedBoxIcon,
} from "@/components/icons/fme/mda";
import {
  CheckboxStyle,
  DropdownOptionsStyle,
  FilterBtnStyles,
  IStatusStyles,
  MdaItemCompStyles,
  StatusStyles,
  TableDropdownStyles,
  TrStyles,
} from "./styles";
import {
  IFilterBtn,
  IMDAData,
  IMdaDropdownFunc,
  MdaItemDropdownList,
} from "./data";
import { useState } from "react";
import { MdaDetailModal, SuspendMdaComp } from "./modals";

interface ICheckbox {
  isChecked: boolean;
  handleCheckedAction: () => void;
}
export const CheckboxComp: React.FC<ICheckbox> = ({
  isChecked,
  handleCheckedAction,
}) => {
  return (
    <CheckboxStyle onClick={handleCheckedAction}>
      {isChecked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
    </CheckboxStyle>
  );
};

// export interface IMdaTableRow extends IMDAData {
//   handleSelect: () => void;
//   isSelected: boolean;
// }
export const TableRow: React.FC<IMDAData> = ({
  isActive,
  name,
  stcNo,
  studentNo,
  address,
  state,
}) => {
  const [mdaItemList, setMdaItemList] = useState(MdaItemDropdownList);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetails, setShowdetails] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const handleSelectItem = (action: string) => {
    const newMdaList = mdaItemList.map((ele) => {
      return { ...ele, isSelected: ele.text === action };
    });
    setMdaItemList(newMdaList);
    if (action === "Clear Selection") {
      setMdaItemList(MdaItemDropdownList);
    } else if (action === "View MDA Profile") {
      setShowdetails(true);
    } else if (action === "Suspend MDA") {
      setShowSuspendModal(true);
    }
    setShowDropdown(false);
  };
  return (
    <TrStyles>
      <td className="">
        <p>{name}</p>
      </td>
      <td>
        <p>{stcNo}</p>
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
                {mdaItemList.map((ele, index) => (
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
          <MdaDetailModal cancelModal={() => setShowdetails(false)} />
        )}
        {showSuspendModal && (
          <SuspendMdaComp
            handleModalAction={() => console.log("suspend Mda!")}
            cancelModal={() => setShowSuspendModal(false)}
          />
        )}
      </td>
    </TrStyles>
  );
};

export const StatusComp: React.FC<IStatusStyles> = ({ $isActive }) => {
  return (
    <StatusStyles $isActive={$isActive}>
      <p>{$isActive ? "Active" : "In active"}</p>
    </StatusStyles>
  );
};

export const MdaItemComp: React.FC<IMdaDropdownFunc> = ({
  text,
  handleSelect,
  isSelected,
  hasBorder,
}) => {
  return (
    <MdaItemCompStyles
      $hasBorder={hasBorder}
      $isSelected={isSelected}
      onClick={handleSelect}
    >
      <p>{text}</p>
    </MdaItemCompStyles>
  );
};

interface IFilterBtnComp extends IFilterBtn {
  handleFilterFunc: () => void;
  handleClick: () => void;
}
export const FilterBtnComp: React.FC<IFilterBtnComp> = ({
  icon,
  activeIcon,
  isSelected,
  text,
  handleFilterFunc,
  handleClick,
}) => {
  return (
    <FilterBtnStyles
      $isSelected={isSelected}
      type="button"
      onClick={handleClick}
    >
      <>{isSelected ? activeIcon : icon}</>
      <span>{text}</span>
    </FilterBtnStyles>
  );
};
