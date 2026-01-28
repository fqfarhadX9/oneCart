import React, { useState, useContext } from 'react'
// import logo from '../assets/vcart logo.png'
import { useNavigate } from 'react-router-dom'
import google_logo from '../assets/Google-Logo-PNG-Image.webp'
import { IoEyeOutline } from "react-icons/io5"
import { IoEye } from "react-icons/io5"
import { AuthDataContext } from '../context/AuthDataContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/Firebase'
import { UserDataContext } from '../context/UserDataContext'

function Login() {
    const [show, setShow] = useState(false)
    
    const {serverUrl} = useContext(AuthDataContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {getCurrentUser} = useContext(UserDataContext)

    const navigate = useNavigate()
    const handleSignin = async (e) => {
      e.preventDefault()
      try {
        const result = await axios.post(serverUrl + '/api/auth/login', {
        email, password
      },{withCredentials: true})
        console.log(result.data)
        getCurrentUser()
        navigate("/")
      } catch (error) {
        console.log(error);
      }
  }
  const googleSignin = async() => {
      try {
        const response = await signInWithPopup(auth, provider)
        console.log(response)
        const user = response.user

        const name = user.displayName || "Google User";
        const email = user.email;
        if(!email) {
          console.error("No email returned from Google");
          return;
        }
  
        const result = await axios.post(serverUrl + '/api/auth/google-login', {
          name, email
        }, {withCredentials: true})
        console.log(result.data)
        getCurrentUser()
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    }
  return (
      <div className='w-screen h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] 
      text-white flex flex-col items-center justify-start'>
        {/* <div className='w-[100%] h-[80px] flex items-cente justify-start px-[30px] gap-[10px] 
        cursor-pointer' onClick={()=>navigate("/")}>
          <img src={logo} className='w-[40px]' alt=''/>
          <h1 className='text-[22px] font-sans'>OneCart</h1>
        </div> */}
        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
          <span className='text-[25px] font-semibold'>Login Page</span>
          <span className='text-[16px]'>Welcome to OneCart, Place your Order</span>
        </div>
        <div className='max-w-[600px] w-[90%] h-[600px] bg-[#00000025] border-[1px] border-[#96969635]
        backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
          <form action="" onSubmit={handleSignin}className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
            <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center
            gap-[10px] py-[20px] cursor-pointer' onClick={googleSignin}>
              <img src={google_logo} className='w-[20px]'/>Login with Google
            </div>
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
              {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]' 
              onClick={()=>setShow(prev=>!prev)}/>}
              {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]'
              onClick={()=>setShow(prev=>!prev)}/>}
  
              <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center
              justify-center mt-[20px] text-[17px] font-sembold'>Login</button>
              <p className='flex gap-[10px]'>You don't have an Account?<span className='text-[#5555f6c5]
              text-[17px] font semibold cursor-pointer' onClick={()=> navigate("/signup")}>Registration</span></p>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Login