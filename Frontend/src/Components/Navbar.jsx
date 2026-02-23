import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/sales-manager.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name") || "User";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-600 hover:text-indigo-600 transition";

  return (
    <div className="relative bg-white/80 backdrop-blur-md shadow-sm px-6 md:px-10 py-4 sticky top-0 z-50 border-b border-indigo-100">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate(token ? "/dashboard" : "/")}
          className="text-2xl flex font-bold cursor-pointer tracking-wide"
        >
          <img src={logo} alt="logo" className="w-8 h-8 mr-2" />
          <span className="text-indigo-600">Product</span>
          <span className="text-purple-500">Pro</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-base">
          {!token ? (
            <>
              <Link className={isActive("/")} to="/">Login</Link>
              <Link className={isActive("/register")} to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link className={isActive("/dashboard")} to="/dashboard">Dashboard</Link>
              <Link className={isActive("/products")} to="/products">Products</Link>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">{name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-1.5 rounded-full hover:scale-105 transition duration-200 shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-indigo-600 text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown - Right Side Professional Box */}
      {menuOpen && (
        <div className="absolute right-6 top-full mt-4 w-64 bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-indigo-100 md:hidden">

          {!token ? (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
              >
                Dashboard
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
              >
                Products
              </Link>

              <div className="flex items-center gap-3 border-t pt-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">{name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg mt-2 hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;