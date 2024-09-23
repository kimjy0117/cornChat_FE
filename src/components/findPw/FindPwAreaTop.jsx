import styled from "styled-components";

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

export default function FindPwAreaTop(){
    return(
        <>
            <FindPwLogo>
                <span>비밀번호를 잊으셨나요?</span>
            </FindPwLogo>
            <FindPwNotice>
                <span>본인인증을 위해 이메일 인증을 해주세요.</span>
            </FindPwNotice>
        </>
        
    )
}