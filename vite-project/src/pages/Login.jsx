import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'


function Login() {
  const [loginInfo,setloginInfo]=useState({
    
    email:'',
    password:''
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value)
    const copyLogin={...loginInfo} 
    copyLogin[name]=value;
    setloginInfo(copyLogin);
  }
  
  const handleLogin=async (e)=>{
    e.preventDefault();
    const {email,password }=loginInfo;
    if( !email || !password ){
      return handleError('name,email and password are required !');
    }
    try{
    const url="https://signup-login-api-three.vercel.app/auth/login";
    const response = await fetch(url,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(loginInfo)
        }
      );

      const result=await response.json();
      const { success, messege,jwtToken, name, error }=result;
      if(success){
        handleSuccess(messege);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/home');
        },1000);
      }else if(error){
        const details=error[0]
        handleError(details);
      }else if(!success){
        handleError(messege);

      }
      console.log(result)
  }
  catch(e){
    handleError(e);

  }
  }
  
  

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleChange} type="text" name="name" autoFocus placeholder='Enter your name...'  value={loginInfo.name}/>
        </div> */}
        <div>
          <label htmlFor="email">email</label>
          <input onChange={handleChange} type="email" name="email" placeholder='Enter your email...'  value={loginInfo.email}/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input onChange={handleChange} type="text" name="password" autoFocus placeholder='Enter your name' value={loginInfo.password}/>
        </div>
        <button type='submit'>Submit</button>
        <span>You Don't have an account ?
          <Link to='/signup'>Signup</Link>
        </span>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
