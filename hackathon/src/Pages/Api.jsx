// import axios from 'axios';

// const host = window.location.hostname === "localhost" 
//   ? 'http://52.79.177.156' // 로컬 환경에서는 직접 서버 URL로 요청
//   : "/api"; // 배포 환경에서는 /api를 사용

// const api = axios.create({
//   baseURL: host,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 세션 쿠키를 포함하기 위해 설정
// });

// export default api;


import axios from 'axios';

// 환경에 따라 baseURL 설정
const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키를 포함하기 위해 설정
});

export default api;