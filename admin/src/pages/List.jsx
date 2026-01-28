import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { AuthDataContext } from '../context/AuthDataContext'
import axios from 'axios'

function List() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(AuthDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`)
      console.log(result.data)
      setList(result.data.data) 
    } catch (error) {
      console.error("Error fetching product list:", error.response?.data || error.message)
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()
      } else {
        console.log("Failed to remove product")
      }
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden'>
      <Nav />
      <div className='w-full flex items-start justify-start'>
        <Sidebar />

        <div className='w-full md:w-[82%] ml-auto mt-[80px] flex flex-col items-center gap-[30px] py-[50px] px-[20px]'>
          
          <h2 className='text-[28px] md:text-[40px] font-semibold mb-[10px]'>
            All Listed Products
          </h2>

          {list?.length > 0 ? (
            <div className='w-full flex flex-col gap-[20px] items-center'>
              {list.map((item, index) => (
                <div
                  key={index}
                  className='w-[95%] md:w-[90%] bg-slate-700 rounded-xl flex flex-col md:flex-row 
                  items-center justify-between gap-[15px] p-[15px] md:p-[20px] transition-all duration-300 
                  hover:bg-slate-600'
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className='w-[100%] md:w-[120px] h-[120px] object-cover rounded-lg'
                  />

                  <div className='flex-1 flex flex-col items-start justify-center text-left'>
                    <div className='text-[18px] md:text-[20px] text-[#bef0f3] font-medium'>
                      {item.name}
                    </div>
                    <div className='text-[15px] md:text-[16px] text-[#bef3da]'>
                      {item.category}
                    </div>
                    <div className='text-[15px] md:text-[16px] text-[#bef3da]'>
                      ₹{item.price}
                    </div>
                  </div>

                  <button
                    onClick={() => removeList(item._id)}
                    className='text-[18px] font-bold text-red-400 hover:bg-red-300 hover:text-black 
                    px-3 py-1 rounded-md transition-all duration-200'
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-white text-lg mt-[20px]'>
              No Products available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
