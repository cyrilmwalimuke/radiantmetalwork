"use client"
import { Facebook, Heart, Instagram, Mail, Search, ShoppingBag, Twitter, User } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';
// import {Link, useNavigate} from 'react-router-dom'
// import SideBar from '../components/sideBar';
// import Footer from '../components/Footer';
// import Header from '../components/Header';





const pickupStations = [
    { name: 'Delivery with Nairobi CBD', fee: 150 },
    { name: "Delivery outside Nairobi", fee: 300 },
    
  ];


export default function CheckOut() {
    // const { cartItems, total,amount,isInCart} = useSelector((state) => state.cart)
     const { cart, removeFromCart,getTotalQuantity,getTotalPrice} = useCart()
     const total = getTotalPrice();
     const amount = getTotalQuantity();
    const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate()
//    const router = useRouter()
  const [sidebar,setSideBar] = useState(false)
  const [temporaryLoading,setTemporaryLoading] = useState(false)
  
  const [loading, setLoading] = useState(false);
    const [selectedStation, setSelectedStation] = useState(pickupStations[0]);
    // const { currentUser} = useSelector((state) => state.user)
    const [formData,setFormData] = useState({})
    // mount, phone_number, channel_id, external_reference 
    //  const dispatch = useDispatch()
     console.log(formData)
    

    const handleStationChange = (event) => {
      const selectedName = event.target.value;
      const station = pickupStations.find((s) => s.name === selectedName);
      setSelectedStation(station);
    };


    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    const handleSubmit = async (e)=>{
        e.preventDefault()

        if (formData.phone_number.length !== 10) {
          setError(true);
          setErrorMsg("enter a valid phone number");
          return;
        }
        if (formData.phone_number.substring(0, 2) !== "07") {
          if (formData.phone_number.substring(0, 2) !== "01") {
            setError(true);
            setErrorMsg("start with 07.. or 01..");
            return;
          }
        }
    
        setError(false);
        setErrorMsg("");


        // const res = fetch("https://brasscraft-api.onrender.com/pay-hero",{
        //   method:'POST',
        //   headers:{
        //     'Content-Type':'Application/json'
        //   },
        //   body:JSON.stringify({phone_number:formData.phone_number,amount:total+selectedStation.fee,channel_id:"1385", external_reference:"INV:09" })
        // })

        // setTemporaryLoading(true); // Show message

        // setTimeout(() => {
        //   setTemporaryLoading(false); // Hide message after 5 seconds
        // }, 5000);
        const total = getTotalPrice();

        const res2 = await fetch("/api/create-order",{
          method:'POST',
          headers:{
            'Content-Type':'Application/json'
          },
          body:JSON.stringify({
            firstName:formData.firstName,
            lastName:formData.lastName,
             email:formData.email,
            total:total+selectedStation.fee,
            orderItems:cart,
            phone_number:formData.phone_number,
            deliveryStation:selectedStation.name,
            deliveryFee:selectedStation.fee,
            amount:amount,
            // userRef:currentUser._id
            userRef:"64f0b1c2d4e3f8b5c8a9e7d1" // replace with actual user reference

            

          })
        })
     

      
    }


    const payableAmount  = total + selectedStation.fee
    // total
 

  return (
    <div>
        {/* <Header setSideBar={setSideBar}/> */}


<div className='sm:flex'>
         <div className='bg-slate-100  sm:w-[50%] p-7'>
            <div className='flex flex-col gap-5'>
                {cart.map((item)=>{
                    return(
                        <div key={item.color} className='flex justify-between text-sm'>
                         

                            <div className='flex gap-3 w-[200px] items-start sm:w-[400px] '>
                                <img src={item.img} alt="" className='h-[70px] w-[70px] rounded-lg' />
                                <div>
                                    <p className='text-xs'>{item.name}</p>
                                    
                                </div>

                            </div>
                            <div className='font-bold'>
                              kshs  {item.price*item.amount}

                            </div>
                            

                        </div>
                    )
                })}

            </div>
            <div className='mt-5 flex justify-between font-bold text-xl'>
                <p>Total</p>
                <p>{total}</p>
            </div>

</div>
        <div className='sm:w-[50%] p-7 '>
            
            <form onSubmit = {handleSubmit} className='flex flex-col gap-3 '>
                <p className='font-semibold'>Contact Infromation</p>
             
                <input id='phone_number' placeholder='phone number'  onChange={handleChange} type="text" className=' focus:outline-none border-[1.3px] border-black p-2 text-xs' required />
                <p className='text-xs text-gray-200'>This is the phone number that will be used to initiate the STK Push for your payment. Please ensure the number is active and registered with Mpesa</p>
                <p className='font-semibold'>Shipping Information</p>
                <div className='flex justify-between text-xs'>
                    <input type="text" placeholder='First Name' className='p-2 border-[1.3px] border-black w-[47%] focus:outline-none' onChange={handleChange} id='firstName' required/>
                    <input type="text" placeholder='Last Name' className='p-2 border-[1.3px] border-black w-[47%] focus:outline-none' onChange={handleChange} id='lastName' required/>
                </div>
                <input type="email" placeholder='email' className='text-xs p-2 border-black border-[1.3px] focus:outline-none' onChange={handleChange} id='email'/>

                <div className=''>
      <h2 className='font-semibold'>Choose Your Pickup Station</h2>
   
      <select
        id="pickup-stations"
        className="text-xs p-1 focus:ouline-none"
        onChange={handleStationChange}
        value={selectedStation.name}
      >
        {pickupStations.map((station) => (
          <option key={station.name} value={station.name}>
            {station.name}
          </option>
        ))}
      </select>

     
        <h3 className='my-1'>Delivery Fee:kshs <span className='font-semibold'>{selectedStation.fee}</span> </h3>
        
      
    </div>

    <p className='font-semibold'>SUBTOTAL: {payableAmount}</p>
             
                <p className='font-semibold'>Payment Method</p>
                <div>
                    <div className='flex gap-3'>
                    <input type='radio' />
                    <p className='font-bold'>mpesa</p>

                    </div>
                    <div className='flex gap-3 items-center'>
            
                    <p className='text-xs'>Other payment Options coming soon</p>
                    <div className='flex justify-center'>
                        <img src="data:image/png;base64,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" alt="" className='h-10 w-20' />

                    </div>


                    </div>

                
                    
                </div>
           
                {error && (
          <div
            className="text-rose-400 text-xs mt-1 mb-1 text-center"
          
          >
            !{errorMsg}
          </div>
        )}



{loading &&

<div className='flex flex-col items-center'>
<span class="loader"></span>
<h3>processing payment...</h3>
</div>
          
}


                <button className='bg-green-300 p-3 rounded-lg cursor-pointer'>PAY NOW</button>
            </form>
          {
            temporaryLoading && (
              <div className='flex justify-center p-3'>
                <div className='flex flex-col gap-1 items-center'>
                <span class="loader"></span>
                <p className='text-center text-sm text-green-300'>Processing your payment... Please check your phone for the M-Pesa STK Push request.</p>

                </div>
            
            </div>
            )
          }
            
        </div>

        
       
        
      
    </div>
  

      


{/* 
    <Footer variant = 'bg-slate-100' />
      {
        sidebar && <SideBar sidebar={sidebar} setSideBar={setSideBar}/>
      } */}
    </div>
  )
}