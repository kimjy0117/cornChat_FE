import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstanceForAuth from "../../api/auth/axiosInstanceForAuth";

// UserContext 생성
const UserContext = createContext();

// UserProvider로 Context 공급
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        statusMessage: "",
        userId: "",
        userName: "",
    });

    // user 상태 업데이트 시 로그 출력
    useEffect(() => {
        // 비동기적으로 사용자 정보 가져오기
        const fetchUserProfile = async () => {
            try {
                const myProfileResponse = await axiosInstanceForAuth.get("/user/profile");
                setUser(myProfileResponse.data.data);  // API 응답 값으로 상태 업데이트
            } catch (error) {
                console.error("API 요청 오류:", error);
            }
        };

        fetchUserProfile();
    }, []);  // 빈 배열로 한 번만 실행되도록 설정

    // 로그아웃 시 사용자 정보를 제거하는 함수
    const removeUserInfo = () => {
        setUser({
            statusMessage: "",
            userId: "",
            userName: "",
        });  // 사용자 정보 초기화
    };

    return (
        <UserContext.Provider value={{ user, removeUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);