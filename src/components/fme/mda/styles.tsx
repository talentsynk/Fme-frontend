import { FormStyles } from "@/app/recovery/style";
import { ISelectedcompStyle } from "@/components/icons/header";
import styled, { css } from "styled-components";
import { LogoutModalStyles } from "../sidebar/style";

export const TopStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    h1 {
      color: var(--Grey-900, var(--text-style, #101928));
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; /* 133.333% */
      letter-spacing: -0.03rem;
    }
    p {
      color: var(--Grey-500, #667185);
      font-feature-settings: "cv04" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
      margin-top: 0.25rem;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.625rem;
      height: 2.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
    }
    .add {
      border: 1px solid #d0d5dd;
      background: #fff;
      span {
        color: #111;
        text-align: center;
        font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem; /* 142.857% */
      }
    }
    .import {
      background: #00932e;
      span {
        color: var(--Shade-White, var(--Neutrals-Colors-100, #fff));
        text-align: center;
        font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem; /* 142.857% */
      }
    }
  }
  @media (max-width: 998px) {
    padding: 1rem;
  }
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0.75rem 0rem 0rem 1rem;
  }
`;

export const WhiteContainer = styled.div`
  border-radius: 0.625rem;
  background: #fff;
  padding: 1.75rem 0rem 0rem 0rem;
  margin-top: 1.56rem;
  // border: 2px solid green;
`;

export const StatListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0rem 0.94rem 0rem 0.94rem;
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;
export const StatListItemStyle = styled.div`
  border-radius: 0.625rem;
  border: 1px solid var(--Grey-200, #e4e7ec);
  padding: 1.125rem 1rem;
  height: 6rem;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  display: flex;
  .stat {
    span {
      color: #475467;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    p {
      color: var(--Grey-700, #344054);
      font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const SearchAndResultStyle = styled.div`
  // border: 2px solid red;
  margin-top: 2.13rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .searchbar {
    padding: 0rem 2.88rem 0rem 3rem;
    display: flex;
    gap: 1.8rem;
    align-items: flex-start;

    .input {
      width: 80%;
      position: relative;
      .glass,
      .abs {
        position: absolute;
      }
      .abs {
        top: 1.15rem;
        right: 0.5rem;
        cursor: pointer;
      }
      .msg {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem; /* 142.857% */
      }
      .error {
        color: var(--Error-500, #cb1a14);
      }
      .correct {
        color: var(--Success-600, #04802e);
      }
      .glass {
        left: 0.5rem;
        top: 1.15rem;
      }
      input::placeholder {
        color: var(--Grey-400, #98a2b3);
        font-feature-settings: "cv04" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem; /* 142.857% */
      }
      input {
        border-radius: 0.375rem;
        border: 1px solid #d0d5dd;
        background: var(--Shade-White, #fff);
        height: 3.5rem;
        padding: 1rem 2rem 1rem 2rem;
        width: 100%;
        padding-right: 1rem;
      }

      .input:focus-within .abs {
        display: block;
      }
      input:active,
      input:focus {
        border: 1px solid var(--Primary-Color, #00932e);
        padding: 1rem 2rem 1rem 2rem;
      }
    }
    .filsort {
      width: fit-content;
      min-width: 20%;
      border-radius: 0.5rem;
      border: 1px solid #e4e7ec;
      background: #fff;
      height: 3rem;
      gap: 0.5rem;
      padding: 0.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
  }
  .pad {
    padding: 0rem 1rem;
  }
  .scroll {
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .options {
    border-bottom: 1px solid #e4e7ec;
    display: flex;
  }
  .result {
    height: 100%;
    overflow-y: scroll;
    position: relative;
  }

  @media (max-width: 998px) {
    .searchbar {
      padding: 1rem;
      .input {
        width: 60%;
      }
      .filsort {
        width: fit-content;
      }
    }
  }
  @media (max-width: 500px) {
    .searchbar {
      padding: 1rem;
      flex-direction: column;
      .input {
        width: 100%;
      }
      .filsort {
        width: fit-content;
      }
    }
  }
`;

export const FilterBtnStyles = styled.button<ISelectedcompStyle>`
  height: 100%;
  width: fit-content;
  border-radius: 0.3125rem;
  padding: 1rem 1rem 0.9375rem 1rem;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  background: transparent;
  span {
    color: var(--Grey-500, #667185);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
    letter-spacing: -0.0175rem;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      background: var(--Primary-Color, #00932e);
      transition: 0.3s;
      span {
        color: var(--Neutrals-Colors-100, #fff);
      }
    `}
`;
export const AbsoluteContStyle = styled.div`
  position: fixed;
  transition: 0.4s;
  left: 50%;
  top: 50%;
  height: 100vh;
  width: 100vw;
  margin-left: -50vw;
  margin-top: -50vh;
  z-index: 20;
  background: rgba(163, 163, 163, 0.2);
  backdrop-filter: blur(4px);
`;
export const MDADetailStyle = styled(AbsoluteContStyle)`
  display: flex;
  .left {
    width: 70%;
    cursor: pointer;
  }
  .right {
    width: 30%;
    border-left: 1px solid var(--Grey-200, #e4e7ec);
    background: #fff;
    flex-direction: column;
    // align-items: center;
    overflow-y: scroll;
    gap: 2rem;
    display: flex;
    padding: 2rem 0rem 2rem 0rem;
  }
  .r-1,
  .r-2 {
    border-bottom: 2px solid var(--Grey-200, #e4e7ec);
  }
  .r-1,
  .r-2,
  .r-3 {
    padding: 0rem 2rem 0rem 2rem;
  }

  .r-1 {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    padding-bottom: 2rem;
    .name {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .avatar {
      width: 3rem;
      height: 3rem;
      background: #e7f6ec;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #00932e;
      p {
        font-weight: 700;
        font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
        font-size: 1rem;
      }
    }
    h4 {
      color: #000;
      font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
    .deet {
      p {
        color: #475467;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem; /* 142.857% */
      }
    }
  }
  .r-2 {
    padding-bottom: 2rem;
    .totals {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    .total {
      border-radius: 0.625rem;
      border: 1px solid #edf2f7;
      background: #fff;
      width: 45%;
      padding: 0.75rem 0.88rem 0.75rem 0.88rem;
      .title {
        margin-top: 1.5rem;
        color: var(--Black-30, #8b8d97);
        font-feature-settings: "cv04" on, "cv03" on;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 145%; /* 1.0875rem */
        letter-spacing: -0.00375rem;
      }
      .numer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          color: var(--Black-60, #45464e);
          font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
          font-size: 1rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.5rem; /* 150% */
        }
      }
    }
    .details {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      .dx {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          display: flex;
          gap: 0.25rem;
          flex-direction: column;
          span {
            color: #475467;
            font-feature-settings: "cv04" on, "cv03" on;
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 500;
            line-height: 145%; /* 1.0875rem */
            letter-spacing: -0.00375rem;
          }
          .nm {
            color: var(--Grey-900, var(--text-style, #101928));
            font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 700;
            line-height: 1.25rem; /* 142.857% */
          }
          .nm {
            font-weight: 500;
          }
        }
      }
    }
  }
  .r-3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      color: var(--Grey-600, #475367);
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
    .btn button {
      background: #f32d2d;
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      gap: 0.625rem;
      border-radius: 0.375rem;
      p {
        color: var(--Neutrals-Colors-100, #fff);
        text-align: center;
        font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem; /* 142.857% */
      }
    }
  }
`;

interface ITabSwitchStyle extends ISelectedcompStyle {
  $tabIndex: number;
}
export const TabSwitchStyle = styled.div<ITabSwitchStyle>`
  position: relative;
  cursor: pointer;
  padding: 1rem 1rem 0.9375rem 1rem;
  p {
    color: var(--Grey-700, #344054);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
    text-align: center;
  }
  span {
    color: var(--Primary-Color, #00932e);
    text-align: center;
    font-feature-settings: "cv04" on, "cv03" on;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 145%; /* 1.0875rem */
    letter-spacing: -0.00375rem;
  }
  .no {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .num {
    border-radius: 0.625rem;
    background: #e7f6ec;
    padding: 0rem 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .underline {
    height: 0.0625rem;
    flex-shrink: 0;
    align-self: stretch;
    background: var(--Primary-Color, #00932e);
    width: 100%;
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      p,
      span {
        color: var(--Primary-Color, #00932e);
        font-weight: 700;
      }
    `}
  ${(props) =>
    props.$tabIndex == 2 &&
    props.$isSelected &&
    css`
      p,
      span {
        color: #fe764b;
      }
      .underline {
        background: #fe764b;
      }
      .num {
        background: #ffe5dd;
      }
    `}
`;

export const TableStyles = styled.table`
  border: 1px solid #e5e7eb;
  min-width: 100%;
  // width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  th {
    padding: 0.75rem 1.5rem;
  }
  thead {
    background: var(--Grey-50, #f9fafb);
    color: var(--Grey-700, #344054);
    text-align: center;
    font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem; /* 142.857% */
  }
  table-layout: fixed;
  border-collapse: collapse;
`;

export const TrStyles = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
  position: relative;
  td {
    padding: 0.5rem 0.75rem;
    height: 100%;
    text-overflow: ellipsis;
    min-height: 100px;
    overflow: hidden;
    text-align: center;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .address {
    text-align: center;
  }
  .drop {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
  }
  .absolute {
    position: absolute;
  }
`;

export interface IStatusStyles {
  $isActive: boolean;
}
export const StatusStyles = styled.div<IStatusStyles>`
  display: flex;
  padding: 0.125rem 0.75rem;
  justify-content: center;
  align-items: center;
  height: 1.75rem;
  border-radius: 0.75rem;
  background: var(--Success-50, #e7f6ec);
  width: fit-content;
  p {
    color: #00932e;
    line-height: 1.25rem; /* 142.857% */
    text-align: center;
    font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    white-space: nowrap;
  }
  ${(props) =>
    !props.$isActive &&
    css`
      background: #ffe5dd;
      p {
        color: #fe764b;
      }
    `}
`;

export const TableDropdownStyles = styled.div`
  .head {
    border-radius: 0.25rem;
    border: 1px solid var(--Grey-200, #e4e7ec);
    background: var(--Shade-White, #fff);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const DropdownOptionsStyle = styled.div`
  border-radius: 0.5rem;
  border: 1px solid var(--Secondary-Gray-2, #e0e2e7);
  background: var(--Primary-White, #fff);
  box-shadow: 0px 37px 44px 0px rgba(185, 185, 185, 0.1);
  position: absolute;
  z-index: 5;
  top: 80%;
  right: 0;
  padding: 1rem 0.5rem;
  margin-right: 0.4rem;
  .options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: none;
  }
`;

export const SortOptionsStyle = styled(DropdownOptionsStyle)`
  top: 120%;
  margin-right: 0rem;
  .options div{
    padding-right: 3.5rem;
    p{
      white-space: nowrap;
    }
  }
`;
export const CheckboxStyle = styled.div`
  // border: 2px solid #000;
  cursor: pointer;
  width: fit-content;
`;

export const ScrollableAbsCont = styled.div`
  position: absolute;
  top: 0;
  left 0;
  border: 2px solid red;
  width: 100vw;
  height: 100%;
`;
export const NewMdaAbsoluteStyles = styled(AbsoluteContStyle)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
  padding-bottom: 3rem;
  overflow: auto;
  .form {
    width: 60%;
  }
  .bd {
    border-radius: 0.625rem;
  }
  @media (max-width: 500px) {
    .form {
      width: 91%;
    }
  }
  @media (min-width: 998px) {
    .form {
      width: 40%;
    }
  }
`;

export const NewMdaFormStyles = styled(FormStyles)`
  padding: 2rem;
  .fl {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .form {
    width: 100%;
  }
`;
export const FlexAbsoluteModalStyles = styled(AbsoluteContStyle)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TwoButtonModalStyles = styled.div`
  width: 60%;
  .pop {
    border-radius: 1.25rem;
    background: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.59rem;
    .up {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    }
    .x {
      svg {
        cursor: pointer;
      }
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .l {
      display: flex;
      justify-content: center;
    }
    h4 {
      color: var(--Gray-900, #101828);
      font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
    p {
      color: var(--Gray-600, #475467);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .down {
    border-top: 1px solid #eaecf0;
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    display: flex;
    gap: 1.5rem;
    button {
      width: 100%;
      height: 3rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      background: #f32d2d;
      color: var(--Neutrals-Colors-100, #fff);
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 142.857% */
    }
    .cancel {
      color: #111;
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 142.857% */
      background: #fff;
      border: 1px solid #d0d5dd;
    }
  }
  @media (max-width: 500px) {
    width: 91%;
  }
  @media (min-width: 998px) {
    width: 35%;
  }
`;

interface IOneBtnStyle {
  $isError?: boolean;
}
export const OneButtonModalStyles = styled.div<IOneBtnStyle>`
  text-align: center;
  width: 60%;
  .pop {
    border-radius: 1.25rem;
    background: #fff;
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.59rem;
    .up {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .x {
      cursor: pointer;
    }
    .x,
    .l {
      display: flex;
      justify-content: right;
    }
    .l {
      justify-content: center;
    }
    h4 {
      color: var(--Gray-900, #101828);
      text-align: center;
      font-feature-settings: "cv01" on, "cv04" on, "cv03" on;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 133.333% */
    }
    p {
      color: var(--Gray-600, #475467);
      text-align: center;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .down {
    margin-top: 1.5rem;
    button {
      width: 100%;
      height: 3rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      background: #00932e;
      color: var(--Neutrals-Colors-100, #fff);
      text-align: center;
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  ${(props) =>
    props.$isError &&
    css`
      background: #f32d2d;
    `}
  @media (max-width: 500px) {
    width: 91%;
  }
  @media (min-width: 998px) {
    width: 35%;
  }
`;
export const ErrorIconWrapper = styled.div`
  border-radius: 1.75rem;
  border: 6px solid var(--Warning-50, #fffaeb);
  background: var(--Warning-100, #fef0c7);
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  display: flex;
`;

interface IMdaItemComp {
  $hasBorder?: boolean;
  $isSelected: boolean;
}
export const MdaItemCompStyles = styled.div<IMdaItemComp>`
  height: 2.5rem;
  padding: 0.5rem;
  cursor: pointer;
  padding-right: 7rem;
  p {
    color: var(--Primary-Black, #232325);
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem; /* 150% */
    text-align: left;
  }
  ${(props) =>
    !props.$hasBorder &&
    css`
      &:hover {
        border-radius: 0.3125rem;
        background: var(--Primary-Color, #00932e);
        p {
          color: var(--Neutrals-Colors-100, #fff);
        }
      }
    `}
  ${(props) =>
    props.$isSelected &&
    css`
      p {
        color: var(--Neutrals-Colors-100, #fff);
      }
      border-radius: 0.3125rem;
      background: var(--Primary-Color, #00932e);
    `}
  ${(props) =>
    props.$hasBorder &&
    css`
      border-top: 1px solid var(--Secondary-Gray-2, #e0e2e7);
      border-bottom: none;
      &:hover {
        background: #ffe5dd;
        box-shadow: 0px 1px 0px 0px #e0e2e7 inset;
      }
      padding-right: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        text-align: center;
        color: var(--Secondary-Red, #f32d2d);
      }
    `}
  ${(props) =>
    props.$hasBorder &&
    props.$isSelected &&
    css`
      background: #ffe5dd;
      box-shadow: 0px 1px 0px 0px #e0e2e7 inset;
    `}
`;

export const StatesDropdownStyles = styled.div`
  position: relative;
  z-index: 10;
  .head {
    border-radius: 0.375rem;
    border: 1px solid var(--Grey-300, #d0d5dd);
    background: var(--Shade-White, #fff);
    height: 3.5rem;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .placeholder {
    color: var(--Grey-400, #98a2b3);
    font-feature-settings: "cv04" on, "cv03" on;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 142.857% */
  }
  .state-name {
    color: var(--text-style, #101928);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
  .dropdown {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 130px;
    overflow-y: scroll;
    border-radius: 0.3125rem;
    border: 1px solid #e4e7ec;
    background: #fff;
    padding: 1rem 0.5rem 1rem 1rem;
  }
`;

export const StateCompStyles = styled.div<ISelectedcompStyle>`
  padding: 0.5rem;
  cursor: pointer;
  p {
    color: #000;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
  &:hover {
    border-radius: 0.125rem;
    background: var(--Primary-Color, #00932e);
    p {
      color: var(--Neutrals-Colors-100, #fff);
    }
  }

  ${(props) =>
    props.$isSelected &&
    css`
      border-radius: 0.125rem;
      background: var(--Primary-Color, #00932e);
      p {
        color: var(--Neutrals-Colors-100, #fff);
      }
    `}
`;
