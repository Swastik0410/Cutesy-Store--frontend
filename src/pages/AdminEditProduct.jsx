import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ...state,
    preview: state.image,
    imageFile: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct((prev) => ({
      ...prev,
      imageFile: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);

      if (product.imageFile) {
        formData.append("image", product.imageFile);
      }

      const token = localStorage.getItem("adminToken");

      await axios.put(
        `https://cutesy-store-backend.onrender.com/api/products/${product._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to update product");
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-28 px-4 pb-16 bg-(--beige) min-h-screen">
        <h1
          style={{ fontFamily: "Great Vibes" }}
          className="text-4xl text-(--rose) mb-6"
        >
          Edit Product
        </h1>

        <form
          onSubmit={handleSave}
          className="bg-(--ivory) rounded-3xl shadow p-6 space-y-4 max-w-md"
        >
          <input
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border"
            required
          />

          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border"
            required
          />

          <textarea
            rows={3}
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border resize-none"
            required
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {product.preview && (
            <img
              src={product.preview}
              className="w-24 h-24 rounded-xl object-cover"
            />
          )}

          <button
            type="submit"
            className="w-full bg-(--rose) text-white py-3 rounded-2xl"
          >
            Save Changes
          </button>
        </form>
      </main>
    </>
  );
};

export default AdminEditProduct;
