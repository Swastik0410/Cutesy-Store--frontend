import React, { useState } from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const showNotification = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 2500);
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setIsLoggingIn(true);

    const res = await fetch(
      "https://cutesy-store-backend.onrender.com/api/auth/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("adminToken", data.token);
    showNotification("✅ Admin logged in successfully", "success");

    setTimeout(() => navigate("/admin/products"), 1000);
  } catch (err) {
    showNotification(`❌ ${err.message}`, "error");
  } finally {
    setIsLoggingIn(false);
  }
};


  return (
    <>
      <Navbar />

      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-24 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm animate-fade-in ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-(--rose) text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Page Content */}
      <div className="min-h-screen flex items-center justify-center px-4 pt-28 bg-(--beige)">
        <div className="w-full max-w-md bg-(--ivory) rounded-3xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Admin Logo" className="h-34 object-contain" />
          </div>

          {/* Title */}
          <h2
            style={{ fontFamily: "Great Vibes" }}
            className="text-3xl text-center text-(--rose) mb-6"
          >
            Admin Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-(--brown) text-sm mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@site.com"
                className="w-full px-4 py-3 rounded-xl border border-(--brown)/20 bg-white text-(--brown) placeholder:text-(--brown)/40 caret-(--rose) focus:outline-none focus:ring-2 focus:ring-(--rose)"
              />
            </div>

            <div>
              <label className="block text-(--brown) text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-(--brown)/20 bg-white text-(--brown) placeholder:text-(--brown)/40 caret-(--rose) focus:outline-none focus:ring-2 focus:ring-(--rose)"
              />
            </div>

            <button
  type="submit"
  disabled={isLoggingIn}
  className={`w-full mt-4 py-3 rounded-2xl text-white transition
    ${isLoggingIn
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-(--rose) hover:bg-(--rose)/90"}`}
>
  {isLoggingIn ? "Logging in..." : "Login as Admin"}
</button>

          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-(--brown)/70 mt-6">
            Authorized personnel only
          </p>
        </div>
      </div>
    </>
  );
};

export default Admin;
