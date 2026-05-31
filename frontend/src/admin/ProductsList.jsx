import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadProduct = async () => {
    try {
      setLoading(true)
      const res = await api.get("/products")      
      setProducts(res.data)
   
      
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return

    try {
      await api.delete(`/products/delete/${id}`)
      alert("Product deleted successfully")
      loadProduct()
    } catch (error) {
      console.error("Error while deleting product:", error)
      alert("Failed to delete product")
    }
  }

  useEffect(() => {
    loadProduct()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl border border-slate-100 rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Product Catalog
            </h2>
            <p className="text-slate-500 text-sm mt-1">Manage your shop's inventory, stock, and pricing</p>
          </div>
          <Link
            to='/admin/add'
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
          >
            Add New Product
          </Link>
        </div>

        <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">Image</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">Stock</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">Price</th>
                  <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product?._id || Math.random()}
                      className="hover:bg-slate-50/50 transition duration-150"
                    >
                      <td className="px-6 py-4">
                        {product?.image ? (
                          <img
                            src={product.image}
                            alt={product.title || "Product"}
                            className="w-14 h-14 object-cover rounded-xl border border-slate-100 bg-slate-50"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {String(product?.title || "Untitled")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          (product?.stock || 0) > 10 
                            ? "bg-emerald-50 text-emerald-700" 
                            : (product?.stock || 0) > 0 
                            ? "bg-amber-50 text-amber-700" 
                            : "bg-rose-50 text-rose-700"
                        }`}>
                          {product?.stock !== undefined ? String(product.stock) : "0"} Available
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-indigo-600">
                        ₹ {product?.price !== undefined ? Number(product.price).toFixed(2) : "0.00"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/products/edit/${product?._id}`}
                            className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs transition duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(product?._id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold px-4 py-2 rounded-xl text-xs transition duration-200 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-400 font-medium">
                      No products found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList