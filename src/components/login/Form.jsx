import Input from "../input/LoginInput";
import { useInput } from "../../hooks/useInput";
import { LargeButton } from "../buttons/LargeButton";
import { isMinLength, isMaxLength, isEmpty, isEmail} from "../../utils/validation"
import styled from "styled-components";
import { useState } from "react";

export default function Form(){
    const {
        value: emailValue,
        hasError: emailHasError, 
        inputHandler: emailInputHandler,
     } = useInput('', (value) => isEmpty(value) || isEmail(value));

    const {
        value: passwordValue,
        hasError: passwordHasError, 
        inputHandler: passwordInputHandler,
     } = useInput('', (value) => isEmpty(value) || (isMinLength(value, 8) && isMaxLength(value, 15)));

    // 에러가 발생했을 때 애니메이션을 트리거하기 위한 상태
    const [submitAttempt, setSubmitAttempt] = useState(false);

    //로그인 버튼을 눌렀을 때 처리
    const handleSubmit = (e) => {
        e.preventDefault();

        // 에러가 있으면 애니메이션을 트리거하는 상태 변경
        if (emailHasError || passwordHasError || isEmpty(emailValue) || isEmpty(passwordValue)) {
            setSubmitAttempt(true);
            return;
        }
        alert('로그인 성공!');
    };

    return(
        <form>
            <Input
                type="text"
                name="email"
                placeholder=" 이메일 아이디"
                value={emailValue}
                onChange={(e) => {
                    emailInputHandler(e);
                    setSubmitAttempt(false); // 다시 입력하면 흔들림 상태 리셋
                }}
                error={emailHasError || (submitAttempt && isEmpty(emailValue)) ? '※정확한 이메일 아이디를 입력하세요.' : null}
                borderColor={emailHasError || (submitAttempt && isEmpty(emailValue)) ?  '#f31d1d' : null}
                shake={submitAttempt && (emailHasError || isEmpty(emailValue))}
            />

            <Input
                type="password"
                name="password"
                placeholder=" 비밀번호"
                value={passwordValue}
                onChange={(e) => {
                    passwordInputHandler(e);
                    setSubmitAttempt(false); // 다시 입력하면 흔들림 상태 리셋
                }}
                error = {passwordHasError || (submitAttempt && isEmpty(passwordValue)) ? '※비밀번호는 8~15자리여야 합니다.' : null}
                borderColor={passwordHasError || (submitAttempt && isEmpty(passwordValue)) ? '#f31d1d' : null}
                shake={submitAttempt && (passwordHasError || isEmpty(passwordValue))}
            />

            <LargeButton 
                backgroundColor="#fddc37"
                fontColor="black"
                hoverColor="#fce771"
                title="로그인"
                margin="30px 0px 5px 0px"
                onClick={handleSubmit}
            />

        </form>
    );

}