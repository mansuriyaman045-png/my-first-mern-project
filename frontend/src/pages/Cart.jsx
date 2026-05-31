import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Cart() {
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()
  const [cart,setCart] = useState()

  const loadProducts=async()=>{
    try {
      if(!userId) return
      const res = await api.get(`/cart/${userId}`)
      setCart(res.data)
    } catch (error) {
      console.error(error.res?.data?.message)
    }
  }

  useEffect(()=>{
    loadProducts();
    },[userId])

    const remove=async(productId)=>{
      try {
        const res = await api.post(`/cart/remove`,{userId,productId})
        loadProducts()
        window.dispatchEvent(new Event("cartUpdated"))
      } catch (error) {
        console.error(error.res?.data?.message)
      }
    }

    const updateQty = async(productId,quantity)=>{
      try {
        if(quantity === 0){
          await remove(productId)
          return
        }
        const res =  await api.post(`/cart/update`,{userId,productId,quantity})
        loadProducts()
        window.dispatchEvent(new Event("cartUpdated"))
      } catch (error) {
        console.error(error.res?.data?.message)
        
      }
    }

    if(!cart){
      return <div className="">loding...</div>
    }

    const validItems = cart.items.filter(item => item.productId)
    const totle = validItems.reduce((sum,item)=> sum + item.productId.price * item.quantity,0)
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Shopping Cart</h1>

        {
          validItems.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">Explore our premium collection and find something that suits your style.</p>
              <button onClick={() => navigate('/')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-2xl transition duration-300 shadow-lg shadow-indigo-600/10 cursor-pointer">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                {
                  validItems.map((item) => (
                    <div key={item.productId._id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col sm:flex-row items-center gap-6">
                      <img 
                        src={item.productId.image} 
                        alt={item.productId.title} 
                        className="w-24 h-24 object-cover rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0"
                      />
                      
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{item.productId.title}</h3>
                        <p className="text-indigo-600 font-extrabold mt-1">₹ {item.productId.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-2xl p-1.5">
                        <button 
                          onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-slate-600 hover:bg-white hover:shadow-sm active:scale-95 transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-slate-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-slate-600 hover:bg-white hover:shadow-sm active:scale-95 transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="text-center sm:text-right min-w-[100px]">
                        <p className="text-xs text-slate-400 font-medium">Subtotal</p>
                        <p className="text-base font-black text-slate-800 mt-0.5">
                          ₹ {(item.productId.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => remove(item.productId._id)}
                        className="text-rose-500 hover:bg-rose-50 p-2.5 rounded-2xl transition duration-300 flex-shrink-0 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  ))
                }
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-800">Order Summary</h3>
                
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Items Total</span>
                    <span>₹ {totle.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Shipping</span>
                    <span className="text-emerald-500 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Tax (GST 18%)</span>
                    <span>₹ {(totle * 0.18).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Estimated Total</p>
                    <p className="text-3xl font-black text-slate-900 mt-1">₹ {(totle * 1.18).toFixed(2)}</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Checkout flow coming soon!")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition duration-300 shadow-lg cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart
