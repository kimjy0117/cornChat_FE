import Input from "../input/FindPwInput";
import { useInput } from "../../hooks/useInput";
import { SmallButton } from "../buttons/SmallButton";
import { FormLayout, Form } from "./FormLayout";

export default function CertificationForm(){
    // const [certificationValue, certificationInputHandler] = useInput('');

    return(
        <Form>
            <FormLayout>
                <Input
                    type="text"
                    name="certification"
                    placeholder=" 인증번호를 입력해주세요"
                    // value={certificationValue}
                    // onChange={certificationInputHandler}
                    error="※인증번호를 다시 확인해주세요"
                />

                <SmallButton
                    backgroundColor="#F7D93A"
                    fontColor="white"
                    title="확인"
                    onClick={()=>alert("인증확인")}
                />
            </FormLayout>
        </Form>
    );
}