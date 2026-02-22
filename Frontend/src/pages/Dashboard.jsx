import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const name = localStorage.getItem("name") || "User";

  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name") || "User";


  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const loadProducts = async () => {
      const res = await axios.get(
        "http://localhost:5000/product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(res.data.data);
    };

    loadProducts();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/product/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setProducts(products.filter((p) => p._id !== id));
  };

  const totalValue = products.reduce(
    (acc, p) => acc + Number(p.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 p-10">

      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Welcome back, <span className="text-indigo-600">{name}</span> 👋
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {products.length}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-gray-500">Total Value</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹ {totalValue}
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition">
          <button
            onClick={() => navigate("/add-product")}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            ➕ Add Product
          </button>
        </div>

      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="text-indigo-600 font-bold mt-2">
                ₹ {product.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {product.category}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    navigate(`/edit-product/${product._id}`)
                  }
                  className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Dashboard;
