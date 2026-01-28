import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { AuthDataContext } from '../context/AuthDataContext'
import axios from 'axios'

function Home() {
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const {serverUrl} = useContext(AuthDataContext)

  const fetchCount = async () => {
    try {
      const products  =await axios.get(serverUrl, "/api/product/list", {withCredentials: true})
      setTotalProducts(products.data.data.length)

      const orders  =await axios.get(serverUrl, "/api/order/list", {withCredentials: true})
      setTotalOrders(orders.data.data.length)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCount()
  }, [])
  return (
    <div className='w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative'>
      <Nav/>
      <Sidebar/>
      <div className='w-[70vw] h-[100vw] absolute left-[25%] flex items-start justify-start
      flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[35px] text-[#afe2f2]'>OneCart Admin Panel</h1>
        <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          <div className='text-[#dcfafd] w-[400px] mx:w-[90#] h-[200px] bg-[#0000002e] 
          flex items-center justify-center gap-[20px] flex-col rounded-lg shadow-sm shadow-black
          backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969695]' >
            Total No. of Products: <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg
            flex items-center justify-center border-[1px] border-[#969695]'>{totalProducts}</span>
          </div>

          <div className='text-[#dcfafd] w-[400px] mx:w-[90#] h-[200px] bg-[#0000002e] 
          flex items-center justify-center gap-[20px] flex-col rounded-lg shadow-sm shadow-black
          backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969695]' >
            Total No. of Orders: <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg
            flex items-center justify-center border-[1px] border-[#969695]'>{totalOrders}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home