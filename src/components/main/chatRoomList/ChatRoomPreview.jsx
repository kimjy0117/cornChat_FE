import React, {useState, useEffect} from "react";
import styled from "styled-components";
import profileImg from "../../../assets/globalImages/chatRoomProfileImg.png";
import { ContextMenu } from "../../../style/contextMenuStyle";
import axiosInstanceForAuth from "../../../api/auth/axiosInstanceForAuth";

const StyledChatRoomProfile = styled.li`
    //레이아웃
    width: 98%;
    height: 70px;

    padding: 2px 0 2px 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    //스타일
    background-color: white;
    list-style: none;
    border-radius: 10px;

    & .info{
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-left: 5px;
    }

    & .infoTop{
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: start;
    }

    & .name{
        margin: 0 0 3px 0;
        font-size: 15px;
        font-weight: 500;
    }

    & .date{
        margin: 0 4px 0 0;
        font-size: 10px;
        font-weight: 300;
    }

    & .message{
        margin: 2px 0 3px 3px;
        font-size: 10px;
        font-weight: 300;
        color: #484848;
    }

    //효과
    &:hover {
        background-color: #f0f0f0; /* 회색 음영 */
    }
    &:active {
        background-color: #e0e0e0; /* 클릭 시 조금 더 진한 음영 */
    }
`;

const ProfileImage = styled.img`
    //레이아웃
    width: 70px; /* 원하는 크기로 조정 */
    height: 55px; /* 이미지 비율을 유지 */
`;

export default function ChatRoomPreview({chatRoom, contextMenu, onContextMenu, onSuccess}){
    const [lastMessageDate, setLastMessageDate] = useState("");

    // 컨텍스트 메뉴가 현재 채팅방에 해당하는지 확인
    const isMenuVisible = contextMenu.visible && contextMenu.chatRoomId === chatRoom.id;

    // 채팅방 제목이 너무 길면 자름
    const subTitle = chatRoom.title.length > 13
        ? `${chatRoom.title.substring(0, 13)}...` : chatRoom.title;

    // 채팅방 메시지가 너무 길면 자름
    const subMessage = chatRoom.lastMessage.length > 25 
        ? `${chatRoom.lastMessage.substring(0, 25)}...` : chatRoom.lastMessage;

    useEffect(() => {
        if (!chatRoom.latestMessageAt) return;

        // 날짜 데이터를 가져옴
        const chatRoomDate = chatRoom.latestMessageAt;

        // Date 객체로 변환
        const parsedDate = new Date(chatRoomDate);

        // 현재 시간 가져오기
        const now = new Date();

        // 오늘의 00:00:00 시각 계산
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // 어제의 00:00:00 시각 계산
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);

        // 날짜 차이 계산
        if (parsedDate >= startOfToday) {
            // 오늘 날짜인 경우
            const hours = parsedDate.getHours();
            const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
            const ampm = hours < 12 ? "오전" : "오후";
            const formattedHour = hours % 12 || 12; // 0시는 12시로 표시
            setLastMessageDate(`${ampm} ${formattedHour}:${minutes}`);
        } else if (parsedDate >= startOfYesterday) {
            // 어제 날짜인 경우
            setLastMessageDate("어제");
        } else {
            // 2일 이상 지난 경우
            const month = parsedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
            const date = parsedDate.getDate();
            setLastMessageDate(`${month}월 ${date}일`);
        }
    }, [chatRoom.latestMessageAt]); // chatRoom.latestMessageAt이 변경될 때만 실행

    //채팅방 나가기 api
    const deleteChatRoomSubmit = async () => {
        try {
            await axiosInstanceForAuth.delete(`/chatrooms/${chatRoom.id}`);

            //성공시 재랜더링
            onSuccess();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }
    
    //채팅방 열기
    const onChat = () => {
        alert(`${chatRoom.title}채팅방이 열립니다!`);
    }

    //채팅방 나가기
    const onDelete = () => {
        if(window.confirm('정말로 나가시겠습니까?')){
            //삭제 api 호출
            deleteChatRoomSubmit();
        }
    }

    return (
        <>
            <StyledChatRoomProfile
                onDoubleClick={() => onChat(chatRoom)} //더블클릭시
                onContextMenu={(e) => onContextMenu(e, chatRoom.id)}
            >
                <div className="profileImg">
                    <ProfileImage src={profileImg} alt="이미지 오류..." />
                </div>

                <div className="info">
                    <div className="infoTop">
                        <p className="name">{subTitle}</p>
                        <p className="date">{lastMessageDate}</p>
                    </div>
                    <p className="message">{subMessage}</p>
                </div>
            </StyledChatRoomProfile>
        
            {isMenuVisible && (
                <ContextMenu
                    className="context-menu"
                    style={{
                        top: contextMenu.y,
                        left: contextMenu.x,
                    }}
                >
                    <ul>
                        <li onClick={() => onChat()}>채팅방 열기</li>
                        <li onClick={() => onDelete()}>채팅방 나가기</li>
                    </ul>
                </ContextMenu>
            )}
        </>

    );
};