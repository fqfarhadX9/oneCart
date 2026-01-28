import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../context/ShopDataContext'
import { FaStar } from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import RelatedProducts from '../components/RelatedProducts'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

function ProductDetail() {
    const {productId} = useParams()
    const {products, currency, addtoCart} = useContext(ShopDataContext)
    const [productData, setProductData] = useState(null)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchProductData = async() => {
        products.map((item) => {
            if(item._id === productId) {
                setProductData(item)
                console.log(productData)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)

                return null
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [products, productId])
  return productData ? (
    <div>
        <div className='w-[99vw] md:h-[100vh] h-[100vh] flex items-center justify-start flex-col bg-gradient-to-l
    from-[#141414] to-[#0c2025] lg:flex-row gap-[20px]'>
        <div className='w-[100vw] h-[130vh] md:h-[100vh] 
        flex items-center justify-start flex-col lg:flex-row gap-[20px]'>
            <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center
            justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>
                <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center
                gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap'>
                    <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px]
                    border-[#80808049] rounded-md'>
                        <img src={image1} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md'
                        onClick={() => setImage(image1)}/>
                    </div>

                    <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px]
                    border-[#80808049] rounded-md'>
                        <img src={image2} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md'
                        onClick={() => setImage(image2)}/>
                    </div>

                    <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px]
                    border-[#80808049] rounded-md'>
                        <img src={image3} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md'
                        onClick={() => setImage(image3)}/>
                    </div>

                    <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px]
                    border-[#80808049] rounded-md'>
                        <img src={image4} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md'
                        onClick={() => setImage(image4)}/>
                    </div>
                </div>

                <div className='lg:w-[60%] w-[100%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
                    <img src={image} alt="" className='w-[100%] h-[100%] lg:h-[100%] text-[30px] text-[white]
                    text-center rounded-md object-fill'/>
                </div>
            </div>

            <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start
            justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px]
            lg:py-[0px] gap-[10px]'>
                <h1 className='text-[40px] font-semibold text-[aliceblue]'>{productData.name.toUpperCase()}</h1>
                <div className='flex items-center gap-1'>
                    <FaStar className='text-[20px] fill-[#FFD700]'/>
                    <FaStar className='text-[20px] fill-[#FFD700]'/>
                    <FaStar className='text-[20px] fill-[#FFD700]'/>
                    <FaStar className='text-[20px] fill-[#FFD700]'/>
                    <FaStarHalfStroke className='text-[20px] fill-[#FFD700]'/>
                    <p className='text-[18px] font-semibold pl-[5px] text-[white] '>(124)</p>
                </div>
                <p className='text-[30px] font-semibold pl-[5px] text-[white] '>{currency} {productData.price}</p>
                <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>{productData.description}</p>
                <div className='flex flex-col gap-[10px] my-[10px]'>
                    <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>
                    <div className='flex gap-2'>
                        {
                            productData.sizes.map((item, index) => {
                                return (
                                    <button key={index} className={`border py-2 px-4 bg-slate-300 rounded-md 
                                ${item === size ? 'bg-black text-[#2f97f1] text-[20px]' :  ""}`}
                                onClick={() => {
                                    if(size === item) {
                                        setSize('')
                                    } else {
                                        setSize(item)
                                    }
                                }}>{item}</button>
                                )
                            })
                        }
                    </div>
                    <button className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61bc9] py-[10px]
                    px-[20px] mt-[10px] rounded-2xl border-[#80808049] border-[1px] text-white shadow-md shadow-black'
                    onClick={async () => {
                      if (!size) {
                      toast.error("Please select a size!");
                      return;
                      }

                      setLoading(true);

                      try {
                       await addtoCart(productData._id, size);
                       toast.success("Product added to cart");
                      } catch (error) {
                        console.log(error);
                       toast.error("Failed to add product.");
                    }

                    setLoading(false);
                    }}
                    > 
                     {loading ? <Loading /> : "Add to Cart"}
                    </button>

                </div>
                <div className='w-[90%] h-[1px] bg-slate-700'></div>
                <div className='w-[80%] text-[16px] text-white'>
                    <p>100% Original Product.s</p>
                    <p>Cash on delivery is available on this product</p>
                    <p>Easy return and exchange policy within 7 days</p>
                </div>
            </div>
        </div>
    </div>
    <div className='w-[100%] min-h-[70vh] bg-gradient-to-l flex items-start justify-start flex-col from-[#141414] 
        to-[#0c2025] overflow-x-hidden'>
            <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
                <p className='border px-5 py-3 text-sm text-white'>Description</p>
                <p className='border px-5 py-3 text-sm text-white'>Reviews(124)</p>
            </div>
            <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white
            text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
                <p className='w-[95%] h-[90%] flex items-center justify-center'>
                    Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. 
                    Crafted from premium fabric for all-day comfort. 
                    Pair it with jeans or chinos to complete your effortless look.
                    it offers all day comfort and effortless style. Easy to maintain and perfact for any setting,
                    this shirt is a must have essential for those who value both fashion and function
                </p>
            </div>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
        </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default ProductDetail