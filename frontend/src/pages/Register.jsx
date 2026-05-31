import React, { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const hendleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", form);

      setMsg(response.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setMsg(
        err.response?.data?.message || "Internal Server Error"
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 mt-2 text-sm">Join NINJA to shop our premium products</p>
        </div>

        {msg && (
          <div className={`mb-6 px-4 py-3 rounded-2xl text-sm font-semibold text-center ${
            msg.toLowerCase().includes("sucess") || msg.toLowerCase().includes("saved")
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-rose-50 text-rose-700 border border-rose-100"
          }`}>
            {msg}
          </div>
        )}

        <form onSubmit={hendleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={hendleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={hendleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={hendleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-sm font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-600/10 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 font-bold ml-1 hover:text-indigo-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;