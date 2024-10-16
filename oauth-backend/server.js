import express from "express";
import { getAccessToken, getUserData, KakaoLoginUri } from "./Kakao.js";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";

dotenv.config(); //.env 환경변수 사용

const app = express();
const router = express.Router();
const port = 5000; // 포트 번호
const options = {
  key: fs.readFileSync("./keys/private.pem"),
  cert: fs.readFileSync("./keys/public.pem"),
};
const server = https.createServer(options, app);

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  next();
});

// routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/kakao/uri", (req, res) => {
  const uri = KakaoLoginUri; //redirect uri
  res.status(200).json({ uri });
});

//카카오 인가코드
app.get("/oauth/kakao", async (req, res) => {
  const code = req.query.code; //uri query에서 ?code=로 된 부분 가져오기
  console.log("code: " + code);
  const tokenData = await getAccessToken(code);
  const userData = await getUserData(tokenData.access_token);

  res.cookie("access-token", tokenData.access_token, {
    httpOnly: true,
    secure: true,
    maxAge: tokenData.expires_in,
    sameSite: "strict",
  });

  res.cookie("refresh-token", tokenData.refresh_token, {
    httpOnly: true,
    secure: true,
    maxAge: tokenData.refresh_token_expires_in,
    sameSite: "strict",
  });

  res.redirect(
    `${process.env.BASE_URL}/login/success?user=${encodeURIComponent(
      JSON.stringify(userData)
    )}`
  );
});

// launch server
server.listen(port, () => {
  console.log(`${port}포트에서 서버 가동 중`);
});
