import { CheckedBoxIcon, UncheckedBoxIcon } from "@/components/icons/fme/mda";
import { CheckboxStyle } from "./styles";

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
export const NewComp = () => {
  return <></>;
};
