import React from "react";
import styled from "styled-components";
import createChatRoomImg from "../../../assets/globalImages/createChatRoom.png"

const ChatRoomHeaderStyle = styled.div`
    //레이아웃
    width: 100%;
    height: 50px;
    margin: 30px 0 5px 0;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & .title{
        margin-left: 10px;
        font-size: 25px;
        font-weight: 700;
    }

    & .buttons{
        width: 25%;
        height: 40px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`;

const BusttonImage = styled.img`
    //레이아웃
    width: 27px; /* 원하는 크기로 조정 */
    height: 25px; /* 이미지 비율을 유지 */

    //효과
    cursor: pointer;
`;

export default function ChatRoomHeader({ onCreateChatRoomClick }){
    return (
        <>
            <ChatRoomHeaderStyle>
                <div className="title">
                    채팅
                </div>

                <div className="buttons">
                    <BusttonImage src={createChatRoomImg} alt="새로운 채팅" onClick={onCreateChatRoomClick}/>
                </div>
            </ChatRoomHeaderStyle>
        </>
    );
};