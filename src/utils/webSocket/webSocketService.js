import { useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import { getToken } from "../auth";

export default function useWebSocketService(){
    const stompClient = useRef(null);  // useRef를 사용하여 stompClient 관리
    const isConnected = useRef(false); // 연결 상태를 useRef로 관리

    // WebSocket 연결
    const connect = (onConnected) => {
        // 토큰을 localStorage에서 가져오기 (로그인 시 저장된 토큰)
        const token = getToken();

        // // 이미 연결되어 있으면 재연결하지 않음
        // if (stompClient.current && isConnected.current) {
        //     console.log("Already connected to WebSocket");
        //     return; 
        // }

        const socket = new SockJS("http://3.36.151.72:8080/ws");
        const client = Stomp.over(socket);

        // Stomp 설정
        client.connectHeaders = {
            Authorization: `Bearer ${token}`  // JWT 토큰을 헤더에 추가
        };
        
        client.reconnectDelay = 5000; // 재연결 시도 지연 시간 (ms)
        client.debug = (msg) => console.log(msg); // 디버그 메시지 출력

        // 연결 성공
        client.onConnect = () => {
            console.log("WebSocket connected");
            isConnected.current = true;
            if (onConnected) onConnected(client); // 연결 후 작업 수행
        };

        // 연결 에러
        client.onStompError = (frame) => {
            console.error("WebSocket error", frame.headers["message"]);
            if (onError) onError(frame);
        };

        client.activate(); // 연결 활성화
        stompClient.current = client; // 클라이언트 저장
    };

    // WebSocket 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            console.log("Disconnecting WebSocket...");
            stompClient.current.deactivate(); // 비동기로 연결 종료
            isConnected.current = false;     // 연결 상태 초기화
        } else {
            console.warn("WebSocket client is not initialized.");
        }
    };

    // 메시지 전송 함수
    const sendMessage = (roomId, message) => {
        console.log(`연결상태: ${isConnected.current}`);
        if (stompClient.current && isConnected.current) {
            console.log(`roomId: ${roomId}`);
            stompClient.current.publish({
                destination: `/pub/chat/${roomId}`,
                body: JSON.stringify(message),
            });
        } else {
            console.error("WebSocket client is not connected.");
        }
    };

    // 다중 채팅방 구독
    const subscribeToRooms = (chatRoomIds, onMessageReceived) => {
        if (!stompClient.current || !chatRoomIds) return;

        chatRoomIds.forEach((roomId) => {
            stompClient.current.subscribe(`/sub/chat/${roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                console.log(`메시지:`, newMessage);
                onMessageReceived(roomId, newMessage);
            });
        });
    };

    // 단일 채팅방 구독
    const subscribeToRoom = (roomId, onMessageReceived) => {
        if (!stompClient.current || !roomId) return;

        // 채팅방 구독
        const subscription = stompClient.current.subscribe(`/sub/chat/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            console.log(`새 메시지:`, newMessage.body.data);
            onMessageReceived(newMessage.body.data); // 메시지를 콜백 함수로 전달
        });

        console.log(`Subscribed to room: ${roomId}`);
        return subscription; // 구독 정보를 반환하여 필요 시 관리할 수 있도록 함
    };

    // 알람 채팅방 구독
    const subscribeToAlarm = (userId, onMessageReceived) => {
        if (!stompClient.current){
            return;
        }

        // 채팅방 구독
        const subscription = stompClient.current.subscribe(`/sub/notifications/${userId}`, (message) => {
            const notification = JSON.parse(message.body);
            // console.log(notification);
            onMessageReceived(notification); // 메시지를 콜백 함수로 전달
        });

        return subscription; // 구독 정보를 반환하여 필요 시 관리할 수 있도록 함
    };

    return { connect, disconnect, sendMessage, subscribeToRooms, subscribeToRoom, subscribeToAlarm };
};