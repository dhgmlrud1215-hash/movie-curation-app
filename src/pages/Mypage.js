import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";

function Mypage() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const [selectedReserve, setSelectedReserve] = useState(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);

      const savedReserve =
        JSON.parse(localStorage.getItem("reservations")) || [];
      setReservations(savedReserve);

      const savedLikes =
        JSON.parse(localStorage.getItem("likedMovies")) || [];
      setLikes(savedLikes);
    } else {
      navigate("/login");
    }
    });

    return () => unsubscribe();
    }, [navigate]);
  
    const handleLogout = async () => {
        await signOut(auth);
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 탈퇴하시겠습니까?")) return;

    try {
      await deleteUser(auth.currentUser);
      alert("회원탈퇴 완료");
      navigate("/");
    } catch (error) {
      alert("다시 로그인 후 시도해주세요.");
    }
  };

  const handleCancel = (id) => {
    const confirmCancle = window.confirm("예매를 취소하시겠습니까?");

    if(!confirmCancle) return;

    setReservations(
      reservations.filter(item => item.id !== id)
    );
   };



  return (
    <div className="mypage-wrap">
      <h2>마이페이지</h2>

      <div className="user-box">
        <p>닉네임: {user?.displayName || "닉네임 없음"}</p>
        <p>이메일: {user?.email}</p>
      </div>

      <section className="mypage-section">
        <h3>예매 내역</h3>

        {reservations.length === 0 ? (
          <p className="empty-text">아직 예매한 영화가 없습니다.</p>
        ) : (
          reservations.map((item, index) => (
            <div className="reserve-item" key={item.id || index}>
              <div className="reserve-info">
                <p>{item.movieTitle}</p>
                <span>{item.date}</span>
                <span>{item.time}</span>
                <span>{item.people}명</span>
              </div>

              <div className="reserve-btns">
                <button onClick={() => setSelectedReserve(item)}>
                  상세확인
                </button>

                <button onClick={() => handleCancel(item.id)}>
                  예매취소
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="mypage-section">
        <h3>찜한 영화</h3>

        
        <div className="like-list">
        {likes.map((item) => (
            <div className="like-item" key={item.id}>
            {item.poster_path && (
                <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title}
                />
            )}
            <p>{item.title}</p>
            </div>
          ))}
          </div>
        </section>

      <div className="mypage-menu">
        <button onClick={() => navigate("/edit-profile")}>정보 수정</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button className="danger" onClick={handleDelete}>
          회원 탈퇴
        </button>
      </div>

      {selectedReserve && (
        <div className="modal-bg">
          <div className="reserve-modal">
            <h3>예매 상세</h3>
            <p>영화: {selectedReserve.movieTitle}</p>
            <p>날짜: {selectedReserve.date}</p>
            <p>시간: {selectedReserve.time}</p>
            <p>인원: {selectedReserve.people}명</p>

            <button onClick={() => setSelectedReserve(null)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;