import { IAdmin, ISelectAdminFunc } from "./data";
import { SelectAdminStyles } from "./style";

export const FullMeaning = {
  "FME" : "Federal Ministry of Education",
  "MDA" : "Ministry Department & Agencies",
  "STC" : "Skill Training Centres"
}
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
      </div>
      <div className="txt">
        {name == "FME" && <span className="nm">{`${FullMeaning.FME} (${name})`}</span>}
        {name == "MDA" && <span className="nm">{`${FullMeaning.MDA} (${name})`}</span>}
        {name == "STC" && <span className="nm">{`${FullMeaning.STC} (${name})`}</span>}
        <p>You identify as a {name} Member</p>
      </div>
    </SelectAdminStyles>
  );
};
