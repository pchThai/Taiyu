 import userEvent from '@testing-library/user-event';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
 const  Nav = (props: {user:User | null}) =>{
    const logout = async() =>{
        await fetch("http://localhost:8000/api/admin/logout", {credentials: 'include',method:'POST'})
    }
    return(
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
        <div className="navbar-nav">
        <div className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 text-white text-decoration-none" to={'/profile'}>{props.user?.firstname} {props.user?.lastname}</Link>
            <Link className="p-2 text-white text-decoration-none" to={'/login'} onClick={logout}>Sign out</Link>
        </div>
        </div>
    </header>
    );
 };
 export default Nav; 
