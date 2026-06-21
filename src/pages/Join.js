import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";

function Join() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: nickname,
      });

      alert("회원가입 완료!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrap">
      <h2>회원가입</h2>

      <input
        type="text"
        placeholder="닉네임"
        onChange={(e) => setNickname(e.target.value)}
      />

      <input
        type="email"
        placeholder="이메일 (예: test@test.com)"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호 (6자리 이상)"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button onClick={handleJoin}>회원가입</button>
    </div>
  );
}

export default Join;