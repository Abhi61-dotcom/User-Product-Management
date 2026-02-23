import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
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

        const product = res.data.data.find((p) => p._id === id);

        if (product) {
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description || "");
        }

      } catch (error) {
        console.log("ERROR:", error.response);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      await axios.put(
        `https://user-project-management.onrender.com/product/${id}`,
        {
          name,
          price: Number(price),
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
      console.log(error.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 p-6">

      <form
        onSubmit={handleUpdate}
        className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Edit Product
        </h2>

        <input
          value={name}
          placeholder="Product Name"
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          value={price}
          placeholder="Price"
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Description"
          rows="4"
          className="w-full p-3 border border-gray-200 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition duration-200 shadow-md">
          ✏ Update Product
        </button>
      </form>

    </div>
  );
}

export default EditProduct;
