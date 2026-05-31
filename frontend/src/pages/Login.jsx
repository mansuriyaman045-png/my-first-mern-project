import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const hendleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const hendleSubmit = async (e) => {

    e.preventDefault();

    console.log("login clicked");
    console.log(form);

    try {

      const response = await api.post("/auth/login", form);
      

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE USER ID
      localStorage.setItem("userId", response.data.user.id);

      console.log(
        "Stored UserId:",
        response.data.user.id
      );

      setMsg("Login Successfully");

      // CLEAR FORM
      setForm({
        email: "",
        password: "",
      });

      // REDIRECT
      navigate("/");

    } catch (err) {

      console.log("FULL ERROR:", err);

      console.log("RESPONSE:", err.response);

      console.log("DATA:", err.response?.data);

      setMsg(
        err.response?.data?.message ||
        err.message ||
        "Internal Server Error"
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to your NINJA account</p>
        </div>

        {msg && (
          <div className={`mb-6 px-4 py-3 rounded-2xl text-sm font-semibold text-center ${
            msg.toLowerCase().includes("sucess") || msg.toLowerCase().includes("ok") || msg.toLowerCase().includes("welcome")
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-rose-50 text-rose-700 border border-rose-100"
          }`}>
            {msg}
          </div>
        )}

        <form onSubmit={hendleSubmit} className="space-y-5">
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
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don’t have an account?
          <Link
            to="/register"
            className="text-indigo-600 font-bold ml-1 hover:text-indigo-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;