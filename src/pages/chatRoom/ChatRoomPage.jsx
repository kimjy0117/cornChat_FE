import { useState } from "react";
import ChatRoomHeader from "../../components/chatRoom/ChatRoomHeader";
import ChatRoom from "../../components/chatRoom/ChatRoom";
import styled from "styled-components";

const ChatRoomPageLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    overflow-y: hidden;
    overflow-x: hidden;

`;

export default function ChatRoomPage(){
    //컨텍스트 메뉴
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

    // 컨텍스트 메뉴 클릭 핸들러
    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation(); // 클릭 이벤트 전파 중지
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    };

    // 컨텍스트 메뉴 비활성화
    const closeContextMenu = () => {
        setContextMenu({visible: false, x: 0, y: 0 });
    };

    return(
        <>
            <ChatRoomPageLayout
                onClick={closeContextMenu}>
                <ChatRoomHeader
                    contextMenu={contextMenu}
                    onContextMenu={handleContextMenu}/>
                <ChatRoom/>
            </ChatRoomPageLayout>
        </>
    )
};