import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './pages/Users';
import { Login } from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route  path="/" element={<Users />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
