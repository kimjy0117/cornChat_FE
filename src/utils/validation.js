//이메일 검증
export function isEmail(value){
    const emailPattern = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{3}$/;
    return emailPattern.test(value);
}

//비밀번호 검증
export function isPw(value){
    //특수문자 1자 이상 / 대소문자, 숫자, 특수문자 최소 8자 이상
    const pwPattern = /^(?=.*[!@#$%^&*()_+~])[A-Za-z\d!@#$%^&*()_+~]{8,}$/;
    return pwPattern.test(value);
}

//문자열이 비어있는지 검증
export function isEmpty(value){
    return !value || value.trim() === '';
}

//문자열의 최소 길이 검증
export function isMinLength(value, minLength){
    return value && value.length >= minLength;
}

//문자열의 최대 길이 검증
export function isMaxLength(value, maxLength){
    return value && value.length <= maxLength;
}

//비밀번호 일치 검증
export function isEqualValue(value, value2){
    return value === value2;
}