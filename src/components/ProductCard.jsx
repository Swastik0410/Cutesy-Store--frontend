import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="
        break-inside-avoid
        bg-(--ivory)
        rounded-2xl
        overflow-hidden
        cursor-pointer
        transition
        duration-300
        hover:scale-[1.02]
        active:scale-95
      "
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover rounded-t-2xl"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full px-2 py-1 text-xs text-(--rose)">
          ♥
        </div>
      </div>

      <div className="px-4 py-3">
        <h3 className="text-(--rose) text-sm md:text-base font-medium leading-snug">
          {product.name}
        </h3>
        <p className="text-(--brown) text-sm mt-1">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}
