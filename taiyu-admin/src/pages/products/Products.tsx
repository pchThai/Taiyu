import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { ToggleButtonGroup } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout';
import { Product } from '../../models/products';
export const Products = () => {
    const[Products,setProduct] = useState<Product[]>([]);
    const[page,setPage] = useState(0);
    const perPage = 10;
    useEffect(()=>{(
       async () => {
            await fetch('http://localhost:8000/api/admin/products',{credentials:'include'})
            .then(response => response.json())
            .then(data => setProduct(data))
       })();
    },[]);
    const del = async (id:number) =>{
        if(window.confirm("Are you sure ?")){
            await fetch(`http://localhost:8000/api/admin/products/${id}`,
            {credentials:'include',
            method:'DELETE'
            })
            setProduct(Products.filter(p => p.id != id));
        } 
    }
    return (
    <Layout>
        <div className="pt-3 pb-2 mb-3 border-bottom text-start">
            <Button href={'/products/create'} variant='contained' color='primary'>Add</Button>
        </div>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Products.slice(page * perPage, (page +1)*perPage).map(product =>{
                    return(
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell><img src={product.image} width="50"/></TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <ToggleButtonGroup>
                                    <Button  variant='contained' color="primary" 
                                        href={`/products/${product.id}/edit`}>
                                            Edit
                                    </Button>
                                    <Button  variant='contained' color="secondary" 
                                        onClick={()=>{del(product.id)}}>
                                            Delete
                                    </Button>
                                </ToggleButtonGroup>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableFooter>
                <TablePagination count={Products.length} page={page}  onPageChange={(e,newPage)=>setPage(newPage)} rowsPerPage={perPage} rowsPerPageOptions={[]}/> 
            </TableFooter>
        </Table>
    </Layout>
  )
}
