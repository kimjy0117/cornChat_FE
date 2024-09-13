import { createGlobalStyle } from "styled-components"
import backgroundImg from "../assets/globalImages/backgroundImg2.png"

export const BackgroundStyle = createGlobalStyle`
    body{
        background-image: url(${backgroundImg});
        background-size: cover;
        background-position: center;
        margin: 0;
        padding: 0;
        height: 100vh;
    }
`