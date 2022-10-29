import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Menu from '../components/Menu'
import { Layout } from '../components/Layout'
import {User} from "../models/user"
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map(user => {
              return (
                <TableRow key={user.id}>                  
                  <TableCell>{user.id }</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>text</TableCell>
                </TableRow>
              )})}          
          </TableBody>
        </Table>
      </Layout>  
    </div>
  )
}


