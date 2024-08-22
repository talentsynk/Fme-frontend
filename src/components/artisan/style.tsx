import styled, { css } from "styled-components";

export const BannerStyle = styled.div`
  height: 40vh;
  background: var(--Primary-Color, #00932e);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .one {
    display: flex;
    gap: 1rem;
    align-items: center;
    h2 {
      color: var(--Neutrals-Colors-100, #fff);
      font-size: 2.75rem;
      font-style: normal;
      font-weight: 700;
      line-height: 3rem; /* 109.091% */
      letter-spacing: -0.055rem;
    }
  }
  p {
    color: var(--Neutrals-Colors-100, #fff);
    text-align: center;
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }
  @media (max-width: 500px) {
    .one {
      h2 {
        font-size: 1.5rem;
      }
    }
    p {
      width: 75%;
    }
  }
`;
export const EmployerBannerStyle = styled.div`
  height: 40vh;
  background: var(--Primary-Color, #00932e);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5625rem;
  .img {
    img {
      border-radius: 5rem;
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0.2) 100%
        ),
        url(<path-to-image>) lightgray 50% / cover no-repeat,
        var(--Primary-Color, #00932e);
    }
  }
  .one {
    display: flex;
    align-items: center;
    h2 {
      color: var(--Neutrals-Colors-100, #fff);
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 109.091% */
      letter-spacing: -0.055rem;
    }
  }
  p {
    color: var(--Neutrals-Colors-100, #fff);
    text-align: center;
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }
  @media (max-width: 500px) {
    .one {
      h2 {
        font-size: 1.125rem;
      }
    }
    p {
      width: 75%;
    }
  }
`;

export const VerifiedBadge = styled.div`
  border-radius: 0.3125rem;
  background: #e4f5ea;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 0rem 1rem 0rem 1rem;
  height: 1.625rem;
  p {
    color: var(--Primary-Color, #00932e);
    font-feature-settings: "cv03" on, "cv04" on;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 145%; /* 1.0875rem */
    letter-spacing: -0.00375rem;
  }
`;
export const ReviewBtnStyle = styled.button`
  border-radius: 0.3125rem;
  background: #e4f5ea;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  height: 1.625rem;
  width: fit-content;
  p {
    color: var(--Primary-Color, #00932e);
    font-feature-settings: "cv03" on, "cv04" on;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 145%; /* 1.0875rem */
    letter-spacing: -0.00375rem;
    color: var(--Primary-Color, #00932E);
  }
`;
export const JobCompStyles = styled.div`
  border-radius: 1rem;
  border: 1px solid #f0f0f0;
  background: #fff;
  padding: 1.5rem 0.75rem 0.75rem 0.75rem;
  display: flex;
  gap: 1rem;
  .fir {
    padding-top: 1.5rem;
  }
  .sec {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .v {
      display: flex;
      // gap: 1rem;
      flex-wrap: wrap;
      justify-content: space-between;
      h4 {
        color: #1a1a1a;
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 150% */
      }
      p {
        color: var(--Foundation-Black-black-7, #919191);
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 145%; /* 1.0875rem */
      }
    }
  }
  .r {
    .r-w {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    p {
      color: var(--Foundation-Black-black-7, #919191);
      font-feature-settings: "cv03" on, "cv04" on;
      font-size: 0.95rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
    }
    h4 {
      margin-top: 0.38rem;
      color: var(--text-style, #101928);
      font-feature-settings: "cv03" on, "cv04" on;
      font-size: 0.95rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bg {
      display: flex;
      border-radius: 0.25rem;
      background: #f5f5f5;
      align-items: center;
      width: fit-content;
      height: 1.5rem;
      gap: 0.375rem;
      padding: 0.5rem 0.5rem;
      p {
        color: var(--Foundation-Black-black-7, #919191);
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 145%; /* 0.90625rem */
        text-transform: capitalize;
      }
    }
    button {
      border-radius: 0.375rem;
      background: var(--Primary-Color, #00932e);
      color: var(--Shade-White, var(--Neutrals-Colors-100, #fff));
      text-align: center;
      height: 2.25rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
  }
`;

export const TinySVGBg = styled.div`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.3125rem;
  background: #e7f6ec;
`;
export const LargeSVGBg = styled.div`
  display: flex;
  width: 5.3125rem;
  height: 5.3125rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  svg {
    scale: 1.5;
  }
  gap: 0.5rem;
  border-radius: 0.3125rem;
  background: #e7f6ec;
`;
export const LocationModalStyle = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  border: 1px solid #e0e2e7;
  background: #fff;
  padding: 0.75rem;
  /* style 2 */
  box-shadow: 0px 30px 60px 0px rgba(138, 149, 154, 0.15);
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 300%;
  position: absolute;
  top: 0;
  left: 0%;
  .max {
    z-index: 15;
  }
  .one {
    h3 {
      color: #000;
      font-feature-settings: "cv03" on, "cv04" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
    }
  }
  .x {
    display: flex;
    justify-content: right;
    cursor: pointer;
  }
  .btns {
    display: flex;
    gap: 1.25rem;
    button {
      height: 2.5rem;
      background: transparent;
      color: rgba(0, 0, 0, 0.25);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 142.857% */
    }
    .clear:hover {
      color: #cb1a14;
    }
    .apply {
      color: var(--Primary-Color, #00932e);
    }
  }
`;

export const TagStyle = styled.div`
  display: flex;
  border-radius: 0.25rem;
  background: #f5f5f5;
  align-items: center;
  width: fit-content;
  height: 2rem;
  gap: 0.375rem;
  padding: 0.625rem;
  p {
    color: var(--Color-Text, #111);
    font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 145%; /* 0.90625rem */
    text-transform: capitalize;
  }
`;
