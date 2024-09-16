import Input from "../input/LoginInput";
import { useInput } from "../../hooks/useInput";
import { LargeButton } from "../buttons/LargeButton";
import { isMinLength, isMaxLength, isEmpty, isEmail} from "../../utils/validation"
import styled from "styled-components";

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

    return(
        <form>
            <Input
                type="text"
                name="email"
                placeholder=" 이메일 아이디"
                value={emailValue}
                onChange={emailInputHandler}
                error={emailHasError && '※정확한 이메일 아이디를 입력하세요.'}
            />

            <Input
                type="password"
                name="password"
                placeholder=" 비밀번호"
                value={passwordValue}
                onChange={passwordInputHandler}
                error = {passwordHasError && '※비밀번호는 8~15자리여야 합니다.'}
            />

            <LargeButton 
                backgroundColor="#FCDF47"
                fontColor="black"
                title="로그인"
                margin="30px 0px 5px 0px"
                onClick={()=>alert("로그인")}
            />

        </form>
    );

}