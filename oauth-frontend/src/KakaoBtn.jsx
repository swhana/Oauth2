function KakaoBtn() {
  const API_URL = process.env.REACT_APP_API_URL;
  const fetchUrl = async () => {
    try {
      const res = await fetch(`${API_URL}/kakao/url`);
      const body = await res.json();

      document.location.href = body.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={fetchUrl}>
      <img src="img/kakao_login_medium_narrow.png" alt="kakao-btn" />
    </button>
  );
}

export default KakaoBtn;
