"use client"

import { Mail, MapPin, Phone } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export default function GetQuote() {
    const [formData,setFormData] = useState({})
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    console.log(formData)
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
      }, [file]);
    
      const handleFileUpload = async (file) => {
        // setLoading(true);
        // setError(null);
        const formDataa = new FormData();
            formDataa.append("file", file);
            formDataa.append("upload_preset", "cloudinary_2");
            formDataa.append("cloud_name", "dh7gvpuz3");
    
    
            
        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dh7gvpuz3/image/upload", {
              method: "POST",
              body: formDataa,
            });
      
            const data = await response.json();
            if (data.secure_url) {
            
              setFormData({ ...formData, image: data.secure_url })
              console.log("Image URL:", data.secure_url);
            } else {
              setError("Upload failed, please try again.");
            }
          } catch (err) {
            setError("Error uploading image.");
          } finally {
            setLoading(false);
          }
    
    
    
        
       };

   const handleSubmit = async(e) =>{
        e.preventDefault()
        const res = await fetch('/api/receive-quote',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)

           

        })

    }

    
  return (
    <section id="quote" className="py-20 b border-t-gray-500 border-[1.2px] bg-gray-50 px-7">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Get In Touch</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Ready to start your project? Contact me for a free consultation and quote
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">(+254) 794 210038</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">radiantmetalworkshop@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">Serving Greater Coastal Area</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-5 rounded-md shadow-md'>
              <div>
                <div className='text-2xl'>Send a Message</div>
                <div className='text-gray-500'>Get a free quote for your welding project</div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input placeholder="First Name" id='firstName' onChange={handleChange} className='border-gray-500 border-[1.2px] rounded-md p-1' />
                  <input placeholder="Last Name" id='lastName' onChange={handleChange}  className='border-gray-500 border-[1.2px] rounded-md p-1'/>
                </div>
                <input placeholder="Email" id='email' type="email" onChange={handleChange}  className='border-gray-500 border-[1.2px] rounded-md p-1 sm:mr-4'/>
                <input placeholder="Phone" type="tel" id='tel' onChange={handleChange}  className='border-gray-500 border-[1.2px] rounded-md p-1'/>
                <textarea cols={30} rows={4} id='details' placeholder="Project Details" onChange={handleChange} className='border-gray-500 border-[1.2px] rounded-md p-1 min-h-[100px]' />
                

                <div className='mt-5'>
                    <h2 className='tex-lg font-semibold mb-2'>Company logo</h2>
                    <input className = 'border-2 border-gray-300 rounded-md p-2 mt-2 w-48'
                    onChange={(e) => setFile(e.target.files[0])}
                    type='file'
                    ref={fileRef}
                
                    accept='image/*'
                    />
                    <img src={formData?.image} alt='profile' className='h-24 w-24  mt-2'/>

                    </div>





                <button className="w-full bg-black hover:bg-gray-500 text-white py-2 rounded-md">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
