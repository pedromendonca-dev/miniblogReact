import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
   <div className="app">
    <BrowserRouter>
    <Navbar/>
    <div className="container">
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
   </div>
  );
}

export default App;
