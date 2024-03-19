import { IAdmin, ISelectAdminFunc } from "./data";
import { SelectAdminStyles } from "./style";

export const SelectAdminComp: React.FC<ISelectAdminFunc> = ({
  name,
  icon,
  isSelected,
  handleSelect,
}) => {
  return (
    <SelectAdminStyles $isSelected={isSelected} onClick={handleSelect}>
      <div className="ic">
        <>{icon}</>
        <span className="nm">{name}</span>
      </div>
      <p>You identify as a {name} Member</p>
    </SelectAdminStyles>
  );
};
