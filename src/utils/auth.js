export function getToken() {
    const token = localStorage.getItem('accessToken');
  
    return token;
  }