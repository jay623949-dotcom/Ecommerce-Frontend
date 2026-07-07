import { CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center">

        <div className="flex justify-center">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle
              size={70}
              className="text-green-600"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mt-6">
          Payment Successful 🎉
        </h1>

        <p className="text-slate-500 mt-3 leading-7">
          Thank you for your purchase.
          <br />
          Your payment has been received successfully.
        </p>

        <div className="mt-6 bg-slate-50 rounded-xl p-4 border">
          <p className="text-sm text-slate-600">
            Your order is being confirmed.
            This usually takes just a few seconds.
          </p>
        </div>

        <div className="mt-8 space-y-3">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            <ShoppingBag size={20}/>
            View Orders
          </Link>

          <Link
            to="/cart"
            className="block border border-slate-300 hover:bg-slate-100 py-3 rounded-xl font-medium transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}