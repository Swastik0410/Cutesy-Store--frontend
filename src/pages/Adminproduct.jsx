import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";

const Adminproduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.data);
    } catch (err) {
      showNotification("❌ Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      showNotification("🗑️ Product deleted successfully");
    } catch (err) {
      showNotification("❌ Failed to delete product");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />

      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-(--rose) text-white px-5 py-3 rounded-xl shadow-lg text-sm animate-fade-in">
          {notification}
        </div>
      )}

      <main className="pt-28 px-4 md:px-12 pb-24 bg-(--beige) min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1
            style={{ fontFamily: "Great Vibes" }}
            className="text-4xl text-(--rose)"
          >
            Products
          </h1>

          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-(--rose) text-white px-4 py-2 rounded-xl text-sm hover:bg-(--rose)/90 transition"
          >
            + Add Product
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-(--brown)">Loading products...</p>
        )}

        {/* Product list */}
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center bg-(--ivory) rounded-xl shadow px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="leading-tight">
                  <p className="text-(--rose) text-sm font-medium">
                    {product.name}
                  </p>
                  <p className="text-(--brown) text-xs">
                    ₹{product.price}
                  </p>
                  <p className="text-(--brown)/70 text-xs max-w-45 truncate">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Edit / Delete */}
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    navigate("/admin/products/edit", { state: product })
                  }
                  title="Edit Product"
                  className="text-(--rose) hover:scale-110 transition"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  title="Delete Product"
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Adminproduct;
