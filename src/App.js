import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetail from './pages/MovieDetail'

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
