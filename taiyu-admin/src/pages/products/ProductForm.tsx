import { Button, TextField } from '@material-ui/core'
import userEvent from '@testing-library/user-event';
import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Layout } from '../../components/Layout'

export const ProductForm = () => {
    const[title,setTitle] = useState('');
    const[description, setDescription] = useState('')
    const[image, setImage] = useState('')
    const[price, setPrice] = useState(0)
    const[redirect, setRedirect] = useState(false)
    const submit =async (e: SyntheticEvent) =>{
        e.preventDefault()
        await fetch('http://localhost:8000/api/admin/products',{
            credentials:'include',
            method:'POST',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
              title,
              description,
              image,
              price
            })})
        setRedirect(true)
    }
    if(redirect){
        return(
            <Navigate to={'/products'}/>
        )
    }
    return ( 
        <Layout>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <TextField label='Title' onChange={e => setTitle(e.target.value)}></TextField>
                </div>
                <div className='mb-3'>
                    <TextField label='Description'  minRows={4} multiline onChange={e => setDescription(e.target.value)}></TextField>
                </div>
                <div className='mb-3'>
                    <TextField label='Image' onChange={e=>setImage(e.target.value)}></TextField>
                </div>
                <div className='mb-3'>
                    <TextField label='Price' type="number" onChange={e=>setPrice(Number(e.target.value))}></TextField>
                </div>
                <Button variant='contained' color="primary" type='submit'>Submit</Button>
            </form>
        </Layout>
    )
    }
