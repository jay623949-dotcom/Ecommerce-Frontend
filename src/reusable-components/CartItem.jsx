import React from 'react';
import { useCart } from '../context/CartContext';
import toast from "react-hot-toast";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {

    
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition duration-300">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Left */}
        <div className="flex items-center gap-5">
          <img
            src={item.imageUrl}
            alt={item.productname}
            className="w-28 h-28 rounded-2xl object-cover border border-slate-200"
          />

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {item.productname}
            </h2>

            <p className="text-slate-500 mt-2">
              ₹{item.price}
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Total: ₹
              {item.price * item.quantity}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">

          {/* Quantity */}
          <div className="flex items-center bg-slate-100 rounded-2xl overflow-hidden">

            <button
              onClick={() =>
                onDecrease(item.id)
              }
              className="
                px-4 py-2
                text-xl font-bold
                text-slate-700
                hover:bg-blue-100
                hover:text-blue-600
                transition
              "
            >
              −
            </button>

            <span className="px-5 font-semibold text-slate-800">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                onIncrease(item.id)
              }
              className="
                px-4 py-2
                text-xl font-bold
                text-slate-700
                hover:bg-blue-100
                hover:text-blue-600
                transition
              "
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() =>{
              console.log(item.id);
              onRemove(item.id)
              }
            }
            className="
              p-3 rounded-xl
              text-red-500
              hover:bg-red-50
              transition
            "
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;