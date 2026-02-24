import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading,setLoading]=useState(false)

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true)

    const token = sessionStorage.getItem("token");

    try {
      await axios.post(
        "https://user-project-management.onrender.com/product",
        {
          name,
          price: Number(price),
          category,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/products");

    } catch (error) {
      alert(error.response?.data?.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 p-6">

      <form
        onSubmit={handleAdd}
        className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Add New Product
        </h2>

        <input
          placeholder="Product Name"
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Category"
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Description"
          rows="4"
          className="w-full p-3 border border-gray-200 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition duration-200 
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 text-white"
              }`}
          >
            {loading ? "Adding..." : "➕ Add Product"}
          </button>
      </form>

    </div>
  );
}

export default AddProduct;
