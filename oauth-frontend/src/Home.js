import "./Home.css";
import KakaoBtn from "./KakaoBtn";

function Home() {
  return (
    <div className="App">
      <h1>로그인 페이지</h1>
      <div className="buttons">
        <KakaoBtn />
        <div className="google-btn"></div>
        <div className="github-btn"></div>
        <div className="naver-btn"></div>
      </div>
    </div>
  );
}

export default Home;
