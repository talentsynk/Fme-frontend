import styled from "styled-components";

export interface ICourseItemStyle{
    $lightColor : string;
    $thickColor : string;
    percent : number;
    $textColor : string;
    $bgColor : string;
}
export const CourseItemStyles = styled.div<ICourseItemStyle>`
border-radius: 0.75rem;
background: ${props => props.$bgColor};
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
    background: ${props => props.$lightColor};
    p {
      color: ${props => props.$thickColor};
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
      color: ${props => props.$textColor};
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    .percent {
      color: ${props => props.$thickColor};
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .pad {
    padding-left: 1rem;
    margin-top: 0.5rem;
    .bar {
      background: ${props => props.$lightColor};
      height: 9px;
      border-radius: 0.25rem;
    }
    .inner-bar {
      background: ${props => props.$thickColor};
      height: 9px;
      border-radius: 0.25rem;
      width: ${props => props.percent}%;
    }
  }
`;
