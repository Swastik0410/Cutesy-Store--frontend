import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    preview: "",
  });

  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const removeImage = () => {
    setProduct((prev) => ({
      ...prev,
      image: null,
      preview: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.image
    ) {
      showNotification("❌ Fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("image", product.image);

      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      showNotification("✅ Product added");

      setProduct({
        name: "",
        price: "",
        description: "",
        image: null,
        preview: "",
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

          {!product.preview && (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}

          {product.preview && (
            <div className="relative w-24">
              <img
                src={product.preview}
                alt="Preview"
                className="w-24 h-24 rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-(--rose) text-white w-6 h-6 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          )}

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
