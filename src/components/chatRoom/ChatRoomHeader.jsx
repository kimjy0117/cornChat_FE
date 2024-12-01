import { useState, useEffect } from "react";
import chatRoomProfileImg from "../../assets/globalImages/chatRoomProfileImg.png";
// import profileImg from "../../assets/globalImages/blue_profileImg2.png "
import menuImg from "../../assets/globalImages/menuImg.png"
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";
import { ContextMenu } from "../../style/contextMenuStyle";
import MemberListModal from "./MemberListModal";
import { isTitle } from "../../utils/validation";

const HeaderLayout = styled.div`
    //레이아웃
    width: 100%;
    height: 90px;

    display: flex;
    flex-direction: row;
    align-items: center;

    //스타일
    background-color: #50585b;
`;

const ProfileArea = styled.div`
    //레이아웃
    width: 15%;
    height: 100%;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
`;

const ProfileImage = styled.img`
    //레이아웃
    width: 57px;
    height: 45px;
`;

const TitleArea = styled.div`
    //레이아웃
    width: 50%;
    height: 100%;

    & p{
        margin: 0;
    }

    & .title{
        //레이아웃
        width: 100%;
        height: 70%;

        display: flex;
        flex-direction: column;
        justify-content: end;

        //스타일
        color: white;
        font-family: "nanumgothic";
        font-size: 17px;
    }

    & .member{
        //레이아웃
        width: 100%;
        height: 30%;

        display: flex;
        flex-direction: column;
        justify-content: start;

        //스타일
        color: white;
        font-family: "nanumgothic";
        font-size: 11px;
    }

`;

const ButtonsArea = styled.div`
    //레이아웃
    width: 40%;
    height: 100%;

    margin: 10px 20px 0 0;

    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
`

const ButtonImage = styled.img`
    //레이아웃
    width: 30px;
    height: 30px;
    border-radius: 10%;

    //효과
    cursor: pointer;

    &:hover {
        background-color: #818080; /* 회색 음영 */
    }
    &:active {
        background-color: #b3b1b1; /* 클릭 시 조금 더 진한 음영 */
    }
`;

export default function ChatRoomHeader({contextMenu, onContextMenu}){
    // useLocation을 사용하여 roomId가져옴
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const roomId = params.get("roomId");
    const [chatRoomData, setChatRoomData] = useState(null);

    //채팅방 멤버 정보
    const [ members, setMembers ] = useState([]);

    //모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    //처음 정보 가져옴
    useEffect(() => {
        getChatRoomData();
    }, [])

    //상태 변경시 재렌더링
    const handleRender = () => {
        getChatRoomData();
    };

    //채팅방 정보 api로 가져옴
    const getChatRoomData = async () => {
        try{
            //채팅방 정보 가져옴
            const response = await axiosInstanceForAuth.get(`/chatrooms/room/${roomId}`);
            setChatRoomData(response.data.data);
            setMembers(response.data.data.members);
        } catch (error){
            console.error("API 요청 오류:", error);
        }
    }

    //채팅방 이름 바꾸기 api
    const setChatRoomTItleSubmit = async (newChatRoomTitle) => {
        try{
            await axiosInstanceForAuth.patch(`/chatrooms/title/${roomId}?chatRoomTitle=${newChatRoomTitle}`);
            //성공시 재렌더링
            handleRender();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }

    }

    //채팅방 나가기 api
    const deleteChatRoomSubmit = async () => {
        try {
            await axiosInstanceForAuth.delete(`/chatrooms/${roomId}`);
            //나가기 성공시 채팅방 닫기
            window.close();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    };

    //채팅방 이름 바꾸기
    const setChatRoomTitle = () => {
        const newChatRoomTitle = prompt(`새로운 채팅방 이름을 입력하세요`);

        //채팅방 제목이 비어있으면
        if(!newChatRoomTitle){
            return;
        }

        //채팅방 제목이 형식에 안맞으면
        else if(!isTitle(newChatRoomTitle)){
            alert("채팅방 제목은 1~15자리로 입력해주세요.");
            return;
        }

        //api호출
        setChatRoomTItleSubmit(newChatRoomTitle);
    }

    //채팅방 나가기
    const onDelete = () => {
        if(window.confirm('정말로 나가시겠습니까?')){
            //삭제 api 호출
            deleteChatRoomSubmit();
        }
    }

    // 모달 열기/닫기 토글 함수
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return(
        <>
            <HeaderLayout>
                {chatRoomData ? (
                    <>
                        {/* 프로필 영역 */}
                        <ProfileArea>
                            <ProfileImage src={chatRoomProfileImg} alt="채팅방 사진"/>
                        </ProfileArea>
                        {/* 타이틀 영역 */}
                        <TitleArea>
                            <div className="title">
                                <p>{chatRoomData.title}</p>
                            </div>
                            <div className="member">
                                <p>인원 {chatRoomData.memberCount}</p>
                            </div>
                        </TitleArea>

                        {/* 버튼 영역 */}
                        <ButtonsArea>
                            <ButtonImage src={menuImg} alt="메뉴"  onClick={(e) => onContextMenu(e)}/>
                        </ButtonsArea>
                    </>
                ) : (
                    <p>Loading...</p> 
                )}

                {/* 멤버 목록 모달 */}
                {isModalOpen && <MemberListModal
                    members={members} 
                    onClose={toggleModal} 
                    onSuccess={handleRender} />}
            </HeaderLayout>

            {contextMenu.visible && (
                <ContextMenu
                    className="context-menu"
                    style={{
                        top: contextMenu.y + 5,
                        left: contextMenu.x - 130,
                    }}
                >
                    <ul>
                        <li onClick={() => toggleModal()}>멤버 확인하기</li>
                        {chatRoomData.type == "GROUP" && 
                            <li onClick={()=> setChatRoomTitle()}>채팅방 이름 변경</li>}
                        <li onClick={() => onDelete()}>채팅방 나가기</li>
                    </ul>
                </ContextMenu>
            )}
        </>
    );
};
