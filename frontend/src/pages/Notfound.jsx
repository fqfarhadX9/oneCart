import React from 'react'
import { useNavigate } from 'react-router-dom'

function Notfound() {
    const navigate = useNavigate()
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] md:text-[70px]
    text-[30px] flex items-center justify-center text-white flex-col gap-[20px]'>
        Page not found 404
        <button className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848]
            py-[10px] px-[50px] rounded-2xl text-[white] flex items-center justify-center gap-[20px] border-[1px] border-[#80808049]'
            onClick={() => navigate("/login")}>Login</button>
    </div>
  )
}

export default Notfound