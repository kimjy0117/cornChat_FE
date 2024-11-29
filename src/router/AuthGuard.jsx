import { getToken } from "../utils/auth";

export const AuthGuardMain = ({ children }) => {
    const token = getToken();

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
        return window.location.href = "/";;
    }

    // 토큰이 있으면 컴포넌트를 렌더링
    return children;
};

export const AuthGuardChatRoom = ({ children }) => {
    const token = getToken();

    // 토큰이 없으면 창을 닫음
    if (!token) {
        return window.close();;
    }

    // 토큰이 있으면 컴포넌트를 렌더링
    return children;
};