import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

function ProductDetails() {

  const [product, setProduct] = useState(null)

  const { id } = useParams()

  const loadProducts = async () => {
    try {

      const res = await api.get('/products')

      const p = res.data.find(
        (item) => item._id === id
      )

      setProduct(p)

    } catch (error) {
      console.error(error.response?.data?.message)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])


  if (!product) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">Loading Product Details...</p>
        </div>
      </div>
    )
  }

  const addtocart = async(productId)=>{
    const userId = localStorage.getItem("userId")
    if(!userId){ 
      alert("login to add items to cart"); 
      return
    }
    try {
      await api.post(`/cart/add`,{userId,productId})
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid md:grid-cols-2 gap-8 p-6 sm:p-10">
        {/* Product Image */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center p-6 group">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[400px] object-contain group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {product.category || "Premium"}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {product.title}
            </h1>

            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-black text-slate-900">
                ₹ {Number(product.price).toFixed(2)}
              </p>
              
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                (product.stock || 0) > 0 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "bg-rose-50 text-rose-700"
              }`}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </span>
            </div>

            <button 
              onClick={() => addtocart(product._id)} 
              disabled={product.stock <= 0}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-4 rounded-2xl text-base font-bold shadow-lg shadow-indigo-600/10 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails