"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { use, useState } from 'react'
import { Bebas_Neue, Montserrat } from 'next/font/google';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Only one weight available for Bebas Neue
  variable: '--font-bebas',
});

export default function Header() {

  const [mobileMenu,setMobileMenu] = useState(false) 
  const {user,logout} =useUser();
  return (

    <header className='flex justify-between  backdrop-blur-md px-5 sm:px-30  shadow-md items-center sticky top-0 z-50 bg-black/50'>
    <Link href='/'>
    <Image src='/logo-main.png' height={70} width={70} alt='logo'/>

    </Link>


  

    <nav className= {`hidden sm:flex gap-5 text-white sm:text-lg    ${bebas.className}`} > 
          
          
          <a href='#portfolio'>
          My Work
          </a>

   
          <Link href='/shop'>
          Shop
          </Link>
          <a href='#about'>
          About
          </a>

          <a href='#quote'>
          Get A Quote
          </a>
          {user?(<button onClick={()=>logout()}>Log Out</button>):(<Link  href='login'>Login</Link>)}

          

    </nav>
    <Menu className='sm:hidden text-white' onClick={()=>setMobileMenu(true)}/>

      {
      mobileMenu && (<div className='fixed inset-0 h-screen  bg-white shadow-lg z-50 transition-transform duration-300 sm:hidden'>
        <div className='container flex flex-col p-8 gap-12'>
          <div className='flex justify-between'>
            <p className='text-lg'></p>
            <button onClick={()=>setMobileMenu(false)}>
             <X/>
            </button>

          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex justify-between text-lg'>
              <a href="#portfolio">My Work</a>
              <ChevronRight/>

            </div>
            <div className='flex justify-between text-lg '>
              <a href="#about"> About Me</a>
              <ChevronRight/>

            </div>
            <div className='flex justify-between text-lg'>
              <Link href="/shop">Shop</Link>
              <ChevronRight/>

            </div>
            <div className='flex justify-between text-lg'>
              <a href="#quote">Get a Quote</a>
              <ChevronRight/>

            </div>

            {user?(<Link className='bg-black text-white rounded-md p-2 w-full text-center' href='login'>Log Out</Link>):(<Link className='bg-black text-white rounded-md p-2 w-full text-center' href='login'>Login</Link>)}


           
            
            

          </div>

        </div>
        


 

      </div>)
      }

 

   

    

</header>)
}
