import styled from "styled-components";
import { JobDetailPageStyle } from "../Jobdetails/style";

export const EmployerDetailPageStyle = styled(JobDetailPageStyle)`
  .cont-one {
    .options {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #ebedef;
    }
  }
  .cont-two {
    padding: 1rem;
    border-radius: 0.625rem;
    border: 2px solid #eff1f3;
    background: #fcfcfd;
    height: fit-content;
    .stat {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      h3 {
        color: #000;
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 700;
        line-height: 145%; /* 1.35938rem */
      }
    }
    .l2 {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .fr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h4,
        p {
          color: #000;
          font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
          font-size: 0.8125rem;
          font-style: normal;
          font-weight: 500;
          line-height: 145%; /* 1.17813rem */
        }
        p {
          font-size: 0.875rem;
        }
        .rate {
          display: flex;
          gap: 0.25rem;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .cont-two {
      padding: 1rem;
    }
  }
  @media (min-width: 900px) {
    .cont-two {
      width: 30%;
    }
  }
`;
