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
import { useEffect, useState } from "react";
import { MdaDetailModal, ReactivateMdaComp, SuspendMdaComp } from "./modals";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fmeSelector, setSelectedMdaId } from "@/redux/fme/fmeSlice";
import { truncateString } from "@/utils/truncateString";
import { IMDACompData } from "@/types/Mda";
import ClickOutsideWrapper from "@/components/auth/wrapper";

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
export const TableRow: React.FC<IMDACompData> = ({
  Id: id,
  is_active: isActive,
  Name: name,
  stc_count: stcNo,
  student_count: studentNo,
  Address: address,
  StateOfOperation: state,
}) => {
  const [mdaItemList, setMdaItemList] = useState(MdaItemDropdownList);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetails, setShowdetails] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActiveModal, setShowActivateModal] = useState(false);

  const handleSelectItem = (action: string) => {
  
    let newMdaList = mdaItemList.map((ele) => {
      return { ...ele, isSelected: ele.text === action };
    });
    setMdaItemList(newMdaList);
    if (action === "Clear Selection") {
      setMdaItemList(MdaItemDropdownList);
      dispatch(setSelectedMdaId(null));
    } else if (action === "View MDA Profile") {
      setShowdetails(true);
    } else if (action === "Suspend MDA") {
      setShowSuspendModal(true);
    } else if (action === "Re-activate MDA") {
      setShowActivateModal(true);
    }
    setShowDropdown(false);
  };
  const { selectedMdaId } = useAppSelector(fmeSelector);
  // set dispatch
  const dispatch = useAppDispatch();
  const handleSelectOptions = () => {
    setShowDropdown(true);
    if(!(selectedMdaId === id)){
      dispatch(setSelectedMdaId(id));
    }
    // reset the dropdown state
    setMdaItemList(MdaItemDropdownList);
  };

  return (
    <TrStyles>
      <td>
        <p className="name">{truncateString(name, 37).toUpperCase()}</p>
      </td>
      <td>
        <p>{stcNo ? stcNo : 0}</p>
      </td>
      <td>
        <p>{studentNo ? studentNo : 0}</p>
      </td>
      <td className="address">
        <p>{truncateString(address, 30)}</p>
      </td>
      <td>
        <p>{state && state.toUpperCase()} STATE</p>
      </td>

      <td className="drop">
        <StatusComp $isActive={isActive} />
        <ClickOutsideWrapper onClickOutside={() => setShowDropdown(false)}>
          <TableDropdownStyles
            className="igris"
          >
            <div className="head" onClick={handleSelectOptions}>
              <ThreedotsIcon />
            </div>
            {selectedMdaId === id && showDropdown && (
              <DropdownOptionsStyle>
                <div className="options">
                  {mdaItemList.map((ele, index) => (
                    <MdaItemComp
                      key={index}
                      isSelected={ele.isSelected}
                      text={
                        !isActive && ele.text === "Suspend MDA"
                          ? "Re-activate MDA"
                          : ele.text
                      }
                      hasBorder={ele.hasBorder}
                      handleSelect={() => {
                        handleSelectItem(
                          !isActive && ele.text === "Suspend MDA"
                            ? "Re-activate MDA"
                            : ele.text
                        );
                      }}
                    />
                  ))}
                </div>
              </DropdownOptionsStyle>
            )}
          </TableDropdownStyles>
        </ClickOutsideWrapper>
        {showDetails && (
          <MdaDetailModal cancelModal={() => setShowdetails(false)} />
        )}
        {showSuspendModal && (
          <SuspendMdaComp cancelModal={() => setShowSuspendModal(false)} />
        )}
        {showActiveModal && (
          <ReactivateMdaComp cancelModal={() => setShowActivateModal(false)} />
        )}
      </td>
    </TrStyles>
  );
};

export const StatusComp: React.FC<IStatusStyles> = ({ $isActive }) => {
  return (
    <StatusStyles $isActive={$isActive} className="istatus">
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
