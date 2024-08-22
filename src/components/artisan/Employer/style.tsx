import styled from "styled-components";
import { JobDetailPageStyle } from "../Jobdetails/style";

export const EmployerDetailPageStyle = styled(JobDetailPageStyle)`
  .cont-one {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .options {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .review {
    display: flex;
    justify-content: right;
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
  .similar {
    .head {
      align-items: unset;
    }
  }
  .mobile {
    display: none;
  }
  .desktop {
  }
  @media (max-width: 500px) {
    .cont-two {
      padding: 1rem;
    }
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
  @media (min-width: 900px) {
    .cont-two {
      width: 30%;
    }
  }
`;

export const SWitchTabStyles = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ebedef;
`;
export const SimilarEmployerCompStyle = styled.div`
  padding: 0.75rem 0.6875rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid #ebedef;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  .img {
    img {
      width: 100%;
    }
  }
  .hl {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      color: #000;
      font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
  }

  .same {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    p {
      color: var(--text-style, #101928);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .rt {
    p {
      color: rgba(0, 0, 0, 0.25);
    }
  }
`;

export const ReviewCompStyles = styled.div`
  border-bottom: 1px solid #ebedef;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
  .one {
    .fl {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .posted,
    .role {
      color: rgba(0, 0, 0, 0.7);
      font-feature-settings: "cv03" on, "cv04" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
    }
    .deet {
      display: flex;
      flex-direction: column;
      .lr {
        display: flex;
        align-items: center;
        gap: 1rem;
        .rate {
          display: flex;
          align-items: center;
        }
      }
      h4 {
        color: #000;
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; /* 150% */
      }
      .rate {
        p {
          color: #b9b9b9;
          font-feature-settings: "cv03" on, "cv04" on;
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 145%; /* 1.0875rem */
          letter-spacing: -0.00375rem;
        }
      }
    }
  }
  .text {
    p {
      color: #000;
      font-feature-settings: "cv03" on, "cv04" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  @media (max-width: 500px) {
    .one .deet h4 {
      // font-size: 0.875rem;
    }
  }
`;
