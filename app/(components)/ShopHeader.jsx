"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Bebas_Neue, Montserrat } from 'next/font/google';
import { ChevronLeft, ChevronRight, Menu, ShoppingBag } from 'lucide-react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Only one weight available for Bebas Neue
  variable: '--font-bebas',
});

export default function ShopHeader() {

  const [mobileMenu,setMobileMenu] = useState(false) 
  const { cart, removeFromCart,getTotalQuantity} = useCart()
  return (

    <header className='flex justify-between  backdrop-blur-md px-5 sm:px-30  shadow-md items-center sticky top-0 z-50 bg-black/50'>
    


    <Link href='/'>
    <Image src='/logo-main.png' height={70} width={70} alt='logo'/>

    </Link>

    <Link href='/cart' className='relative'>
        <div className='flex items-center justify-center absolute top-[-5px] right-[-10px] bg-black rounded-full h-5 w-5 text-white text-center p-1'>
         {getTotalQuantity() > 0 ? getTotalQuantity() : 0}
         
          

        </div>
        <ShoppingBag size={30} color="white" />

    </Link>

    
    

 

   

    

</header>)
}
