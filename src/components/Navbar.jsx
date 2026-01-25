import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  // Total quantity (notification count)
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 bg-(--beige)/90 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="The Cutesy Store"
            className="w-12 h-12 object-contain"
          />
          <span
            style={{ fontFamily: "Great Vibes" }}
            className="text-[22px] md:text-[28px] text-(--rose) leading-none"
          >
            The Cutesy Store
          </span>
        </Link>

        {/* Mobile hamburger with badge */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-(--brown) relative"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}

            {/* Badge on hamburger (only when closed) */}
            {!isOpen && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-(--rose) text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full badge-pop">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 text-(--brown) text-sm tracking-wide items-center">
          <Link className="hover:text-(--rose) transition" to="/">
            Shop
          </Link>

          {/* Cart with badge */}
          <Link
            className="hover:text-(--rose) transition relative"
            to="/cart"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-(--rose) text-white text-[10px] px-2 py-0.5 rounded-full badge-pop">
                {cartCount}
              </span>
            )}
          </Link>

          <Link className="hover:text-(--rose) transition" to="/admin">
            Admin
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-(--beige) border-t border-(--ivory) px-4 py-3 flex flex-col gap-3">
          <Link
            className="text-(--brown) hover:text-(--rose) transition flex items-center gap-3"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag size={20} />
            <span>Shop</span>
          </Link>

          <Link
            className="text-(--brown) hover:text-(--rose) transition flex items-center gap-3"
            to="/cart"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-(--rose) text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full badge-pop">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          <Link
            className="text-(--brown) hover:text-(--rose) transition flex items-center gap-3"
            to="/admin"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={20} />
            <span>Admin</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
