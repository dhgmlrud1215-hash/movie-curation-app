import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";

function Mypage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    alert("로그아웃 되었습니다.");
    navigate("/");

  const savedReserve = JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(savedReserve);
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

  return (
    <div className="mypage-wrap">
        <h2>마이페이지</h2>

        <div className="user-box">
            <p>닉네임: {user?.displayName || "닉네임 없음"}</p>
            <p>이메일: {user?.email}</p>
        </div>

        <div className="mypage-menu">
            <button onClick={() => navigate("/edit-profile")}>정보 수정</button>
            <button onClick={handleLogout}>로그아웃</button>
            <button className="danger" onClick={handleDelete}>회원 탈퇴</button>
        </div>

        <section className="mypage-section">
            <h3>예매 내역</h3>
            <p className="empty-text">아직 예매한 영화가 없습니다.</p>

            {reservations.length === 0 ? (
                <p className="empty-text">아직 예매한 영화가 없습니다.</p>
            ) : (
                reservations.map((item.index) => (
                    <div className="reserve-item" key={index}>
                        <p>{item.movetitle}</p>
                        <sapn>{item.date}</sapn>
                        <span>{item.people}</span>
                    </div>
                ))
            )}
        </section>

        <section className="mypage-section">
            <h3>찜한 영화</h3>
            <p className="empty-text">아직 찜한 영화가 없습니다.</p>
        </section>
    </div>
  );
}

export default Mypage;