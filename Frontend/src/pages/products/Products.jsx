import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(
          "https://user-project-management.onrender.com/product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(res.data.data);

      } catch (error) {
        console.log("ERROR:", error.response);
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 p-10">

      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        Your Products
      </h1>

      {products.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center text-gray-600">
          No products found. Start by adding one 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>

              <p className="text-indigo-600 font-bold mt-2">
                ₹ {product.price}
              </p>

              {product.category && (
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
                  {product.category}
                </span>
              )}

              {product.description && (
                <p className="text-gray-500 text-sm mt-3">
                  {product.description}
                </p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    navigate(`/edit-product/${product._id}`)
                  }
                  className="bg-yellow-400 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Products;
