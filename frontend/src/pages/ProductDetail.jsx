import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../context/ShopDataContext'
import { FaStarHalfStroke } from "react-icons/fa6"
import RelatedProducts from '../components/RelatedProducts'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import { UserDataContext } from '../context/UserDataContext'
import Title from '../components/Title'

function ProductDetail() {
    const {productId} = useParams()
    const {products, currency, addtoCart, addReview} = useContext(ShopDataContext)
    const [productData, setProductData] = useState(null)
    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')
    const [loading, setLoading] = useState(false)
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);

    const avgRating =
        productData?.reviews?.length > 0
            ? productData.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            ) / productData.reviews.length
            : 0;

    const handleAddReview = async () => {
        if (!newComment || !rating) {
            toast.error("Please add comment and rating");
            return;
        }
        try {
            const response = await addReview(productData._id, {
                comment: newComment,
                rating,
            });

            setProductData(prev => ({
                ...prev,
                reviews: [
                    ...(prev.reviews || []),
                    response
                ]
            }));
            setNewComment('');
            setRating(0);
            toast.success("Review added!");
        } catch (error) {
            toast.error("Failed to add review");
            console.log(error);
        }
    };


    const fetchProductData = async() => {
        products.map((item) => {
            if(item._id === productId) {
                setProductData(item)
                // console.log(productData)
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
        <div className='w-full min-h-screen flex items-center justify-start flex-col bg-gradient-to-l
       from-[#141414] to-[#0c2025] lg:flex-row gap-[20px]'>
        <div className='w-full min-h-screen flex items-center justify-start flex-col lg:flex-row gap-[20px]'>
            <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[35vh] mt-[70px] flex items-center
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

                <div className='lg:w-[60%] w-[95%] lg:h-[78%] h-[35vh] md:h-[50vh] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
                    <img src={image} alt="" className='w-[100%] h-[100%] lg:h-[100%] text-[30px] text-[white]
                    text-center rounded-md object-fill'/>
                </div>
            </div>

            <div className='lg:w-[50vw] w-full h-auto lg:mt-[80px] flex items-start
              justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px]
              lg:py-[0px] gap-[10px]'>
                <h1 className='text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-[aliceblue] break-words'>{productData.name.toUpperCase()}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => {
                        if (star <= Math.floor(avgRating)) {
                            return <span key={star}>⭐</span>;
                        }

                        if (
                            star === Math.floor(avgRating) + 1 &&
                            avgRating % 1 >= 0.5
                        ) {
                            return <span key={star}>⯨</span>;
                        }

                        return <span key={star}>☆</span>;
                        })}
                    </div>

                    <span className="text-sm text-gray-500">
                        {avgRating.toFixed(1)} ({productData?.reviews?.length || 0} reviews)
                    </span>
                </div>      
                <p className='text-[30px] font-semibold pl-[5px] text-[white] '>{currency} {productData.price}</p>
                <p className='w-[95%] md:w-[80%] lg:w-[60%] text-[16px] md:text-[18px] lg:text-[20px] font-semibold
                 pl-[5px] text-white break-words'>{productData.description}</p>
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
                        }   
                      }
                    > 
                     {loading ? <Loading /> : "Add to Cart"}
                    </button>

                </div>
                <div className='w-[90%] h-[1px] bg-slate-700'></div>
                <div className='w-[80%] text-[16px] text-white mb-10'>
                    <p>100% Original Product.s</p>
                    <p>Cash on delivery is available on this product</p>
                    <p>Easy return and exchange policy within 7 days</p>
                </div>
            </div>
        </div>
    </div>
    <div className='w-[100%] min-h-[70vh] bg-gradient-to-l flex items-start justify-start flex-col from-[#141414] 
        to-[#0c2025] overflow-x-hidden'>
            
            <div className='w-[90%] lg:w-[80%] bg-[#3336397c] border text-white text-[13px] md:text-[15px] 
             lg:text-[20px] px-[10px] md:px-[30px] py-5 lg:ml-[100px] ml-[20px] rounded-md'>
                <p className='leading-relaxed'>
                    Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. 
                    Crafted from premium fabric for all-day comfort. 
                    Pair it with jeans or chinos to complete your effortless look.
                    it offers all day comfort and effortless style. Easy to maintain and perfact for any setting,
                    this shirt is a must have essential for those who value both fashion and function
                </p>
            </div>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>


            <div className='w-full min-h-[200px] bg-gradient-to-l flex justify-center
             from-[#141414] to-[#0c2025] mt-[30px] mb-[50px]'>

                <div className='w-full md:w-[70%] flex flex-col items-center px-[20px]'>

                    <Title text1={"ITEMS"} text2={"REVIEWS"} />
                    
                    <div className="flex gap-1 mb-3 text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                            key={star}
                            type="button"
                            onClick={() => setRating(rating === star ? 0 : star)}
                            className="text-2xl"
                            >
                            {star <= rating ? "⭐" : "☆"}
                            </button>
                        ))}
                    </div>
                    <div className='flex gap-3 mb-6 w-full md:w-[80%]'>
                        <textarea
                            className='p-2 rounded-md w-full resize-none'
                            rows={3}
                            placeholder='Write your review...'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className='bg-[#37d5ed] text-white px-4 rounded-md whitespace-nowrap'
                            onClick={handleAddReview}
                        >
                            Add Review
                        </button>
                    </div>

                    {productData.reviews?.length > 0 ? (
                        <div className="flex flex-col gap-4 w-full md:w-[80%]">
                            {productData.reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-[#3336397c] p-4 rounded-md text-white"
                                >
                                    <div className="flex items-start gap-3">

                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-semibold text-white shrink-0">
                                            {review.userName?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-[15px]">
                                                    {review.userName}
                                                </p>

                                                <div className="flex gap-0.5 text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span key={star}>
                                                            {star <= review.rating ? "★" : "☆"}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-xs text-gray-400 mb-2">
                                                {review.date
                                                    ? new Date(review.date).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "Just now"}
                                            </p>

                                            <p className="text-[14px] md:text-[16px] text-gray-200">
                                                {review.comment}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white">
                            No reviews yet. Be the first to comment!
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
) : <div className='opacity-0'></div>
}

export default ProductDetail