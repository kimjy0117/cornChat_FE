import React from "react";
import styled from "styled-components";

const StyledLargeButton = styled.button`
    //레이아웃
    width: 335px;
    height: 50px;
    background-color: ${(props) => props.$backgroundColor};

    //폰트
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.$fontColor};
    font-weight: medium;
    font-size: 24px;

    //테두리
    border:none;
    border-radius: 20px;
    box-shadow: 2px 2px 2px grey;

    //효과
    cursor: pointer;
`;

export function LargeButton(props){
    const {backgroundColor, fontColor, title, onClick} = props;

    return <StyledLargeButton 
            $backgroundColor={backgroundColor}
            $fontColor={fontColor}
            onClick={onClick}>{title}</StyledLargeButton>
}