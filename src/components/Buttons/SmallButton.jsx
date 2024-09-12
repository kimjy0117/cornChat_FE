import React from "react";
import styled from "styled-components";

const StyledSmallButton = styled.button`
    //레이아웃
    width: 100px;
    height: 46px;
    background-color: ${(props) => props.$backgroundColor};

    //폰트
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.$fontColor};
    font-weight: bold;
    font-size: 15px;

    //테두리
    border:none;
    border-radius: 10px;
    box-shadow: 2px 2px 2px grey;

    //효과
    cursor: pointer;
`;

export function SmallButton(props){
    const {backgroundColor, fontColor, title, onClick} = props;

    return <StyledSmallButton 
            $backgroundColor={backgroundColor}
            $fontColor={fontColor}
            onClick={onClick}>{title}</StyledSmallButton>
}