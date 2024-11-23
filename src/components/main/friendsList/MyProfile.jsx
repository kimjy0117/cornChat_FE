import React, {useState} from "react";
import styled from "styled-components";
import profileImg from "../../../assets/globalImages/blue_prorofileImg2.png";
import { ContextMenu } from "../../../style/contextMenuStyle";
import axiosInstanceForAuth from "../../../api/auth/axiosInstanceForAuth";

const ProfileContainer = styled.div`
    //레이아웃
    width: 100%;
    height: 70px;

    padding-left: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    //스타일
    background-color: white;
    border-radius: 10px;

    & .info{
        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-left: 13px;
    }

    & .name{
        margin: 5px 0 5px 0;
        font-size: 20px;
        font-weight: 500;
    }

    & .status{
        margin: 0 0 5px 5px;
        font-size: 12px;
        font-weight: 300;
        color: #484848;
    }

    &:hover {
    background-color: #f0f0f0;
    }
    &:active {
        background-color: #e0e0e0; /* 클릭 시 조금 더 진한 음영 */
    }
`;

const ProfileImage = styled.img`
    //레이아웃
    width: 60px; /* 원하는 크기로 조정 */
    height: 60px; /* 이미지 비율을 유지 */

    border-radius: 200;
`;

export default function MyProfile({ profile, contextMenu, onContextMenu, onSuccess }) {

    //내 이름 수정 api 호출
    const setNameSubmit = async (newName) => {
        console.log(newName);
        try {
            await axiosInstanceForAuth.patch(`/user/name?userName=${newName}`);

            //성공시 재랜더링
            onSuccess();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }

    //상태메시지 수정 api 호출
    const setStatusSubmit = async (newStatusMessage) => {
        try {
            await axiosInstanceForAuth.patch(`/user/statusMessage?statusMessage=${newStatusMessage}`);

            //성공시 재랜더링
            onSuccess();
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }


    //내 프로필
    //이름 수정
    const onRename = () => {
        const newName = prompt(`새로운 이름을 입력하세요`);
        if(!newName){
            return;
        }

        //api 호출
        setNameSubmit(newName);
    }

    //상메 수정
    const onSetStatus = () => {
        const newStatusMessage = prompt(`새로운 상태메시지를 입력하세요`);
        if(!newStatusMessage){
            return;
        }

        //api 호출
        setStatusSubmit(newStatusMessage);
    }

    //챗방 열기
    const onChat = (profile) => {
        alert(`${profile}, 나와의 채팅방이 열립니다!`);
        //api호출
    }


    return (
        <>
        <ProfileContainer
            className = "myProfile"
            onDoubleClick={() => onChat(profile)} //더블 클릭 시 
            onContextMenu={onContextMenu}
        >
            <div className="profileImg">
                <ProfileImage src={profileImg} alt="이미지 오류..."/>
            </div>
            <div className="info">
                <p className="name">{profile.userName}</p>
                <p className="status">{profile.statusMessage || ""}</p>
            </div>
        </ProfileContainer>

        {contextMenu.my_visible && (
            <ContextMenu
                className="context-menu"
                style={{
                    top: contextMenu.y,
                    left: contextMenu.x,
                }}
            >
                <ul>
                    <li onClick={() => onChat(profile)}>나와의 채팅방 열기</li>
                    <li onClick={() => onRename(profile)}>이름 수정</li>
                    <li onClick={() => onSetStatus(profile)}>상태메시지 수정</li>
                </ul>
            </ContextMenu>
        )}
    </>
    );
};