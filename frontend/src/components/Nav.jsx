import React, { useContext, useState} from 'react'
import logo from '../assets/vcart logo.png'
import { IoSearchCircleOutline } from "react-icons/io5"
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineShoppingCart } from "react-icons/md"
import { UserDataContext } from '../context/UserDataContext'
import { IoSearchCircle } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthDataContext } from '../context/AuthDataContext'
import { IoMdHome } from "react-icons/io"
import { HiOutlineCollection } from "react-icons/hi"
import { MdContacts } from "react-icons/md"
import { ShopDataContext } from '../context/ShopDataContext'

function Nav() {
    const {getCurrentUser, userData} = useContext(UserDataContext)
    console.log("user name: ", userData)
    const {showSearch, setShowSearch, search, setSearch, getCartCount} = useContext(ShopDataContext)
    const [showProfile, setShowProfile] = useState(false)

    const navigate = useNavigate()
    const {serverUrl} = useContext(AuthDataContext)

    const handleLogOut = async () => {
      try {
       const result = await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
       console.log(result.data);
       await getCurrentUser()
      } catch (err) {
       console.error("Logout error:", err)
      }
    }

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0
    flex items-center justify-between px-[30px] shadow-md shadow-black'>
        <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]'>
            <img src={logo} alt="" className='w-[30px]'/>
            <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
        </div>
        <div className='w-[50%] lg:w-[40%] hidden md:flex'>
            <ul className='text-[white] flex items-center justify-center gap-[19px]'>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/")}>HOME</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/about")}>ABOUT</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/collection")}>COLLECTIONS</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
            </ul>
        </div>
        <div className='w-[30%] flex items-center justify-end gap-[20px]'>
            {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
            onClick={() => {
              setShowSearch(prev=>!prev)
              navigate("/collection")}
            }/>}
            {showSearch &&<IoSearchCircle className='w-[38px] h-[38px] text-[#000000] cursor-pointer'
            onClick={() => setShowSearch(prev=>!prev)}/>}
        
            {!userData &&  <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer'
            onClick={() => setShowProfile(prev=>!prev)}/>} 
            {userData &&  <div className='w-[29px] h-[29px] bg-[#080808] text-[white] rounded full
            flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev=>!prev)}>{userData?.data?.name?.slice(0,1)}</div>} 
            <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block' onClick={() => navigate("/cart")}/>
              <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black
              px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>{getCartCount()}</p>
        </div>
        {showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0
        right-0 flex items-center justify-center'>
            <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px]
            placeholder:text-white text-[white] text-[18px]' placeholder="Search Here" onChange=
            {(e) => setSearch(e.target.value)} value={search}/>
            </div>
        }
        {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%]
         border-[1px] border-[#aaa9a9] rounded-[10px] z-10'>

         <ul className='w-[100%] h-[100%] flex flex-col items-start justify-around text-[17px] py-[10px] text-white'>
          {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={
            ()=>{
              navigate("/login")
              setShowProfile(false)
            } 
          }>Login</li>}
          {userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={
            ()=>{
              handleLogOut()
              navigate("/login")
              setShowProfile(false)
            }
          }>Logout</li>}
          <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={
            ()=>{
              navigate("/order")
              setShowProfile(false)
            } 
          }>ORDERS</li>
          <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={
            ()=>{
              navigate("/about")
              setShowProfile(false)
            } 
          }>ABOUT</li>
         </ul> 
        </div>}
        <div className='w-[100vw] h-[90] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 
        left-0 bg-[#191818] md:hidden'>
          <button className='text-[white] flex -items-center justify-center flex-col gap-[2px]'>
          <IoMdHome className='w-[25px] h-[25px] text-[white] md:hidden'/>Home</button>
          <button className='text-[white] flex -items-center justify-center flex-col gap-[2px]'>
          <HiOutlineCollection className='w-[25px] h-[25px] text-[white] md:hidden'/>Collections</button>
          <button className='text-[white] flex -items-center justify-center flex-col gap-[2px]'>
          <MdContacts className='w-[25px] h-[25px] text-[white] md:hidden'/>Contact</button>
          <button className='text-[white] flex -items-center justify-center flex-col gap-[2px]'>
          <MdOutlineShoppingCart  className='w-[25px] h-[25px] text-[white] md:hidden'/>Cart</button>
          <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white
          px-[5px] py-[2px] text-black font-semobold rounded-full text-[9px] top-[8px] right-[18px]'
          onClick={() => navigate("/cart")}>{getCartCount()}</p>
        </div>
  </div>
)}
export default Nav