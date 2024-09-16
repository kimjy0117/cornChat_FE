import { useEffect, useState } from "react";

export function useInput(value, validationFn) {
    const [inputValue, setInputValue] = useState(value);
    const valueIsValid = validationFn(inputValue);

    //value가 바뀔 때마다 inputValue 갱신
    const inputHandler = (e) => {
        setInputValue(e.target.value);
    }

    //inputValue가 바뀔 때마다 검증
    useEffect(()=>{
        validationFn(inputValue);
    }, [inputValue]);

    return{
        value: inputValue,
        hasError: !valueIsValid,
        inputHandler
    };
}