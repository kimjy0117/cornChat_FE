import Input from "../input/LoginInput";
import { useInput } from "../../hooks/useInput";
import { LargeButton } from "../buttons/LargeButton";
import { isMinLength, isMaxLength, isEmpty, isEmail} from "../../utils/validation"
import { useState } from "react";
import axiosInstance from "../../api/nonAuth/axiosInstance";

export default function Form(){
    // 에러가 발생했을 때 애니메이션을 트리거하기 위한 상태
    const [submitAttempt, setSubmitAttempt] = useState(false);

    //아이디 혹은 비밀번호 일치 여부
    const [loginError, setLoginError] = useState(false);

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

    //로그인 요청 api호출
    const loginSubmit = async () => {
        const requestData = new URLSearchParams();
        requestData.append('email', emailValue);
        requestData.append('password', passwordValue);
        
        try {
            const response = await axiosInstance.post('/login', requestData);

            const accessToken = response.headers['authorization']
            localStorage.setItem('accessToken', `${accessToken}`);

            alert("로그인 성공");
          } catch (error) {
            console.error('API 요청 오류:', error);
            //로그인 검증 실패
            setLoginError(true);
          }
    };

    //로그인 버튼을 눌렀을 때 처리
    const handleSubmit = (e) => {
        e.preventDefault(); //새로고침 방지

        // 에러가 있으면 애니메이션을 트리거하는 상태 변경
        if (emailHasError || passwordHasError || isEmpty(emailValue) || isEmpty(passwordValue)) {
            e.preventDefault();
            setSubmitAttempt(true);
            return;
        }
        
        //로그인 api 함수 호출
        loginSubmit();
    };

    return(
        <form onSubmit={handleSubmit}> {/*onSubmit 이벤트로 폼 제출*/}
            <Input
                type="text"
                name="email"
                placeholder=" 이메일 아이디"
                value={emailValue}
                onChange={(e) => {
                    emailInputHandler(e);
                    setSubmitAttempt(false); // 다시 입력하면 흔들림 상태 리셋
                    setLoginError(false); // 다시 입력하면 에러 상태 리셋
                }}
                error={emailHasError || (submitAttempt && isEmpty(emailValue)) ? '※정확한 이메일 아이디를 입력하세요.' : loginError ? '※이메일을 다시 확인해주세요.' : null}
                borderColor={emailHasError || (submitAttempt && isEmpty(emailValue)) ?  '#f31d1d' : null}
                shake={(submitAttempt && (emailHasError || isEmpty(emailValue))) || loginError}
            />

            <Input
                type="password"
                name="password"
                placeholder=" 비밀번호"
                value={passwordValue}
                onChange={(e) => {
                    passwordInputHandler(e);
                    setSubmitAttempt(false); // 다시 입력하면 흔들림 상태 리셋
                    setLoginError(false); // 다시 입력하면 에러 상태 리셋
                }}
                error = {passwordHasError || (submitAttempt && isEmpty(passwordValue)) ? '※비밀번호는 8~15자리여야 합니다.' : loginError ? '※비밀번호를 다시 확인해주세요.' : null}
                borderColor={passwordHasError || (submitAttempt && isEmpty(passwordValue)) ? '#f31d1d' : null}
                shake={(submitAttempt && (passwordHasError || isEmpty(passwordValue))) || loginError}
            />

            <LargeButton 
                backgroundColor="#fddc37"
                fontColor="black"
                hoverColor="#fce771"
                title="로그인"
                margin="30px 0px 5px 0px"
                type="submit"
            />

        </form>
    );

}