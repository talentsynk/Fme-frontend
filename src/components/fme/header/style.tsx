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
  border: 2px solid #000;
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
