import { CircleX, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center">

        <div className="flex justify-center">
          <div className="bg-red-100 p-5 rounded-full">
            <CircleX
              size={70}
              className="text-red-600"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mt-6">
          Payment Cancelled
        </h1>

        <p className="text-slate-500 mt-3 leading-7">
          Your payment wasn't completed.
          <br />
          No amount has been charged.
        </p>

        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-600">
            You can safely return to your cart and try again whenever you're ready.
          </p>
        </div>

        <div className="mt-8 space-y-3">

          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
          >
            <RotateCcw size={20}/>
            Back to Cart
          </Link>

          <Link
            to="/"
            className="block border border-slate-300 hover:bg-slate-100 py-3 rounded-xl font-medium transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}