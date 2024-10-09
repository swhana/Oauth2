import express from "express";
import { KakaoAuthCode } from "./Kakao.js";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";

dotenv.config(); //.env 환경변수 사용

const app = express();
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

app.get("/kakao/url", (req, res, next) => {
  const url = KakaoAuthCode;
  res.status(200).json({ url });
});

// launch server
server.listen(port, () => {
  console.log(`서버 가동 중`);
});
