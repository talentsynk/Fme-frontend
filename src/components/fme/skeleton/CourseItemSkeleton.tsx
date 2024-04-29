import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CourseItemStyles } from "../index/style";

export const CourseItemSkeleton = () => {
  return (
    <CourseItemStyles>
      <Skeleton className="circle" />
      <div className="body">
        <Skeleton className="top" />
        <Skeleton className="bar" />
      </div>
    </CourseItemStyles>
  );
};
