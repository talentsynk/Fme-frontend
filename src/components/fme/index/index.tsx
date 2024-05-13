import { useEffect, useState } from "react";
import {
  BarChartCompStyle,
  CourseItemStyles,
  CustomTooltipStyle,
  ICourseItemStyle,
} from "./style";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { GraphPlots,CourseGraphPlots, IGraphplots } from "./data";
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


interface IBarchartComp {
  option?: string;
  api?: string;
}
export const BarChartComp: React.FC<IBarchartComp> = ({ option, api }) => {
  const [data, setData] = useState<IGraphplots[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // test api call
    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/${api}`, config)
      .then((res) => {
        if (res.data) {
          setData(GraphPlots);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [api]);
  return (
    <>
      {!isLoading && (
        <BarChartCompStyle>
          {data !== null && (
            <>
              <div className="label">
                <div className="box"></div>
                <p>Top 5 {option}</p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Bar dataKey="students" fill="#00932E" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </BarChartCompStyle>
      )}
      {isLoading && <Skeleton className="skele" height={350} />}
    </>
  );
};

export const CourseBarChartComp: React.FC<IBarchartComp> = ({ option, api }) => {
	const [data, setData] = useState<IGraphplots[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const token = Cookies.get("token");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		// test api call
		setIsLoading(true);
		axios
			.get(`${BACKEND_URL}/${api}`, config)
			.then((res) => {
				if (res.data) {
					setData(CourseGraphPlots);
					setIsLoading(false);
				}
			})
			.catch((error) => console.log(error));
	}, [api]);
	return (
		<>
			{!isLoading && (
				<BarChartCompStyle>
					{data !== null && (
						<>
							<div className="label">
								<div className="box"></div>
								<p>Top 6 {option}</p>
							</div>
							<ResponsiveContainer width="100%" height={350}>
								<BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
									<XAxis dataKey="name" stroke="#8884d8" />
									<YAxis />
									<Tooltip />
									<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
									<Bar dataKey="students" fill="#00932E" barSize={30} />
								</BarChart>
							</ResponsiveContainer>
						</>
					)}
				</BarChartCompStyle>
			)}
			{isLoading && <Skeleton className="skele" height={350} />}
		</>
	);
};