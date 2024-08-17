import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Blogs from './components/Blogs'
import Myblogs from "./components/Myblogs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Createblog from "./components/Createblog";

function App() {
  const [isLogin,setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    if (token) {
      console.log('Token found:', token);
      setIsLogin(true)
    } else {
      console.log('No token found, redirecting to login.');
      setIsLogin(false)
    }
  },[]);

  return (
    <>
			<BrowserRouter>
			<Navbar isLogin={isLogin} setIsLogin={setIsLogin}/>
					<Routes>
						<Route path="/" element={<Blogs/>} />
						<Route path="/myblogs" element={<Myblogs isLogin={isLogin}/>} />
						<Route path="/createblog" element={<Createblog isLogin={isLogin}/>} />
						<Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
						<Route path="/register" element={<Signup setIsLogin={setIsLogin}/>} />
					</Routes>
			</BrowserRouter>
		</>
  )
}

export default App
