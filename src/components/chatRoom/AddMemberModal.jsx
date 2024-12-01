import { useState, useEffect } from "react";
import { useInput } from "../../hooks/useInput";
import { isName } from "../../utils/validation";

import styled from "styled-components";
import { ScrollStyle } from "../../style/scrollStyle";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";
import SelectedFriend from "./SelectedFriend";
import SelectFriendProfile from "./SelectFriendProfile";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContainer = styled.div`
    background: #fff;
    padding: 5px 10px 10px 10px;
    border-radius: 5px;
    width: 300px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left;

`;


const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const CloseButton = styled.div`
    background-color: #fff;
    color: #717171;
    padding: 0px 9px 5px 9px;

    border: none;
    outline: none;
    border-radius: 5px;

    font-size: 20px;
    font-weight: 900;

    cursor: pointer;

    &:hover {
        background-color: #e1e1e1;
    }

    &:active{
        background-color: #c9c9c9
    }
`;

const Title = styled.p`
    margin: 0 0 10px 10px;
    font-size: 20px;
    font-weight: 900;    
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 80%;
    height: 35px;
    padding: 0;
    margin-left: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
`;

const SelectedFriendsContainer = styled.div`
    //레이아웃
    margin: 0 0 20px 10px;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: '10px';

`;

const UlLayout = styled.ul`
    padding-left: 10px;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const Submit = styled.div`
    background-color: ${(props) => (props.isSubmitOk ? "#ffef44" : "#e8e6e6")};

    color: ${(props) => (props.isSubmitOk ? "#191919" : "#c0c0c0")};
    padding: 7px 12px 7px 12px;
    margin: 20px 10px 10px 0;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 400;

    cursor: ${(props) => (props.isSubmitOk ? "pointer" : "default")};
`;

const ScrollContainer = styled(ScrollStyle)`
    height: calc(100% - 130px);
`;

const  SmallScrollContainer = styled(ScrollStyle)`
    height: 45px;  
`;



export default function AddMemberModal({members, friends, chatRoomData, onClose, onSuccess}){
    //친구 정보
    const [filteredFriends, setFilteredFriends] = useState(friends); // 필터링된 친구 목록
    const [selectedFriends, setSelectedFriends] = useState([]); // 선택된 친구
    const [alreadyRoomFriends, setAlreadyRoomFriends] = useState([]); //친구 중에 이미 멤버인 친구들

    //submit해도 되는지 여부
    const [isSubmitOk, setIsSubmitOk] = useState(false);

    //친구이름
    const {
        value: friendName,
        inputHandler: friendNameInputHandler,
    } = useInput('', (value) => isName(value));

    //채팅방에 멤버 추가 api로직
    const addMembersSubmit = async () => {
        const requestData = {
            //선택한 친구들중
            memberIds: selectedFriends
                //이미 채팅방 멤버는 필터링
                .filter(friend => !alreadyRoomFriends.some(aFriend => aFriend.friendId === friend.friendId))
                //아이디만 매핑
                .map(friend => friend.friendId)
        };

        try{
            const response = await axiosInstanceForAuth.post(`/chatrooms/addMembers/${chatRoomData.id}`, requestData);
            console.log(response.data);
            //성공시 요소들 제거
            setSelectedFriends([]);
            //성공시 재랜더링
            onSuccess();
            //성공시 모달창 닫음
            onClose();
        } catch (error){
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    }


    //처음 마운트될 때 선택된 친구 항목에 기존 멤버 추가
    useEffect(() => {
        // members의 id와 friends의 id가 일치하는 객체를 필터링
        const initialSelectedFriends = friends.filter(friend =>
            members.some(member => member.userId === friend.friendId)
        );
        //이미 채팅방 멤버인 친구들로 초기값 세팅
        setSelectedFriends(initialSelectedFriends);
        //이미 채팅방 멤버인 친구들 숫자
        setAlreadyRoomFriends(initialSelectedFriends);
    }, [])

    // 검색어가 변경될 때마다 친구 목록 필터링
    useEffect(() => {
        const filtered = friends.filter((friend) =>
            friend.friendNickname.toLowerCase().includes(friendName.toLowerCase())
        );
        setFilteredFriends(filtered);
    }, [friendName, friends, selectedFriends]);

    // 친구 선택 시 실행되는 함수
    const handleFriendSelect = (friend) => {
        //이미 채팅방 멤버면 함수종료
        if(members.some(member => member.userId === friend.friendId)){
            return;
        }

        setSelectedFriends((prevSelectedFriends) => {
            // 친구가 이미 선택되어 있으면, 배열에서 제거하고, 아니면 추가
            if (prevSelectedFriends.some((f) => f.friendId === friend.friendId)) {
                return prevSelectedFriends.filter((f) => f.friendId !== friend.friendId); // 친구가 이미 있으면 제거
            } else {
                return [...prevSelectedFriends, friend]; // 친구가 없으면 추가
            }
        });
    };

    //submit클릭 가능 유무 판단
    useEffect(() => {
        //선택된 친구가 한 명 이상이면 클릭가능
        if(selectedFriends.length > alreadyRoomFriends.length){
            setIsSubmitOk(true);
        }
        else{
            setIsSubmitOk(false);
        }
    }, [selectedFriends])

    //확인 버튼 클릭시 처리
    const submitHandler = () => {
        //submit가능한 상태면
        if(setIsSubmitOk){
            //멤버 추가 로직 생성
            addMembersSubmit();
        }
        return;       
    }

    return(
        <Overlay>
            <ModalContainer>
                <TopContainer>
                    <CloseButton title="닫기" onClick={onClose}>x</CloseButton>
                </TopContainer>

                <Title>대화상대 추가</Title>

                {/* 추가한 친구이름 명단 */}
                <SelectedFriendsContainer>
                    {selectedFriends
                        //기존 채팅방 멤버와 일치하지 않으면 보여줌
                        .filter(friend => !alreadyRoomFriends.some(f => f.friendId === friend.friendId))
                        .map(friend => (
                            <SelectedFriend 
                                key={friend.friendId}
                                selectedFriend={friend}
                                onSelectFriend={handleFriendSelect}
                            />
                    ))}
                </SelectedFriendsContainer>

                {/* 친구 이름 검색 */}
                <Input
                    type="text"
                    placeholder=" 친구 이름을 입력하세요"
                    value={friendName}
                    onChange={(e) => {
                        friendNameInputHandler(e)
                    }}
                />

                {/* 친구 선택 리스트 */}
                <ScrollContainer>
                    <UlLayout>
                        {filteredFriends.map((friend) => (
                            <SelectFriendProfile
                                key={friend.friendId}
                                friend={friend}
                                isSelected={selectedFriends.some((f) => f.friendId === friend.friendId)}
                                onSelectFriend={handleFriendSelect}
                            />
                        ))}
                    </UlLayout>
                </ScrollContainer>

                {/* 확인 버튼 */}
                <BottomContainer>
                    <Submit 
                        isSubmitOk={isSubmitOk}
                        onClick={submitHandler}
                        >확인</Submit>
                </BottomContainer>   
            </ModalContainer>
        </Overlay>
    );
};