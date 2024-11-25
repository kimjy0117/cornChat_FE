import React from "react";
import styled from "styled-components";


const StyledSelectedFriend = styled.div`
    //레이아웃
    height: 20px;

    margin: 0 2px 0 2px;

    display: flex;
    justify-content: center;
    align-items: center;
    
    //스타일
    border-radius: 15px;
    border: 1px solid #a9a9a9;
    background-color: "white";

    cursor: pointer;

    & .name{
        //레이아웃
        margin: 3px;

        font-size: 10px;
        font-weight: 800;
    }
`;

export default function SelectedFriend({selectedFriend, onSelectFriend}){

    return (
        <StyledSelectedFriend
            onClick={() => onSelectFriend(selectedFriend)}
        >
            <div className="name">
                {selectedFriend.friendNickname}
            </div>

        </StyledSelectedFriend>
    );
}