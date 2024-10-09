import dotenv from "dotenv";

dotenv.config(); //.env 환경변수 사용

const API_KEY = process.env.KAKAO_API_KEY;
const API_URL = process.env.KAKAO_API_URL;
const REDIRECT_URL = process.env.REDIRECT_URL;

const AuthCode = (API_KEY, REDIRECT_URL) => {
  return `${API_URL}?client_id=${API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
};

const KakaoAuthCode = AuthCode(API_KEY, REDIRECT_URL);

export { KakaoAuthCode };
