import { CourseCardStyles } from "@/components/stc/index/style";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CourseCardSkeleton = () => {
  return (
    <Skeleton width={"15rem"} height={"9.375rem"} />
  );
};
