import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './pages/Users';
import { Login } from './pages/Login';
import Register from './pages/Register';
import { RedirectToUsers } from './components/RedirectToUsers';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route  path="/" element={<RedirectToUsers />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/users" element={<Users />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
