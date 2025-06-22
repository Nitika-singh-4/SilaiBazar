import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "tailor") {
          navigate("/tailor/dashboard");
        } else {
          navigate("/dashboard");
        }
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);

      // ✅ Decode token to get role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      alert("Login successful!");

      // ✅ Redirect based on role
      if (role === "tailor") {
        navigate("/tailor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Forgot Password?</a>
            <span className="mx-2">•</span>
            <a href="/signup" className="hover:text-blue-600 transition-colors">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
