import React from "react";
import profileImg from "../../../assets/globalImages/blue_prorofileImg.png";
import styled from "styled-components";

const StyledSelectFriendProfile = styled.li`
    //레이아웃
    width: 100%;
    height: 50px;

    padding: 2px;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    //스타일
    background-color: white;
    list-style: none;
    border-radius: 10px;

    & .info{
        width: 75%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left: 13px;
    }

    & .name{
        margin: 3px 0 3px 0;
        font-size: 15px;
        font-weight: 500;
    }

    //효과
    &:hover {
        background-color: #f0f0f0; /* 회색 음영 */
    }
    &:active {
        background-color: #e0e0e0; /* 클릭 시 조금 더 진한 음영 */
    }
`;

const ProfileImage = styled.img`
    //레이아웃
    width: 40px; /* 원하는 크기로 조정 */
    height: 40px; /* 이미지 비율을 유지 */
`;

const SelectPoint = styled.div`
    //레이아웃    
    width: 20px;
    height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    //스타일
    border-radius: 50%;
    border: 2px solid #b4b4b4;
    background-color: ${(props) => (props.isSelected ? "#ffe732" : "white")};
    cursor: pointer;

    & .check{
        margin-bottom: 3px;

        font-size: 20px;
        font-weight: 800;

        color: ${(props) => (props.isSelected ? "#664d13" : "white")};
    }
`;

export default function SelectFriendProfile({friend, isSelected, onSelectFriend}){
    // console.log({isSelected});
    return (
        <StyledSelectFriendProfile
            onClick={() =>onSelectFriend(friend)}
        >
            <ProfileImage src={profileImg} alt="이미지 오류..."/>
            <div className="info">
                <p className="name">{friend.friendName}</p>

                <SelectPoint isSelected={isSelected}>
                    <div className="check">
                        v
                    </div>
                </SelectPoint>
            </div>


        </StyledSelectFriendProfile>
    );
};