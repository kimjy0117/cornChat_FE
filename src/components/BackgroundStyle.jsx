import { createGlobalStyle } from "styled-components"
import backgroundImg from "../assets/globalImages/backgroundImg2.png"

export const BackgroundStyle = createGlobalStyle`
    body{
        //배경 스타일
        background-image: ${(props)=>props.backgroundColor ? "none" : `url(${backgroundImg})` };
        background-size: ${(props)=>props.backgroundColor ? "none" : 'cover' };
        background-position: ${(props)=>props.backgroundColor ? "none" : 'center' };
        background-color: ${(props)=>props.backgroundColor || "none"};

        //배경 레이아웃
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
    }

    #root{
        width: 100%;
        height: 100vh;
    }
`;