import React, {useState, useEffect} from "react";
import MyProfile from "./MyProfile";
import FriendList from "./FriendsList";
import FriendsHeader from "./FriendsHeader";
import AddFriendModal from "./AddFriendModal";
import axiosInstanceForAuth from "../../../api/auth/axiosInstanceForAuth";
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

export default function FriendsPage(){
    //우클릭 컨텍스트 메뉴
    const [contextMenu, setContextMenu] = useState({ my_visible: false, friend_visible: false, setting_visible: false, friendId: null, x: 0, y: 0 });

    //모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    //프로필 정보
    const [myProfile, setMyProfile] = useState({
        userName: "",
        userId: "",
        statusMessage: "",
    });
    const [friends, setFriends] = useState([]);
    
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


    //사용자 정보 가져오는 api호출
    const getDataSubmit = async () => {
        try {
            const myProfileResponse = await axiosInstanceForAuth.get('/user/profile');
            setMyProfile(myProfileResponse.data.data);

            const friendsResponse = await axiosInstanceForAuth.get('/friends');
            setFriends(friendsResponse.data.data);

        } catch (error) {
            console.error('API 요청 오류:', error);
        }
    };

    // 페이지 렌더링 시 API 호출
    useEffect(() => {
        getDataSubmit();
    }, []); // 빈 배열을 넣으면 컴포넌트가 처음 마운트될 때 한 번만 실행됨

    // 친구 추가 및 친구 목록 갱신
    const handleAddFriendSuccess = () => {
        getDataSubmit();  // 친구가 추가된 후 목록을 다시 갱신
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
                onSuccess={handleAddFriendSuccess}    
            />
    
            <ScrollStyle>
                {/* 내 프로필 */}
                <MyProfile profile={myProfile}
                        contextMenu={contextMenu}
                        onContextMenu={handleMyContextMenu}
                        onSuccess={handleAddFriendSuccess}/>
                <hr/>

                <p>친구 {friends.length}</p>
                <FriendList friends={friends}
                    contextMenu={contextMenu}
                    onContextMenu={handleFriendContextMenu}
                    onSuccess={handleAddFriendSuccess} />
            </ScrollStyle>
        </FriendsPageStyle>
    );
};