import { Routes, Route } from "react-router-dom";
import React from 'react';
import './css/Main.css';
import './css/Header.css'
import './css/Circle.css';
import './css/Hidden.css';
import './css/Login&Find_info&My_info.css';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Find_info from "./pages/Find_info";
import Myinfo from "./pages/My_info";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Findinfo' element={<Find_info/>}/>
      <Route path='/Myinfo' element={<Myinfo/>}/>
    </Routes>
  );
}

export default App;