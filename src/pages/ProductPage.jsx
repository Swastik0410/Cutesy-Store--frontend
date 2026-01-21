import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://cutesy-store-backend.onrender.com/api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-(--brown)">
          Loading product...
        </div>
      </>
    );

  if (error || !product)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-(--brown)">
          Product not found.
        </div>
      </>
    );

  return (
    <>
      <Navbar />

      {/* Add to Cart Alert */}
      {showAlert && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-(--rose) text-white px-6 py-3 rounded-2xl shadow-lg animate-bounce">
          ✅ Added to cart!
        </div>
      )}

      <main className="pt-28 pb-40 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-14">
          {/* Product Image */}
          <div className="flex-1">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between min-h-[420px]">
            <div>
              <h1
                style={{ fontFamily: "Great Vibes" }}
                className="text-4xl sm:text-5xl md:text-6xl text-(--rose) leading-tight tracking-wide line-clamp-2"
              >
                {product.name}
              </h1>

              <p className="text-(--brown) text-2xl sm:text-3xl md:text-2xl mt-3 font-semibold">
                ₹{product.price}
              </p>

              <div className="w-full h-px bg-(--brown)/20 my-4" />

              <p className="text-(--brown) text-base sm:text-lg md:text-base leading-relaxed line-clamp-4">
                {product.description}
              </p>
            </div>

            {/* Desktop Add to Cart */}
            <div className="hidden md:flex justify-start mt-8">
              <button
                onClick={handleAddToCart}
                className="bg-(--rose) text-white py-3 px-8 rounded-xl hover:bg-(--rose)/90 transition active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Add to Cart */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm p-4 shadow-t">
        <button
          onClick={handleAddToCart}
          className="bg-(--rose) text-white py-4 px-6 rounded-3xl w-full text-lg font-medium transition active:scale-[0.98]"
        >
          Add to Cart • ₹{product.price}
        </button>
      </div>
    </>
  );
}
