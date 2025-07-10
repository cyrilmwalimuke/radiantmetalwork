// 

import Image from 'next/image'
import React from 'react'

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 px-7 lg:px-24 bg-gradient-to-br from-[#0f0f0f] via-black to-[#111] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#E6BE8A]/20 rounded-full blur-[160px] z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#E6BE8A]/10 rounded-full blur-[100px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="overflow-hidden rounded-3xl shadow-lg border border-white/10 backdrop-blur-md">
          <Image
            src="/about-img.png"
            alt="Radiant Metal Workshop"
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#E6BE8A] to-white bg-clip-text text-transparent">
            About Radiant Metal Workshop
          </h2>
          <p className="text-lg leading-relaxed text-white/90">
            With over a decade in the welding industry, we deliver top-tier fabrication services for residential,
            commercial, and industrial clients, with precision and pride.
          </p>
          <p className="text-white/70">
            Our reputation is built on unmatched craftsmanship, industry certifications, and a relentless pursuit of
            quality. We’re future-ready and standards-driven.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="flex flex-col items-start">
              <h3 className="text-3xl font-bold text-[#E6BE8A] drop-shadow">150+</h3>
              <p className="text-sm text-white/60">Projects Completed</p>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-3xl font-bold text-[#E6BE8A] drop-shadow">10+</h3>
              <p className="text-sm text-white/60">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
