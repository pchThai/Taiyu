import { Button, TextField } from '@material-ui/core'
import userEvent from '@testing-library/user-event';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout'

export const ProductForm = (props: any) => {
    const[title,setTitle] = useState('');
    const[description, setDescription] = useState('')
    const[image, setImage] = useState('')
    const[price, setPrice] = useState(0)
    const[redirect, setRedirect] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
        if(id){
            (
            async () => {
                    await fetch(`http://localhost:8000/api/admin/products/${id}`,{credentials:'include'})
                            .then(reponse => reponse.json())
                            .then(data => {
                                setTitle(data.title);
                                setDescription(data.description);
                                setImage(data.image);
                                setPrice(data.price);
                            })
            }
            )();
        }
    },[])
    const submit =async (e: SyntheticEvent) =>{
        e.preventDefault()
        const data = {
            title,
            description,
            image,
            price
        };
        if(id){
            console.log(data)
            await fetch(`http://localhost:8000/api/admin/products/${id}`,{
            credentials:'include',
            method:'PUT',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",

            },
            body:JSON.stringify(
              data,
            )})
        }else{
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
            }
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
                    <TextField label='Title'onChange={e => setTitle(e.target.value)}  value={title} ></TextField>
                </div>
                <div className='mb-3'>
                    <TextField label='Description' value={description}  minRows={4} multiline onChange={e => setDescription(e.target.value)}></TextField>
                </div>
                <div className='mb-3'>
                    <TextField label='Image' value={image} onChange={e=>setImage(e.target.value)}></TextField>
                </div>
                <div className='mb-3'>
                    <TextField label='Price' value={price} type="number" onChange={e=>setPrice(Number(e.target.value))}></TextField>
                </div>
                <Button variant='contained' color="primary" type='submit'>Submit</Button>
            </form>
        </Layout>
    )
    }
