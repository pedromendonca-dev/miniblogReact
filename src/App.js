import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';
import { useState, useEffect } from 'react';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user,setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const loading = user === undefined

  useEffect (()=>{
    onAuthStateChanged(auth,(user)=>
    {setUser(user)}
  )
  },auth)

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route 
              path="/register" 
              element={!user ? <Register />: <Navigate to ='/'/>} />

              <Route 
              path="/login" 
              element={!user ? <Login />: <Navigate to ='/'/>} />

              <Route 
              path="/posts/create" 
              element={user ? <CreatePost/>: <Navigate to ='/'/>} />
              
              <Route 
              path="/dashboard" 
              element={user ? <Dashboard />: <Navigate to ='/'/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
