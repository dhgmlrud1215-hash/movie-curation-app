import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      alert("이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-wrap">
      <h2>로그인</h2>

      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>로그인</button>

      <Link to="/join">
        <button>회원가입</button>
      </Link>
    </div>
  );
}

export default Login;