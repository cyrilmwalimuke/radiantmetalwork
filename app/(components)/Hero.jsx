"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const heroImages = [
    '/back steel door(single door)-1.png',
    '/back steel door(single door)-2.png',
    '/main door-1.png'

]


export default function Hero() {

    const [currentIndex,setCurrentIndex] = useState(0)

    useEffect(() => {
        const slideTimer = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
    
        return () => clearInterval(slideTimer); // Clean up on unmount
      }, [heroImages.length]);

  
  return (



    <section className="relative  w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/banner-2.jpeg" // Replace with your image
        alt="Banner background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 " />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 py-20 ">
        {/* Text Left */}
        <div className="md:w-1/2 text-white space-y-4">
          <div variant="outline" className="w-fit text-white border-gray-500 border-[1.1px] rounded-full px-4">
                    10+ Years Experience
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white">Professional Welding Services</h1>
            <p className="text-xl text-gray-100 max-w-lg">
                  Certified artisan specializing in steel doors, steel gates, steel windows and grills work. Quality
                  craftsmanship you can trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a href='#quote' size="lg" className="bg-[#E6BE8A] p-2 rounded-lg text-white text-center">
                  Get Free Quote
                </a>
                <a href='#about' className='bg-white text-center p-2 rounded-lg hover:bg-gray-50 text-black'>
                 About Me
                </a>
            </div>
        
        </div>

       
      
      </div>
    </section>
  )


    



}
