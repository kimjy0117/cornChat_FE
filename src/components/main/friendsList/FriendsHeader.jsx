import React from "react";
import styled from "styled-components";
import addFriendImg from "../../../assets/globalImages/addFriend.png"
import settingImg from "../../../assets/globalImages/settingImg.png"
import { ContextMenu } from "../../../style/contextMenuStyle";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/nonAuth/axiosInstance";
import axiosInstanceForAuth from "../../../api/auth/axiosInstanceForAuth";

const FriendsHeaderStyle = styled.div`
    //레이아웃
    width: 100%;
    height: 50px;
    margin: 30px 0 10px 0;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & .title{
        font-size: 25px;
        font-weight: 700;
    }

    & .buttons{
        width: 25%;
        height: 40px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

const BusttonImage = styled.img`
    //레이아웃
    width: 25px; /* 원하는 크기로 조정 */
    height: 25px; /* 이미지 비율을 유지 */

    //효과
    cursor: pointer;
`;


export default function FriendsHeader({ onAddFriendClick, contextMenu, handleSettingContextMenu }){
    const navigate = useNavigate();

    //로그아웃 api 호출
    const logoutSubmit = async () => {
        try{
            await axiosInstance.post('/logout');

        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }

    //회원탈퇴 api 호출
    const deleteUserSubmit = async () => {
        try{
            await axiosInstanceForAuth.delete('/user/delete');

            //로컬스토리지에서 토큰 제거
            localStorage.removeItem("accessToken");
            
            //회원탈퇴 성공시 로그인 화면으로 이동
            navigate("/");

        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }

    const onLogout = () => {
        //로컬스토리지에서 토큰 제거
        localStorage.removeItem("accessToken");

        //로그아웃 api호출
        logoutSubmit();

        //로그아웃 후 로그인 화면으로 이동
        navigate("/");
    }

    const onDeleteUser = () => {
        if(window.confirm('정말로 탈퇴하시겠습니까?')){
            //삭제 api 호출
            deleteUserSubmit();
        }
    }

    return (
        <>
            <FriendsHeaderStyle>
                <div className="title">
                    친구
                </div>

                <div className="buttons">
                    <BusttonImage src={addFriendImg} alt="친구추가" onClick={onAddFriendClick}/>
                    <BusttonImage src={settingImg} alt="설정" onClick={handleSettingContextMenu} />
                </div>
            </FriendsHeaderStyle>


            {contextMenu.setting_visible && (
                <ContextMenu
                    className="context-menu"
                    style={{
                        top: contextMenu.y,
                        left: contextMenu.x,
                    }}
                >
                    <ul>
                        <li onClick={() => onLogout()}>로그아웃</li>
                        <li onClick={() => onDeleteUser()}>회원탈퇴</li>
                    </ul>
                </ContextMenu>
            )}
        </>
    );
};