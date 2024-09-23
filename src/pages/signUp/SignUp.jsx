import { BackgroundStyle } from "../../components/BackgroundStyle";
import Header from "../../components/Header";
import styled from "styled-components";
import SignUpArea from "../../components/signUp/signUpArea";

const SignUpLayout = styled.div`
    //레이아웃
    width: 100%;
    min-height: 90vh - 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    //스타일
    background-color:#fffdea;
`;

export default function SignUp(){
    return(
        <>
            <BackgroundStyle 
                backgroundColor="#fffdea"
            />
            <Header/>
            <SignUpLayout>
                <SignUpArea/>
            </SignUpLayout>
        </>
    )
}