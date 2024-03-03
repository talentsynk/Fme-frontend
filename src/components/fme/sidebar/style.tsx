import styled, { css } from "styled-components";

export const SidebarStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0rem;
  border-radius: 0.75rem 0rem 0rem 0.75rem;
  border-right: 1px solid var(--Grey-200, #e4e7ec);
  background: var(--Shade-White, #fff);
  height: 100%;
  .lg {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    justify-content: center;
    padding: 0rem 1.5rem;
  }
  .lg p {
    color: var(--Primary-Color, #00932e);
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 150% */
  }
  .btm {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .links {
    margin-top: 0.75rem;
  }
  .links,
  .btm-links,
  .org {
    padding: 0rem 0.5rem;
  }
  .org {
    display: flex;
    gap: 0.75rem;
    p {
      color: #000;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 133.333% */
    }
  }
  .logout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem 0.75rem 0.5rem;
    .one {
      display: flex;
      gap: 0.75rem;
    }
  }
  .text {
    p {
      color: var(--Grey-900, var(--text-style, #101928));
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.25rem; /* 142.857% */
    }
    span {
      color: var(--Grey-600, #475367);
      font-feature-settings: "cv04" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  .two svg{
    cursor: pointer;
  }
`;
export interface ILinkcompStyle {
  $isSelected: boolean;
}
export const LinkCompStyles = styled.div<ILinkcompStyle>`
  cursor: pointer;
  // &:hover{
  //   background: #E7F6EC;
  // }
  .li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  border-radius: 0.25rem;
  transition: 0.35s;
  padding: 0.75rem 1rem;
  align-self: stretch;
  p {
    color: var(--text-style, #101928);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 142.857% */
    transition: 0.25s;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      background: #e7f6ec;
      transition: 0.35s;
      p{
        color: var(--Primary-Color, #00932e);
        transition: 0.25s;
      }
    `}
`;
