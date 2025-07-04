import Image from 'next/image'
import React from 'react'

export default function About() {
  return (

    <section id="about" className="py-20 px-7 lg:px-20 bg-black text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1508188609340-e8068b599193?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VsZGVyfGVufDB8fDB8fHww"
                
                alt="Mike Rodriguez welding"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">About Radiant Welding</h2>
              <p className="text-lg text-gray-500">
                With over 10 years of experience in the welding industry, I specialize in providing high-quality welding
                and fabrication services for residential, commercial, and industrial clients.
              </p>
              <p className="text-gray-500">
                My commitment to excellence and attention to detail has earned me a reputation as one of the most
                trusted welders and fabricators in the region. I hold multiple certifications and continuously update my skills to stay
                current with industry standards and techniques.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="font-semibold text-2xl text-[#E6BE8A]">150+</h3>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-[#E6BE8A]">10+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>




       
      </section>
  )
}
