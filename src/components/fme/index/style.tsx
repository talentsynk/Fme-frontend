import styled from "styled-components";

export interface ICourseItemStyle {
  $lightColor?: string;
  $thickColor?: string;
  percent?: number;
  $textColor?: string;
  $bgColor?: string;
}
export const CourseItemStyles = styled.div<ICourseItemStyle>`
  border-radius: 0.75rem;
  background: ${(props) => props.$bgColor};
  padding: 1rem;
  display: flex;
  align-items: center;
  .circle {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.625rem;
    justify-content: center;
    align-items: center;
    border-radius: 1.25rem;
    background: ${(props) => props.$lightColor};
    p {
      color: ${(props) => props.$thickColor};
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .body {
    width: 100%;
    padding-left: 0.25rem;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: ${(props) => props.$textColor};
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
      text-transform: capitalize;
    }
    .percent {
      color: ${(props) => props.$thickColor};
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .pad {
    padding-left: 0.5rem;
    margin-top: 0.5rem;
    .bar {
      background: ${(props) => props.$lightColor};
      height: 9px;
      border-radius: 0.25rem;
    }
    .inner-bar {
      background: ${(props) => props.$thickColor};
      height: 9px;
      border-radius: 0.25rem;
      width: ${(props) => props.percent}%;
    }
  }
`;

export const BarChartCompStyle = styled.div`
  border-radius: 0.75rem;
  border: 1px solid #e5e7e7;
  width: 100%;
  display: flex;
  flex-direction: column;
  .label {
    padding-left: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .box{
      width: 1rem;
      height: 1rem;
      border-radius: 0.25rem;
      background: var(--Primary-Color, #00932E);
    }
    p {
      color: var(--Gray-900, #101828);
      font-family: "Satoshi";
      font-size: 0.85rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.75rem; /* 155.556% */
    }
  }
  padding: 1.5rem 0rem 1.5rem 0rem;
  color: #95969c;
  font-size: 0.75388rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  .skele {
    width: 100%;
    height: 350px;
    z-index: 5;
  }
`;


export const CustomTooltipStyle = styled.div`
  border: 2px solid #000;
  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
  p{
    color: #E9E9E9;
text-align: center;
font-family: "Satoshi";
font-size: 0.5625rem;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
`