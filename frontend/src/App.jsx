// import React from 'react'
import {BrowserRouter, Route ,Routes,Navigate} from 'react-router-dom'
import './App.css'
import About from './components/About'
import Editor from './components/Editor'
import Navbar from './components/navbar'
import Home from './components/Home'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef } from 'react'; // Import useRef at the top of App.js


function App() {

function AuthChecker({ children }) {
  const token = localStorage.getItem("accessToken");

  const toastShown = useRef(false); // Prevents duplicate toast

  if (!token) {
    if (!toastShown.current) {
      toast.error("Please log in to access the editor!");
      toastShown.current = true;
    }
    return <Navigate to="/" />;
  }

  return children;
}


  return (
    <>
  <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/write" element={
          <AuthChecker>
            <Editor/>
            </AuthChecker>
            }/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />

    </BrowserRouter>
       </>
  )
}

export default App
