import React, { useState, useEffect } from "react";
import Input from "../input/Input";
import { useInput } from "../../hooks/useInput";
import { FormLayout, TitleLayout } from "../../style/formLayout";
import {SmallButton} from "../buttons/SmallButton";
import { isEmail, isEmpty, isMaxLength, isEqualLength } from "../../utils/validation";

//인증번호 더미데이터
const certificationNum = "000000";

export default function EmailForm({ onVerificationSuccess, triggerEmailSubmitError }){
    const [isShake, setIsShake] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [emailSubmitError, setEmailSubmitError] = useState(false);

    const [certificationValue, setCertificationValue] = useState('');
    const [certificationHasError, setCertificationHasError] = useState(false);
    const [certificationOverLength, setCertificationOverLength] = useState(false);
    const [isCertificationSuccess, setIsCertificationSuccess] = useState(false);

    //이메일 값
    const {
        value: emailValue,
        hasError: emailHasError,
        inputHandler: emailInputHandler,
     } = useInput('', (value) => isEmpty(value) || isEmail(value));

     const sendCertificationNum = (e) => {
        //이메일 전송 시 형식이 안맞으면 전송을 막고 에러를 띄움
        if (emailHasError || isEmpty(emailValue)){
            e.preventDefault();
            setIsShake(true);

            if(isEmpty(emailValue)){
                setIsEmailEmpty(true);
            }
        }
        //submit을 하면 isSubmit을 true로 변경
        else{
            alert('이메일 전송');
            setIsSubmit(true);
            setEmailSubmitError(false);
        }
    }

    const submitChangeHandler = (e) => {
        if(!isEmpty(e.target.value)){
            setIsEmailEmpty(false);
        }
        setIsShake(false);
        setEmailSubmitError(false);
    }

    //인증번호 입력에 6자리 이상 들어갈 경우 더이상 못적도록 막음
    const certificationInputHandler = (e) => {
        const certificationNum = e.target.value;

        setCertificationHasError(false);
        
        if(isMaxLength(certificationNum, 6)){
            setCertificationValue(certificationNum);
            setCertificationOverLength(false);
        } else {
            setCertificationOverLength(true);
        }
    }

    const checkCertification = (e) => {
        //이메일 전송을 안했으면 인증을 막음
        if(!isSubmit){
            e.preventDefault();
            setEmailSubmitError(true);
        }
        //이메일 전송을 했으면 인증로직
        else{
            //인증번호 길이가 다를 경우 에러처리
            if(!isEqualLength(certificationValue, 6)){
                e.preventDefault();
                setCertificationHasError(true);
            }
            //서버로 값 전송
            else{
                setCertificationHasError(false);
                alert("인증번호 검증");
            
                //인증 성공
                if(certificationValue == certificationNum){
                    alert("인증성공!");

                    //인증 성공여부
                    setIsCertificationSuccess(true);

                    // 인증 성공 시 상위 컴포넌트에서 전달된 콜백 호출
                    onVerificationSuccess(); 
                }
                //인증 실패
                else{
                    setCertificationHasError(true);
                }
            }
        }
    }

    // 상위 컴포넌트에서 전달된 콜백 함수 실행
    useEffect(() => {
        if (triggerEmailSubmitError.hasError) {
            //이메일 전송을 안했으면 이메일 인풋 에러처리
            if(!isSubmit){
                setEmailSubmitError(true);
            }
            else{
                //이메일 전송을 했으면 인증번호 인풋 에러처리
                setCertificationHasError(true);
            }
        }
    }, [triggerEmailSubmitError]);

    return(
        <>
            <TitleLayout>
                <span>이메일</span>
            </TitleLayout>
            
            {/* email인증 레이아웃 */}
            <FormLayout>
                <Input
                    type="email"
                    id="email"
                    placeholder=" 이메일 (example@email.com)"
                    value = {emailValue}
                    onChange = {(e) => {
                        emailInputHandler(e);
                        submitChangeHandler(e);
                    }}
                    error={emailSubmitError ? '※이메일 인증을 해주세요.' : emailHasError || isEmailEmpty ? '※이메일을 정확히 입력해주세요.' : null }
                    shake={emailSubmitError || isEmailEmpty || isShake}
                />

                <SmallButton
                    backgroundColor={isSubmit ? "#808080" : "#F7D93A"}
                    fontColor="white"
                    hoverColor={isSubmit ? "#afaca8" : "#fae26a"}
                    title={isSubmit ? '재발송' : '인증하기'}
                    type="button"
                    onClick={sendCertificationNum}
                    margin="5px 0 0 0"
                />
            </FormLayout>

            {/* 인증번호 레이아웃 인증 성공시 숨김*/}
            {!isCertificationSuccess && (
                <FormLayout>
                    <Input
                        type="number"
                        name="certification"
                        placeholder=" 인증번호를 입력해주세요"
                        value={certificationValue}
                        onChange={certificationInputHandler}
                        error={certificationHasError ? '※인증번호를 다시 확인해주세요' : certificationOverLength ? '※인증번호는 최대 6자리 입니다' : null}
                        shake={certificationHasError || certificationOverLength}
                    />

                    <SmallButton
                        backgroundColor="#F7D93A"
                        fontColor="white"
                        hoverColor="#fae26a"
                        title="확인"
                        type="button"
                        onClick={checkCertification}
                        margin="5px 0 0 0"
                    />
                </FormLayout>
            )}
        </>
    );
}