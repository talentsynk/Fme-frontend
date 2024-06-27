import styled, { css } from "styled-components";

export const GenericDashboardLayoutStyle = styled.main`
  .main {
    background: #f9fafb;
    padding: 0rem 0rem 2rem 0rem;
  }
  @media (max-width: 998px) {
    .sidebar {
      display: none;
    }
  }
  /* For WebKit-based browsers (Chrome, Safari, Opera) */
  ::-webkit-scrollbar {
    width: 0.4rem; /* width of the scrollbar */
    background: #fff;
    border-radius: 0.125rem;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    width: 0.25rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.125rem;
    background: #bfc3c8; /* color of the thumb */
  }
  @media (min-width: 998px) {
    display: grid;
    width: 100vw;
    grid-template-columns: 20% 1fr;
    grid-template-rows: 80px 1fr;
    height: 100vh;
    overflow: hidden;
    .sidebar {
      grid-column: 1/2;
      grid-row: 1/3;
    }
    .header {
      grid-column: 2/3;
      grid-row: 1/2;
    }
    .ctrl {
      position: relative;
      overflow-y: scroll;
    }
    .main {
      grid-column: 2/3;
      grid-row: 2/3;
      padding: 1.5rem 1.5rem 3rem 1.35rem;
      max-height: fit-content;
    }
  }
`;

export const AuthLayoutStyles = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  @media (max-width: 998px) {
    background: url(/images/auth/mobile-bg.svg) center/cover;
    padding-top: 1rem;
    padding-bottom: 2.5rem;
    .desktop {
      display: none;
    }
    .cont {
      justify-content: flex-start;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media (min-width: 998px) {
    background: #e7f6ec;
    padding-top: 3rem;
    padding-bottom: 3rem;
    .cont {
      justify-content: flex-end;
      gap: 3.375rem;
    }
    .mobile {
      display: none;
    }
    .flex {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      p {
        color: #000;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem; /* 133.333% */
      }
    }
  }
`;

export const UserDashboardLayoutStyles = styled.main`
  footer {
    background: #e7f6ec;
    margin-top: 2rem;
  }
  min-height: 100vh;
  @media (max-width: 500px) {
    .footer {
      padding: 1.9375rem 2.5625rem 2rem 1.4375rem;
    }
  }
  @media (min-width: 500px) {
    .footer {
      padding: 2.5rem;
    }
  }
  @media (min-width: 998px) {
    .main {
      // height: 100vh;
      overflow: hidden;
    }
    .footer {
      padding: 5rem;
    }
  }
`;

export const PaddedSectionStyles = styled.div`
  @media (max-width: 500px) {
    padding: 0rem 0.94rem 1rem 0.94rem;
  }
  @media (min-width: 500px) {
    padding: 0rem 2rem 2rem 2rem;
  }
  @media (min-width: 998px) {
    padding: 0rem 3.9rem 3.9rem 3.9rem;
  }
`;
export const UserAuthLayoutStyles = styled.main`
  min-height: 100vh;
  display: flex;
  .abs {
    width: 80%;
    margin: 0 auto;
    margin-top: 5%;
  }
  .main {
    width: 100%;
  }
  .text {
    display: flex;
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    gap: 2rem;
    h3 {
      color: var(--Shade-White, var(--Neutrals-Colors-100, #fff));
      font-size: 3.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: 3.5rem; /* 107.692% */
      letter-spacing: -0.065rem;
    }
    p {
      color: var(--Office-Brown-100, #e4dbdb);
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on, "salt" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem; /* 133.333% */
    }
  }
  @media (max-width: 998px) {
    flex-direction: column;
    padding: 0.5rem;
    padding-top: 2rem;
    .desktop {
      display: none;
    }
    .two {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 100%
      ),
      url("/images/userauth.svg") lightgray 50% / cover no-repeat;
  }
  @media screen and (min-width: 500px) and (max-width: 998px) {
    .two {
      width: 75%;
      margin: 0 auto;
    }
  }

  @media (min-width: 998px) {
    padding: 1.2rem;
    gap: 3.81rem;
    .one,
    .two {
      width: 50%;
    }
    .two {
      display: flex;
      flex: 1;
      height: auto;
    }
    .mobile {
      display: none;
    }
    .main {
      padding-right: 3.81rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .one {
      border-radius: 1rem;
      display: flex;
      padding-bottom: 2%;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.1) 100%
        ),
        url("/images/userauth.svg") lightgray 50% / cover no-repeat;
    }
  }
`;

export interface IMode {
  color?: string;
}
export const PoweredByStyles = styled.div<IMode>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6875rem;
  // width: fit-content;
  p {
    color: #000;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 133.333% */
  }
  ${(props) =>
    props.color &&
    css`
      p {
        color: ${props.color};
      }
    `}
`;
