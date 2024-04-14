import { useState } from "react";
import { IStudentData, StudentItemDropdownList } from "./data";
import { NocenterStyles } from "../stc/styles";
import { StatusComp ,MdaItemComp} from "../mda/mda";
import { TableDropdownStyles,DropdownOptionsStyle,TrStyles } from "../mda/styles";
import { ThreedotsIcon } from "@/components/icons/fme/mda";
import { StcDetailModal,SuspendStcComp } from "../stc/modal";
import { StudentsDetailModal, SuspendStudentComp } from "./modal";

export const StudentTableRow: React.FC<IStudentData> = ({
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
  
    const handleSelectItem = (action: string) => {
      const newStudentList = studentItemList.map((ele) => {
        return { ...ele, isSelected: ele.text === action };
      });
      setStudentItemList(newStudentList);
      if (action === "Clear Selection") {
        setStudentItemList(StudentItemDropdownList);
      } else if (action === "View Student Profile") {
        setShowdetails(true);
      } else if (action === "Suspend Student") {
        setShowSuspendModal(true);
      }
      setShowDropdown(false);
    };
    return (
      <TrStyles>
        <td className="nocenter">
          <NocenterStyles>
            <p>{profile}</p>
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
            <div className="head" onClick={() => setShowDropdown(!showDropdown)}>
              <ThreedotsIcon />
            </div>
            {showDropdown && (
              <DropdownOptionsStyle>
                <div className="options">
                  {studentItemList.map((ele, index) => (
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
            <StudentsDetailModal cancelModal={() => setShowdetails(false)} />
          )}
          {showSuspendModal && (
            <SuspendStudentComp
              handleModalAction={() => console.log("suspend Stc!")}
              cancelModal={() => setShowSuspendModal(false)}
            />
          )}
        </td>
      </TrStyles>
    );
  };
  