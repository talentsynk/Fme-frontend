export const CourseItems = [
    { name: "Carpentry", percent: 55 },
    { name: "Fashion Design", percent: 75 },
    { name: "Catering", percent: 50 },
    { name: "Furniture", percent: 70 },
    { name: "Weldering", percent: 90 },
  ];
  
  // stc-login email: fgwork@gmail.com
// pwd: Pass123*

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
    { name : "AGRICULTURAL SKILLS CENTRE, DAMARE", students: 135 },
    { name : "VOCATIONAL TECHNICAL TRAINING CENTRE, GOMBI" , students: 100 },
    { name : "TECHNICAL SKILLS ACQUISITION CENTRE, MUBI"  , students: 90 },
    { name : "MODEL NOMADIC SKILL EDUCATION CENTER" , students: 55 },
    { name : "FED MINISTRY OF WORKS & HOUSING" , students: 35 },
    { name : "TECHNICAL SKILLS ACQUISITION CENTRE, GARKI" , students: 25 },
  ];
  
  interface IGraphOption{
    name : string;
    isSelected : boolean;
    api : string;
  }
  export const GraphOptions:IGraphOption[] = [
    { name: "Students", isSelected: true, api : "stc/get-total-count" },
  ]