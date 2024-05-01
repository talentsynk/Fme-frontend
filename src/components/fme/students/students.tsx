import { useState } from "react";
import { IStudentData, StudentItemDropdownList, IStudentDropdownFunc } from "./data";
import { NocenterStyles } from "../stc/styles";
import { MdaItemComp } from "../mda/mda";
import {
	CheckboxStyle,
	DropdownOptionsStyle,
	FilterBtnStyles,
	IStatusStyles,
	MdaItemCompStyles,
	StatusStyles,
	TableDropdownStyles,
	TrStyles,
} from "../mda/styles";
import { CheckedBoxIcon, ThreedotsIcon, UncheckedBoxIcon } from "@/components/icons/fme/mda";
import { ReactivateStudentComp, StudentsDetailModal, SuspendStudentComp } from "./modal";
import { fmeSelector, setSelectedStudentId } from "@/redux/fme/fmeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { truncateString } from "@/utils/truncateString";
import { IFilterBtn } from "../mda/data";
import { IStudentCompData } from "@/types/Student";

interface ICheckbox {
	isChecked: boolean;
	handleCheckedAction: () => void;
}
export const CheckboxComp: React.FC<ICheckbox> = ({ isChecked, handleCheckedAction }) => {
	return <CheckboxStyle onClick={handleCheckedAction}>{isChecked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}</CheckboxStyle>;
};

export const StudentTableRow: React.FC<IStudentCompData> = ({ FirstName, LastName, CoursesTaken, Email, ID, IsActive, StateOfResidence, UserID }) => {
	const [studentItemList, setStudentItemList] = useState(StudentItemDropdownList);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showDetails, setShowdetails] = useState(false);
	const [showSuspendModal, setShowSuspendModal] = useState(false);
	const [showActiveModal, setShowActivateModal] = useState(false);

	const handleSelectItem = (action: string) => {
		let newStudentList = studentItemList.map((ele) => {
			return { ...ele, isSelected: ele.text === action };
		});
		setStudentItemList(newStudentList);
		if (action === "Clear Selection") {
			setStudentItemList(StudentItemDropdownList);
			dispatch(setSelectedStudentId(null));
		} else if (action === "View Student Profile") {
			setShowdetails(true);
		} else if (action === "Suspend Student") {
			setShowSuspendModal(true);
		} else if (action === "Re-activate Student") {
			setShowActivateModal(true);
		}
	};

	const { selectedStudentId } = useAppSelector(fmeSelector);
	// set dispatch
	const dispatch = useAppDispatch();
	const handleSelectOptions = () => {
		setShowDropdown(!showDropdown);
		if (selectedStudentId === ID) {
			dispatch(setSelectedStudentId(null));
		} else {
			// set selected Mda id in redux here
			dispatch(setSelectedStudentId(ID));
		}
		// reset the dropdown state
		setStudentItemList(StudentItemDropdownList);
	};

	return (
		<TrStyles>
			<td className="nocenter">
				<NocenterStyles>
					<p>{truncateString(`${LastName + " " + FirstName}`, 37)}</p>
				</NocenterStyles>
			</td>
			<td>
				<p>{UserID}</p>
			</td>
			<td>
				<p>{CoursesTaken}</p>
			</td>
			<td>
				<p>{StateOfResidence.toUpperCase()} STATE</p>
			</td>
			<td className="drop">
				<StatusComp $isActive={IsActive} />
				<TableDropdownStyles className="igris">
					<div className="head" onClick={handleSelectOptions}>
						<ThreedotsIcon />
					</div>
					{selectedStudentId === ID && (
						<DropdownOptionsStyle>
							<div className="options">
								{studentItemList.map((ele, index) => (
									<MdaItemComp
										key={index}
										isSelected={ele.isSelected}
										text={!IsActive && ele.text === "Suspend Student" ? "Re-activate Student" : ele.text}
										hasBorder={ele.hasBorder}
										handleSelect={() => handleSelectItem(!IsActive && ele.text === "Suspend Student" ? "Re-activate Student" : ele.text)}
									/>
								))}
							</div>
						</DropdownOptionsStyle>
					)}
				</TableDropdownStyles>
				{showDetails && <StudentsDetailModal cancelModal={() => setShowdetails(false)} />}
				{showSuspendModal && <SuspendStudentComp cancelModal={() => setShowSuspendModal(false)} />}
				{showActiveModal && <ReactivateStudentComp cancelModal={() => setShowActivateModal(false)} />}
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

export const StudentItemComp: React.FC<IStudentDropdownFunc> = ({ text, handleSelect, isSelected, hasBorder }) => {
	return (
		<MdaItemCompStyles $hasBorder={hasBorder} $isSelected={isSelected} onClick={handleSelect}>
			<p>{text}</p>
		</MdaItemCompStyles>
	);
};

interface IFilterBtnComp extends IFilterBtn {
	handleFilterFunc: () => void;
	handleClick: () => void;
}

export const FilterBtnComp: React.FC<IFilterBtnComp> = ({ icon, activeIcon, isSelected, text, handleFilterFunc, handleClick }) => {
	return (
		<FilterBtnStyles $isSelected={isSelected} type="button" onClick={handleClick}>
			<>{isSelected ? activeIcon : icon}</>
			<span>{text}</span>
		</FilterBtnStyles>
	);
};
