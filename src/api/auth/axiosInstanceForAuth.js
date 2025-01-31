import axios from "axios";
import {getToken} from "../../utils/auth"
import axiosInstance from "../nonAuth/axiosInstance";

const axiosInstanceForAuth = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

axiosInstanceForAuth.interceptors.request.use(
  config => {
      const accessToken = getToken();

      if(accessToken){
          config.headers.Authorization = `Bearer ${accessToken}`;
          // console.log(`새로운 토큰2: ${accessToken}`);
      } 
      return config;
  },
  error => Promise.reject(error),
);


// 응답 인터셉터: Access Token 만료 처리
axiosInstanceForAuth.interceptors.response.use(
  (response) => response, // 성공 응답은 그대로 전달
  async (error) => {
      const originalRequest = error.config;
      // console.log(`에러 리스폰스: ${error.response.data}`);

      // Access Token 만료 시 처리 (401 Unauthorized)
      if (error.response.data == "access token expired" && !originalRequest._retry) {
        // console.log("에러처리 들어옴?");
          originalRequest._retry = true; // 무한 루프 방지 플래그 설정

          try {
              // Refresh Token을 이용해 새 Access Token 요청
              const refreshResponse = await axiosInstance.post("/token/reissue");

              console.log(refreshResponse.headers);
              const newAccessToken = refreshResponse.headers['authorization']

              // 새 Access Token 저장
              localStorage.setItem('accessToken', `${newAccessToken}`);

              // 원래 요청에 새 Access Token 추가
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

              console.log(`새로운 토큰: ${newAccessToken}`);

              // 원래 요청 재시도
              return axios(originalRequest);
          } catch (refreshError) {
              // Refresh Token도 만료된 경우 로그아웃 처리
              // window.location.href = "/"; // 시작 페이지로 이동
              console.error("리프레시토큰이 만료되었습니다.. 로그아웃됩니다...");
              return Promise.reject(refreshError);
          }
      }
      else if(error.response && error.response.status === 401){
        window.location.href = "/"; // 시작 페이지로 이동
        console.log("401에러!");
      }

      // 다른 에러는 그대로 반환
      return Promise.reject(error);
  }
);

export default axiosInstanceForAuth;


//get 사용 예시

/*
import { axiosInstance } from './path/to/this/file';

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/api/protected-endpoint');
    console.log(response.data);
  } catch (error) {
    console.error('API 요청 오류:', error);
  }
};
*/

//post 사용 예시
/*
const fetchData = async () => {
  const requestData = {
      "value": "value"
  };

  try {
    const response = await axiosInstance.post('/test', requestData);
    console.log(response.data);
    alert("api 요청 성공");
  } catch (error) {
    console.error('API 요청 오류:', error);
    alert(error.response.data.message);
  }
};
*/