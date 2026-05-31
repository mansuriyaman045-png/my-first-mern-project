import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function EditProducts() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    const loadProduct = async () => {
        try {
            const res = await api.get("/products");
            // Assuming the backend returns an array of products in res.data.products
            const product = res.data.find((e) => e._id === id);
            if (product) {
                setForm({
                    title: product.title || "",
                    description: product.description || "",
                    price: product.price || "",
                    category: product.category || "",
                    image: product.image || "",
                    stock: product.stock || ""
                });
            }
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    useEffect(() => {
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product updated successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-xl border border-slate-100 rounded-3xl p-8 sm:p-10">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Edit Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {Object.keys(form).map((key) => (
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
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-[0.99] transition-all duration-200 cursor-pointer"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProducts;