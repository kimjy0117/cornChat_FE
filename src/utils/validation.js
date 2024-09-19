//이메일 검증
export function isEmail(value){
    const emailPattern = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{2,3}$/;
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
    return value.length <= maxLength;
}

//문자열이 같은지 검증
export function isEqualLength(value, equalLength){
    return value.length == equalLength;
}

//비밀번호 일치 검증
export function isEqualValue(value, value2){
    return value === value2;
}

//숫자인지 검증
export function isNum(value){
    const numPattern = /^[0-9]+$/;
    return numPattern.test(value);
}