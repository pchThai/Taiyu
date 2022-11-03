import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Users } from './pages/Users';
import { Login } from './pages/Login';
import Register from './pages/Register';
import { RedirectToUsers } from './components/RedirectToUsers';
import { Links } from './pages/Links';
import { Products } from './pages/products/Products';
import { ProductForm } from './pages/products/ProductForm';
import { Orders } from './pages/Orders';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route  path="/" element={<RedirectToUsers />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/users" element={<Users />}/>
            <Route path='/users/:id/links' element={<Links />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/products/create' element={<ProductForm />}/>
            <Route path='/orders' element={<Orders />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
