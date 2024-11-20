import axios from "axios";
import {getToken} from "../../utils/auth"

const axiosInstanceForAuth = axios.create({
    baseURL: "http://localhost:8080/api",
    // timeout: 10000,
    withCredentials: true,
});

axiosInstanceForAuth.interceptors.request.use(
  config => {
      const accessToken = getToken();

      if(accessToken){
          config.headers.Authorization = `Bearer ${accessToken}`;
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

      // Access Token 만료 시 처리 (401 Unauthorized)
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // 무한 루프 방지 플래그 설정

          try {
              // Refresh Token을 이용해 새 Access Token 요청
              const refreshResponse = await axios.post(
                  "http://localhost:8080/api/token/reissue",
                  { withCredentials: true } // Refresh Token 쿠키 포함
              );

              const newAccessToken = refreshResponse.data.accessToken;

              // 새 Access Token 저장
              localStorage.setItem('accessToken', newAccessToken);

              // 원래 요청에 새 Access Token 추가
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

              // 원래 요청 재시도
              return axiosInstanceForAuth(originalRequest);
          } catch (refreshError) {
              // Refresh Token도 만료된 경우 로그아웃 처리
              console.error("리프레시토큰이 만료되었습니다.. 로그아웃됩니다...");
              window.location.href = "/"; // 시작 페이지로 이동
              // navigate("/");
              return Promise.reject(refreshError);
          }
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