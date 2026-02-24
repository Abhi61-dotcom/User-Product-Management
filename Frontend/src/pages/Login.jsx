import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/login image no. 1.png"
import sec2img1 from "../assets/sec2 -img1.png"
import sec2img2 from "../assets/sec3 - img 2.png"
import sec2img3 from "../assets/sec2 -img 3.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await axios.post(
        "https://user-project-management.onrender.com/user/login",
        { email, password }
      );

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("name", res.data.name);

      navigate("/dashboard");

    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "User not found") {
        alert("Email not registered. Please register first.");
      }
      else if (message === "Invalid password") {
        alert("Invalid Password");
      }
      else {
        alert(message || "Login failed");
      }
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100">

      {/* ---------- Top Section ---------- */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-12">

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition duration-200 
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 text-white"
              }`}
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>

        {/* Side Image */}
        <div className="w-full max-w-md">
          <img
            src={image1}
            alt="login visual"
            className="w-full h-auto object-contain"
          />
        </div>

      </div>

      {/* ---------- Features Section ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-16 max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <img src={sec2img1} alt="" className="h-12 w-12 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Manage Your Products</h3>
          <p className="font-light text-base text-gray-600">
            Track and manage your product with ease.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <img src={sec2img2} alt="" className="h-12 w-12 mx-auto mb-4 rounded-xl" />
          <h3 className="font-bold text-xl mb-2">User Management</h3>
          <p className="font-light text-base text-gray-600">
            Easily manage user access and permissions.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <img src={sec2img3} alt="" className="h-12 w-12 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Performance Reports</h3>
          <p className="font-light text-base text-gray-600">
            Gain insights with detailed performance reports.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;
