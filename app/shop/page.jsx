"use client"

import { useEffect, useState } from "react"
import { Search, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ShopHeader from "../(components)/ShopHeader"
import { useCart } from "../context/CartContext"
import { useUser } from "../context/UserContext"

export default function ShopPage() {
  const { cart, addToCart } = useCart()
  const { user } = useUser()

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  const categories = [
    { value: "all", label: "All Products" },
    { value: "Main Door", label: "Main Door" },
    { value: "Grills", label: "Grills" },
    { value: "custom-work", label: "Custom Fabrication" },
    { value: "welding-equipment", label: "Welding Equipment" }
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])


  useEffect(() => {
    const filter = products?.filter((product) => {
      const name = product?.name?.toLowerCase?.() || ""
      const description = product?.description?.toLowerCase?.() || ""
      const category = product?.category?.toLowerCase?.() || ""
  
      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase())
  
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory.toLowerCase()
  
      return matchesSearch && matchesCategory
    })
  
    setFilteredProducts(filter)
  }, [products, searchTerm, selectedCategory])
  



  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">Professional Welding Shop</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quality custom fabricated items and equipment from a trusted professional
          </p>
        </div>
      </section>

      <div className="container py-8 px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-6 border-gray-500 border rounded-lg p-5 shadow">
            <div>
              <h2 className="text-lg font-bold mb-4">Search & Filter</h2>

              <div className="flex items-center gap-2 border p-2 rounded-md mb-4">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              <label className="block text-sm font-bold mb-1">Category</label>
              <select
                className="w-full border p-2 rounded-md text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {loading ? (
              <p className="text-center text-muted-foreground py-12">Loading products...</p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group border rounded-lg hover:shadow-lg transition overflow-hidden"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={product.imageUrls?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            Ksh {product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          className="w-full bg-black text-white py-2 rounded-lg"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No products found.</p>
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("all")
                      }}
                      className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50 px-8">
        <div className="container text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="text-gray-500">
            Get notified about new products, special offers, and welding tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-500 p-2 rounded-lg"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg p-2">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
