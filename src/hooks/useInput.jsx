import { useState } from "react";

export function UseInput(initialValue) {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return[inputValue, handleChange];
}