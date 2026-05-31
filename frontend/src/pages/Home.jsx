import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

function Home() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const loadProducts = async () => {
    try {

      const res = await api.get(
        `/products?search=${search}&category=${category}`
      )

      setProducts(res.data)

    } catch (error) {

      console.error(error.response?.data?.message)

    }
  }

  useEffect(() => {
    loadProducts()
  }, [search, category])

  return (

    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-900 mb-8 tracking-tight">
          Our Collection
        </h1>

        {/* search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        {/* products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {
            Array.isArray(products) &&
            products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300 flex flex-col justify-between"
              >
                <div className="h-64 bg-slate-50 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-2 truncate">
                      {product.title}
                    </h2>
                    <p className="text-xl font-black text-indigo-600 mb-2">
                      ₹ {product.price}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <p className={`text-xs font-bold mb-3 ${product.stock > 0 ? "text-slate-400" : "text-rose-500"}`}>
                      {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
                    </p>
                    <span className="block text-center w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-2xl transition duration-300 shadow-md shadow-indigo-600/5">
                      View Product
                    </span>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home