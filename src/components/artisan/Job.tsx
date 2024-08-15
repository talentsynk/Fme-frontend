import { SmallBriefCaseIcon, TinyLocationIcon } from "../icons/artisan/icons";
import { JobCompStyles, TinyBriefcaseBg } from "./style";

export const JobComp = () => {
  return (
    <JobCompStyles>
      <div className="fir">
        <TinyBriefcaseBg>
          <SmallBriefCaseIcon />
        </TinyBriefcaseBg>
      </div>
      <div className="sec">
        <div className="v">
          <h4>Oragon Confectionaries</h4>
          <p>posted 2 days ago</p>
        </div>
        <div className="r">
          <p>
            I need a caterer for 20 peoples meal in a birthday party that is
            coming up soon. Call +234 817 896.......
          </p>
          <h4>300k • Contract Job</h4>
        </div>
        <div className="btn">
          <div className="bg">
            <TinyLocationIcon />
            <p>Oyo State</p>
          </div>
          <button type="button">Apply Now</button>
        </div>
      </div>
    </JobCompStyles>
  );
};
