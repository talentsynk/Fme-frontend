export const CourseItems = [
  { name: "Carpentry", percent: 55 },
  { name: "Fashion Design", percent: 75 },
  { name: "Catering", percent: 50 },
  { name: "Furniture", percent: 70 },
  { name: "Weldering", percent: 90 },
];

export const ColorGroup = [
  {
    lightColor: "#D1E9FF",
    textColor: "#194185",
    thickColor: "#175CD3",
    bgColor: "#F5FAFF",
  },
  {
    lightColor: "#FCE7F6",
    textColor: "#851651",
    thickColor: "#C11574",
    bgColor: "#FEF6FB",
  },
  {
    lightColor: "#E0EAFF",
    textColor: "#2D3282",
    thickColor: "#3538CD",
    bgColor: "#F5F8FF",
  },
  {
    lightColor: "#D1FADF",
    textColor: "#054F31",
    thickColor: "#027A48",
    bgColor: "#F6FEF9",
  },
  {
    lightColor: "#D1E9FF",
    textColor: "#194185",
    thickColor: "#175CD3",
    bgColor: "#F5FAFF",
  },
];

export interface IGraphplots {
  name : string;
  students: number;
}
export const GraphPlots: IGraphplots[] = [
  { name : "MICT", students: 135 },
  { name : "NITDA" , students: 100 },
  { name : "NIIT"  , students: 90 },
  { name : "NESMA" , students: 55 },
  { name : "FED MINISTRY OF WORKS & HOUSING" , students: 35 },
  { name : "NABTEB" , students: 25 },
];

interface IGraphOption{
  name : string;
  isSelected : boolean;
  api : string;
}
export const GraphOptions:IGraphOption[] = [
  { name: "MDAs", isSelected: true, api : "mda/get-all-mdas" },
  { name: "STCs", isSelected: false , api : "stc/get-all-stc"},
  { name: "Students", isSelected: false, api : "mda/total-mda" },
]

export const CourseGraphPlots: IGraphplots[] = [
	{ name: "MA", students: 135 },
	{ name: "ME", students: 100 },
	{ name: "EL", students: 90 },
	{ name: "IN", students: 55 },
	{ name: "SU", students: 35 },
	{ name: "HU", students: 25 },
];

export const CourseGraphOptions: IGraphOption[] = [
	{ name: "Courses", isSelected: true, api: "mda/get-all-mdas" }
];
export const MDACourseGraphOptions: IGraphOption[] = [
	{ name: "Courses", isSelected: true, api: "course/all" }
];