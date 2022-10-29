import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Menu from '../components/Menu'
import { Layout } from '../components/Layout'
import {User} from "../models/user"
export const Users = () => {
  const [user,setUser] = useState<User[]>([]);
  
  useEffect(()=>{
      (async () => {
        await fetch('http://localhost:8000/api/admin/ambassador',{credentials:'include'})
        .then(response => response.json())
        .then(data => setUser(data))
      })()
  },[])
  return (
    <div>
      <Layout>    
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map(user => {
              return (
                <tr key={user.id}>                  
                  <td>{user.id }</td>
                  <td>{user.firstname}</td>
                  <td>{user.email}</td>
                  <td>text</td>
                </tr>
              )})}          
          </tbody>
        </table>
      </Layout>  
    </div>
  )
}


