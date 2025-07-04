"use client"
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext';

export default function page() {
    const { addToCart } = useCart();
    const { cart, removeFromCart,getTotalQuantity} = useCart();
    const [products,setProducts] = useState([])
    useEffect(()=>{
        const fetchData  = async () =>{
            const res = await fetch('/api/get-products')
            const data = await res.json()
            setProducts(data)
        }
        fetchData()
    },[])
    // console.log(products)
    console.log(cart)
    
  return (
    <div>

<div className='flex gap-5 flex-wrap'>
        {products.map((product)=>{
            return <div key={product._id} className='shadow-md'>
                <p>{product.name}</p>
                <button
                    className="bg-blue-600 text-white px-3 py-1 mt-2"
                    onClick={() => addToCart(product)}
                    >
                    Add to Cart
                </button>
            </div>
        })}
      
    </div>





    <div className="p-6">
      <h1 className="text-xl mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2">
              {item.name} x {item.amount} - KES {item.price * item.amount}
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    <p>{getTotalQuantity ()}</p>

    </div>
    
  )
}
