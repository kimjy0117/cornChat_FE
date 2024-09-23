import styled from "styled-components";
import EmailForm from "./EmailForm";
import { useState } from "react";
import FindPwAreaTop from "./FindPwAreaTop";
import ResetPwForm from "./ResetPwForm";

const FindPwAreaStyle = styled.div`
    //레이아웃
    width: 470px;
    height: 520px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    //스타일
    background-color: #ededeb;

    //테두리
    border:none;
    border-radius: 40px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

    & .findPwBoxLayout{
        //레이아웃
        width: 85%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 9%;
    }
`;

export default function FindPwArea(){
    //이메일 인증 여부
    const [isVerified, setIsVerified] = useState(false);

    return(
        <FindPwAreaStyle>
            <div className="findPwBoxLayout">
                {/* 상단영역 */}
                <FindPwAreaTop />

                {/* 이메일 인증 성공 여부에 따라 다른 폼 렌더링 */}
                {isVerified ? <ResetPwForm /> : <EmailForm onVerificationSuccess={() => setIsVerified(true)} />}
                
            </div>
        </FindPwAreaStyle>

    );
}