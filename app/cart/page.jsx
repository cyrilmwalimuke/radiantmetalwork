"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft, Tag } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useUser } from "../context/UserContext"



export default function Component() {
    const { cart, removeFromCart,getTotalQuantity,getTotalPrice} = useCart()
    console.log(cart)
    const {user}  = useUser()



  

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true)
    }
  }

  const shipping = getTotalPrice() > 100 ? 0 : 9.99


  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">{"Looks like you haven't added any items to your cart yet."}</p>
            <Link href="/shop">
              <button size="lg" className="px-8">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <Image src={item.imageUrls[0]} alt={item.name} fill className="object-cover" />
                      
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.variant}</p>
                        
                        </div>
                        <button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">kshs {item?.price.toLocaleString()}</span>
                         
                        </div>

                        {/* Quantity Controls */}
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-5 rounded-lg">
            <div className="sticky top-8">
              <div>
                <div className="text-2xl font-bold">Order Summary</div>
              </div>
              <div className="space-y-4">
             

                {/* <Separator /> */}

                {/* Price Breakdown */}
                <div className="space-y-3">
                  

        

                 

                 

                  {/* <Separator /> */}

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                  
                    <span>kshs {getTotalPrice() .toLocaleString()}</span>
                  </div>
                </div>

            
              </div>
              <div className="flex flex-col gap-3">
                {user ? ( 
                   <Link href='/check-out' className="w-full text-center bg-black text-white py-2 mt-3 rounded-lg" size="lg">
                   Proceed to Checkout
                 </Link>
                ) : (
                  <Link href='/check-out' className="w-full text-center bg-black text-white py-2 mt-3 rounded-lg" size="lg">
                  Login to Checkout
                </Link>
                )}
               
                <button variant="outline" className="w-full bg-transparent border-gray-300 border-[1.2px] rounded-lg py-2 hover:bg-gray-100">
                  <Link href="/shop">Continue Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
