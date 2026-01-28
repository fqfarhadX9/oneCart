import React, { useContext } from 'react'
import { ShopDataContext } from '../context/ShopDataContext'
import { useNavigate } from 'react-router-dom'

function Card({image, name, price, id}) {
    const {currency} = useContext(ShopDataContext)
    const navigate = useNavigate()
  return (
    <div className='w-[300px] mx:w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg
    hover:scale-[102%] flex items-start justify start flex-col p-[10px] cursor-pointer border-[1px]
    border-[#80808049] overflow-hidden' onClick={() => navigate(`/productdetail/${id}`)}>
        <img src={image} alt="" className='w-[100%] h-[78%] rounded-sm object-cover'/>
        <div className='text-[#c3f6fa] text-[18px] py-[10px] '>{name}</div>
        <div className='text-[#f3fafa] text-[14px] '>{currency} {price}</div>

    </div>
  )
}

export default Card