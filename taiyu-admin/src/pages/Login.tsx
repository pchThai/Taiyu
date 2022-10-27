import React, { SyntheticEvent, useState } from 'react'
import { Navigate, redirect } from 'react-router-dom';
import '../Login.css'
export const Login = () =>{
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[redirect, setRedirect] = useState(false);
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/admin/login',{
                  credentials: 'include',
                  method:'POST',
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body:JSON.stringify({
                    email,
                    password
                  })})
              setRedirect(true)         
  }
  if(redirect){
    return <Navigate to={'/user'}/>
  }
  return (
    
    <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                    onChange={e => setEmail(e.target.value)}/>
            <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                    onChange={e => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
        </form>
    </main>
  )
}
