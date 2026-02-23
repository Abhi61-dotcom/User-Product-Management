import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import registerImage from "../assets/register side image.png"; // same illustration use kar sakte ho

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful ✅");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">

      {/* -------- Top Section -------- */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-12">

        {/* Register Form */}
        <form
          onSubmit={handleRegister}
          className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-indigo-600">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Join ProductPro and start managing your products efficiently.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition duration-200 shadow-md">
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-indigo-600 cursor-pointer font-medium"
            >
              Login
            </span>
          </p>
        </form>

        {/* Side Image + Text */}
        <div className="w-full max-w-md text-center lg:text-left">
          <img
            src={registerImage}
            alt="register visual"
            className="w-full h-auto object-contain mb-6"
          />

          <h3 className="text-2xl font-bold text-indigo-700 mb-3">
            Manage Smarter, Grow Faster 🚀
          </h3>

          <p className="text-gray-600 text-base">
            ProductPro helps you organize products, manage users, and
            track performance reports — all in one powerful dashboard.
          </p>
        </div>

      </div>

      {/* -------- Feature Section -------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-16 max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <h3 className="font-bold text-xl mb-2 text-indigo-600">
            Secure Authentication
          </h3>
          <p className="text-gray-600 text-sm">
            Advanced password encryption and JWT-based secure login system.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <h3 className="font-bold text-xl mb-2 text-purple-600">
            Easy Product Control
          </h3>
          <p className="text-gray-600 text-sm">
            Add, edit, delete, and manage your product inventory effortlessly.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <h3 className="font-bold text-xl mb-2 text-indigo-600">
            Performance Insights
          </h3>
          <p className="text-gray-600 text-sm">
            Monitor product activity and user interactions with detailed insights.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Register;