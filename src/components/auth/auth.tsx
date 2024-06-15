import { IAdmin, ISelectAdminFunc } from "./data";
import { SelectAdminStyles, SelectUserCompStyle } from "./style";

export const FullMeaning = {
  FME: "Federal Ministry of Education",
  MDA: "Ministry Department & Agencies",
  STC: "Skill Training Centres",
};
export const SelectAdminComp: React.FC<ISelectAdminFunc> = ({
  name,
  icon,
  isSelected,
  handleSelect,
}) => {
  return (
    <SelectAdminStyles $isSelected={isSelected} onClick={handleSelect}>
      <div className="ic">{icon}</div>
      <div className="txt">
        {name == "FME" && (
          <div className="nm">{`${FullMeaning.FME} (${name})`}</div>
        )}
        {name == "MDA" && (
          <div className="nm">{`${FullMeaning.MDA} (${name})`}</div>
        )}
        {name == "STC" && (
          <div className="nm">{`${FullMeaning.STC} (${name})`}</div>
        )}
        <p>You identify as a {name} Member</p>
      </div>
    </SelectAdminStyles>
  );
};

export const SelectUserComp: React.FC<ISelectAdminFunc> = ({
  name,
  icon,
  isSelected,
  handleSelect,
}) => {
  return (
    <SelectUserCompStyle $isSelected={isSelected} onClick={handleSelect}>
      <div className="ic">{icon}</div>
      <p>I am an {name === "Artisan" ? "Artisan" : "Artisan Employer"}</p>
    </SelectUserCompStyle>
  );
};
