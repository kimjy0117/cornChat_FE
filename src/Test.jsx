import React, {useState} from "react";
import { SmallButton } from "./components/Buttons/SmallButton";
import { LargeButton } from "./components/Buttons/LargeButton";

function Test() {
    const [count, setCount] = useState(0)
  
    return (
      <>
       <SmallButton title="인증하기" backgroundColor="#F7D93A" fontColor="white"></SmallButton>
       <LargeButton title="로그인" backgroundColor="#F7D93A" fontColor="black"></LargeButton>
       <LargeButton title="회원가입" backgroundColor="#A3A19A" fontColor="black"></LargeButton>
      </>
    )
  }
  
  export default Test
  