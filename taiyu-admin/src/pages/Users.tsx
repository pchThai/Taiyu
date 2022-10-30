import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Menu from '../components/Menu'
import { Layout } from '../components/Layout'
import {User} from "../models/user"
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { useParams } from 'react-router-dom'
export const Users = () => {
  const [users,setUser] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;  
  useEffect(()=>{
      (async () => {
        await fetch('http://localhost:8000/api/admin/ambassador',{credentials:'include'})
        .then(response => response.json())
        .then(data => setUser(data))
      })()
  },[])
  return (
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
            {users.slice(page*perPage,(page + 1)*perPage).map(user => {
              return (
                <TableRow key={user.id}>                  
                  <TableCell>{user.id }</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button  variant='contained' color="primary" href={`users/${user.id}/links`}>View</Button>
                  </TableCell>
                </TableRow>
              )})}          
          </TableBody>
          <TableFooter>
            <TablePagination count={users.length} page={page}  onPageChange={(e,newPage)=>setPage(newPage)} rowsPerPage={perPage} rowsPerPageOptions={[]}/> 
          </TableFooter>
        </Table>
      </Layout>  
  )
}


