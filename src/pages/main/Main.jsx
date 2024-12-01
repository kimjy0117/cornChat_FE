import { useState, useEffect } from "react";
import { BackgroundStyle } from "../../components/BackgroundStyle";
import styled from "styled-components";
import FriendsPage from "../../components/main/friendsList/FriendsPage";
import ChatRoomPage from "../../components/main/chatRoomList/ChatRoomPage";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";
import useWebSocketService from "../../utils/webSocket/webSocketService";

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
    const { connect, subscribeToAlarm} = useWebSocketService();

    //알림 메시지
    const [notification, setNotification] = useState(null);
    //친구 정보
    const [friends, setFriends] = useState([]);
    //채팅방 정보
    const [chatRooms, setChatRooms] = useState([]);
    // //채팅방 아이디들 모음
    // const [chatRoomIds, setChatRoomIds] = useState([]);
    //내 프로필 정보
    const [myProfile, setMyProfile] = useState({
        userName: "",
        userId: "",
        statusMessage: "",
    });

    // 메시지가 갱신될때마다 재렌더링
    useEffect(() => {
        getDataSubmit();
    }, [notification]);

    //웹소켓 연결 및 알림서버 구독
    useEffect(() => {
        console.log("계속 구독을 하는건 아니지 않나?");
        connect((stompClient) => {
            subscribeToAlarm(myProfile.userId, (notification) => {
                setNotification(notification);
            });
        });
    }, [chatRooms]);

    //채팅방, 친구 정보 가져오는 api호출
    const getDataSubmit = async () => {
        try {
            //채팅방 리스트 가져옴
            const chatRoomResponse = await axiosInstanceForAuth.get("/chatrooms");
            const chatRoomsData = chatRoomResponse.data.data;
            setChatRooms(chatRoomsData);
            // // 아이디만 파싱
            // const ids = chatRoomsData.map((room) => room.id);
            // setChatRoomIds(ids);

            //친구 정보 가져옴
            const friendsResponse = await axiosInstanceForAuth.get("/friends");
            setFriends(friendsResponse.data.data);

            //내 정보 가져옴
            const myProfileResponse = await axiosInstanceForAuth.get("/user/profile");
            const profileData = myProfileResponse.data.data;
            setMyProfile(profileData);
        } catch (error) {
            console.error("API 요청 오류:", error);
        }
    };

    //상태 변경시 재렌더링
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