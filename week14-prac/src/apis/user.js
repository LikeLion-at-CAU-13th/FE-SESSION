import axios from "axios";
import { getAuthAxios } from "./authAxios";

const baseURL = `https://likelion-cau.r-e.kr`;

export const signUp = async (id, pw, name, age) => {
  const result = await axios.post(`${baseURL}/accounts/signup/`, {
    id,
    pw,
    name,
    age,
  });
  return result;
};

export const login = async (id, pw) => {
  const result = await axios.post(`${baseURL}/accounts/login/`, {
    id,
    pw,
  });
  return result.data;
};

// export const getMyPage = async (token) => {
//   try {
//     // 1차 요청: 기존 accessToken으로 요청
//     const response = await axios.get(`${baseURL}/accounts/mypage`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;

//   } catch (error) {
//     // accessToken이 만료된 경우
//     if (error.response?.status === 401) {
//       try {
//         // 1. 새 토큰 발급 시도
//         const newTokens = await getNewRefreshToken();

//         // 2. localStorage 업데이트
//         localStorage.setItem("access", newTokens.accessToken);
//         localStorage.setItem("refresh", newTokens.refreshToken);

//         // 3. 새 토큰으로 요청 재시도
//         const retryResponse = await axios.get(`${baseURL}/accounts/mypage`, {
//           headers: {
//             Authorization: `Bearer ${newTokens.accessToken}`,
//           },
//         });
//         return retryResponse.data;

//       } catch (refreshError) {
//         alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
//         throw refreshError;
//       }
//     } else {
//       throw error;
//     }
//   }
// };

export const getMyPage = async (token) => {
  const authAxios = getAuthAxios(token);
  const result = authAxios.get("/accounts/mypage");
  return result;
};

//access token이 만료되면 refresh token을 사용해 새 access token을 받아오는 함수
export const getNewRefreshToken = async () => {
  try {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    const result = await axios.post(
      `${baseURL}/accounts/refresh`,
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    // 토큰이 만료되었을 경우
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
  }
};
