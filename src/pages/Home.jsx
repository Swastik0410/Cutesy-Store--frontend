import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import logo from "../assets/logo.png";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const limit = 8;

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://cutesy-store-backend.onrender.com/api/products"
        );
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Reset page when searching
  useEffect(() => {
    setPage(1);
  }, [search]);

  // 🔍 Search logic
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) =>
      `${p.name}`.toLowerCase().includes(q)
    );
  }, [products, search]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredProducts.slice(start, start + limit);
  }, [filteredProducts, page]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 pt-6 md:pt-10 pb-6 md:px-12 text-center">
        <img
          src={logo}
          alt="The Cutesy Store"
          className="mx-auto w-40 md:w-56 mb-4"
        />

        <h1
          style={{ fontFamily: "Great Vibes" }}
          className="text-[32px] md:text-[56px] text-(--rose) leading-tight"
        >
          Customized Cutesy Jewellery
        </h1>

        <p className="text-(--brown) mt-2 text-sm md:text-base">
          Soft · Elegant · Made with love
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto px-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jewellery..."
            className="w-full rounded-2xl px-4 py-3 text-sm md:text-base bg-white/95 backdrop-blur border border-(--brown)/20 focus:outline-none focus:ring-2 focus:ring-(--rose)/40"
          />
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4 md:px-12 pb-28 md:pb-20">
        {loading ? (
          <p className="text-center text-(--brown)">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-(--brown)">
            No products match your search.
          </p>
        ) : (
          <>
            {/* Product Grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="mb-4 md:mb-6 break-inside-avoid"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Fancy Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
                
                {/* Prev */}
                <button
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-xl border border-(--rose)/30 text-(--brown) disabled:opacity-40"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-200
                      ${
                        page === num
                          ? "bg-(--rose) text-white shadow-md scale-105"
                          : "bg-white text-(--brown) border border-(--brown)/20 hover:bg-(--rose)/10"
                      }
                    `}
                  >
                    {num}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-xl border border-(--rose)/30 text-(--brown) disabled:opacity-40"
                >
                  Next
                </button>

              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
