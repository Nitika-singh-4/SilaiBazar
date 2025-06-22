// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserCheck, Scissors, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center items-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Scissors className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join SilaiBazar</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20"
        >
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <InputField 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <InputField 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <InputField 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
              I want to join as
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.role === "user"
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => setFormData({ ...formData, role: "user" })}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <UserCheck className={`w-6 h-6 mx-auto mb-2 ${
                    formData.role === "user" ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <div className={`font-semibold ${
                    formData.role === "user" ? "text-blue-600" : "text-gray-600"
                  }`}>
                    Customer
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Get clothes stitched
                  </div>
                </div>
              </div>

              <div
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.role === "tailor"
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => setFormData({ ...formData, role: "tailor" })}
              >
                <input
                  type="radio"
                  name="role"
                  value="tailor"
                  checked={formData.role === "tailor"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <Scissors className={`w-6 h-6 mx-auto mb-2 ${
                    formData.role === "tailor" ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <div className={`font-semibold ${
                    formData.role === "tailor" ? "text-blue-600" : "text-gray-600"
                  }`}>
                    Tailor
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Offer services
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Fast Setup</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Free to Join</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;