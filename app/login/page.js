"use client"
import { Facebook } from 'lucide-react'
import React, { use, useState } from 'react'
import { BsGoogle, BsGooglePlay } from 'react-icons/bs'
import { FaGoogle } from 'react-icons/fa'


import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '../context/UserContext'

export default function Login() {
    const [formData, setFormData] = useState({});
    const { login } = useUser();
//   const { loading, error } = useSelector((state) => state.user);
const [error,setError] = useState(null)
console.log(error)
const router = useRouter();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch('api/login', {
            method: 'POST',
            headers: {
         'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
         const data = await res.json();
         console.log(data);
         if(data.success===false){
             
             return 
         }
         login(data)
         setError(null)
         router.push('/')

        
    } catch (error) {
        setError('user not found!')
        console.log(error)
    }

   

    
  };
  return (
    <div className='px-6'>
        <div className='flex justify-center w-full'>
            
            {/* second div */}

            <div className='flex justify-center items-center  h-screen'>
                <div className='flex flex-col'>
              
               
                    <p className='font-bold text-center text-2xl'>Sign in to your account</p>
                    <p className='mb-5 text-gray-500 text-center tex-xs sm:text-lg'>Enter your details below to access your account</p>
                    <form onSubmit={handleSubmit}>
                        <p className='font-semibold '>Email</p>
                        <input onChange={handleChange} id='email' type="text" placeholder='name@example.com' className='my-2 focus:outline-none border-[1.3px] border-gray-500 p-2 w-full rounded-lg' />
                        <div className='flex justify-between font-semibold'>
                            <p>Password</p>
                            <p>Forgot password?</p>

                        </div>
                        <input id='password' type="text" placeholder= '*******' className='my-2 focus:outline-none border-[1.3px] p-2 border-gray-500 w-full rounded-lg' />
                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="" />
                            <p className='font-semibold'>Remember Me</p>
                        </div>
                        <button className='mt-4 bg-black text-center text-white flex items-center justify-center w-full p-2 rounded-lg cursor-pointer'>Sign in</button>
                        <p className='text-rose-400 mb-4'>{error}</p>
                    
                      

                        <div className='flex justify-center mt-4 gap-1'>
                            <p className='text-gray-500'>Dont have an account?</p>
                            <Link href='/register'>Sign up</Link>
                        </div>
                    </form>

                </div>


            </div>

        </div>
      
    </div>
  )
}