import dotenv from "dotenv";
import axios from "axios";

dotenv.config(); //.env 환경변수 사용

const API_KEY = process.env.KAKAO_API_KEY;
const API_URL = process.env.KAKAO_API_URL;
const REDIRECT_URL = process.env.REDIRECT_URL;

//로그인 페이지 uri를 반환함
const getAuthCode = (API_KEY, REDIRECT_URL) => {
  return `${API_URL}/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
};

const KakaoLoginUri = getAuthCode(API_KEY, REDIRECT_URL);

//이제 여기에 인가코드를 POST해서 ACCESS TOKEN을 발급받는 함수가 필요함
const getAccessToken = async (code) => {
  const { data } = await axios.post(`${API_URL}/oauth/token`, null, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "authorization_code",
      client_id: API_KEY,
      redirect_uri: REDIRECT_URL,
      code: code,
    },
  });
  // console.log(data);

  return data;
};

//ACCESS TOKEN을 통해 유저 정보를 가져오는 함수
const getUserData = async (token) => {
  const { data } = await axios.post("https://kapi.kakao.com/v2/user/me", null, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log(data);
  // {
  //   id: 3752665515,
  //   connected_at: '2024-10-16T07:30:13Z',
  //   properties: {
  //     nickname: '한상원',
  //     profile_image: 'http://k.kakaocdn.net/dn/bwHH1a/btr02AeEAKs/eeOqvWRurCyNTXraMTk1W0/img_640x640.jpg',
  //     thumbnail_image: 'http://k.kakaocdn.net/dn/bwHH1a/btr02AeEAKs/eeOqvWRurCyNTXraMTk1W0/img_110x110.jpg'  },
  //   kakao_account: {
  //     profile_nickname_needs_agreement: false,
  //     profile_image_needs_agreement: false,
  //     profile: {
  //       nickname: '한상원',
  //       thumbnail_image_url: 'http://k.kakaocdn.net/dn/bwHH1a/btr02AeEAKs/eeOqvWRurCyNTXraMTk1W0/img_110x110.jpg',
  //       profile_image_url: 'http://k.kakaocdn.net/dn/bwHH1a/btr02AeEAKs/eeOqvWRurCyNTXraMTk1W0/img_640x640.jpg',
  //       is_default_image: false,
  //       is_default_nickname: false
  //     }
  //   }
  // }
  return data;
};

export { KakaoLoginUri, getAccessToken, getUserData };
