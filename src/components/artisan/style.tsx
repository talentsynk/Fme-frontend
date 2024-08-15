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

export const JobCompStyles = styled.div`
  border-radius: 1rem;
  border: 1px solid #f0f0f0;
  background: #fff;
  padding: 1.5rem 0.75rem 0.75rem 0.75rem;
  .sec {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .v {
      display: flex;
      gap: 1rem;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bg {
      display: flex;
      border-radius: 0.25rem;
      background: #f5f5f5;
      align-items: center;
      width: fit-content;
      height: 1.5rem;
      gap: 0.375rem;
      padding: 0.5rem 0.5rem;
    }
    button {
      border-radius: 0.375rem;
      background: var(--Primary-Color, #00932e);
      color: var(--Shade-White, var(--Neutrals-Colors-100, #fff));
      text-align: center;
      height: 2.25rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
  }
`;

export const TinyBriefcaseBg = styled.div`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.3125rem;
  background: #e7f6ec;
`;
