import styled from "styled-components";

export const ArtisanJobPageStyle = styled.div`
  .cont {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .tabs {
    .options {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #ebedef;
    }
  }
  .jobs {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .head {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      h2 {
        color: var(--Foundation-Black-black-10, #2f2f2f);
        font-feature-settings: "cv01" on, "cv03" on, "cv04" on;
        font-size: 2rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2.5rem; /* 125% */
        letter-spacing: -0.04rem;
      }
    }
  }
  @media (max-width: 500px) {
    .head {
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export const JobGridList = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  row-gap: 1.5rem;
  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
    gap: 0.75rem;
  }
  @media (min-width: 998px) {
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  }
`;
