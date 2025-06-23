"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Bebas_Neue, Montserrat } from 'next/font/google';
import { Menu } from 'lucide-react';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Only one weight available for Bebas Neue
  variable: '--font-bebas',
});

export default function Header() {

  const [mobileMenu,setMobileMenu] = useState(false) 
  return (

    <header className='flex justify-between px-5 sm:px-30 py-3 shadow-md items-center sticky top-0 z-50 bg-white'>
    
    <div className='flex items-center '>
        <Image src='/weilding-logo.png' height={20} width={50} alt='logo'/>
        {/* <h1 className='font-bold sm:text-2xl '>
        RadiantMetalWorkShop

        </h1> */}
        <h1 className= {`font-bold  text-2xl text-orange-500  ${bebas.className}`}>
        RadiantMetalsWorkShop

        </h1>

        
    
        

    </div>

    <nav className= {`hidden sm:flex gap-20    ${bebas.className}`} >   
   
          <Link href='/shop'>
          Shop
          </Link>
          <Link href='/about'>
          About
          </Link>

          <Link href='contact'>
          Contact
          </Link>

    </nav>
    <Menu className='sm"hidden' onClick={()=>setMobileMenu(true)}/>

      {/* {mobileMenu && (<div className='fixed inset-0 h-screen  bg-white shadow-lg z-50 transition-transform duration-300 sm:hidden'>

 

</div>)} */}

 

   

    

</header>)
}
