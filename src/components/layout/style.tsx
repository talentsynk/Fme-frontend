import styled from "styled-components";

export const GenericDashboardLayoutStyle = styled.main`
  @media (max-width: 767px) {
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
    background: #E5E7EB; /* color of the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #E7F6EC; /* color of the thumb on hover */
  }
  @media (min-width: 767px) {
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
      // border: 2px solid #000;
      grid-row: 2/3;
      padding: 1.5rem 1.5rem 3rem 1.35rem;
      max-height: fit-content;
      background: #f9fafb;
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
    .cont{
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
    .cont{
      justify-content: flex-end;
      gap: 3.375rem;
    }
    .main {
      // border: 2px solid #000;
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
