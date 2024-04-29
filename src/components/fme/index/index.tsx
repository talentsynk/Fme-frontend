import { CourseItemStyles, ICourseItemStyle } from "./style";

export interface ICourseItem extends ICourseItemStyle {
  name: string;
}
export const CourseItem: React.FC<ICourseItem> = ({
  name,
  percent,
  $lightColor,
  $textColor,
  $thickColor,
  $bgColor,
}) => {
  return (
    <CourseItemStyles
      $lightColor={$lightColor}
      percent={percent}
      $textColor={$textColor}
      $thickColor={$thickColor}
      $bgColor={$bgColor}
    >
      <div className="circle">
        <p>{name.slice(0, 2).toUpperCase()}</p>
      </div>
      <div className="body">
        <div className="top">
          <p className="name">{name}</p>
          <p className="percent">{percent}%</p>
        </div>
        <div className="pad">
          <div className="bar">
            <div className="inner-bar"></div>
          </div>
        </div>
      </div>
    </CourseItemStyles>
  );
};
