import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopDataContext'
import Title from './Title'
import Card from './Card'

function RelatedProducts({category, subCategory, currentProductId}) {
    const {products} = useContext(ShopDataContext)
    const [Related, setRelated] = useState([])

    useEffect(() => {
        if(products.length > 0) {
            let productCopy = products.slice()
            productCopy = products.filter((item) => item.category === category)
            productCopy = products.filter((item) => item.subCategory === subCategory)
            productCopy = products.filter((item) => item._id !== currentProductId)
            setRelated(productCopy.slice(0,6))
        }
    }, [products, category, subCategory, currentProductId])
  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
        <div className='ml-[20px] lg:ml-[80px]'>
            <Title text1={"RELATED"} text2={"ITEMS"}/>
            <div className='w-[100%] mt-[30px] flex items-center justify-center
            flex-wrap gap-[50px]'>
                {
                    Related?.map((item,index) => (
                        <Card key={index} image={item.image1} name={item.name} price={item.price} id={item._id}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default RelatedProducts