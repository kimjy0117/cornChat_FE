import { BackgroundStyle } from "../../components/BackgroundStyle";
import Header from "../../components/Header";
import styled from "styled-components";
import FindPwCompleteArea from "../../components/findPw/FindPwCompleteArea";

const FindPwLayout = styled.div`
    width: 100%;
    min-height: 90vh - 2%; /* 화면 높이에 맞게 조정 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function FindPwComplete(){
    return(
        <>
            <BackgroundStyle/>
            <Header/>
            <FindPwLayout>
                <FindPwCompleteArea/>
            </FindPwLayout>
        </>
    )
}