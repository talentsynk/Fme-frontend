import styled from "styled-components";

export const RecoveryPageStyles = styled.div`
  border: 2px solid #000;
  width: 100%;
  .head{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items :center;
  }
  background: #e7f6ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form{
    width: 50%;
    border: 2px solid #000;
  }
  @media (max-width: 500px) {
    .form{
        width: 100%;
    }
  }
`;

export const CoatOfArm = styled.div`
  border: 2px solid #000;
  img {
    width: 5rem;
    height: 5rem;
  }
  @media (max-width: 998px) {
    img {
      width: 3.8125rem;
      height: 2.875rem;
    }
  }
`;

export const CoderinaLogo = styled.div`
  border: 2px solid #000;
  @media (max-width: 998px) {
    img {
      width: 116px;
      height: 25px;
    }
  }
`;
export const FormStyles = styled.div`
  border: 2px solid #000;
  padding: 2.5rem 2rem;
  width: 100%;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0px 5px 3px -2px rgba(235, 80, 23, 0.02);

  display: flex;
  flex-direction: column;
  gap: 2rem;
  .form-input {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .inp {
    position: relative;
    border: 2px solid #000;
    input {
      border-radius: 0.375rem;
      border: 1px solid #d0d5dd;
      background: var(--Shade-White, #fff);
      height: 3rem;
      padding: 1rem;
      padding-right: 2rem;
      width: 100%;
    }
  }
  .abs{
    position: absolute;
    right: 0.4rem;
    top: 1rem;
  }
  .btn {
    margin-top: 2rem;
    button {
      border-radius: 0.625rem;
      background: #00932e;
      height: 3rem;
      color: var(
        --color-set-type-white-primary,
        var(--Neutrals-Colors-100, #fff)
      );
      text-align: center;
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1rem;
      width: 100%;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
    }
  }
  .form-ele {
    p {
      font-family: "Satoshi Variable";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
      margin-top: 0.25rem;
    }
  }
  .error-msg {
    color: var(--Error-500, #cb1a14);
  }
  .correct {
    color: var(--Success-600, #04802e);
  }
  .pc {
    display: flex;
    align-items: center;
    border: 2px solid #000;
    p {
      color: #000;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 133.333% */
    }
  }
  @media (max-width: 998px) {
    gap: 1.5rem;
    .form-input {
      gap: 125rem;
    }
    .btn {
      margin-top: 1.8rem;
    }
  }
  @media (max-width: 500px) {
    padding: 2rem 1.1875rem 2.125rem 1.3125rem;
    .form-input {
      gap: 1rem;
    }
    .btn {
      margin-top: 1.5rem;
    }
  }
`;
