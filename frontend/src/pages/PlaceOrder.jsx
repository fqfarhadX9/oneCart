import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/razorpay.webp'
import { ShopDataContext } from '../context/ShopDataContext'
import { AuthDataContext } from '../context/AuthDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const [loading, setLoading] = useState(false)
  const {cartItem, setCartItem, getCartAmount, delivery_fee, products} = useContext(ShopDataContext)
  const {serverUrl} = useContext(AuthDataContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    country:'',
    pincode:'',
    phone:''
  })
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({...data, [name]:value}))
  }
  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if(cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      const orderData = {
        address:formData,
        items:orderItems,
        amount: getCartAmount() + delivery_fee 
      }
      switch (method) {
        case 'cod': {
          const result = await axios.post(serverUrl + "/api/order/placeorder", 
          orderData, {withCredentials: true})
          console.log(result.data)
          toast.success("Order Placed Successfully")
          if(result.data) {
            setCartItem({})
            navigate("/order")
          } else {
            result.data.message
            ? toast.error(result.data.message)
            : toast.error("Order Placement Failed")
          } 
          break;
        }
        
        default:
          break;
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] 
    flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>
      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
        <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[90%]'>
          <div className='py-[10px]'>
            <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='First Name' required className='w-[48%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='firstName' value={formData.firstName}/>
            <input type="text" placeholder='Last Name' required className='w-[48%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='lastName' value={formData.lastName}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='Email address' required className='w-[100%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='email' value={formData.email}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='Street' required className='w-[100%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='street' value={formData.street}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='City' required className='w-[48%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='city' value={formData.city}/>
            <input type="text" placeholder='State' required className='w-[48%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='state' value={formData.state}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='Country' required className='w-[48%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='country' value={formData.country}/>
            <input type="text" placeholder='Pincode' required className='w-[48%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='pincode' value={formData.pincode}/>
          </div>
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type="text" placeholder='Phone' required className='w-[100%] h-[50px] rounded-md bg-slate-700
            placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
            onChange={onChangeHandler} name='phone' value={formData.phone}/>
          </div>
          <div>
            <button type="submit" className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848]
            py-[10px] px-[50px] rounded-2xl text-[white] flex items-center justify-center gap-[20px] absolute
            lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'>{loading ? <loading/> : "Place Order"}</button>
          </div>
        </form>
      </div>
      <div className='lg:w-[50%] h-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] h-[100%] lg:h-[70%] flex items-center justify-center 
        flex-col gap-[10px]'>
          <CartTotal/>
          <div className='py-[10px]'>
            <Title text1={"Payment"} text2={"Method"}/>
          </div>
          <div className='w-[#100wh] h-[30vh] lg:h-[100px] mt-[20px] flex items-start lg:mt-[0px]
          justify-center gap-[50px]'>
            <button className={`w-[150px] h-[50px] rounded-sm ${method==='razorpay' ? 'border-[5px] border-blue-900 rounded:sm' : ''}`}
            onClick={() => setMethod('razorpay')}>
              <img src={razorpay} alt="" className='w-[100%] h-[100%] object-fill rounded-sm'/>
            </button>
            <button className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px]
            py-[20px] rounded-sm text-[#332f6f] font-[bold] ${method==='cod' ? 'border-[5px] border-blue-900 rounded:sm' : ''}`}
            onClick={() => setMethod('cod')}>
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder