import { Button, TextField } from '@material-ui/core'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
export const Profile = () => {
  const[firstname,setFirstname] = useState('');
  const[lastname,setLastname] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[password_confirm,setPassword_confirm] = useState('');
  const[redirect,setRedirect] = useState(false);
  useEffect(()=>{
    (
       async () => {

            fetch('http://localhost:8000/api/admin/user',{
                credentials:'include'
            }).then(response => response.json())
              .then(data => {
                console.log(data);
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setEmail(data.email)
            })
       }
    )()},[])
    const inforSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/admin/users/info',{
            credentials:'include',
            method:'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body:JSON.stringify({
                firstname,
                lastname,
                email
              })
        })

    }
    const passwordSubmit =async (e: SyntheticEvent) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/admin/users/password',{
            credentials:'include',
            method:'PUT',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body:JSON.stringify({
                password,
                password_confirm
            }) 
        })
    } 
  return (
    <Layout>
       <h3>Account Information</h3>
       <form onSubmit={inforSubmit}>
            <div className='mb-3'>
                <TextField label='First Name' value={firstname} onChange={e => setFirstname(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <TextField label='Last Name' value={lastname} onChange={e => setLastname(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <Button variant="contained" color="primary" type='submit'>Submit</Button>
       </form>
       <h3 className='mt-4'>Change Passworld</h3>
       <form onSubmit={passwordSubmit}>
            <div className='mb-3'>
                <TextField label='Password' type="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <TextField label='Password Confirm' type="password" onChange={e => setPassword_confirm(e.target.value)}/>
            </div>
            <Button variant="contained" color="primary" type='submit'>Submit</Button>
       </form>
    </Layout>
  )
}
