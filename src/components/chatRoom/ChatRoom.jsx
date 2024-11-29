import { useEffect, useState, useRef } from "react";
import useWebSocketService from "../../utils/webSocket/webSocketService";
import { useUser } from "../../utils/contextApi/UserContext";
import { useLocation } from "react-router-dom";
import { isEmpty } from "../../utils/validation";
import { convertToShortDate } from "../../utils/dateConverter/dateConverter";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";
import styled from "styled-components";
import { ScrollStyle } from "../../style/scrollStyle";
import profileImg from "../../assets/globalImages/blue_profileImg.png";
import '../../assets/font/font.css';


const MainArea = styled.div`
    //레이아웃
    width: 100%;
    height: calc(100vh - 90px);

    display: flex;
    flex-direction: column;
`;

const MessageArea = styled.div`
    //레이아웃
    width: 100%;
    height: calc(100% - 120px);

    //스타일
    background-color: #41474a;
`;

const ScrollContainer = styled(ScrollStyle)`
    height: 100%;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 7px;  /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #bebebe;  /* 스크롤바의 색상 */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #8b8b8b;  /* 마우스를 올렸을 때 색상 */
    }
`;

const UlLayout = styled.ul`
  padding: 0 15px 0 10px;
`;

const MyMessage = styled.li`
    //레이아웃
    width: 100%;
    height: auto;
    margin-bottom: 5px;

    display: flex;
    flex-direction: row;
    justify-content: end;
    
    //스타일
    list-style: none;

    & .messageDiv{
        //레이아웃
        width: auto;
        max-width: calc(100% - 40px);
        height: auto;

        display: flex;
        flex-direction: row;
        /* align-items: start; */
        justify-content: end;
    }

    & .dateDiv{
        //레이아웃
        width: 47px;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: end;
    }

    & .date{
        //레이아웃
        width: 47px;
        padding: 0;
        margin: 0;

        //스타일
        font-size: 10px;
        font-weight: 300;
        color: #a4a4a4
    }

    & .my-speech-bubble {
        //레이아웃
        max-width: 80%;

        position: relative;
        background: #ffef44;
        border-radius: .4em;
        padding: 8px;

        font-family: 'nanumgothic';
    }

    & .my-speech-bubble:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-left-color: #ffef44;
        border-right: 0;
        border-bottom: 0;
        margin-top: -10px;
        margin-right: -5px;
    }
`;

const FriendMessage = styled.li`
    //레이아웃
    width: 100%;
    height: auto;
    margin-bottom: 5px;

    display: flex;
    flex-direction: row;
    justify-content: start;

    //스타일
    list-style: none;

    & .messageDiv{
        //레이아웃
        width: auto;
        height: auto;

        display: flex;
        flex-direction: row;
        align-items: start;
    }

    & .profileImgDiv{
        width: auto;
        height: auto;

        display: flex;
        flex-direction: row;
        align-items: center; /* 이미지가 부모의 중앙에 위치 */
        overflow: visible;
    }

    & .profileImg{
        width: 55px; /* 이미지 컨테이너의 너비 */
        height: 57px; /* 이미지 컨테이너의 높이 */
        background-size: cover; /* 이미지를 컨테이너에 맞게 조정 */
        background-position: center; /* 이미지 중심 정렬 */
        border-radius: 10%; /* 프로필 이미지 둥글게 만들기 */
    }

    & .nameAndMessageDiv{
        width: 70%;
        height: auto;

        margin-left: 7px;
    }

    & .senderName{
        //레이아웃
        padding: 0;
        margin: 5px 0 0 0;

        font-family: "ChosunGu";
        font-size: 15px;
        color: #ffffff;
    }

    & .friend-speech-bubble {
        //레이아웃
        position: relative;
        background: white;
        border-radius: .4em;
        padding: 8px;

        font-family: 'nanumgothic';
    }

    & .friend-speech-bubble:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-right-color: #ffffff;
        border-left: 0;
        border-top: 0;
        margin-top: -7px;
        margin-left: -5px;
    }

    & .dateDiv{
        //레이아웃
        width: 50px;
        height: 100%;
        margin: 0 0 5px 5px;

        display: flex;
        flex-direction: column;
        justify-content: end;
    }

    & .date{
        //레이아웃
        width: 50px;
        padding: 0;
        margin: 0;

        //스타일
        font-size: 10px;
        font-weight: 300;
        color: #a4a4a4
    }
`;

const BottomArea = styled.div`
    //레이아웃
    width: 100%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: end;

    //스타일
    background-color: white;
     box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2); /* 윗쪽 방향의 그림자 */

`;

const StyledTextarea = styled.textarea`
    //레이아웃
    width: 98%;
    height: 60px;
    padding-top: 5px;

    //스타일
    background-color: white;
    border-color: #ffffff;
    outline: none;

    //폰트
    font-family: "nanumgothic";
    font-size: 15px;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 7px;  /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cacaca;  /* 스크롤바의 색상 */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #8b8b8b;  /* 마우스를 올렸을 때 색상 */
    }
`;

const ButtonArea = styled.div`
    //레이아웃
    width: 100%;
    height: 30px;
    padding: 5px;

    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;

    //스타일
    background-color: white;
`;

const Submit = styled.div`
    //레이아웃
    width: 65px;
    height: 30px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    //스타일
    background-color: ${(props) => (props.isEmpty ? "#e8e6e6" : "#f6d93a")};
    color: ${(props) => (props.isEmpty ? "#c0c0c0" : "#232222")};

    border: none;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 400;

    cursor: ${(props) => (props.isEmpty ? "default" : "pointer")};
`;


export default function ChatRoom(){
    // useLocation을 사용하여 roomId가져옴
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const roomId = params.get("roomId");

    //접속한 사용자 정보
    const { user } = useUser();

    //웹소켓
    const { connect, disconnect, sendMessage, subscribeToRoom } = useWebSocketService();
    //저장된 메시지
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    //전송할 채팅 내용
    const [newMessage, setNewMessage] = useState("");

    // 채팅 메시지 목록의 끝을 참조하는 ref. 이를 이용해 새 메시지가 추가될 때 스크롤을 이동
    const messagesEndRef = useRef(null);


    //채팅방 기록 가져오는 로직
    const loadChatHistory = async (roomId) => {
        try {
            const response = await axiosInstanceForAuth.get(`/messages/${roomId}`);
            const chatHistory = response.data.data || []; // 서버에서 가져온 메시지 리스트
            setMessages(chatHistory); // 배열로 설정
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
    };

    // 채팅방에 들어갔을 때 WebSocket 연결
    useEffect(() => {
        // WebSocket 연결
        if(!isConnected){
            connect(() => {
                console.log("WebSocket connected for room: " + roomId);
                setIsConnected(true);  // 연결이 성공하면 상태 업데이트

                    // 연결 성공 후 채팅방 구독
                    subscribeToRoom(roomId, (newMessage) => {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            });
        }

        //기존 채팅방 기록 가져오기
        loadChatHistory(roomId);

   
        // 컴포넌트가 unmount될 때 연결 해제
        return () => {
            disconnect();
            setIsConnected(false);
        };
    }, [roomId]);

    //esc키로 창 닫기
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            window.close(); // ESC 키로 팝업 닫기
          }
        };
    
        // 이벤트 리스너 등록
        document.addEventListener('keydown', handleKeyDown);
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        console.log("mesages: ", messages);
    }, [messages] )

    // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    //메시지 전송 함수
    const handleSendMessage = () => {
        if(isConnected){
            if (newMessage.trim() !== "") {
                const message = {
                    senderId: user.userId,
                    chatRoomId: roomId,
                    content: newMessage,
                    messageType: "text"
                };
                sendMessage(roomId, message); // 메시지 전송
                setNewMessage(""); // 입력창 비우기
            }
        } else {
            console.error("웹소켓이 연결되지 않았습니다.");
        }
    };



    return(
        <MainArea>
            <MessageArea>
                <ScrollContainer>
                    <UlLayout>
                        {messages
                            .filter((msg) => msg.chatRoomId == roomId) // 해당 roomId에 맞는 메시지만 필터링
                            .map((msg, index) => {
                                if(msg.senderId == user.userId){
                                    return(
                                        //내 메시지 스타일
                                        <MyMessage key={index}>
                                            <div className="messageDiv">
                                                {/* 시간 */}
                                                <div className="dateDiv">
                                                    <p className="date">
                                                        {convertToShortDate(msg.sendAt)}
                                                    </p>
                                                </div>
                                                {/* 채팅 */}
                                                <div className="my-speech-bubble" >
                                                    {/* 줄바꿈 표시 (pre-wrap) */}
                                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                                        {msg.content} </span>
                                                </div>
                                            </div>
                                        </MyMessage>
                                    );
                                }
                                else{
                                    return(
                                        //친구 메시지 스타일일
                                        <FriendMessage key={index}>
                                            <div className="messageDiv">
                                                {/* 프로필 사진 */}
                                                <div className="profileImgDiv">
                                                    <div className="profileImg"
                                                        style={{
                                                            backgroundImage: `url(${profileImg})`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="nameAndMessageDiv">
                                                    {/* 이름 */}
                                                    <p className="senderName">
                                                        {msg.senderName} 
                                                    </p>
                                                    {/* 채팅 */}
                                                    <div className="friend-speech-bubble">
                                                    {/* 줄바꿈 표시 (pre-wrap) */}
                                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                                        {msg.content} </span>
                                                    </div>
                                                </div>
                                                <div className="dateDiv">
                                                    {/* 시간 */}
                                                    <p className="date">
                                                        {convertToShortDate(msg.sendAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </FriendMessage>
                                    );
                                }
                            })}
                        <div ref={messagesEndRef} /> {/* 스크롤 포인트 */}
                    </UlLayout>
                </ScrollContainer>
            </MessageArea>

            {/* 하단 영역 */}
            <BottomArea>
                <StyledTextarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="메시지 입력"
                    rows={40} // 입력창 높이를 조절
                    cols={500} // 입력창 너비를 조절
                    style={{  resize: "none", // 가로/세로 조절 가능
                        minHeight: "80px", // 최소 높이
                        maxHeight: "500px", // 최대 높이
                        // minWidth: "400px", // 최소 너비
                        overflowY: "auto" // 내용이 넘칠 경우 스크롤 표시 }} // 크기 조절 비활성화
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // 기본 Enter 동작 (줄바꿈) 방지
                            handleSendMessage(); // 메시지 전송 함수 호출
                        }
                    }}
                />
                <ButtonArea>
                    <Submit 
                        isEmpty={isEmpty(newMessage)} 
                        onClick={handleSendMessage}>전송</Submit>
                </ButtonArea>
            </BottomArea>
        </MainArea>
    );
}