import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LargeButton from "../buttons/LargeButton";
import Form from "./Form";

const LoginAreaStyle = styled.div`
    //배경
    background-color: rgba(0, 0, 0, 0.7);

    //영역 크기
    width: 370px;
    height: 410px;

    //레이아웃
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    //테두리
    border: none;
    border-radius: 30px;
    box-shadow: 0px 3px 3px grey;

    & .loginBoxLayout{
        margin: 10px 30px 20px 30px;
    }
`;

const LoginLogo = styled.div`
    //레이아웃
    display: flex;
    justify-content: flex-start;
    /* margin-bottom: 30px; */

    //폰트
    font-size: 30px;
    font-weight: 800;
    color: white;
    border: none;
`;

const FindPwLink = styled.div`
    //레이아웃
    display: flex;
    justify-content: center;

    //폰트
    font-size: 13px;
    font-weight: 400;
    color: white;

    //효과
    cursor: pointer;
`;


export default function LoginArea(){
    const navigate = useNavigate();
    
    return(
        <LoginAreaStyle>
            <div className="loginBoxLayout">
                <LoginLogo>
                    <span>로그인</span>
                </LoginLogo>

                {/* form영역 */}
                <Form/>

                {/* 버튼 영역 */}
                <LargeButton 
                    backgroundColor="#83817d"
                    fontColor="black"
                    hoverColor="#A3A19A"
                    title="회원가입"
                    margin="0 0 10px 0"
                    onClick={()=>{navigate("/signUp");}}
                />

                {/* 비밀번호 찾기 링크 */}
                <FindPwLink onClick={()=>{navigate("/findPw");}}>
                    <span>비밀번호를 잊으셨나요?</span>
                </FindPwLink>
            </div>
        </LoginAreaStyle>
    );
}