"use client"

import { useState } from "react"
import { Search, Filter, ShoppingCart, Star, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ShopHeader from "../(components)/ShopHeader"
import { useCart } from "../context/CartContext"






export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const { cart, removeFromCart,getTotalQuantity} = useCart()

  const categories = [
    { value: "all", label: "All Products" },
    { value: "Main Door", label: "Main Door" },
    { value: "Grills", label: "Grills" },
    { value: "Window Grills", label: "Window Grills" },
    { value: "welding-equipment", label: "Welding Equipment" },,
    { value: "custom-work", label: "Custom Fabrication" },
   
  ]

  const products = [
    {
      id: "1",
      name: "Professional MIG Welder 200A",
      price: 899.99,
      originalPrice: 1199.99,
      category: "welding-equipment",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true,
      description: "High-performance MIG welder perfect for professional applications",
    },
    {
      id: "2",
      name: "Auto-Darkening Welding Helmet",
      price: 159.99,
      category: "safety-gear",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      featured: true,
      description: "Premium auto-darkening helmet with adjustable sensitivity",
    },
    {
      id: "3",
      name: "Custom Steel Railings",
      price: 450.0,
      category: "custom-work",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 5.0,
      reviews: 23,
      inStock: true,
      featured: false,
      description: "Custom fabricated steel railings - made to order",
    },
    {
      id: "4",
      name: "Welding Gloves - Heat Resistant",
      price: 29.99,
      category: "safety-gear",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.4,
      reviews: 156,
      inStock: true,
      featured: false,
      description: "Heavy-duty heat resistant welding gloves",
    },
    {
      id: "5",
      name: "TIG Tungsten Electrodes Set",
      price: 34.99,
      category: "consumables",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.7,
      reviews: 67,
      inStock: true,
      featured: false,
      description: "Complete set of tungsten electrodes for TIG welding",
    },
    {
      id: "6",
      name: "Angle Grinder 4.5 inch",
      price: 79.99,
      originalPrice: 99.99,
      category: "tools",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.3,
      reviews: 201,
      inStock: true,
      featured: true,
      description: "Powerful angle grinder for cutting and grinding applications",
    },
    {
      id: "7",
      name: "Custom Fire Pit",
      price: 650.0,
      category: "custom-work",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.9,
      reviews: 15,
      inStock: false,
      featured: true,
      description: "Handcrafted steel fire pit - custom designs available",
    },
    {
      id: "8",
      name: "Welding Wire ER70S-6",
      price: 45.99,
      category: "consumables",
      image: "https://5.imimg.com/data5/PG/LA/RI/SELLER-892673/01-1000x1000.jpg",
      rating: 4.5,
      reviews: 93,
      inStock: true,
      featured: false,
      description: "High-quality welding wire for MIG applications",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return b.featured ? 1 : -1
    }
  })

  const addToCart = (productId) => {
    setCartItems((prev) => [...prev, productId])
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

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
                  {/* <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name A-Z</option>
                    </SelectContent>
                  </Select> */}

                    <select name="" id=" " className="border-gray-500 border-[1.2px] p-2 rounded-md">
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name A-Z</option>
                  </select>





                </div>

                {/* <Separator /> */}

                <div className="space-y-3">
                  <h3 className="font-medium">Availability</h3>
                  <div className="flex items-center space-x-2">
                 
                    <input type="checkbox" name="" id="in-stock" />
                    <label htmlFor="in-stock" className="text-sm">
                      In Stock Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                  <input type="checkbox" name="" id="on-sale" />
                    
                    <label htmlFor="on-sale" className="text-sm">
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Categories */}
            {/* <div>
              <div>
                <div className="text-lg font-bold">Shop by Category</div>
              </div>
              <div className="space-y-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category.value}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div> */}

            <div>
              <h1 className="mb-2 text-lg font-bold">Shop by Category</h1>
              {categories.slice(1).map((item)=>{
                return(<p className="font-semibold">{item.label}</p>)
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              <button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group hover:shadow-lg transition-shadow border-gray-500 border-[1.2px] rounded-lg">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* {product.featured && <div className="absolute top-2 left-2 bg-orange-500 text-sm text-white rounded-full px-3">Featured</div>}
                    {product.originalPrice && (
                      <div variant="destructive" className="absolute top-2 right-2 bg-rose-400 text-white text-sm rounded-full px-3">
                        Sale
                      </div>
                    )} */}
                    {/* {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div variant="secondary">Out of Stock</div>
                      </div>
                    )} */}

                    {/* Hover Actions */}
                    {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button size="icon" variant="secondary" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </button>
                    </div> */}
                  </div>

                  <div className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                      {/* <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div> */}

                      <div className="flex items-center justify-between">
                        <div className="space-x-2">
                          <span className="text-lg font-bold">kshs {Math.round(product.price*129).toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">kshs {Math.round(product.originalPrice*129).toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      <button 
                      className={`w-full text-white rounded-lg py-2 ${product.inStock?'bg-black':'bg-rose-700'}`} 

                      disabled={!product.inStock} onClick={() => addToCart(product.id)}>
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
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
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-gray-500">Get notified about new products, special offers, and welding tips</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input placeholder="Enter your email" type="email" className="flex-1 focus:outline-none bg-white border-gray-500 p-2 border-[1.2] rounded-lg" />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg" >Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}
