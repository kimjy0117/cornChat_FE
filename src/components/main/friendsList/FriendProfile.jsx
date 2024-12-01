import React from "react";
import styled from "styled-components";
import profileImg from "../../../assets/globalImages/blue_profileImg.png";
import { ContextMenu } from "../../../style/contextMenuStyle";
import axiosInstanceForAuth from "../../../api/auth/axiosInstanceForAuth";


const StyledFriendProfile = styled.li`
    //레이아웃
    width: 100%;
    height: 65px;

    padding-left: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    //스타일
    background-color: white;
    list-style: none;
    border-radius: 10px;

    & .info{
        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-left: 13px;
    }

    & .name{
        margin: 3px 0 3px 0;

        font-family: "nanumgothic";
        font-size: 15px;
        font-weight: 500;
    }

    & .status{
        margin: 2px 0 3px 3px;

        font-family: "nanumgothic";
        font-size: 12px;
        font-weight: 400;
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
    width: 55px; /* 원하는 크기로 조정 */
    height: 55px; /* 이미지 비율을 유지 */
`;

export default function FriendProfile({friend, contextMenu, onContextMenu, onSuccess }){
    // 컨텍스트 메뉴가 현재 친구에 해당하는지 확인
    const isMenuVisible = contextMenu?.friend_visible && contextMenu?.friendId === friend.friendId;

    //친구 이름 변경 api 호출
    const setFriendNameSubmit = async (newName) => {
        const requestData = {
            friendId: friend.friendId,
            friendName: newName
        };

        try {
            const response = await axiosInstanceForAuth.patch('/friends/name', requestData);
            //성공시 재랜더링
            onSuccess();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }


    //친구 삭제 api 호출
    const deleteFriendSubmit = async () => {
        try {
            await axiosInstanceForAuth.delete('/friends/delete', {params: { friendId: friend.friendId },});

            //성공시 재랜더링
            onSuccess();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }

    //개인 채팅방 생성 api로직
    //dm채팅방 생성 api로직
    const createDmChatRoomSubmit = async () => {
        const requestData = {
            friendId: friend.friendId
        };
        try{
            const response = await axiosInstanceForAuth.post('/chatrooms/dm', requestData);
            console.log(response.data);
            //성공시 재랜더링
            onSuccess();
            const roomId = response.data.data.id;
            console.log(roomId);
            onChat(roomId);

        } catch (error){
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }

    //친구 프로필
    //이름 수정
    const onRename = () => {
        const newName = prompt(`${friend.friendName}님의 새로운 이름을 입력하세요`);
        if(!newName){
            return;
        }
        //api 호출
        setFriendNameSubmit(newName);
    }

    //챗방 만들기
    const createChat = () => {
        //api호출
        createDmChatRoomSubmit();
    }

    //채팅방 열기
    const onChat = (roomId) => {
        const popup = window.open(
            `/chatRoom?roomId=${roomId}`,
            `ChatPopup_${roomId}`,
            'width=500,height=600,scrollbars=no,toolbar=no,location=no,status=no,menubar=no'
        );

        if (!popup) {
            alert('팝업이 차단되었습니다. 팝업 차단 설정을 확인해주세요.');
        }
    };

    //친구 삭제
    const onDelete = () => {
        if(window.confirm('정말로 삭제하시겠습니까?')){
            //삭제 api 호출
            deleteFriendSubmit();
        }
    }

    return (
        <>
            <StyledFriendProfile
                className = "friendProfile"
                onDoubleClick={() => createChat()} //더블 클릭 시 
                onContextMenu={(e) => onContextMenu(e, friend.friendId)}
            >
                <div className="profileImg">
                    <ProfileImage src={profileImg} alt="이미지 오류..." />
                </div>
                <div className="info">
                    <p className="name">{friend.friendNickname}</p>
                    <p className="status">{friend.friendStatusMessage || ""}</p>
                </div>
            </StyledFriendProfile>
        
            {isMenuVisible && (
                <ContextMenu
                    className="context-menu"
                    style={{
                        top: contextMenu.y,
                        left: contextMenu.x,
                    }}
                >
                    <ul>
                        <li onClick={() => createChat()}>채팅방 열기</li>
                        <li onClick={() => onRename()}>친구 이름 수정</li>
                        <li onClick={() => onDelete()}>친구 삭제</li>
                    </ul>
                </ContextMenu>
            )}
        </>
    );
};