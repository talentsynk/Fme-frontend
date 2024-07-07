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

export const UserDashboardHeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  .desktop-links {
    display: flex;
    align-item: center;
    gap: 1.5rem;
  }
  .desktop-menu,
  .one {
    cursor: pointer;
    display: flex;
    align-item: center;
    gap: 1.5rem;
  }
  .circle {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 12.5rem;
    border: 1.5px solid var(--Neutrals-Colors-100, #fff);
    background: #e7f6ec;
    p {
      color: var(--Grey-900, var(--text-style, #101928));
      text-align: center;
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.25rem; /* 142.857% */
    }
    .gre {
      border-radius: 0.625rem;
      border: 1.5px solid #fff;
      background: var(--Success-600, #04802e);
      width: 0.85rem;
      height: 0.85rem;
      flex-shrink: 0;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .text {
    h3 {
      color: #1a1a1a;
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem; /* 150% */
    }
    p {
      color: var(--Black-30, #8b8d97);
      font-feature-settings: "cv04" on, "cv03" on;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
    }
  }
  .desktop-menu {
    position: relative;
    .dropdown {
      position: absolute;
      top: 120%;
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
  }
  .one {
    gap: 1rem;
  }
  .mobile-dropdown {
    position: absolute;
  }
  .menu {
    cursor: pointer;
    svg {
      scale: 1.25;
    }
    .scale {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      svg {
        scale: 1.8;
      }
    }
  }
  @media (max-width: 900px) {
    // margin-bottom: 0.75rem;
    padding: 0.75rem 0.95rem 0.75rem 0.5rem;
    position: relative;
    .desktop {
      display: none;
    }
    .mobile-dropdown {
      background: #fff;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
        0px 8px 8px -4px rgba(16, 24, 40, 0.04);
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      .m-links,
      .x-one {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .x-one {
        padding: 1.5rem 1.47rem 1.47rem 1.47rem;
        border-bottom: 2px solid #ebedef;
      }
      .x-two {
        padding: 0rem 1.47rem 1.47rem 1.47rem;
        display: flex;
        flex-direction: column;
        gap: 1.47rem;
        .avatar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .bb {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
      }
      .post {
        button {
          border-radius: 0.375rem;
          background: var(--Primary-Color, #00932e);
          display: flex;
          padding: 0.5rem 0.75rem;
          justify-content: center;
          align-items: center;
          gap: 0.625rem;
          p {
            color: var(--Shade-White, var(--Neutrals-Colors-100, #fff));
            text-align: center;
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 500;
            line-height: 1.25rem; /* 142.857% */
          }
        }
      }
    }
  }
  @media (min-width: 900px) {
    padding: 3rem;
    // margin-bottom: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    .mobile {
      display: none;
    }
  }
`;
export const CalendarComponentStyle = styled.div`
  // border: 2px solid #000;
  @media (max-width: 767px) {
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
        background: #e7f6ec;
      }
      .react-calendar__tile--active {
        background: #00932e;
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
    gap: 0.25rem;
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

interface ILinkItemStyle {
  $isSelected: boolean;
}
export const LinkItemStyle = styled.div<ILinkItemStyle>`
  p {
    color: #979797;
    font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem; /* 142.857% */
  }
  cursor: pointer;
  .btl {
    border-radius: 0.5rem;
    background: var(--Primary-Color, #00932e);
    width: 100%;
    height: 0.25rem;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      p {
        color: #00932e;
      }
    `}
`;
