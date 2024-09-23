import { BackgroundStyle } from "../../components/BackgroundStyle";
import Header from "../../components/Header";
import styled from "styled-components";
import SignUpCompleteArea from "../../components/signUp/SignUpCompleteArea";

const SignUpLayout = styled.div`
    //레이아웃
    width: 100%;
    min-height: 90vh - 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function SignUpComplete(){
    return(
        <>
            <BackgroundStyle/>
            <Header/>
            <SignUpLayout>
                <SignUpCompleteArea/>
            </SignUpLayout>
        </>
    )
}