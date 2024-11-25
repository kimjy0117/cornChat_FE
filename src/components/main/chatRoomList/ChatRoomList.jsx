import React from "react";
import ChatRoomPreview from "./ChatRoomPreview";
import styled from "styled-components";

const UlLayout = styled.ul`
  padding-left: 0;
`;

export default function ChatRoomList ({ chatRooms, contextMenu, onContextMenu, onSuccess }) {
    return (
        <UlLayout>
            {chatRooms.map((chatRoom) => (
                <ChatRoomPreview
                    key={chatRoom.id}
                    chatRoom={chatRoom}
                    contextMenu={contextMenu}
                    onContextMenu={onContextMenu}
                    onSuccess={onSuccess}
                />
            ))}
        </UlLayout>
    );
};