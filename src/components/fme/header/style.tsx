import styled, { css } from "styled-components";
import { ILinkcompStyle } from "../sidebar/style";

export const DashboardHeaderStyle = styled.header`
  height: 100%;
  padding: 0.5rem 3rem 0.75rem 0rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .two {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  .one h3 {
    color: var(--Gray-900, #101828);
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem; /* 133.333% */
    letter-spacing: -0.03rem;
  }
  .one p {
    color: var(--Gray-500, #667085);
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }
  .img {
    cursor: pointer;
  }
  .pfp {
    position: relative;
  }
  .dropdown {
    position: absolute;
    top: 75%;
    display: flex;
    gap: 0.75rem;
    flex-direction: column;
    background: #fff;
    z-index: 5;
    right: 0;
    padding: 0.75rem 0.75rem 0.75rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--Secondary-Gray-2, #e0e2e7);
    background: #fff;
    transition: 0.35s;
    /* style */
    box-shadow: 0px 37px 44px 0px rgba(185, 185, 185, 0.1);
  }
`;

export const CalendarComponentStyle = styled.div`
  // border: 2px solid #000;
  @media (max-width: 767px){
    display: none;
  }
  z-index: 5;
  position: relative;
  .calendar {
    position: absolute;
    right: 0;
    top: 750%;
    width: 100%;
    .react-calendar {
      border-radius: 0.5rem;
      border: 1px solid var(--Secondary-Gray-2, #e0e2e7);
      background: #fff;
      transition: 0.25s;
      abbr[title] {
        text-decoration: none;
       }
      /* style */
      box-shadow: 0px 37px 44px 0px rgba(185, 185, 185, 0.1);
      .react-calendar__tile--now {
        background: #E7F6EC;
      }
      .react-calendar__tile--active{
        background: #00932E;
        color: #fff;
        font-weight: 700;
        border-radius: 0.25rem;
      }
    }

  }
  .x {
    position: relative;
  }
  .calendar-dd {
    position: absolute;
    width: 100%;
    transition: 0.25s;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    box-shadow: 0px 37px 44px 0px rgba(185, 185, 185, 0.1);
    border-radius: 0.5rem;
    border: 1px solid #e0e2e7;
    background: #fff;
    .pick-date {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      .st {
        color: var(--Grey-900, var(--text-style, #101928));
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.25rem; /* 142.857% */
      }
    }
    .select {
      cursor: pointer;
      border-radius: 0.375rem;
      display: flex;
      background: var(--Shade-White, #fff);
      width: 100%;
      border: 2px solid #000;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid var(--Grey-300, #d0d5dd);
      background: var(--Shade-White, #fff);
      p {
        color: var(--Grey-900, var(--text-style, #101928));
        font-feature-settings: "cv04" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem; /* 142.857% */
      }
    }
    .btn {
      width: 100%;
      margin-top: 0.5rem;
      button {
        width: 100%;
        height: 3rem;
        border-radius: 0.625rem;
        background: #00932e;
        color: var(
          --color-set-type-white-primary,
          var(--Neutrals-Colors-100, #fff)
        );
        text-align: center;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; /* 150% */
      }
    }
  }
  .head {
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e0e2e7;
    display: flex;
    padding: 0.5rem 0.625rem;
    align-items: center;
    cursor: pointer;
    .date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      p {
        color: var(--Grey-700, #344054);
        text-align: center;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem; /* 142.857% */
      }
    }
  }
`;

interface IDesktopDropdownLinkStyle extends ILinkcompStyle {
  activebg: string;
  activetextcolor?: string;
  textcolor: string;
}
export const DesktopDropdownLinkStyle = styled.div<IDesktopDropdownLinkStyle>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.75rem;
  width: 100%;
  transition: 0.35s;
  p {
    white-space: nowrap;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
    color: ${(props) => props.textcolor};
    transition: 0.25s;
  }
  border-radius: 0.3125rem;
  padding: 0.5rem;
  padding-right: 4rem;
  ${(props) =>
    props.$isSelected &&
    css`
      background: ${props.activebg};
      transition: 0.35s;
      p {
        color: ${props.activetextcolor
          ? props.activetextcolor
          : props.textcolor};
        transition: 0.25s;
      }
    `}
`;
