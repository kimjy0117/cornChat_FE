import React from "react";
import styled from "styled-components";

const StyledSmallButton = styled.button`
    //레이아웃
    width: 27%;
    height: 40px;
    background-color: ${(props) => props.backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${(props) => props.margin};

    //폰트
    color: ${(props) => props.fontColor || "white"};
    font-weight: 800;
    font-size: 14px;

    //테두리
    border:none;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

    //효과
    cursor: pointer;

    /* hover 상태에서의 스타일 */
    &:hover {
        background-color: ${(props) => props.hoverColor || 'none'};
        color: ${(props) => props.hoverFontColor || 'none'};
    }
`;  

export function SmallButton(props){
    const {backgroundColor, fontColor, title, margin, onClick, disabled, hoverColor, hoverFontColor} = props;

    return <StyledSmallButton 
                backgroundColor={backgroundColor}
                fontColor={fontColor}
                margin={margin}
                onClick={onClick}
                disabled={disabled || false}
                hoverColor={hoverColor}
                hoverFontColor={hoverFontColor}
                >{title}
            </StyledSmallButton>
}