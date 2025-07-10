import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const recentWork = [
    {
        title:'Sliding Gate',
        category:'Gates',
        image:"https://res.cloudinary.com/dh7gvpuz3/image/upload/v1751905140/g2w03umz2peboynhacqg.jpg"
    },
    {
        title:'Grills',
        category:'Grills',
        image:"https://res.cloudinary.com/dh7gvpuz3/image/upload/v1751905861/hu6h0j8rvqfr6gaxio05.jpg"


    },
    {
      title:'Main Door',
      category:'Steel Doors',
      image:"/steel door 1.jpg"


  },
  

]

export default function RecentWork() {
  return (
    <section id="portfolio" className="py-20 px-3 lg:px-20">
    <div className="container">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold">Recent Work</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of recent projects demonstrating quality craftsmanship and attention to detail
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12  sm:gap-6">
      

        {recentWork.map((item,index)=>{
            return (
                <div key={index} className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl border-gray-200 border-[1.5px]" >
                      <div className="relative aspect-[4/3]">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="" />
                      </div>

                      <div className="p-4 bg-white">
                        <div variant="secondary" className="mb-2 bg-gray-100 w-fit px-4 text-sm rounded-full">
                            {item.category}
                        </div>
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>


                </div>
            )
        })}
      </div>
      <div className='mt-10 flex justify-center'>
      <Link className='px-5 text-white  bg-[#E6BE8A] py-2 rounded-lg' href='/shop'>Show More</Link>

      </div>
   
      
      
    </div>
    
  </section>
  )
}
