import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    previews: [],
  });

  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  };

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length + product.images.length > 4) {
      showNotification("❌ Maximum 4 images allowed");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      previews: [...prev.previews, ...newPreviews],
    }));
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index),
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.description ||
      product.images.length === 0
    ) {
      showNotification("❌ Fill all fields (min 1 image)");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);

      product.images.forEach((img) => {
        formData.append("images", img);
      });

      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "https://cutesy-store-backend.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification("✅ Product added");

      setProduct({
        name: "",
        price: "",
        description: "",
        images: [],
        previews: [],
      });

      setTimeout(() => navigate("/admin/products"), 800);
    } catch (err) {
      showNotification(`❌ ${err.message}`);
    }
  };

  return (
    <>
      <Navbar />

      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-(--rose) text-white px-4 py-2 rounded-xl shadow text-sm">
          {notification}
        </div>
      )}

      <main className="pt-28 px-4 pb-16 bg-(--beige) min-h-screen">
        <h1
          style={{ fontFamily: "Great Vibes" }}
          className="text-4xl text-(--rose) mb-6"
        >
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-(--ivory) rounded-3xl shadow p-6 space-y-4 max-w-md"
        >
          <input
            type="text"
            placeholder="Product name"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border"
          />

          <textarea
            rows={3}
            placeholder="Product description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border resize-none"
          />

          {/* IMAGE INPUT */}
          {product.images.length < 4 && (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          )}

          {/* PREVIEWS */}
          <div className="flex gap-3 flex-wrap">
            {product.previews.map((src, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={src}
                  alt="Preview"
                  className="w-full h-full rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-(--rose) text-white w-6 h-6 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-(--rose) text-white py-3 rounded-2xl"
          >
            Save Product
          </button>
        </form>
      </main>
    </>
  );
};

export default AdminAddProduct;
