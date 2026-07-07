import React from 'react';
import api from '../interceptors/AxiosConfig';

function CartSummary({ total }) {
  const handleCheckout = async () => {
    try {
        const res = await api.post("/payment/checkout");

        window.location.href = res.data.checkout_url;
    } catch (err) {
        console.error(err);
        alert("Unable to start checkout");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
  <h2 className="text-2xl font-bold text-slate-800 mb-6">
    Order Summary
  </h2>

  <div className="flex justify-between mb-4 text-slate-600">
    <span>Subtotal</span>
    <span>₹{total}</span>
  </div>

  <div className="flex justify-between mb-6 text-slate-600">
    <span>Delivery</span>
    <span className="text-green-600">
      Free
    </span>
  </div>

  <hr />

  <div className="flex justify-between mt-6 text-xl font-bold text-slate-800">
    <span>Total</span>
    <span>₹{total}</span>
  </div>

  <button
    className="
      w-full mt-8 py-3
      rounded-xl
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      text-white
      font-semibold
      hover:scale-[1.02]
      transition
    "
    onClick={handleCheckout}
  >
    Proceed to Checkout
  </button>
</div>
  );
}

export default CartSummary;