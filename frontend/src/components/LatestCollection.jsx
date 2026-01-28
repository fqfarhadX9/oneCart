import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopDataContext } from '../context/ShopDataContext'
import Card from './Card'

function LatestCollection() {
    const {products} = useContext(ShopDataContext)
    console.log("prducts:" , products);
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 8))
    }, [products])

  return (
    <div>
        <div className='w-[100%] h-[8%] text-center md:mt-[50px] '>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'> 
            Step Into Style - New Collection Droping This Season!
        </p>
    </div>
    <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center 
    flex-wrap gap-[50px]'>
        {latestProducts?.map((item, index) => (
            <Card key={index} image={item.image1} name={item.name} price={item.price} id={item._id}/>
        ))}
    </div>
    </div>
  )
}

export default LatestCollection