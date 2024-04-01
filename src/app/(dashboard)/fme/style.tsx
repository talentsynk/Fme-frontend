import styled from "styled-components";

export const FMEHomeStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1.1875rem;
  row-gap: 1.25rem;
  .total {
    height: 9.0625rem;
    background: #fff;
    border-radius: 0.75rem;
    padding: 0.6875rem 0.9375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      color: var(--Black-30, #8b8d97);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h3 {
        color: var(--Black-60, #45464e);
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
  .summary {
    grid-column: 1/4;
    background: #fff;
    display: flex;
    gap: 2.25rem;
    padding: 0.9375rem 1.25rem;
    flex-direction: column;
    h4 {
      color: var(--Black-60, #45464e);
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
    .head {
      display: flex;
      gap: 1.3125rem;
      align-items: center;
    }
    .dd-head {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 1.25rem;
      padding: 0.3125rem 0.5rem 0.3125rem 0.75rem;
      border-radius: 0.5rem;
      background: #e7f6ec;
      p {
        color: var(--Primary-Color, #00932e);
        font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.25rem; /* 142.857% */
      }
    }
    .dropdown {
      position: relative;
    }
    .options {
      position: absolute;
      margin-top: 0.45rem;
      border: 2px solid #000;
      width: 100%;
    }
  }
  .marketing {
    grid-column: 1/2;
    background: #fff;
  }
  .track {
    grid-column: 2/4;
    background: #fff;
  }
`;
