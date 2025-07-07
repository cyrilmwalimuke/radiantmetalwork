'use client'
import { Facebook } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BsGoogle, BsGooglePlay } from 'react-icons/bs'
import { FaGoogle } from 'react-icons/fa'



export default function Register() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
   
    const router = useRouter();
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };



    const passwordCriteria = [
      { regex: /.{8,}/, message: "At least 8 characters" },
      { regex: /[A-Z]/, message: "At least one uppercase letter" },
      { regex: /[a-z]/, message: "At least one lowercase letter" },
      { regex: /\d/, message: "At least one number" },
      { regex: /[!@#$%^&*]/, message: "At least one special character" },
    ]

    const isPasswordValid = (password) => {
      return passwordCriteria.every((criterion) => criterion.regex.test(password));
    };



    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isPasswordValid(formData.password)) {
        setError("Password does not meet all requirements.");
        return;
      }
      try {
        setLoading(true);
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setError(null);
      router.push('/');
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };


  return (
    <div>
      
        <div className='flex justify-center w-full'>
          
            {/* second div */}

            <div className='flex justify-center items-center w-[50%] h-screen sm:h-[650px]'>
              <p></p>
                <div className='flex flex-col'>
                  <Link href='/' className='h-16 text-tracking text-2xl sm:hidden flex items-center justify-center w-full'>
                    BRASSCRAFT

                  </Link>
                    <p className='font-bold text-center text-lg sm:text-2xl'>Create an Account</p>
                    <p className='mb-5 text-gray-500 text-center text-xs sm:text-lg'>Enter your details below to get started</p>
                    <form onSubmit={handleSubmit}>
                    <p className='font-semibold '>Username</p>
                  
                        <p className='font-semibold '>Email</p>
                        <input type="email" placeholder='name@example.com' className='my-2 focus:outline-none border-[1.3px] border-gray-500 p-2 w-full rounded-lg' id='email' onChange={handleChange}/>
                        <div className='flex justify-between font-semibold'>
                            <p>Password</p>
                          

                        </div>
                       
                        <input type="text" placeholder= '*******' className='my-2 focus:outline-none border-[1.3px] p-2 border-gray-500 w-full rounded-lg' id='password' onChange={handleChange} />
                        <ul className="text-sm mb-2">
          {passwordCriteria.map((criterion, index) => (
            <li
              key={index}
              className={
                criterion.regex.test(formData.password) ? "text-green-600" : "text-red-600"
              }
            >
              {criterion.message}
            </li>
          ))}
        </ul>
                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="" />
                            <p className='font-semibold'>Remember Me</p>
                        </div>
                        <button className='my-4 bg-black text-center text-white flex items-center justify-center w-full p-2 rounded-lg cursor-pointer' >Register</button>
                        <p className='text-rose-400 my-2'>{error}</p>

                       
                        

                        <div className='flex justify-center mt-4 gap-1'>
                            <p className='text-gray-500'>already have an account?</p>
                            <Link href='/login'>login</Link>
                        </div>
                    </form>

                </div>


            </div>

        </div>
      
    </div>
  )
}