"use client"

import { useEffect, useState } from "react"
import { Search, Filter, ShoppingCart, Star, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ShopHeader from "../(components)/ShopHeader"
import { useCart } from "../context/CartContext"
import { useUser } from "../context/UserContext"






export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const { cart, removeFromCart,getTotalQuantity,addToCart} = useCart()
  const [products,setProducts] = useState([])
  const { user, logout } = useUser();
  console.log(user)

  const categories = [
    { value: "all", label: "All Products" },
    { value: "Main Door", label: "Main Door" },
    { value: "Grills", label: "Grills" },
    { value: "Window Grills", label: "Window Grills" },
    { value: "custom-work", label: "Custom Fabrication" },
    { value: "welding-equipment", label: "Welding Equipment" },,
    
   
  ]

 useEffect(()=>{
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/get-products")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  fetchProducts()

 },[])







  return (
    <div className="min-h-screen bg-background">
     
      <ShopHeader/>




      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Professional Welding Shop</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quality custom fabricated items and equipment from a trusted professional
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6 border-gray-500 border-[1.2px] h-fit shadow-md rounded-lg p-5">
            <div>
              <div>
                <div className="text-lg font-bold">Search & Filter</div>
              </div>
              <div className="space-y-4">
                <div className=" border-gray-500 border-[1.2px] flex items-center gap-2 p-1 rounded-md">
                  <Search className="h-4 w-4 text-gray-500" />
                  <input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-27 focus:outline-none"
                  />
                </div>

                <div >
                  <label className="text-sm  mb-2 block font-bold">Category</label>
                  <select name="" id=" " className="border-gray-500 border-[1.2px] p-2 rounded-md">
                  {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}

                  </select>


              
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                

                    <select name="" id=" " className="border-gray-500 border-[1.2px] p-2 rounded-md">
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name A-Z</option>
                  </select>





                </div>

                {/* <Separator /> */}

                
              </div>
            </div>

          

        
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500">
                Showing {products.length} of {products.length} products
              </p>
            
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group hover:shadow-lg transition-shadow border-gray-500 border-[1.2px] rounded-lg">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={product.imageUrls[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                
                  </div>

                  <div className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                    

                      <div className="flex items-center justify-between">
                        <div className="space-x-2">
                          <span className="text-lg font-bold">kshs {product.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <button 
                      className='w-full text-white rounded-lg py-2 bg-black' 

                       onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
                <button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 px-8">
        <div className="container">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-gray-500">Get notified about new products, special offers, and welding tips</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input placeholder="Enter your email" type="email" className="flex-1 focus:outline-none bg-white border-gray-500 p-2 border-[1.2] rounded-lg" />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg p-2" >Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}
