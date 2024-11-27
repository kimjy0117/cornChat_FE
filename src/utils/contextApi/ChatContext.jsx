import React, { createContext, useContext, useState } from "react";
import useWebSocketService from "../webSocket/webSocketService";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { connect, sendMessage, subscribeToRooms } = useWebSocketService();
    const [messages, setMessages] = useState({});

    //메시지 추가하는 로직
    const addMessage = (roomId, message) => {
        setMessages((prev) => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), message],
        }));
    };

    //채팅방 기록 가져오는 로직
    const loadChatHistory = async (roomId) => {
        try {
            const response = await axiosInstanceForAuth.get(`/messages/${roomId}`);
            const chatHistory = response.data.data; // 서버에서 가져온 메시지 리스트
            setMessages((prev) => ({
                ...prev,
                [roomId]: chatHistory, // 이전 메시지로 초기화
            }));
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
    };

    //웹소켓 연결하는 로직
    const connectAndSubscribe = (chatRoomIds) => {
        connect((stompClient) => {
            subscribeToRooms(chatRoomIds, (roomId, message) => {
                addMessage(roomId, message);
            });
        });
    };

    // 메시지 전송 함수
    const sendChatMessage = (roomId, message) => {
        sendMessage(roomId, message);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, loadChatHistory, connectAndSubscribe, sendChatMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
