import { useEffect, useState } from "react";
import { BarChartCompStyle, CourseItemStyles, ICourseItemStyle } from "./style";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { GraphPlots, IGraphplots } from "./data";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";

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

export const BarChartComp = () => {
  const [data, setData] = useState<IGraphplots[] | null>(null);
  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // test api call
    axios
      .get(`${BACKEND_URL}/stc/get-all-stc`, config)
      .then((res) => {
        if (res.data) {
          setData(GraphPlots);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {data && (
        <BarChartCompStyle>
          {data !== null && (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="hours" fill="#00932E" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </BarChartCompStyle>
      )}
      {data === null && <Skeleton className="skele" height={350} />}
    </>
  );
};
