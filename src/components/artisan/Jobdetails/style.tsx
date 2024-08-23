import styled from "styled-components";

export const JobDetailPageStyle = styled.div`
  .x {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .lit {
      color: rgba(0, 0, 0, 0.25);
      font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem; /* 150% */
      cursor: pointer;
    }
    .activ {
      color: var(--Primary-Color, #00932e);
      font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
  }
  .head {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    h3 {
      color: #000;
      text-align: center;
      font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: 3rem; /* 120% */
      letter-spacing: -0.05rem;
      width: 70%;
      margin-top: 1rem;
    }
    .btm {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      button {
        border-radius: 0.25rem;
        background: var(--Primary-Color, #00932e);
        width: 7.5rem;
        height: 2.5rem;
        justify-content: center;
        align-items: center;
        color: var(--Neutrals-Colors-100, #fff);
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 145%; /* 1.26875rem */
      }
      p {
        color: #1a1a1a;
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; /* 150% */
      }
    }
  }
  .similar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .head {
      color: #979797;
      font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: 2rem; /* 133.333% */
      letter-spacing: -0.03rem;
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .cont-one p {
    color: #000;
    font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 133.333% */
  }
  .cont-two {
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    gap: 1.5rem;
    .gas {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h4 {
        color: #000;
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 700;
        line-height: 145%; /* 1.0875rem */
      }
      .sk {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 1.19rem;
    button {
      display: flex;
      // width: 12.5rem;
      height: 3rem;
      padding: 1rem 1.5rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.625rem;
    }
    .apply {
      border-radius: 0.375rem;
      background: var(--Primary-Color, #00932e);
      color: var(--Shade-White, var(--Neutrals-Colors-100, #fff));
      text-align: center;
      font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
    .save {
      border-radius: 0.375rem;
      background: #eff1f3;
      display: flex;
      align-items: center;
      p {
        color: #000;
        text-align: center;
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; /* 150% */
      }
    }
  }
  @media (max-width: 500px) {
    .similar {
      .head {
        font-size: 1.125rem;
      }
    }
    .cont-two {
      gap: 2rem;
    }
    .btns {
      button {
        padding: 0.5rem 0.75rem;
      }
    }
    .head {
      h3 {
        font-size: 1.5rem;
        line-height: 2rem;
        width: 90%;
      }
      .btm {
        p {
          font-size: 0.875rem;
        }
      }
    }
  }
  @media (min-width: 900px) {
    .text-cont {
      margin-top: 1.5rem;
      display: flex;
      gap: 2rem;
      .cont-one {
        width: 70%;
      }
    }
  }
`;
