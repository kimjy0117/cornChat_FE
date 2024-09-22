import styled from "styled-components";
import { useState } from "react";
import SignUpForm from "./SignUpForm";

const SignUpAreaStyle = styled.div`
    //레이아웃
    width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleStyle = styled.div`
    //레이아웃
    width: 100%;
    margin: 20px 0 50px 0;

    //스타일
    font-size: 30px;
    font-weight: 800;

`;

export default function SignUpArea(){
    return(
        <SignUpAreaStyle>
                <TitleStyle>
                    <span>회원가입</span>
                </TitleStyle>
            <SignUpForm/>

        </SignUpAreaStyle>
    )
}