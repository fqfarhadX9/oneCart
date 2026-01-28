import React from 'react'
import logo from '../assets/vcart logo.png'

function Footer() {
  return (
    <footer className="w-full bg-[#dbfcfcec] text-[#1e2223] flex flex-col items-center justify-center pt-6 md:pt-10">

      <div className="w-full flex flex-col md:flex-row md:justify-around md:items-start items-center px-4 md:px-12 text-center md:text-left">

        <div className="md:w-[30%] w-full flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
            <p className="text-[18px] md:text-[20px] font-semibold text-black">Onecart</p>
          </div>
          <p className="hidden md:block text-[15px] leading-snug">
            Onecart is your all-in-one online shopping destination offering top-quality products,
            unbeatable deals, and fast delivery — all backed by trusted service designed to make your life easier every day.
          </p>
          <p className="md:hidden text-[14px]">Fast. Easy. Reliable. Onecart Shopping</p>
        </div>

        <div className="md:w-[20%] w-full flex flex-col items-center md:items-start mb-6 md:mb-0">
          <p className="text-[17px] md:text-[19px] font-semibold mb-2">Company</p>
          <ul className="space-y-1">
            <li className="cursor-pointer hover:underline">Home</li>
            <li className="cursor-pointer hover:underline">About Us</li>
            <li className="hidden md:block cursor-pointer hover:underline">Delivery</li>
            <li className="cursor-pointer hover:underline">Privacy Policy</li>
          </ul>
        </div>

        <div className="md:w-[25%] w-full flex flex-col items-center md:items-start">
          <p className="text-[17px] md:text-[19px] font-semibold mb-2">Get In Touch</p>
          <ul className="space-y-1">
            <li>+91-9341976292</li>
            <li className="cursor-pointer hover:underline">contact@onecart.com</li>
            <li className="hidden md:block cursor-pointer hover:underline">+1-123-456-789</li>
            <li className="cursor-pointer hover:underline">admin@onecart.com</li>
          </ul>
        </div>
      </div>

      <div className="w-[90%] h-[1px] bg-gray-400 my-4 md:my-6"></div>
      <p className="text-center text-[13px] md:text-[14px] pb-14 md:pb-4 px-4">
        © 2025 Onecart.com — All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer
