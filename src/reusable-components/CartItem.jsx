import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle } from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {

  const stockExceeded =
    item.available &&
    item.quantity > item.availableQuantity;

  return (
    <div
      className={`rounded-3xl shadow-lg border p-6 transition duration-300 ${
        !item.available
          ? "bg-red-50 border-red-200"
          : stockExceeded
          ? "bg-yellow-50 border-yellow-300"
          : "bg-white border-slate-100 hover:shadow-xl"
      }`}
    >

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* LEFT */}

        <Link
          to={`/product/${item.id}`}
          className="flex-1"
        >

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
                Total: ₹{item.price * item.quantity}
              </p>

              {/* STATUS */}

              {!item.available ? (

                <div className="flex items-center gap-2 mt-3 text-red-600">

                  <AlertTriangle size={18} />

                  <span className="font-semibold">
                    Product is no longer available.
                  </span>

                </div>

              ) : stockExceeded ? (

                <div className="flex items-center gap-2 mt-3 text-yellow-700">

                  <AlertTriangle size={18} />

                  <span className="font-semibold">
                    Only {item.availableQuantity} left.
                    Reduce quantity to continue.
                  </span>

                </div>

              ) : (

                <div className="flex items-center gap-2 mt-3 text-green-600">

                  <CheckCircle size={18} />

                  <span className="font-semibold">
                    In Stock
                  </span>

                </div>

              )}

            </div>

          </div>

        </Link>

        {/* RIGHT */}

        <div className="flex items-center gap-6">

          {/* Quantity */}

          <div className="flex items-center bg-slate-100 rounded-2xl overflow-hidden">

            <button
              disabled={
                !item.available
              }
              onClick={() => onDecrease(item.id)}
              className="
                px-4 py-2
                text-xl
                font-bold
                hover:bg-blue-100
                transition
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              −
            </button>

            <span className="px-5 font-semibold">
              {item.quantity}
            </span>

            <button
              disabled={
                !item.available ||
                item.quantity >= item.availableQuantity
              }
              onClick={() => onIncrease(item.id)}
              className="
                px-4 py-2
                text-xl
                font-bold
                hover:bg-blue-100
                transition
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              +
            </button>

          </div>

          {/* REMOVE */}

          <button
            onClick={() => onRemove(item.id)}
            className="
              p-3
              rounded-xl
              text-red-500
              hover:bg-red-100
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