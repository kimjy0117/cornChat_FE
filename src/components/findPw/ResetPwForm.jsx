import styled from "styled-components";
import { FormLayout, TitleLayout } from "../../style/formLayout";
import FindPwInput from "../input/Input";
import { LargeButton } from "../buttons/LargeButton";
import { useInput } from "../../hooks/useInput";
import { isEmpty, isPw, isEqualValue } from "../../utils/validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ResetPwArea = styled.div`
    width: 80%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function ResetPwForm({ verifiedEmail, verificationCode }){
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [isPwValueEmpty, setIsPwValueEmpty] = useState(false);
    const [isCheckPwValueEmpty, setIsCheckPwValueEmpty] = useState(false);
    const navigate = useNavigate();
    
    //비밀번호
    const {
        value: pwValue,
        hasError: pwHasError,
        inputHandler: pwInputHandler,
    } = useInput('', (value) => isEmpty(value) || isPw(value));

    //비밀번호 재확인
    const {
        value: checkPwValue,
        hasError: checkPwHasError,
        inputHandler: checkPwInputHandler,
    } = useInput('', (value) => isEmpty(value) || isEqualValue(value, pwValue));

    //비밀번호 변경 api 호출
    const findPwSubmit = async () => {
        const requestData = {
            email: verifiedEmail,
            code: verificationCode,
            password: pwValue
        };

        try{
            const response = await axiosInstance.patch('/user/findPw', requestData);
            console.log(response.data);
            navigate('/findPwComplete');
            
        } catch (error) {
            console.error('API 요청 오류:', error);
            alert(error.response.data.message);
        }
    };

    //비밀번호 변경 버튼을 눌렀을 때 처리
    const handleSubmit = (e) => {
        //비밀번호 에러시 submit 막음
        if( pwHasError || checkPwHasError || isEmpty(pwValue) || isEmpty(checkPwValue)){
            e.preventDefault();
            setSubmitAttempt(true);

            //비어있으면 state변경
            if(isEmpty(pwValue)){
                setIsPwValueEmpty(true);
            }
            if(isEmpty(checkPwValue)){
                setIsCheckPwValueEmpty(true);
            }
            return;
        }

        //비밀번호 변경 api 호출
        findPwSubmit();        
    }

    return (
        <ResetPwArea>
            <TitleLayout>
                <span>비밀번호 재설정</span>
            </TitleLayout>

            <FormLayout>
                <FindPwInput
                    type="password"
                    placeholder=" 비밀번호"
                    value = {pwValue}
                    onChange = {(e) => {
                        pwInputHandler(e);
                        setSubmitAttempt(false);
                        setIsPwValueEmpty(false);
                        setIsCheckPwValueEmpty(false);
                    }}
                    error = {pwHasError || isPwValueEmpty ? "※특수문자 포함 (8~15자)" : null}
                    shake = {submitAttempt}
                />
            </FormLayout>

            <FormLayout>
                <FindPwInput
                    type="password"
                    placeholder=" 비밀번호 재입력"
                    value = {checkPwValue}
                    onChange = {(e) => {
                        checkPwInputHandler(e);
                        setSubmitAttempt(false);
                        setIsPwValueEmpty(false);
                        setIsCheckPwValueEmpty(false);
                    }}
                    error = {checkPwHasError || isCheckPwValueEmpty ? "※비밀번호가 일치하지 않습니다." : null}
                    shake = {submitAttempt}
                />
            </FormLayout>
            
            <LargeButton
                backgroundColor="#fddc37"
                fontColor="black"
                hoverColor="#fce771"
                title="비밀번호 변경"
                margin="30px 0px 5px 0px"
                onClick={handleSubmit}
            />
        </ResetPwArea>

    );
}