import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Nav() {
  const navigate = useNavigate()
  const [cartCount,setCartCount] = useState(0)
  const userId = localStorage.getItem("userId")

  useEffect(()=>{
  const loadProducts=async()=>{
      if(!userId) return setCartCount(0);
   const res = await api.get(`/cart/${userId}`)
   const totle = res.data.items.reduce((sum,item)=> sum + item.quantity, 0)
   setCartCount(totle)
  }
  loadProducts()
  window.addEventListener("cartUpdated",loadProducts)
  return()=>{
    window.removeEventListener("cartUpdated",loadProducts)
  }
},[userId])

  const logout = async()=>{
    try {
      localStorage.clear()
      setCartCount(0)
      navigate("/login")
    } catch (error) {
      console.error(error.res?.data?.message)
    }
  }
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-black tracking-tight bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition duration-300">
            NINJA<span className="text-indigo-600 text-xs align-super font-bold ml-0.5">®</span>
          </Link>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-full transition-all duration-300 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.8} 
              stroke="currentColor" 
              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {!userId ? (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-50/50 transition duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-5 py-2.5 rounded-xl shadow-md hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/admin/products"
                  className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
                >
                  Admin Panel
                </Link>
                <button 
                  onClick={logout} 
                  className="text-sm font-semibold text-rose-600 hover:bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-100 transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
