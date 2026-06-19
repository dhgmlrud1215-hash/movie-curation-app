import { Link } from "react-router-dom";

function Header() {

    return (
        <header className="header">
            <Link to="/">
                <h1 className="logo">MOVIE BOX</h1>
            </Link>

            <nav className="header-menu">
                <Link to="/search">
                    <img src="/icon/search.svg" alt="" />
                </Link>

                <Link to="/login">
                    로그인
                </Link>

                <Link to="/mypage">
                    마이페이지
                </Link>
            </nav>
        </header>
    );
}

export default Header;