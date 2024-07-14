import styled from "styled-components";

export const BannerStyle = styled.div`
  height: 40vh;
  background: var(--Primary-Color, #00932e);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .one {
    display: flex;
    gap: 1rem;
    align-items: center;
    h2 {
      color: var(--Neutrals-Colors-100, #fff);
      font-size: 2.75rem;
      font-style: normal;
      font-weight: 700;
      line-height: 3rem; /* 109.091% */
      letter-spacing: -0.055rem;
    }
  }
  p {
    color: var(--Neutrals-Colors-100, #fff);
    text-align: center;
    font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }
  @media (max-width: 500px) {
    .one {
      h2 {
        font-size: 1.5rem;
      }
    }
    p {
      width: 75%;
    }
  }
`;
