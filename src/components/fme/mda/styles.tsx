import { ISelectedcompStyle } from "@/components/icons/header";
import styled, { css } from "styled-components";

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
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const WhiteContainer = styled.div`
  border-radius: 0.625rem;
  background: #fff;
  padding: 1.75rem 0rem 2.13rem 0rem;
  margin-top: 1.56rem;
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
`;

export const SearchAndResultStyle = styled.div`
  border: 2px solid #000;
  margin-top: 2.13rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .searchbar {
    padding: 0rem 2.88rem 0rem 3rem;
    display: flex;
    gap: 1.8rem;
    align-items: center;
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
      width: 20%;
      border-radius: 0.5rem;
      border: 1px solid #e4e7ec;
      background: #fff;
      height: 3rem;
      gap: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        height: 100%;
        width: fit-content;
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
      }
    }
  }
  .pad {
    padding: 0rem 1rem;
  }
  .options {
    border-bottom: 1px solid #e4e7ec;
    display: flex;
  }
`;

interface ITabSwitchStyle extends ISelectedcompStyle {
  $tabIndex: number;
}
export const TabSwitchStyle = styled.div<ITabSwitchStyle>`
  color: var(--Grey-700, #344054);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 142.857% */
  padding: 1rem 1rem 0.9375rem 1rem;
  text-align: center;
  position: relative;
  cursor: pointer;
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
      color: var(--Primary-Color, #00932e);
      font-weight: 700;
    `}
  ${(props) =>
    props.$tabIndex == 2 &&
    props.$isSelected &&
    css`
      color: #fe764b;
      .underline {
        background: #fe764b;
      }
    `}
`;

export const TableStyles = styled.table`
  border: 1px solid #E5E7EB;
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  th{
    padding: 0.75rem 1.5rem;
  }
  thead{
    background: var(--Grey-50, #F9FAFB);
  }
  .flex{
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  tr{
    border-bottom: 1px solid #E5E7EB;
  }
  tbody td{
    padding: 1rem 1.5rem;
    border: 2px solid #000;
    height: 100%;
    text-overflow: ellipsis;
  }
  td{
    text-overflow: ellipsis; 
    overflow: hidden;
  }
  .address{
    text-align: center;
  }
  .drop{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  table-layout: fixed;
`;
interface IStatusStyles {
  $isActive: boolean;
}
export const StatusStyles = styled.div<IStatusStyles>`
  display: flex;
  padding: 0.125rem 0.75rem;
  justify-content: center;
  align-items: center;
  color: var(--Success-500, #099137);
  text-align: center;
  font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  height: 1.75rem;
  line-height: 1.25rem; /* 142.857% */
  border-radius: 0.75rem;
  background: var(--Success-50, #e7f6ec);
  width: fit-content;
  white-space: nowrap;
  ${(props) =>
    !props.$isActive &&
    css`
      background: #ffe5dd;
      color: #fe764b;
    `}
`;

export const TableDropdownStyles = styled.div`
  position: relative;
  .head {
    border-radius: 0.25rem;
    border: 1px solid var(--Grey-200, #e4e7ec);
    background: var(--Shade-White, #fff);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CheckboxStyle = styled.div`
  border: 2px solid #000;
  cursor: pointer;
  width: fit-content;
`