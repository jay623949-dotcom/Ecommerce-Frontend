import React from 'react'

import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="text-7xl mb-4">🛒</div>

      <h2 className="text-3xl font-bold mb-2">
        Your cart is empty
      </h2>

      <p className="text-gray-500 mb-8">
        Looks like you haven't added anything yet.
      </p>

      <Link
        to="/home"
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCart;