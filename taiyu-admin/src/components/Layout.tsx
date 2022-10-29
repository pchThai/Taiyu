import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { User } from '../models/user';
import Menu from './Menu'
import Nav from './Nav'

export const Layout = (props: any) => {
  const [redirect,setRedirect] = useState(false);  
  const [user,setUser] = useState<User | null>(null);
  useEffect(() => {
    (
       async () => {
        await fetch("http://localhost:8000/api/admin/user",{credentials: 'include'})
        .then(response =>{
            if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong')})
        .then(data => {setUser(data)})
        .catch(error =>{setRedirect(true)})
       }
    )();
  },[]);  
  if(redirect){
    return <Navigate to={'/login'}/>
  }
  return (
    <div>
        <Nav user={user}/>  
        <div className="container-fluid">
            <div className="row">
                <Menu/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h2>Section title</h2>
                <div className="table-responsive">
                    {props.children}
                </div>
                </main>  
            </div>
         </div>
    </div>
  )
}
