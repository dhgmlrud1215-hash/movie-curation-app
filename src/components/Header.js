function Header() {

    return (
        <header className="header">
            <h1 className="logo">MOVIE BOX</h1>

            <nav className="header-menu">
                <a href="#">
                    <img src="/icon/search.svg" alt="검색"/>
                </a>
                <a href="#">로그인</a>
                <a href="#">마이페이지</a>
            </nav>
        </header>
    );
}

export default Header;