import styled from "styled-components";
import memberProfile from "../../assets/globalImages/blue_profileImg.png";
import myProfile from "../../assets/globalImages/blue_profileImg2.png";
import { ScrollStyle } from "../../style/scrollStyle";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";


const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3); /* 어두운 배경 */
    z-index: 999; /* 항상 위에 표시되도록 */
`;

const ModalContainer = styled.div`
    position: absolute;
    top: 10px; /* 오른쪽 상단 위치 */
    right: 10px;
    width: 200px;
    max-height: 60%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    z-index: 1000;
`;

const CloseButton = styled.div`
    //레이아웃
    display: flex;
    flex-direction: row;
    justify-content: end;

    padding: 0;
    margin-right: 10px;
    /* background-color: transparent; */
    border: none;
    border-radius: 10%;
    font-size: 18px;
    color: #8b8b8b;

    cursor: pointer;

    &:hover {
        color: #000000;
    }
`;

const Title = styled.p`
    margin: 0 0 0 10px;

    //스타일
    font-family: "nanumgothic";
    font-size: 18px;
    font-weight: 500;
`

const UlStyle = styled.ul`
    list-style: none;
    padding: 0;
`;

const MemberList = styled.li`
        padding: 10px;
        border-bottom: 1px solid #eee;
        border-radius: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;


        &:hover {
            background-color: #f0f0f0;
        }

        & .myInfo{
            margin-left: 10px;

            font-size: 17px;
            font-weight: 700;
        }

        & .userInfo{
            margin-left: 10px;
        }

        & .userInfoArea{
            //레이아웃
            width: calc(100% - 40px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & .addFriend{
            width: 30px;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & .addFriendButton{
            //레이아웃
            width: 30px;
            height: 30px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            //스타일
            border-radius: 20%;
            font-size: 25px;
            color: #a5a5a5;
            background-color: #dbdada;

            cursor: pointer;

            & p{
                margin: 0 0 4px 0;
            }

            &:hover {
                color: #505050;
                background-color: #959595;
            }
        }
`;

const ProfileImage = styled.img`
    /* 레이아웃 */
    width: 40px;
    height: 40px;
    object-fit: cover;
`;

const ProfileArea = styled.div`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    overflow: hidden;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.4); /* 반투명 회색 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
    font-weight: 700;
    border-radius: 30%;
`;

const ScrollContainer = styled(ScrollStyle)`
    height: 100%;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 7px;  /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #bebebe;  /* 스크롤바의 색상 */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #8b8b8b;  /* 마우스를 올렸을 때 색상 */
    }
`;


export default function MemberListModal({ members, onClose, onSuccess }) {
    //아이디로 친구추가 api호출
    const addFriendByIdSubmit = async (userId) => {
        const requestData = new URLSearchParams();
        requestData.append('friendId', userId);

        try {
            const response = await axiosInstanceForAuth.post('/friends/requestById', requestData);

            //성공시 재랜더링
            onSuccess();
        } catch (error) {
            console.error('API 요청 오류:', error);
            setIdApiErrorMessage(error.response.data.message);
            setIdApiError(true);
        }
    }
    
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>멤버 목록</Title>
                <ScrollContainer>
                    <UlStyle>
                        {members.map((member, index) => {
                            //멤버가 나라면
                            if(member.type == "ME"){
                                return(
                                    <MemberList key={index}>
                                        <ProfileImage src={myProfile} alt="이미지 오류..."/>
                                        <div className="myInfo">
                                            {member.userName} (나)
                                        </div>
                                    </MemberList>
                                );
                            }
                            //멤버가 친구라면
                            else if(member.type == "FRIEND"){
                                return(
                                    <MemberList key={index}>
                                        <ProfileImage src={memberProfile} alt="이미지 오류..."/>
                                        <div className="userInfo">
                                            {member.userName}
                                        </div>
                                    </MemberList>
                                );
                            }

                            //멤버가 친구가 아니라면
                            else if(member.type == "NOT_FRIEND"){
                                return(
                                    <MemberList key={index}>
                                        <ProfileArea>
                                            <ProfileImage src={memberProfile} alt="이미지 오류..."/>
                                            <Overlay>
                                                <p>?</p>
                                            </Overlay>
                                        </ProfileArea>
                                        <div className="userInfoArea">
                                            <div className="userInfo">
                                                {member.userName}
                                            </div>

                                            <div className="addFriend">
                                                <div className="addFriendButton" onClick={() => addFriendByIdSubmit(member.userId)}>
                                                    <p>+</p>
                                                </div>
                                            </div>
                                        </div>
                                    </MemberList>
                                );
                            }
                        })}
                    </UlStyle>
                </ScrollContainer>
            </ModalContainer>
        </ModalOverlay>
    );
}