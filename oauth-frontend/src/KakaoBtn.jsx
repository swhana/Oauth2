function KakaoBtn() {
  const API_URL = process.env.REACT_APP_API_URL; //백엔드 API 요청 URL
  const fetchUri = async () => {
    try {
      //백엔드 서버로 로그인 요청 시도
      const res = await fetch(`${API_URL}/kakao/uri`);
      const body = await res.json();

      window.location.href = body.uri;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={fetchUri}>
      <img src="img/kakao_login_medium_narrow.png" alt="kakao-btn" />
    </button>
  );
}

export default KakaoBtn;
