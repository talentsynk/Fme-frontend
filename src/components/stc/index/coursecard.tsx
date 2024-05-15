import { truncateString } from "@/utils/truncateString";
import { CourseCardStyles, ISTCCourseCardStyle } from "./style";

interface ISTCCourseCard extends ISTCCourseCardStyle {
  name: string;
  noEnrolled: number;
  noGraduated: number;
}
export const STCCourseCard: React.FC<ISTCCourseCard> = ({
  name,
  noEnrolled,
  noGraduated,
  $lightColor,
  $thickColor,
  $bgColor,
}) => {
  return (
    <CourseCardStyles
      $lightColor={$lightColor}
      $thickColor={$thickColor}
      $bgColor={$bgColor}
    >
      <div className="circle">
        <p>{name.slice(0, 2).toUpperCase()}</p>
      </div>
      <p className="head">{truncateString(name, 30)}</p>
      <div className="fl">
        <div className="one">
          <span>Enrolled Students</span>
          <p>{noEnrolled}</p>
        </div>
        <div className="hr"></div>
        <div className="one">
          <span>Graduated Students</span>
          <p>{noGraduated}</p>
        </div>
      </div>
    </CourseCardStyles>
  );
};
