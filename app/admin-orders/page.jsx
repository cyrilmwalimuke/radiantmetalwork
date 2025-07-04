"use client"
import React, { useEffect, useState } from 'react'
import { CiCircleCheck, CiFilter, CiSearch } from 'react-icons/ci'
import { FaRegEye } from 'react-icons/fa'
import { GoArrowDownLeft, GoArrowDownRight, GoArrowUpRight } from 'react-icons/go'
import { IoIosClose, IoIosMore } from 'react-icons/io'
import { LuRefreshCcw, LuRefreshCcwDot } from 'react-icons/lu'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { TbPackage } from 'react-icons/tb'
// import { Link } from 'react-router-dom'
import { Link } from 'next/link';




const ProductModal = ({ order, onClose, onUpdateStatus }) => {

  const [newStatus, setNewStatus] = useState(order.status);


  const handleStatusChange = async () => {
    await onUpdateStatus(order._id, newStatus); // Update order status
    onClose(); // Close modal after update
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white py-10 px-10">
      <div className="bg-white p-6 sm:p-6 rounded-lg shadow-lg  w-full sm:w-auto">
        
      
        <div className='flex justify-between'>
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <IoIosClose onClick={()=>onClose()}size={30} />


        </div>


    
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {/* Order Info */}
      <div className="border-b pb-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">General Details</h2>

        <p><span className="font-semibold">Order ID:</span> {order._id}</p>
        <p><span className="font-semibold">Date:</span> {formatDate(order.createdAt)}</p>
        <p className='flex gap-1'>
          <span className="font-semibold">Status: </span>
          <span className={`${getStatusColor(order.status)} capitalize h-6 text-xs flex items-center justify-center w-16 rounded-lg px-1`}>
                                        <p>{order.status}</p>
                                    </span>
        </p>


        <label className="block mt-4">
          <strong>Change Status:</strong>
          <select
            className="block p-1 rounded-md border mt-1"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <button
          onClick={handleStatusChange}
          className="mt-4 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Update Status
        </button>
      </div>

    


      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
        <p><span className="font-semibold">Name:</span> {order.firstName} {order.lastName}</p>
        <p><span className="font-semibold">Email:</span> {order.email}</p>
        <p><span className="font-semibold">Phone:</span> {order.phone_number}</p>
      </div>


      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <ul className="list-disc ml-5">
          {order.orderItems.map((item, index) => (
            <li key={index} className="py-1">
              {item.name} - <span className="text-gray-700">kshs {item.price}</span>
            </li>
          ))}
        </ul>
      </div>


      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
        <p><span className="font-semibold">Station:</span> {order.deliveryStation}</p>
        <p><span className="font-semibold">Delivery Fee:</span> kshs {order.deliveryFee}</p>
      </div>

      {/* Total Amount */}
      <div className="text-xl font-semibold text-gray-800">
        <p>Total: <span className="text-green-600">kshs{order.total}</span></p>
      </div>

      </div>

     
      </div>
    </div>
  );
};




 


export default function AdminOrders() {
const [adminOrders,setAdminOrders] =useState([])
const [selectedProduct, setSelectedProduct] = useState(null);
const [filterStatus,setFilterStatus] = useState('all')
const [filteredOrders,setFilterdOrders] = useState(adminOrders)
const [showActions,setShowActions] = useState(false)
const [stats,setStats] = useState(null)
console.log(stats)
console.log(adminOrders)

const [openDropdown, setOpenDropdown] = useState(null);

const toggleDropdown = (orderId) => {
  setOpenDropdown(openDropdown === orderId ? null : orderId);
};

    const getStatusColor = (status) => {
        switch (status) {
          case "completed":
            return "bg-green-100 text-green-800 hover:bg-green-200"
          case "processing":
            return "bg-blue-100 text-blue-800 hover:bg-blue-200"
          case "shipped":
            return "bg-purple-100 text-purple-800 hover:bg-purple-200"
          case "cancelled":
            return "bg-red-100 text-red-800 hover:bg-red-200"
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
      }


      const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)
      }


      const handleReload =()=>{
        window.location.reload();

      }





      
    useEffect(() => {
        const fetchAdminOrders = async () => {
            try {
                const response = await fetch('api/get-admin-orders'); // Your API endpoint
            
                const data = await response.json();
                setAdminOrders(data);
            } catch (err) {
                console.log(err.message);
            }
        };
    
        fetchAdminOrders();
    }, []);







      useEffect(() => {
        // Automatically update `filteredOrders` when `adminOrders` or `filterStatus` changes
        if (filterStatus === "all") {
            setFilterdOrders(adminOrders);
        } else {
            setFilterdOrders(adminOrders.filter(order => order.status === filterStatus));
        }
    }, [adminOrders, filterStatus]); 
    
    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };


    const updateOrderStatus = async (orderId, newStatus) => {
      try {
        const response = await fetch(`/api/update-order-status/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
  
        if (response.ok) {
          setAdminOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: newStatus } : order
            )
          );
        } else {
          console.error("Failed to update order status");
        }
      } catch (error) {
        console.error("Error updating order:", error);
      }
    };






  //   useEffect(() => {
  //     const fetchStats = async () => {
  //         try {
  //             const response = await fetch('http://localhost:10000/order-stats'); // Adjust to your backend URL
  //             const data = await response.json();
  //             setStats(data);
  //         } catch (error) {
  //             console.error("Error fetching order stats:", error);
  //         }
  //     };

  //     fetchStats();
  // }, []);
  
    
  return (


    <div>
      {/* header */}
      <header className='flex justify-between p-5 items-center'>
        <h1 className='text-3xl font-semibold'>Orders</h1>
        <button onClick={()=>handleReload()} className='flex gap-1 items-center'>
        <LuRefreshCcwDot />
        <p className='hidden sm:block'>Refresh</p>
        </button>


      </header>
      {/* grey-bg div below header */}
      <div className='bg-slate-50 p-8'>
        {/* cards- div */}

{/* 
        <div className="grid grid-cols-4 gap-4">
            {['totalOrders', 'processing', 'shipped', 'completed'].map((key) => (
                <div key={key} className="bg-white shadow-md p-4 rounded-md">
                    <h2 className="text-xl font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
                    <p className="text-3xl">{stats[key].count}</p>
                    <p className={`text-sm ${stats[key].change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stats[key].change}% from last month
                    </p>
                </div>
            ))}
        </div> */}




        <div className='flex justify-between flex-col sm:flex-row gap-5'>
            <div className='shadow-md p-7 bg-white rounded-md'>
                <div className='flex justify-between items-center sm:w-56'>
                    <p className='font-semibold'>Total Orders</p>
                    <TbPackage />
                </div>
                <div className='font-bold text-lg'>
                  {adminOrders.length}
                </div>
                <div className='flex gap-1'>
                <GoArrowUpRight className='text-green-500 '/>
                <p className='text-green-500 text-xs'>+10%</p>
                </div>
                <p className='text-xs'>from last month</p>
                


            </div>

            <div className='shadow-md p-5 bg-white rounded-md'>
                <div className='flex justify-between items-center sm:w-56'>
                    <p className='font-semibold'>Processing</p>
                    <TbPackage className='text-blue-500'/>
                </div>
                <div className='font-bold text-lg'>
                    {adminOrders.filter(order => order.status === "processing").length}
                </div>
                <div className='flex gap-1'>
                <GoArrowUpRight className='text-green-500'/>
                <p className='text-green-500 text-xs'>+0%</p>
                </div>
                <p className='text-xs'>from last month</p>
                


            </div>


            


            <div className='shadow-md p-5 bg-white rounded-md'>
                <div className='flex justify-between items-center sm:w-56'>
                    <p className='font-semibold'>Shipped</p>
                    <MdOutlineLocalShipping className='text-purple-500' />
                </div>
                <div className='font-bold text-lg'>
                {adminOrders.filter(order => order.status === "shipped").length}
                </div>
                <div className='flex gap-1'>
                <GoArrowDownRight className='text-red-300'/>
                <p className='text-red-300 text-xs'>0</p>
                </div>
                <p className='text-xs'>from last month</p>
                


            </div>


            <div className='shadow-md p-5 bg-white rounded-md'>
                <div className='flex justify-between items-center sm:w-56'>
                    <p>Completed</p>
                    <CiCircleCheck className='text-green-500'/>
                </div>
                <div className='font-bold text-lg'>
                {adminOrders.filter(order => order.status === "completed").length}
                </div>
                <div className='flex gap-1'>
                <GoArrowUpRight className='text-green-500'/>
                <p className='text-green-500 text-xs'>0</p>
                </div>
                <p className='text-xs'>from last month</p>
                


            </div>


        </div>
        {/* end of cards */}
        

        {/* filters */}

        <form className='my-5 justify-between flex flex-col sm:flex-row gap-5 '>
            <div className='flex border-[1.2px] border-gray-800 items-center sm:w-120 bg-white rounded-md p-2 gap-2'>
                <CiSearch/>
                <input type="text"  placeholder='searchOrders' className='focus:outline-none'/>
            </div>

            <select className='bg-white px-5 py-3 rounded-md focus:outline-none' onChange={handleFilterChange}>
                <option value="all" className='hover:bg-gray-500'>All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="shipped">Cancelled</option>


            </select>
            
            <select className='bg-white py-3 px-5 rounded-md focus:outline-none'>
                <option value="" className='hover:bg-gray-500'>Payment Method</option>
                <option value="">Mpesa</option>
       
            


            </select>
            {/* <div className='flex gap-1 bg-white items-center px-3 rounded-md py-3'>
            <CiFilter />
                <p>More filters</p>
                
            </div> */}
            


        </form>




<div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-md">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3 text-left text-gray-500">OrderID</th>
              <th className="p-3 text-left text-gray-500">Customer</th>
              <th className="p-3 text-left text-gray-500">Date</th>
              <th className="p-3 text-left text-gray-500">Status</th>
              <th className="p-3 text-left text-gray-500">Total</th>
              <th className="p-3 text-left text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {filteredOrders?.map((order) => (
              <tr key={order.id} className="border-b border-gray-300">
                <td className="p-3 font-semibold">
        
                {String(parseInt(order._id?.slice(-4), 16)).slice(-4)}
                  
                </td>
                <td className="p-3">
                  <div className='flex gap-2'>
                    <p>{order.firstName}</p>
                    <p>{order.lastName}</p>
                  </div>
                <p className='text-xs text-gray-500'>{order.email}</p>
                 
                 
                </td>
                <td className="p-3">{formatDate(order?.createdAt)}</td>
                <td className="p-3">
                <div className={`${getStatusColor(order.status)} capitalize h-6 text-xs flex items-center justify-center w-16 rounded-lg px-1`}>
                                        <p>{order.status}</p>
                                    </div>
                  
                </td>
                <td className="p-3">kshs {order.total}</td>
                <td className="p-3 relative">
                

                 <button  onClick={() => setSelectedProduct(order)} className='flex items-center gap-2'>
                  <p>view order</p>
                  <p><FaRegEye/></p>
                 </button>

                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


      </div>


      {selectedProduct && <ProductModal order={selectedProduct} onClose={() => setSelectedProduct(null)} onUpdateStatus={updateOrderStatus}/>}
    </div>
  )
}