import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from './pages/Home';
import Login from "./pages/Login";
import Join from "./pages/Join";
import Search from './pages/Search';
import Mypage from "./pages/Mypage";
import MovieDetail from './pages/MovieDetail';
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
    <>
      <a href="#main-content" className="skip-link">
        메인 콘텐츠 바로가기
      </a>
      
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>

    </>

      <Footer/>  
    </BrowserRouter>
  );
}

export default App;
