import dotenv from "dotenv";

dotenv.config(); //.env 환경변수 사용

const API_KEY = process.env.KAKAO_API_KEY;
const API_URL = process.env.KAKAO_API_URL;
const REDIRECT_URL = process.env.REDIRECT_URL;

const getAuthCode = (API_KEY, REDIRECT_URL) => {
  return `${API_URL}?client_id=${API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
};

const KakaoAuthCode = getAuthCode(API_KEY, REDIRECT_URL);

//이제 여기에 인가코드를 POST해서 ACCESS TOKEN을 발급받는 함수가 필요함
const getAccessToken = async () => {
  const result = await fetch(`${API_URL}/oauth/token`, {
    body: KakaoAuthCode,
  });
};

export { KakaoAuthCode };
