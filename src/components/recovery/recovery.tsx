import React from "react";
import { ArrowLeft } from "../icons/recovery";
import { BackBtnStyles } from "./style";


interface IBackBtn{
    backFunction : () => void;
}

export const BackBtn:React.FC<IBackBtn> = ({backFunction}) => {
    return (
        <BackBtnStyles onClick={backFunction}>
            <ArrowLeft />
            <p>Back</p>
        </BackBtnStyles>
      );
}
 