import styled from "styled-components";
import LargeButton from "../buttons/LargeButton2";
import { useNavigate } from "react-router-dom";

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
    margin-top: 20px;

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

const MainAreaLayout = styled.div`
    //레이아웃
    width: 80%;
    height: 100%;
`;

export default function FindPwCompleteArea(){
    const navigate = useNavigate();

    return(
        <FindPwAreaStyle>
            <div className="findPwBoxLayout">
                {/* 상단영역 */}
                <FindPwLogo>
                    <span>비밀번호가 변경되었습니다.</span>
                </FindPwLogo>

                <FindPwNotice>
                    <span>로그인을 진행해주세요.</span>
                </FindPwNotice>

                {/* 메인 영역 */}
                <MainAreaLayout>
                    <LargeButton
                        backgroundColor="#fddc37"
                        fontColor="black"
                        hoverColor="#fce771"
                        title="로그인"
                        margin="50% 0 10px 0"
                        onClick={()=>{navigate("/");}}
                    />
                </MainAreaLayout>
            </div>
        </FindPwAreaStyle>

    );
}