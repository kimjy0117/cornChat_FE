import LoginArea from "../../components/login/LoginArea";
import Header from "../../components/Header";
import styled from "styled-components";
import { BackgroundStyle } from "../../components/BackgroundStyle";

const LoginLayout = styled.div`
    width: 100%;
    min-height: 90vh - 2%; /* 화면 높이에 맞게 조정 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleStyle = styled.span`
    text-align: center;
    font-size: 2.5rem;
    font-weight: 800;
    color: #ff5900;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    margin-bottom: 15px;
`;

export default function Login(){
    return(
        <>
            <BackgroundStyle/>
            <Header/>
            <LoginLayout>
                <TitleStyle>
                    언제 어디서나 채팅을<br/>간편하게!
                </TitleStyle>
                <LoginArea/>
            </LoginLayout>
        </>
    );
}