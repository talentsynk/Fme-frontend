import { ReactNode } from "react";
import { BannerStyle } from "./style";

interface IBanner {
  head: string;
  desc: string;
  icon?: ReactNode;
}
export const Banner: React.FC<IBanner> = ({ head, desc, icon }) => {
  return (
    <BannerStyle>
      <div className="one">
        <>{icon}</>
        <h2>{head}</h2>
      </div>
      <p>{desc}</p>
    </BannerStyle>
  );
};
