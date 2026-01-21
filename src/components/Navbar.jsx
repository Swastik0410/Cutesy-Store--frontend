// components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Settings, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-(--beige)/90 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="The Cutesy Store" className="w-12 h-12 object-contain" />
          <span
            style={{ fontFamily: "Great Vibes" }}
            className="text-[22px] md:text-[28px] text-(--rose) leading-none"
          >
            The Cutesy Store
          </span>
        </Link>

        {/* Hamburger button for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-(--brown) focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 text-(--brown) text-sm tracking-wide">
          <Link className="hover:text-(--rose) transition" to="/">Shop</Link>
          <Link className="hover:text-(--rose) transition" to="/cart">Cart</Link>
          <Link className="hover:text-(--rose) transition" to="/admin">Admin</Link>
        </div>
      </div>

      {/* Mobile menu (collapsible) */}
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
            <ShoppingCart size={20} />
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