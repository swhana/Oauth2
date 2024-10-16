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
  console.log(data);

  return data;
};

export { KakaoLoginUri, getAccessToken };
