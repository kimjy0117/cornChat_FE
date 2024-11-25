import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatRoomHeader from "./chatRoomHeader";
import ChatRoomList from "./ChatRoomList";
import CreateChatRoomModal from "./CreateChatRoomModal";
import {ScrollStyle} from "../../../style/scrollStyle"

const ChatRoomPageStyle = styled.div`
    //레이아웃
    width: 340px;
    min-width: 300px;
    height: 98%;
    padding: 0px 30px 0px 20px;

    //스타일
    background-color: white;
    
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: black;
`;

const ScrollContainer = styled(ScrollStyle)`
    height: calc(100% - 110px);
`;

export default function ChatRoomPage({chatRooms, friends, onSuccess}){
    //우클릭 컨텍스트 메뉴
    const [contextMenu, setContextMenu] = useState({ visible: false, chatRoomId: null, x: 0, y: 0 });

    //모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 컨텍스트 메뉴 우클릭 핸들러
    const handleContextMenu = (e, chatRoomId) => {
        e.preventDefault();
        setContextMenu({ visible: true, chatRoomId, x: e.clientX, y: e.clientY });
    };

    // 컨텍스트 메뉴 비활성화
    const closeContextMenu = () => {
        setContextMenu({visible: false, chatRoomId: null, x: 0, y: 0 });
    };

    return(
        <ChatRoomPageStyle
            onClick={closeContextMenu}
        >
            
            {/* 채팅방 상단 */}
            <ChatRoomHeader
                onCreateChatRoomClick={openModal}
            />

            {/* 채팅방 생성 모달 */}
            <CreateChatRoomModal 
                friends={friends}
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                onSuccess={onSuccess}    
            />

            <ScrollContainer>
                {/* 채팅방 리스트 */}
                <ChatRoomList
                    chatRooms={chatRooms}
                    contextMenu={contextMenu}
                    onContextMenu={handleContextMenu}
                    onSuccess={onSuccess}
                />
            </ScrollContainer>
        </ChatRoomPageStyle>
    );
};