import styled from "styled-components";

export const RecoveryPageStyles = styled.div`
  width: 100%;
  min-height: 100vh;
  .head {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  background: #e7f6ec;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .form {
    width: 60%;
  }
  .flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    p {
      color: #000;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 133.333% */
    }
  }
  @media (max-width: 500px) {
    .form {
      width: 91%;
    }
  }
  @media (min-width: 998px) {
    .form {
      width: 35%;
    }
    padding-top: 2rem;
    padding-bottom: 2rem;
    .flex {
      margin-top: 5%;
    }
  }
`;

export const NewPwdpageStyles = styled(RecoveryPageStyles)`
@media (max-width: 500px) {
   background: url("/public/images/recovery/mobile-bg.svg);
}

`
export const CoatOfArm = styled.div`
  img {
    width: 5rem;
    height: 5rem;
  }
  @media (max-width: 998px) {
    img {
      width: 3.8125rem;
      height: 3.875rem;
    }
  }
`;

export const CoderinaLogo = styled.div`
  @media (max-width: 998px) {
    img {
      width: 116px;
      height: 25px;
    }
  }
`;

export const FormStyles = styled.div`
  padding: 2.5rem 2rem;
  width: 100%;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0px 5px 3px -2px rgba(235, 80, 23, 0.02);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button:disabled {
    opacity: 0.6; /* Reduce opacity to indicate disabled state */
    cursor: not-allowed; /* Change cursor to indicate unclickable */
  }

  .form-input {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .form-head {
    h3 {
      color: #000;
      font-feature-settings: "cv04" on, "cv03" on, "cv01" on;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; /* 133.333% */
      letter-spacing: -0.03rem;
    }
    p {
      color: var(--Office-Brown-700, #645d5d);
      font-feature-settings: "cv04" on, "cv03" on;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 145%; /* 1.0875rem */
      letter-spacing: -0.00375rem;
      margin-top: 0.25rem;
    }
  }
  .inp {
    position: relative;
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
  input:active,
  input:focus {
    border: 1px solid var(--Primary-Color, #00932e);
  }
  .abs {
    position: absolute;
    right: 0.4rem;
    top: 0.95rem;
    height: fit-content;
    svg {
      cursor: pointer;
    }
  }
  .def{
    display: flex;
    align-items: center;
    svg{
      scale: 0.9;
    }
  }
  .btn, .btn-m {
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
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    label {
      color: var(--Grey-900, var(--text-style, #101928));
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    p {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  input[type="password"] {
    color: var(--Grey-900, var(--text-style, #101928));
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
  input[type="password"]::placeholder {
    color: var(--Grey-400, #98a2b3);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
  .error-msg {
    color: var(--Error-500, #cb1a14);
  }
  .correct {
    color: var(--Success-600, #04802e);
  }
  .center {
    text-align: center;
  }
  .inp {
    .error-bdr {
      border: 1px solid #eb5017;
    }
  }

  .btm {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    p {
      color: var(--Office-Brown-800, #514a4a);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem; /* 142.857% */
    }
    button {
      border-radius: 0.375rem;
      background: #e7f6ec;
      height: 1.875rem;
      padding: 0rem 0.625rem;
      color: var(--Primary-Color, #00932e);
      text-align: center;
      font-feature-settings: "cv04" on, "cv01" on, "cv03" on;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem; /* 142.857% */
    }
  }
  @media (max-width: 998px) {
    gap: 1.5rem;
    .form-input {
      gap: 1.25rem;
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


export const ImprovisedStyle = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .btn{
    width: 100%;
    margin-top: 0rem;
  }
  .form-head{
    p{
      font-weight: 400;
    }
  }
  @media (min-width: 998px){
    .image{
      img{
        width: 14.5rem;
        height: 10.4375rem;
      }
    }
  }
`
