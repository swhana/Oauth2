import React from "react";
import { useLocation } from "react-router-dom";

function LoginSuccess() {
  //유저 정보 받아오기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  const userData = user ? JSON.parse(decodeURIComponent(user)) : null;

  return (
    <div>
      <h1>로그인 성공</h1>
      <img src={userData?.properties.thumbnail_image} alt="" />
      <p>{userData?.properties.nickname}님 환영합니다</p>
    </div>
  );
}

export default LoginSuccess;
