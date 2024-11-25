import React, {useState, useEffect} from "react";
import MyProfile from "./MyProfile";
import FriendList from "./FriendsList";
import FriendsHeader from "./FriendsHeader";
import AddFriendModal from "./AddFriendModal";
import styled from "styled-components";
import {ScrollStyle} from "../../../style/scrollStyle"

const FriendsPageStyle = styled.div`
    //레이아웃
    width: 300px;
    min-width: 300px;
    height: 98%;
    padding: 0px 40px 0px 30px;

    //스타일
    background-color: white;
    
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: black;

    & hr{
        width: 290px;
        color: #c7c7c7;
    }
`;

const ScrollContainer = styled(ScrollStyle)`
    height: calc(100% - 110px);
`;

export default function FriendsPage({myProfile, friends, onSuccess}){
    //우클릭 컨텍스트 메뉴
    const [contextMenu, setContextMenu] = useState({ my_visible: false, friend_visible: false, setting_visible: false, friendId: null, x: 0, y: 0 });

    //모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 내 프로필 컨텍스트 메뉴 우클릭 핸들러
    const handleMyContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ my_visible: true, friend_visible: false, setting_visible: false, friendId: null, x: e.clientX, y: e.clientY });
    };

    // 친구 프로필 컨텍스트 메뉴 우클릭 핸들러
    const handleFriendContextMenu = (e, friendId) => {
        e.preventDefault();
        setContextMenu({ my_visible: false, friend_visible: true, setting_visible: false, friendId, x: e.clientX, y: e.clientY });
    };

    // 세팅 컨텍스트 메뉴 핸들러
    const handleSettingContextMenu = (e) => {
        e.preventDefault(); // 기본 메뉴 방지
        e.stopPropagation(); // 클릭 이벤트 전파 중지
        setContextMenu({ my_visible: false, friend_visible: false, setting_visible: true, friendId: null, x: e.clientX, y: e.clientY });
    };
    
    // 컨텍스트 메뉴 비활성화
    const closeContextMenu = () => {
        setContextMenu({ my_visible: false, friend_visible: false, setting_visible: false, friendId: null, x: 0, y: 0 });
    };

    return (
        <FriendsPageStyle
            onClick={closeContextMenu}>

            {/* 친구목록 상단 */}
            <FriendsHeader onAddFriendClick={openModal}
                        contextMenu={contextMenu}
                        handleSettingContextMenu={handleSettingContextMenu}/>

            {/* 친구추가 모달 */}
            <AddFriendModal 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                onSuccess={onSuccess}    
            />
    
            <ScrollContainer>
                <ScrollStyle>
                    {/* 내 프로필 */}
                    <MyProfile profile={myProfile}
                            contextMenu={contextMenu}
                            onContextMenu={handleMyContextMenu}
                            onSuccess={onSuccess}/>
                    <hr/>

                    <p>친구 {friends.length}</p>
                    <FriendList friends={friends}
                        contextMenu={contextMenu}
                        onContextMenu={handleFriendContextMenu}
                        onSuccess={onSuccess} />
                </ScrollStyle>
            </ScrollContainer>
        </FriendsPageStyle>
    );
};