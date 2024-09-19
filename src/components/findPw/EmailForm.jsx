import React, { useEffect, useState } from "react";
import Input from "../input/FindPwInput";
import { useInput } from "../../hooks/useInput";
import { SmallButton } from "../buttons/SmallButton";
import { FormLayout, Form } from "./FormLayout";
import styled from "styled-components";
import { isEmail, isEmpty } from "../../utils/validation";

const Title = styled.div`
    //레이아웃
    width: 100%;
    display: flex;
    text-align: start;
    margin-bottom: 5px;

    //폰트
    font-size: 20px;
    font-weight: 700;
`;

export default function EmailForm(){
    const {
        value: emailValue,
        hasError: emailHasError,
        inputHandler: emailInputHandler,
     } = useInput('', (value) => isEmpty(value) || isEmail(value));

    return(
        <>
        <Title>
            <span>이메일</span>
        </Title>
            <Form>
                <FormLayout>
                    <Input
                        type="email"
                        name="email"
                        placeholder=" 이메일 (example@email.com)"
                        value = {emailValue}
                        onChange = {emailInputHandler}
                        error={emailHasError && '※이메일을 정확히 입력해주세요.'}
                    />

                    <SmallButton
                        backgroundColor="#F7D93A"
                        fontColor="white"
                        title="인증하기"
                        type="submit"
                    />
                </FormLayout>
            </Form>
        </>
    );
}