import React from "react";
import { ArrowLeft } from "../icons/recovery";
import { BackBtnStyles } from "./style";


interface IBackBtn{
    backFunction : () => void;
    text ?: string;
}

export const BackBtn:React.FC<IBackBtn> = ({backFunction, text}) => {
    return (
        <BackBtnStyles onClick={backFunction}>
            <ArrowLeft />
            <p>{text ? text : "Back"}</p>
        </BackBtnStyles>
      );
}