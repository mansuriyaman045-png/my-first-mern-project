import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

function AddProducts() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()
console.log(form)
    try {

      await api.post("/products/add", form)
      

      alert("Product added successfully")

      navigate("/admin/products")

    } catch (err) {

      console.error("Error in handleSubmit", err)

    }

  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl border border-slate-100 rounded-3xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {
              Object.keys(form).map((key) => (
                <div key={key} className={key === "description" || key === "image" ? "sm:col-span-2" : ""}>
                  <label className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider capitalize">
                    {key}
                  </label>
                  {key === "description" ? (
                    <textarea
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      placeholder={`Enter product ${key}`}
                      required
                      rows={3}
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium resize-none"
                    />
                  ) : (
                    <input
                      type={
                        key === "price" || key === "stock"
                          ? "number"
                          : key === "image"
                          ? "url"
                          : "text"
                      }
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      placeholder={`Enter product ${key}`}
                      required
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium"
                    />
                  )}
                </div>
              ))
            }
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-[0.99] transition-all duration-200 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProducts