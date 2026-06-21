import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/">
        <h1 className="logo">MOVIE BOX</h1>
      </Link>

      <nav className="header-menu">
        <Link to="/search">
          <img src="/icon/search.svg" alt="" />
        </Link>

        {user ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;