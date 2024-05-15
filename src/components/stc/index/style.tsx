import styled from "styled-components";

export interface ISTCCourseCardStyle{
    $bgColor : string;
    $lightColor : string;
    $thickColor : string;
}
export const CourseCardStyles = styled.div<ISTCCourseCardStyle>`
  border-radius: 0.75rem;
  padding: 0.5rem;
  padding-top: 0.69rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${(props) => props.$bgColor};
  .fl {
    display: flex;
    padding: 0.4375rem 0.875rem 0.4375rem 0.8125rem;
    justify-content: center;
    align-items: center;
    gap: 0.875rem;
    background: ${(props) => props.$lightColor};
    border-radius: 0.6875rem;
  }
  .circle {
    width: 3.125rem;
    height: 3.125rem;
    flex-shrink: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .hr {
    height: 1.125rem;
    width: 0.135rem;
    background: ${(props) => props.$thickColor};
  }
  .head,
  .circle p {
    color: #1f1d39;
    font-family: "Satoshi";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .head{
    text-transform: capitalize;
  }
  .circle p{
    color: ${(props) => props.$thickColor};
  }
  .head, .circle{
    margin-left: 0.75rem;
  }
  .one span, .one p {
    white-space: nowrap;
    color: #000;
    text-align: center;
    font-family: "Satoshi";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .one p{
    font-weight: 700;
  }
`;
