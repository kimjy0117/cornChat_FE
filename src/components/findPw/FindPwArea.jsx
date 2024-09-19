import styled from "styled-components";
import EmailForm from "./EmailForm";
import CertificationForm from "./CertificationForm";

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

const FindPwLogo = styled.div`
    //레이아웃
    width: 100%;
    text-align: left;
    margin-bottom: 15px;

    //폰트
    font-size: 30px;
    font-weight: 600;
    color: black;
`;

const FindPwNotice = styled(FindPwLogo)`
    //레이아웃
    margin: 0 0 60px 5px;

    //폰트
    font-size: 15px;
    font-weight: 700;
`;

export default function FindPwArea(){
    return(
        <FindPwAreaStyle>
            <div className="findPwBoxLayout">
                {/* 상단영역 */}
                <FindPwLogo>
                    <span>비밀번호를 잊으셨나요?</span>
                </FindPwLogo>
                <FindPwNotice>
                    <span>본인인증을 위해 이메일 인증을 해주세요.</span>
                </FindPwNotice>

                {/* form영역 */}
                <EmailForm/>
                <CertificationForm/>
                
            </div>
        </FindPwAreaStyle>

    );
}