import { useState } from "react";
import { IStudentData, StudentItemDropdownList } from "./data";
import { NocenterStyles } from "../stc/styles";
import { StatusComp ,MdaItemComp} from "../mda/mda";
import { TableDropdownStyles,DropdownOptionsStyle,TrStyles } from "../mda/styles";
import { ThreedotsIcon } from "@/components/icons/fme/mda";
import { StcDetailModal, SuspendStcComp, ReactivateStcComp } from "../stc/modal";
import { ReactivateStudentComp, StudentsDetailModal, SuspendStudentComp } from "./modal";
import { fmeSelector, setSelectedStudentId } from "@/redux/fme/fmeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { truncateString } from "@/utils/truncateString";


export const StudentTableRow: React.FC<IStudentData> = ({
      id,
    isActive,
    profile,
    coursesNo,
    studentId,
    state,
  }) => {
    const [studentItemList, setStudentItemList] = useState(StudentItemDropdownList);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDetails, setShowdetails] = useState(false);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [showActiveModal, setShowActivateModal] = useState(false);
  
    const handleSelectItem = (action: string) => {
      const newStudentList = studentItemList.map((ele) => {
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
				if (selectedStudentId === id) {
					dispatch(setSelectedStudentId(null));
				} else {
					// set selected Mda id in redux here
					dispatch(setSelectedStudentId(id));
				}
				// reset the dropdown state
				setStudentItemList(StudentItemDropdownList);
			};

    return (
			<TrStyles>
				<td className="nocenter">
					<NocenterStyles>
						<p>{truncateString(profile, 37)}</p>
					</NocenterStyles>
				</td>
				<td>
					<p>{studentId}</p>
				</td>
				<td>
					<p>{coursesNo}</p>
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
						{selectedStudentId === id && (
							<DropdownOptionsStyle>
								<div className="options">
									{studentItemList.map((ele, index) => (
										<MdaItemComp
											key={index}
											isSelected={ele.isSelected}
											text={!isActive && ele.text === "Suspend Student" ? "Re-activate Student" : ele.text}
											hasBorder={ele.hasBorder}
											handleSelect={() => handleSelectItem(!isActive && ele.text === "Suspend Student" ? "Re-activate Student" : ele.text)}
										/>
									))}
								</div>
							</DropdownOptionsStyle>
						)}
					</TableDropdownStyles>
					{showDetails && <StudentsDetailModal cancelModal={() => setShowdetails(false)} />}
					{showSuspendModal && (
						<SuspendStudentComp  cancelModal={() => setShowSuspendModal(false)} />
					)}
					{showActiveModal && <ReactivateStudentComp  cancelModal={() => setShowActivateModal(false)} />}
				</td>
			</TrStyles>
		);
  };
  