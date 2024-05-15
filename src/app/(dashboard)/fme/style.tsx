import styled from "styled-components";

export const FMEHomeStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1.1875rem;
  row-gap: 1.25rem;
  .totals{
    grid-column: 1/4;
    display: flex;
    column-gap: 1.1875rem;
    row-gap: 1.25rem;
  }
  .course-stat,.summary,.top-courses{
    min-height: 200px;
  }
  .course-stat{
    grid-column: 1/4;
    border-radius: 0.5rem;
    background: #FFF;
    display: flex;
    flex-direction: column;
    gap: 0.87rem;
    position: relative;
    overflow: hidden;
    padding: 1.13rem 0.94rem 1.13rem 0.94rem;
    .head h4 {
      color: #000;
      font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
  }
  .cont{
    position: relative;
    overflow-x: scroll;
    max-width : 100%;
    transition: 'left 0.5s ease';
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .coursecards{
    display: flex;
    align-items: center;
    transform : translateX(0%);
    gap: 1rem;
  }
  .slide-r, .slide-l{
    position: absolute;
    top: 50%;
    right: 0;
    width: fit-content;
    button{
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--text-style, #101928);
      border-radius: 1.6875rem;
    }
  }
  .slide-l{
    left: 0;
  }
  .total {
    height: 8.0625rem;
    background: #fff;
    width: 100%;
    border-radius: 0.75rem;
    padding: 0.6875rem 0.9375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      color: var(--Black-30, #8b8d97);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h3 {
        color: var(--Black-60, #45464e);
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
  .summary {
    grid-column: 1/3;
    background: #fff;
    display: flex;
    gap: 2.25rem;
    padding: 0.9375rem 1.25rem;
    flex-direction: column;
    h4 {
      color: #000;
      font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
    .head {
      display: flex;
      gap: 1.3125rem;
      align-items: center;
      justify-content: space-between;
    }
    .dd-head {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 1.25rem;
      padding: 0.3125rem 0.5rem 0.3125rem 0.75rem;
      border-radius: 0.5rem;
      background: #e7f6ec;
      p {
        color: var(--Primary-Color, #00932e);
        font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem; /* 142.857% */
      }
    }
    .dropdown {
      position: relative;
      min-width: 100px;
    }
    .options {
      position: absolute;
      margin-top: 0.45rem;
      border-radius: 0.25rem;
      width: 100%;
      display: flex;
      z-index: 5;
      background: #fff;
      padding: 0.45rem;
      flex-direction: column;
      gap: 0.5rem;
      box-shadow: 0px 37px 44px 0px rgba(185, 185, 185, 0.1);
      border: 1px solid var(--Secondary-Gray-2, #e0e2e7);
      .option {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          color: #000;
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1.25rem; /* 142.857% */
        }
      }
    }
  }
  .top-courses {
    grid-column: 3/4;
    background: #fff;
    padding: 1rem 1.5rem;
    h5 {
      color: var(--Gray-900, #101828);
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.75rem; /* 155.556% */
    }
    .content {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  }
  .track {
    grid-column: 1/4;
    background: #fff;
  }
  @media (max-width: 728px){
    display: flex;
    flex-direction: column;
    .totals{
      flex-direction: column;
      column-gap: 1.1875rem;
      row-gap: 1.25rem;
      margin-top: 1rem;
      padding: 0rem 1rem 0rem 1rem;
    }
  }
`;

