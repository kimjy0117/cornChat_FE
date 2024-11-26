import { useState } from "react";
import { useInput } from "../../../hooks/useInput";
import { isUserId, isMaxLength, isMinMaxLength, isEqualLength } from "../../../utils/validation";
import styled from "styled-components";
import axiosInstanceForAuth from "../../../api/auth/axiosInstanceForAuth";

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

const ButtonGroup = styled.div`
    display: flex;
    justify-content: start;
    gap: 10px;
    margin: 0 0 20px 10px;
`;

const ButtonDiv = styled.div`
    background: #fff;
    color: #000000;
    padding: 0 2px 0 0;

    border: none;
    border-radius: 0;
    border-bottom: ${(props) => (props.type ? "2px solid #9b9b9b" : "none")};
    outline: none;

    cursor: pointer;
`;

const InputContainer = styled.div`
    margin: 30px 0 20px 0;
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

const InputEx = styled.p`
    margin: 5px 0 0 15px;
    font-size: 10px;
    font-weight: 500;
    color: #838383;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const Submit = styled.div`
    background-color: ${(props) => (props.type ? props.userIdHasError ? "#e8e6e6" : "#ffef44" : 
                                                props.phoneHasError ? "#e8e6e6" : "#ffef44")};

    color: ${(props) => (props.type ? props.userIdHasError ? "#c0c0c0" : "#191919" : 
                                                props.phoneHasError ? "#c0c0c0" : "#191919")};
    padding: 7px 12px 7px 12px;
    margin: 100px 10px 10px 0;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 400;

    cursor: ${(props) => (props.type ? props.userIdHasError ? "default" : "pointer" : 
                                        props.phoneHasError ? "default" : "pointer")};
`;

const Error = styled.p`
    margin: 5px 0 0 15px;
    font-size: 10px;
    font-weight: 500;
    color: #ff1919;
`;

export default function AddFriendModal({isOpen, closeModal, onSuccess }){
    //modal이 열려있지 않으면 아무것도 렌더링하지 않음
    if (!isOpen)
        return null;

    const [inputType, setInputType] = useState("id");

    //전화번호
    const [phone, setPhone] = useState('');
    const [phoneHasError, setPhoneHasError] = useState(true);

    //아이디
    const {
        value: userId,
        hasError: userIdHasError,
        inputHandler: userIdInputHandler,
    } = useInput('', (value) => isUserId(value));

    //api에러 상태
    const [idApiError, setIdApiError] = useState(false);
    const [phoneApiError, setPhoneApiError] = useState(false);

    //api에러 문구
    const [idApiErrorMessage, setIdApiErrorMessage] = useState(null);
    const [phoneApiErrorMessage, setPhoneApiErrorMessage] = useState(null);


    
    //아이디로 친구추가 api호출
    const addFriendByIdSubmit = async () => {
        const requestData = new URLSearchParams();
        requestData.append('friendId', userId);

        try {
            const response = await axiosInstanceForAuth.post('/friends/requestById', requestData);

            //성공시 재랜더링
            onSuccess();
            //성공시 모달창 닫음
            closeModal();
        } catch (error) {
            console.error('API 요청 오류:', error);
            setIdApiErrorMessage(error.response.data.message);
            setIdApiError(true);
        }
    }


    //전화번호로 친구추가 api호출
    const addFriendByPhoneSubmit = async () => {
        const requestData = new URLSearchParams();
        requestData.append('phoneNum', phone.replace(/-/g, ""));

        try {
            const response = await axiosInstanceForAuth.post('/friends/requestByPhoneNum', requestData);

            //성공시 재랜더링
            onSuccess();
            //성공시 모달창 닫음
            closeModal();
        } catch (error) {
            console.error('API 요청 오류:', error);
            setPhoneApiErrorMessage(error.response.data.message);
            setPhoneApiError(true);
        }
    }

    const handleButtonClick = (type) => {
        setInputType(type);
    };

    //핸드폰번호 형태 변환
    const phoneInputHandler = (e) => {
        let phoneNumber = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
        setPhoneHasError(true);

        // 길이 제한 설정: 11자리까지만 입력 가능
        if (!isMaxLength(phoneNumber, 11)) {
            phoneNumber = phoneNumber.slice(0, 11);
        }
        if (isMinMaxLength(phoneNumber, 4, 7)) {
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{1,4})/, "$1-$2"); // 000-000 형식
        } 
        else if (isMinMaxLength(phoneNumber, 8, 10)) {
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3"); // 000-000-0000 형식
        } 
        else if (isEqualLength(phoneNumber, 11)) {
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형식
            setPhoneHasError(false);
        }
        setPhone(phoneNumber);
    }

    //친구추가 버튼 클릭시 처리
    const submitHandler = () => {
        //아이디
        if(inputType === "id"){
            //에러확인
            if(userIdHasError){
                return;
            }
            else{
                //친구추가 api호출
                addFriendByIdSubmit();
            }
        }

        //전화번호
        else{
            if(phoneHasError){
                return;
            }
            else{
                //친구추가 api호출
                addFriendByPhoneSubmit();
            }

        }
    }

    return (
        <Overlay>
            <ModalContainer>
                <TopContainer>
                    <CloseButton title="닫기" onClick={closeModal}>x</CloseButton>
                </TopContainer>

                <Title>친구추가</Title>

                <ButtonGroup>
                    <ButtonDiv title="콘챗ID로 친구추가" onClick={() => handleButtonClick("id")} type={inputType==="id"}>ID로 추가</ButtonDiv>
                    <ButtonDiv title="전화번호로 친구추가" onClick={() => handleButtonClick("phone")} type={inputType==="phone"}>
                        전화번호로 추가
                    </ButtonDiv>
                </ButtonGroup>

                {inputType && (
                    <InputContainer>
                        {inputType === "id" ? (
                            <>
                                <Input 
                                    type="text" 
                                    placeholder=" 아이디를 입력하세요"
                                    value={userId}
                                    onChange={(e) => {
                                        userIdInputHandler(e),
                                        setIdApiError(false)}
                                    }
                                />
                                {idApiError ? (
                                    <Error>{idApiErrorMessage}</Error>
                                ):(
                                    <InputEx>콘챗 ID로 친구추가를 해보세요!</InputEx>
                                )}
                            </>
                        ) : (
                            <>
                                <Input 
                                    type="text" 
                                    placeholder=" 전화번호를 입력하세요"
                                    value={phone}
                                    onChange={(e) => {
                                        phoneInputHandler(e),
                                        setPhoneApiError(false)}
                                    }  
                                />
                                {phoneApiError ? (
                                    <Error>{phoneApiErrorMessage}</Error>
                                ):(
                                    <InputEx>전화번호로 친구추가를 해보세요!</InputEx>
                                )}
                            </>
                        )}
                    </InputContainer>
                )}

                <BottomContainer>
                    <Submit 
                        type={inputType==="id"} 
                        phoneHasError={phoneHasError} 
                        userIdHasError={userIdHasError}
                        onClick={submitHandler}
                        >친구 추가</Submit>
                </BottomContainer>    
            </ModalContainer>
        </Overlay>
    );
}