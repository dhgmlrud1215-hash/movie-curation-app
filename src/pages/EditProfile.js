import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";

function EditProfile() {
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
            setNickname(currentUser.displayName || "");
        } else {
            navigate("/login")
        }
       });

       return () => unsubscribe();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!nickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        try {
            await updateProfile(auth.currentUser, {
                displayName: nickname,
            });

            alert("정보가 수정되었습니다.");
            navigate("/mypage");
        }catch (error) {
            alert("정보 수정에 실패했습니다.")
        }
    };


    return(
        <div className="login-wrap">
            <h2>정보 수정</h2>

            <form onSubmit={handleUpdate} className="login-form">
                <input
                    type="text"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />

                <button type="submit">수정하기</button>
            </form>
        </div>
    );
}
export default EditProfile;