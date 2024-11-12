import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 7000,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    config => {
        const accessToken = sessionStorage.getItem('access');

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

export default axiosInstance;


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