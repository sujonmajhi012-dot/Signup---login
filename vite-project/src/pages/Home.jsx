import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser,setloggedInUser]=useState('');
  const [product,setProduct]=useState('');
  const Navigate=useNavigate();

     useEffect(()=>{
      setloggedInUser(localStorage.getItem('loggedInUser'))
     },[]) 
     const handleOut=(e)=>{
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess("User LoggedOut")
      setTimeout(()=>{
        Navigate('/login');
      },1000)
     }
     const fetchProduct= async ()=>{
      try{
        const url="https://signup-login-api-three.vercel.app/product/";
        const headers={
          method:"GET",
          headers:{
            'authorization': localStorage.getItem('token')
          },
        }
        

        

        const response = await fetch(url,headers);
        const result = await response.json();
        console.log(result)
        setProduct(result)
      }catch(e){
        handleError(e);
      }
     }
     useEffect(()=>{
      fetchProduct()
     },[])



  return (
      <div>
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleOut} style={{padding:'8px 10px',backgroundColor:'white', borderRadius:'5px', cursor:'pointer',fontSize:'18px', fontWeight:'400', border:'2px solid black', color:"black"}}>Logout</button>
        <div>
          {
            product && product?.map((item,index)=>{
              return (<ul key={index}>
                <span>{item.name}:{item.price}</span>
              </ul>)
            })
            
          }
        </div>
        <ToastContainer/>
      </div>
    
  )
}

export default Home
