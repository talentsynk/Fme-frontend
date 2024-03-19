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
  @media (min-width: 998px) {
    width: 85%;
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
  .right{
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
  padding: 1.81rem 1.81rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  .ic {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    span {
      color: rgba(0, 0, 0, 0.5);
      text-align: center;
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
  }
  p {
    color: #768396;
    text-align: center;
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
      border: 1px solid var(--Primary-Color, #00932e);
      background: #e7f6ec;
      p,
      .ic span {
        color: #000;
      }
    `}
`;
export const AdminlistStyle = styled.div`
  display: flex;
  gap: 0.75rem;
  .ic,
  .nm {
    width: 50%;
  }
  justify-content: center;
  align-items: center;
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
  a{
    width: fit-content;
  }
`;
