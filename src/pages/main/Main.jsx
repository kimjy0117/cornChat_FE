import { useState, useEffect } from "react";
import { BackgroundStyle } from "../../components/BackgroundStyle";
import styled from "styled-components";
import FriendsPage from "../../components/main/friendsList/FriendsPage";
import ChatRoomPage from "../../components/main/chatRoomList/chatRoomPage";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";

const MainLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow-x: auto;

    & .pagesLayout{
        width: 100%;
        height: 100vh;
        

        display: flex;
        flex-direction: row;
        justify-content: center; /* 중앙 정렬 */
        align-items: center;
    }

`;

export default function Main(){
    //친구 정보
    const [friends, setFriends] = useState([]);
    //채팅방 정보
    const [chatRooms, setChatRooms] = useState([]);
    //내 프로필 정보
    const [myProfile, setMyProfile] = useState({
        userName: "",
        userId: "",
        statusMessage: "",
    });

    //채팅방, 친구 정보 가져오는 api호출
    const getDataSubmit = async () => {
        try {
            const chatRoomResponse = await axiosInstanceForAuth.get('/chatrooms');
            setChatRooms(chatRoomResponse.data.data);

            const friendsResponse = await axiosInstanceForAuth.get('/friends');
            setFriends(friendsResponse.data.data);

            const myProfileResponse = await axiosInstanceForAuth.get('/user/profile');
            setMyProfile(myProfileResponse.data.data);

        } catch (error) {
            console.error('API 요청 오류:', error);
        }
    };

    // 페이지 렌더링 시 API 호출
    useEffect(() => {
        getDataSubmit();
    }, []); // 빈 배열을 넣으면 컴포넌트가 처음 마운트될 때 한 번만 실행됨

    const handleRender = () => {
        getDataSubmit();
    };

    return(
        <>
            <BackgroundStyle/>
            <MainLayout>
                <div className="pagesLayout">
                    <FriendsPage
                        myProfile={myProfile}
                        friends={friends}
                        onSuccess={handleRender}/>
                    <ChatRoomPage
                        chatRooms={chatRooms}
                        friends={friends}
                        onSuccess={handleRender}/>
                </div>
            </MainLayout>
        
        </>
    )
}