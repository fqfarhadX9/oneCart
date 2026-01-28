import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Background from '../components/background'
import Hero from '../components/Hero'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" },
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
    <div className='w-screen lg:h-screen md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <Nav />
      <div className="flex w-full h-full">
        <div className='w-[45%] h-[100%]'>
          <Hero heroData={heroData[heroCount]} heroCount={heroCount} setHeroCount={setHeroCount} />
        </div>
        <div className='w-[55%] h-[100%]'>
          <Background heroCount={heroCount} />
        </div>
      </div>
    </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  )
}

export default Home
