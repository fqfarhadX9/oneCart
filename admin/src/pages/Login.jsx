import React, { useState, useContext } from 'react'
import logo from '../assets/vcart logo.png'
import { IoEyeOutline } from "react-icons/io5"
import { IoEye } from "react-icons/io5"
import { AuthDataContext } from '../context/AuthDataContext'
import axios from 'axios'
import { AdminDataContext } from '../context/AdminDataContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login() {
  const [show, setShow] = useState(false)
    
    const {serverUrl} = useContext(AuthDataContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {getCurrAdmin} = useContext(AdminDataContext)
    const navigate = useNavigate()

    const handleAdminLogin = async (e) => {
      e.preventDefault()
      try {
        const result = await axios.post(serverUrl + '/api/auth/admin-login', {
        email, password
      },{withCredentials: true})
        console.log(result.data)
        toast.success("AdminLogin Successfully")
        getCurrAdmin()
        navigate("/")
      } catch (error) {
        console.log(error);
        toast.error("AdminLogin Failed")
      }
  }
  return (
    <div className='w-screen h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] 
          text-white flex flex-col items-center justify-start'>
            <div className='w-[100%] h-[80px] flex items-cente justify-start px-[30px] gap-[10px] 
            cursor-pointer'>
              <img src={logo} className='w-[40px]' alt=''/>
              <h1 className='text-[22px] font-sans'>OneCart</h1>
            </div>
            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
              <span className='text-[25px] font-semibold'>Login Page</span>
              <span className='text-[16px]'>Welcome to OneCart, Apply to Admin Login</span>
            </div>
            <div className='max-w-[600px] w-[90%] h-[600px] bg-[#00000025] border-[1px] border-[#96969635]
            backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
              <form action="" onSubmit={handleAdminLogin}className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                  <div className='w-[40%] h-[1px] bg-[#96969635] '></div>OR<div className='w-[40%] h-[1px] bg-[#96969635] '></div>
                </div>
                <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                  <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
                  backdrop:blur-sm rounded lg shadow-lg bg-transparent placeholder-[#ffffff7] px-[20px] 
                  font-sembold' placeholder='email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
      
                  <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
                  backdrop:blur-sm rounded lg shadow-lg bg-transparent placeholder-[#ffffff7] px-[20px] 
                  font-sembold' placeholder='password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                  {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]' 
                  onClick={()=>setShow(prev=>!prev)}/>}
                  {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]'
                  onClick={()=>setShow(prev=>!prev)}/>}
      
                  <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center
                  justify-center mt-[20px] text-[17px] font-sembold'>Login</button>
                </div>
              </form>
            </div>
          </div>
  )
}

export default Login