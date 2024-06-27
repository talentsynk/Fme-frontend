import { FormStyles } from "@/app/recovery/style";
import styled, { css } from "styled-components";
import { ISelectedcompStyle } from "../icons/header";

export const AuthCardStyle = styled.div`
  margin: 0 auto;
  @media (max-width: 998px) {
    .desktop {
      display: none;
    }
  }
  @media (max-width: 500px) {
    // width: ;
    .two {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
    }
  }
  @media (min-width: 998px) {
    width: 85%; // or 85%
    .flx {
      width: 100%;
      display: flex;
      height: auto;
    }
    .one {
      display: flex;
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        border-top-left-radius: 1.25rem;
        border-bottom-left-radius: 1.25rem;
      }
      position: relative;
    }
    .one,
    .two {
      width: 50%;
    }
    .two {
      display: flex;
      flex: 1;
      height: auto;
    }
    .loc {
      position: absolute;
      top: 3rem;
      left: 3rem;
    }
  }
`;

export const AuthFormStyles = styled(FormStyles)`
  .btn-m {
    margin-top: 0rem;
  }
  .right {
    display: flex;
    justify-content: right;
    align-items: center;
  }
  @media (min-width: 767px) and (max-width: 998px) {
    width: 75%;
    margin: 0 auto;
  }
  @media (min-width: 998px) {
    padding: 2.5rem 2.5rem;
    padding-left: 3rem;
    border-radius: 0rem;
    border-top-right-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
  }
`;

export const SelectAdminStyles = styled.div<ISelectedcompStyle>`
  border-radius: 1rem;
  cursor: pointer;
  border: 1px solid #ebedf4;
  background: #fbfbfd;
  padding: 1.21rem 1.51rem;
  min-height: 5rem;
  display: flex;
  justify-content: unset;
  align-items: center;
  gap: 1.5rem;
  .ic {
    display: flex;
    width: fit-content;
    .nm {
      color: rgba(0, 0, 0, 0.5);
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 150% */
    }
  }
  p {
    color: #768396;
    font-feature-settings: "cv04" on, "cv03" on;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 145%; /* 1.0875rem */
    letter-spacing: -0.00375rem;
  }
  &:hover {
    background: #e7f6ec;
  }

  ${(props) =>
    props.$isSelected &&
    css`
      border: 2px solid var(--Primary-Color, #00932e);
      background: #e7f6ec;
      p,
      .ic span {
        color: #000;
      }
    `}
`;

export const AdminlistStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  @media (min-width: 998px) {
    gap: 1.5rem;
  }
`;

export const LinkStyles = styled.div`
  width: fit-content;
  p {
    color: var(--Primary-Color, #00932e);
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 150% */
  }
  a {
    width: fit-content;
  }
`;

export const UserLoginStyles = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0.625rem;
  background: #f9f9f9;
  flex-direction: column;
  padding: 2rem 1.75rem;
  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
  .form-input {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .max {
    z-index: 11;
  }
  .head {
    h3 {
      color: #000;
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; /* 133.333% */
      letter-spacing: -0.03rem;
    }
    p {
      color: var(--Office-Brown-700, #645d5d);
      font-feature-settings: "cv04" on, "cv03" on;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
      margin-top: 0.25rem;
    }
  }
  .inp {
    position: relative;
    input {
      border-radius: 0.375rem;
      border: 1px solid #d0d5dd;
      background: var(--Shade-White, #fff);
      height: 3rem;
      padding: 1rem;
      padding-right: 2.5rem;
      width: 100%;
    }
  }
  input:active,
  input:focus {
    border: 1px solid var(--Primary-Color, #00932e);
  }
  /* For WebKit-based browsers (e.g., Chrome, Safari) */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* For Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .ind {
    position: absolute;
    right: 1rem;
    top: 0.95rem;
    height: fit-content;
    svg {
      cursor: pointer;
    }
  }
  .inp {
    .error-bdr {
      border: 1px solid #eb5017;
    }
  }
  .btn,
  .btn-m {
    button {
      border-radius: 0.625rem;
      background: #00932e;
      height: 3rem;
      color: var(
        --color-set-type-white-primary,
        var(--Neutrals-Colors-100, #fff)
      );
      text-align: center;
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1rem;
      width: 100%;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
  }
  .form-ele {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    label {
      color: var(--Grey-900, var(--text-style, #101928));
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    p {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    .error-msg {
      color: var(--Error-500, #cb1a14);
    }
    .correct {
      color: var(--Success-600, #04802e);
    }
  }
  input[type="password"] {
    color: var(--Grey-900, var(--text-style, #101928));
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
  input[type="password"]::placeholder {
    color: var(--Grey-400, #98a2b3);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
  .btm {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    p {
      color: var(--Office-Brown-800, #514a4a);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    button {
      border-radius: 0.375rem;
      background: #e7f6ec;
      height: 1.875rem;
      padding: 0rem 0.625rem;
      color: var(--Primary-Color, #00932e);
      text-align: center;
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 142.857% */
    }
  }
`;

export const SelectUserCompStyle = styled.div<ISelectedcompStyle>`
  display: flex;
  align-items: center;
  border-radius: 0.3125rem;
  padding: 1.25rem 0rem 1.25rem 1.5rem;
  background: #fff;
  gap: 1.03125rem;
  cursor: pointer;
  border: 1px solid transparent;
  /* style 2 */
  box-shadow: 0px 30px 60px 0px rgba(138, 149, 154, 0.15);
  p {
    color: var(--text-style, #101928);
    font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem; /* 142.857% */
  }
  ${(props) =>
    props.$isSelected &&
    css`
      border: 1px solid var(--Primary-Color, #00932e);
    `}
  @media (max-width: 500px) {
    padding: 1.25rem 0rem 1.25rem 1.15625rem;
  }
`;
