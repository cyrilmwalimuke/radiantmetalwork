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

    <header className='flex justify-between px-5 sm:px-30  shadow-md items-center sticky top-0 z-50 bg-gray-500'>
    


    <Image src='/logo-main.png' height={70} width={70} alt='logo'/>

    <nav className= {`hidden sm:flex gap-20 text-white    ${bebas.className}`} >   
   
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
    <Menu className='sm:hidden text-white' onClick={()=>setMobileMenu(true)}/>

      {/* {mobileMenu && (<div className='fixed inset-0 h-screen  bg-white shadow-lg z-50 transition-transform duration-300 sm:hidden'>

 

</div>)} */}

 

   

    

</header>)
}
