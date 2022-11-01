import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Link } from '../models/links'

export const Links = (props: any) => {
  const[Links,setLinks] = useState<Link[]>([])
  const {id} = useParams();
  const [page, setPage] = useState(0);
  const perPage = 10;  
  useEffect(()=>{
      (async () => {
        await fetch(`http://localhost:8000/api/admin/users/${id}/links`,{credentials:'include'})
        .then(response => response.json())
        .then(data => setLinks(data))
      })()
  },[])
  return (
    <Layout>    
      <Table>
          <TableHead>
            <TableRow>
              <TableCell >#</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Links.slice(page*perPage,(page + 1)*perPage).map((link,index) => {
              return (
                <TableRow key={index}>                  
                  <TableCell>{link.id }</TableCell>
                  <TableCell>{link.code}</TableCell>
                  <TableCell>{link.order.length}</TableCell>
                  <TableCell>{link.order.reduce((s,o) => s + o.total,0)}</TableCell>
                </TableRow>
              )})}          
          </TableBody>
          <TableFooter>
            <TablePagination count={Links.length} page={page}  onPageChange={(e,newPage)=>setPage(newPage)} rowsPerPage={perPage} rowsPerPageOptions={[]}/> 
          </TableFooter>
        </Table>
    </Layout>  
  )
}
