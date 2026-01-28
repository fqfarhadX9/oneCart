import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import upload_img from '../assets/upload_img.webp'
import { AuthDataContext } from '../context/AuthDataContext'
import axios from 'axios'
import Loading from '../components/Loaading'
import { toast } from 'react-toastify'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [price, setPrice] = useState("")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const [loading, setLoading]  =useState(false)

  const {serverUrl} = useContext(AuthDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)
      const response = await axios.post(serverUrl + '/api/product/addProduct', 
      formData, {withCredentials: true})
      console.log(response.data)
      toast.success("Added Product Successfully")
      setLoading(false)
      if(response.data) {
        setName(""),
        setDescription("")
        setCategory("Men")
        setSubCategory("TopWear")
        setPrice("")
        setBestSeller(false)
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Added Product Failed")
    }
  }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'> 
       <Nav /> 
       <Sidebar /> 
       <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]'>
        <form action="" onSubmit={handleAddProduct} className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px]
        py-[60px] px-[30px] md:px-[60px]'>
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-[white] mt-[2%]'>
            Add Product Page
          </div>
          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px]
          gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Upload Images</p>
            <div className='w-[100%] h-[100%] flex items-center justify-start'>
              <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px]
              cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image1 ? upload_img : URL.createObjectURL(image1)} alt="" className='w-[80%]
                h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])}/>
              </label>
              
              <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px]
              cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image2 ? upload_img : URL.createObjectURL(image2)} alt="" className='w-[80%]
                h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])}/>
              </label>

              <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px]
              cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image3 ? upload_img : URL.createObjectURL(image3)} alt="" className='w-[80%]
                h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])}/>
              </label>

              <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px]
              cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image4 ? upload_img : URL.createObjectURL(image4)} alt="" className='w-[80%]
                h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])}/>
              </label>
            </div>
          </div>
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
            <input type="text" placeholder='Type Here' className='w-[600px] max-w-[98%] h-[40px]
            rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px]
            text-[18px] placeholder:text-[#ffffffc2]' onChange={(e) => setName(e.target.value)} value={name}/>
          </div>
          <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
            <textarea type="text" placeholder='Type Here' className='w-[600px] max-w-[98%] h-[100px]
            rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px]
            py-[10px] text-[18px] placeholder:text-[#ffffffc2]' onChange={(e) => setDescription(e.target.value)} value={description}/>
          </div>
          <div className='w-[80%] flex items-center flex-wrap gap-[10px]'>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-start flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] w-[100%] font-semibold'>Product Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg
              hover:border-[#46d1f7] border-[2px]' onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-start flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] w-[100%] font-semibold'>Sub-Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg
              hover:border-[#46d1f7] border-[2px]' onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                <option value="TopWear">TopWear</option>
                <option value="Bottomwear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
            <input type="number" placeholder='₹ 2000' className='w-[600px] max-w-[98%] h-[40px]
            rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px]
            text-[18px] placeholder:text-[#ffffffc2]' onChange={(e) => setPrice(e.target.value)} value={price}/>
          </div>
          <div className='w-[80%] flex flex-col gap-[10px] py-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
            <div className='flex items-center justify-start gap-[15px] flex-wrap'>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7]
              border-[2px] cursor-pointer ${sizes.includes("S") ? "bg-green-200 text-[black] border-[#46d1f7]" : ""}`} 
              onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>S</div>
            </div>
            <div className='flex items-center justify-start gap-[15px] flex-wrap'>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7]
              border-[2px] cursor-pointer ${sizes.includes("M") ? "bg-green-200 text-[black] border-[#46d1f7]" : ""}`} 
              onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>M</div>
            </div>
            <div className='flex items-center justify-start gap-[15px] flex-wrap'>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7]
              border-[2px] cursor-pointer ${sizes.includes("L") ? "bg-green-200 text-[black] border-[#46d1f7]" : ""}`} 
              onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>L</div>
            </div>
            <div className='flex items-center justify-start gap-[15px] flex-wrap'>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7]
              border-[2px] cursor-pointer ${sizes.includes("XL") ? "bg-green-200 text-[black] border-[#46d1f7]" : ""}`} 
              onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>XL</div>
            </div>
          </div>
          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px]'>
            <input type="checkbox" id="checkbox" className='w-[25px] h-[25px] cursor-pointer' onChange={() => setBestSeller(prev=>!prev)}/>
            <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold'>Add to BestSeller</label>
          </div>
          <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex 
          items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white
          active:border-[2px] border-[white] cursor-pointer'>{loading ? <Loading/> : "Add Product"}</button>
        </form>
      </div>
    </div>
  )
}

export default Add