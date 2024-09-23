import styled from "styled-components";
import Input from "../input/Input";
import { useInput } from "../../hooks/useInput";
import { isEmpty, isName, isMinMaxLength, isEqualLength, isMaxLength, isPw, isEqualValue } from "../../utils/validation";
import EmailForm from "./EmailForm";
import { useState } from "react";
import { LargeButton } from "../buttons/LargeButton";
import { useNavigate } from "react-router-dom";

const ButtonLayout = styled.div`
    //레이아웃
    width: 70%;
`;

const VerifiedMessage = styled.p`
    //레이아웃
    margin: 0;

    //스타일
    font-size: 12px;
    font-weight: 700;
    color: #32bd0c;
`;

const VerifiedMessageBox = styled.div`
    //레이아웃
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 0 0 0 12px;
`;

export default function SignUpForm(){
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isCheckPasswordEmpty, setIsCheckPasswordEmpty] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneHasError, setPhoneHasError] = useState(false);
    const [submitAttempt, setSubmitAttemt] = useState(false);
    const [isVerified, SetIsVerified] = useState(false);
    const [emailSubmitError, setEmailSubmitError] = useState({hasError: false});
    const navigate = useNavigate();

    //이름
    const {
        value: name,
        hasError: nameHasError,
        inputHandler: nameInputHandler,
    } = useInput('', (value) => isEmpty(value) || isName(value));

    //비밀번호
    const {
        value: password,
        hasError: passwordHasError,
        inputHandler: passwordInputHandler,
    } = useInput('', (value) => isEmpty(value) || isPw(value));

    //비밀번호 재확인
    const {
        value: checkPassword,
        hasError: checkPasswordHasError,
        inputHandler: checkPasswordInputHandler,
    } = useInput('', (value) => isEmpty(value) || isEqualValue(value, password));

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

    //회원가입 버튼 클릭 시 이벤트
    const handleSubmit = (e) => {
        //이름, 이메일, 연락처, 비밀번호 에러시 submit 막음
        if(isEmpty(name) || isEmpty(phone) || isEmpty(password) || isEmpty(checkPassword) || !isVerified
            || nameHasError || phoneHasError || passwordHasError || checkPasswordHasError){
            e.preventDefault();
            setSubmitAttemt(true);

            // 하위 컴포넌트에 에러를 객체로 전달(하위 컴포넌트 리렌더링을 위함)
            setEmailSubmitError({ hasError: true });
            // setTriggerEmailSubmitError(true);

            //비어있으면 state변경
            if(isEmpty(name)){
                setIsNameEmpty(true);
            }
            if(isEmpty(phone)){
                setIsPhoneEmpty(true);
            }
            if(isEmpty(password)){
                setIsPasswordEmpty(true);
            }
            if(isEmpty(checkPassword)){
                setIsCheckPasswordEmpty(true);
            }
            return;

        }

        //회원가입 성공시
        alert("회원가입 성공!");
        navigate("/signUpComplete");

    }

    return(
        <>
            <Input
                type="text"
                text="이름"
                id="name"
                placeholder=" 이름"
                value={name}
                onChange={(e)=>{
                    nameInputHandler(e),
                    setSubmitAttemt(false),
                    setIsNameEmpty(false)
                }}
                error={nameHasError || isNameEmpty ? "※이름은 한글, 영어 또는 숫자로 1~10자까지 입력 가능합니다." : null}
                shake={submitAttempt}
                margin="0 0 40px 0"
            />

            <EmailForm onVerificationSuccess={() => { SetIsVerified(true)}}
                        triggerEmailSubmitError={emailSubmitError}
            />
            {/* 인증 완료시 문구 출력 */}
            <VerifiedMessageBox>
                <VerifiedMessage>
                    {isVerified && "※이메일 인증이 완료되었습니다."}
                </VerifiedMessage>
            </VerifiedMessageBox>

            <Input
                type="text"
                text="연락처"
                id="phone"
                placeholder=" 010-0000-0000"
                value={phone}
                onChange={(e)=>{
                    phoneInputHandler(e),
                    setSubmitAttemt(false),
                    setIsPhoneEmpty(false)
                }}
                error={phoneHasError || isPhoneEmpty ? "※010-0000-0000 형식으로 입력해주세요." : null}
                shake={submitAttempt}
                margin="30px 0 40px 0"
            />

            <Input
                type="password"
                text="비밀번호"
                id="password"
                placeholder=" 비밀번호"
                value={password}
                onChange={(e)=>{
                    passwordInputHandler(e),
                    setSubmitAttemt(false),
                    setIsPasswordEmpty(false),
                    setIsCheckPasswordEmpty(false)
                }}
                error={passwordHasError || isPasswordEmpty ? "※특수문자 포함 (8~15자)" : null}
                shake={submitAttempt}
                margin="0 0 15px 0"
            />


            <Input
                type="password"
                id="checkPassword"
                placeholder=" 비밀번호 확인"
                value={checkPassword}
                onChange={(e)=>{
                    checkPasswordInputHandler(e),
                    setSubmitAttemt(false),
                    setIsPasswordEmpty(false),
                    setIsCheckPasswordEmpty(false)
                }}
                error={checkPasswordHasError || isCheckPasswordEmpty ? "※비밀번호가 일치하지 않습니다." : null}
                shake={submitAttempt}
                margin="0 0 20px 0"
            />

            <ButtonLayout>
                <LargeButton
                    backgroundColor="#fddc37"
                    fontColor="black"
                    hoverColor="#fce771"
                    title="회원가입"
                    margin="30px 0px 100px 0px"
                    onClick={handleSubmit}
                />
            </ButtonLayout>

        </>
    );
}