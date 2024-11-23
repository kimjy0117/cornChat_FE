import React from "react";
import FriendProfile from "./FriendProfile";
import styled from "styled-components";

const UlLayout = styled.ul`
  padding-left: 0;
`;

export default function FriendsList ({ friends, contextMenu, onContextMenu, onSuccess }) {
    return (
        <UlLayout>
            {friends.map((friend) => (
                <FriendProfile
                    key={friend.friendId}
                    friend={friend}
                    contextMenu={contextMenu}
                    onContextMenu={onContextMenu}
                    onSuccess={onSuccess}
                />
            ))}
        </UlLayout>
    );
};