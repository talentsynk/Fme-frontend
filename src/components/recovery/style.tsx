import { Rotate } from "@/animations/button";
import styled, { css } from "styled-components";

export const BackBtnStyles = styled.button`
  border-radius: 1.25rem;
  border: 1px solid #ebedf4;
  display: flex;
  align-items: center;
  height: 2.625rem;
  justify-content: center;
  background: transparent;
  width: 7.8125rem;
  gap: 0.625rem;
  p {
    color: #768396;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; /* 142.857% */
  }
`;

interface IError {
  $isError ?: boolean;
}
export const OtpCompStyles = styled.div<IError>`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    height: 3.25rem;
    width: 3.25rem;
    color: #5d648a;
    border-radius: 1rem;
    border: 1px solid #D0D5DD;
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    background: transparent;
    font-weight: 700;
    line-height: 1.75rem; /* 116.667% */
  }
  ${props => props.$isError && css`
    input{
      border: 1px solid #EB5017;
    }
  `}
  input:focus{
    background: var(--Primary-Color, #00932E);
  }
  input::placeholder{
    text-align: center;
    font-size: 1.8rem;
    line-height: 1.75rem; /* 116.667% */
    font-style: normal;
  }
  div {
    display: flex;
    gap: 1rem;
  }
`;

export const ButtonLoader = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-top: 4px solid transparent;
  margin: auto;
  animation: ${Rotate} 0.6s ease infinite;
`;