"use client"
import { Facebook, Heart, Instagram, Mail, Search, ShoppingBag, Twitter, User } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import Header from '../(components)/Header';






// const pickupStations = [
//     { name: 'Delivery with Nairobi CBD', fee: 150 },
//     { name: "Delivery outside Nairobi", fee: 300 },
    
//   ];


export default function CheckOut() {
    // const { cartItems, total,amount,isInCart} = useSelector((state) => state.cart)
     const { cart, removeFromCart,getTotalQuantity,getTotalPrice} = useCart()
     const {user} =useUser()
     const router = useRouter()
     console.log(user)
     const total = getTotalPrice();
     const amount = getTotalQuantity();
    const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate()
//    const router = useRouter()
  const [sidebar,setSideBar] = useState(false)
  const [temporaryLoading,setTemporaryLoading] = useState(false)
  const shipping = 1
  
  const [loading, setLoading] = useState(false);
    // const [selectedStation, setSelectedStation] = useState(pickupStations[0]);
    // const { currentUser} = useSelector((state) => state.user)
    const [formData,setFormData] = useState({})
    // mount, phone_number, channel_id, external_reference 
    //  const dispatch = useDispatch()
     console.log(formData)
    

    // const handleStationChange = (event) => {
    //   const selectedName = event.target.value;
    //   const station = pickupStations.find((s) => s.name === selectedName);
    //   setSelectedStation(station);
    // };


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
            // total:total+selectedStation.fee,
            total:total + shipping,

            orderItems:cart,
            phone_number:formData.phone_number,
            // deliveryStation:selectedStation.name,
            // deliveryFee:selectedStation.fee,
             deliveryStation:"coast",
            deliveryFee:shipping,

            amount:amount,
            // userRef:currentUser._id
            userRef:"64f0b1c2d4e3f8b5c8a9e7d1" // replace with actual user reference

            

          })
        })
     

      
    }


    // const payableAmount  = total + selectedStation.fee
    // total

    if(!user){
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-2xl font-bold'>Please login to continue</p>
                <button onClick={()=>router.push('/login')} className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-5'>Login</button>
            </div>
        )
    }
 

  return (
    <div>
    
        <Header/>


<div className='sm:flex'>
         <div className='bg-slate-100  sm:w-[50%] p-7'>
            <div className='flex flex-col gap-5'>
                {cart.map((item)=>{
                    return(
                        <div key={item.color} className='flex justify-between '>
                         

                            <div className='flex gap-3 w-[200px] items-start sm:w-[400px] '>
                                <img src={item.imageUrls[0]} alt="" className='h-[70px] w-[70px] rounded-lg' />
                                <div>
                                    <p className='text-lg'>{item.name}</p>
                                    
                                </div>

                            </div>
                            <div className='font-bold text-lg'>
                              kshs  {(item.price*item.amount).toLocaleString()}

                            </div>
                            

                        </div>
                    )
                })}

            </div>
            <div className='mt-5 flex justify-between font-bold text-xl'>
                <p>Total</p>
                <p>{total.toLocaleString()}</p>
            </div>

</div>
        <div className='sm:w-[50%] p-7 '>
            
            <form onSubmit = {handleSubmit} className='flex flex-col gap-3 '>
                <p className='font-semibold'>Contact Infromation</p>
             
                <input id='phone_number' placeholder='phone number'  onChange={handleChange} type="number" className=' focus:outline-none border-[1.3px] border-black p-3 text-xs rounded-sm' required />
                <p className='text-xs text-gray-500'>This is the phone number that will be used to initiate the STK Push for your payment. Please ensure the number is active and registered with Mpesa</p>
                <p className='font-semibold'>Shipping Information</p>
                <div className='flex justify-between text-xs'>
                    <input type="text" placeholder='First Name' className='p-3 rounded-md border-[1.3px] border-black w-[47%] focus:outline-none' onChange={handleChange} id='firstName' required/>
                    <input type="text" placeholder='Last Name' className='p-3 rounded-md border-[1.3px] border-black w-[47%] focus:outline-none' onChange={handleChange} id='lastName' required/>
                </div>
                <input type="email" placeholder='email' className='text-xs p-3 rounded-md border-black border-[1.3px] focus:outline-none' onChange={handleChange} id='email'/>

                {/* <div className=''>
      <h2 className='font-semibold'>Choose Your Pickup Station</h2>
   
      <select
        id="pickup-stations"
        className="text-xs ouline-none"
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
        
      
    </div> */}

<p className='font-semibold'>shipping: kshs {shipping}</p>

    

    <p className='font-semibold'>TOTAL: kshs {(total +shipping).toLocaleString()}</p>
             
           
               
           
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