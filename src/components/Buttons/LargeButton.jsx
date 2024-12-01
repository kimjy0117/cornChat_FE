import React from "react";
import styled from "styled-components";

const StyledLargeButton = styled.button`
    //레이아웃
    width: 100%;
    height: 45px;
    margin: ${(props) => props.margin || "0"};

    //스타일
    background-color: ${(props) => props.backgroundColor || "grey"};

    //폰트
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.fontColor || "black"};
    font-weight: medium;
    font-size: 24px;

    //테두리
    border:none;
    border-radius: 20px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

    //효과
    cursor: pointer;

    /* hover 상태에서의 스타일 */
    &:hover {
        background-color: ${(props) => props.hoverColor || 'none'};
        color: ${(props) => props.hoverFontColor || 'none'};
    }
`;

export function LargeButton(props){
    const {backgroundColor, fontColor, title, margin, onClick, disabled, hoverColor, hoverFontColor} = props;

    return <StyledLargeButton 
            backgroundColor={backgroundColor}
            fontColor={fontColor}
            margin={margin}
            onClick={onClick}
            disabled={disabled || false}
            hoverColor={hoverColor}
            hoverFontColor={hoverFontColor}
            >{title}
            </StyledLargeButton>
}