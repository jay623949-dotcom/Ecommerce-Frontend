import { useEffect, useState } from "react";
import api from "../interceptors/axiosConfig";
import CartItem from "../reusable-components/CartItem";
import CartSummary from "../reusable-components/CartSummary";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {fetchCartCount} = useCart();

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/Cart/getall");
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart. Please try again.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increase = async (id) => {
    try {
      await api.post(
        `/Cart/increase?id=${id}&quantity=1`
      );
      fetchCart();
      fetchCartCount();
      
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    }
  };

  const decrease = async (id) => {
    try {
      await api.post(
        `/Cart/decrease?id=${id}&quantity=1`
      );
      fetchCart();
      fetchCartCount();
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    }
  };

  const remove = async (id) => {
    try {
      console.log("REMOVE API CALLED", id);
      const res = await api.post(`/Cart/delete?id=${id}`);
      fetchCart();
      fetchCartCount();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-700">
          Loading your cart...
        </h2>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">😕</div>

        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Oops! Something went wrong
        </h2>

        <p className="text-slate-500 mb-6">
          {error}
        </p>

        <button
          onClick={fetchCart}
          className="
            px-6 py-3 rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white font-semibold
            hover:scale-105 transition
          "
        >
          Retry
        </button>
      </div>
    </div>
  );
}

if (cartItems.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-lg w-full">

        <div className="text-7xl mb-5">
          🛒
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Your Cart is Empty
        </h1>

        <p className="text-slate-500 mb-8">
          Looks like you haven't added anything yet.
          Start shopping and discover amazing products!
        </p>

        <button
          onClick={() => navigate("/home")}
          className="
            px-8 py-3 rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white font-semibold
            hover:scale-105 transition
          "
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <main className="flex-1">

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Your <span className="text-yellow-300">Cart</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl">
            Review your items and proceed to checkout
          </p>
        </div>
      </div>

      {/* CART CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <CartSummary total={total} />
          </div>

        </div>
      </div>

    </main>
  </div>
);
}

export default Cart;