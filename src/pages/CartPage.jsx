// pages/CartPage.jsx
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, total ,clearCart} = useCart();

  const proceedToWhatsApp = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const adminNumber = "919830805878"; // NO + sign

    let message = `Hello Cutesy Store 💖\nI’d like to place an order:\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `Qty: ${item.quantity}\n`;
      message += `Price: ₹${item.price * item.quantity}\n\n`;
    });

    message += `🧾 Total: ₹${total}\n\nPlease confirm ✨`;

    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");

      clearCart();
  };

  return (
    <>
      <Navbar />

      <main className="pt-28 px-4 md:px-12 pb-10">
        <h1
          style={{ fontFamily: "Great Vibes" }}
          className="text-3xl md:text-5xl text-(--rose) mb-6"
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-(--brown) text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id} // ✅ FIXED
                className="flex justify-between items-center bg-(--ivory) p-4 rounded-2xl shadow"
              >
                <div>
                  <h2 className="text-(--rose) text-lg font-medium">
                    {item.name}
                  </h2>
                  <p className="text-(--brown) text-sm mt-1">
                    ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    className="bg-(--rose) text-white px-3 py-1 rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-(--brown)">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="bg-(--rose) text-white px-3 py-1 rounded-lg"
                  >
                    +
                  </button>

                  <button
                    onClick={() => clearCart()}
                    className="text-(--rose) ml-2 font-bold"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-(--brown) text-xl font-semibold">
                Total: ₹{total}
              </p>

              <button
                onClick={proceedToWhatsApp}
                className="bg-(--rose) text-white py-3 px-6 rounded-xl w-full md:w-auto hover:bg-(--rose)/90 transition"
              >
                Proceed to Order
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
