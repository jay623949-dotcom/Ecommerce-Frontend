import React,{useState} from "react";
import toast from "react-hot-toast";
import api from "../interceptors/axiosConfig";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const {fetchCartCount} = useCart();
  const [loading, setLoading] = useState(false);
  const addToCart = async (id) => {
    try {
      setLoading(true);
      const res = await api.post(`/Cart/add?id=${id}&quantity=1`);

      toast.success(res.data);
      fetchCartCount();
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-slate-100">

      {/* Image */}
      <div className="h-60 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Category */}
        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Name */}
        <h2 className="text-lg font-semibold text-slate-800 line-clamp-2">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2">
          {product.description?.length > 30
            ? product.description.slice(0, 30) + "..."
            : product.description}
        </p>

        {/* Price + Qty */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-slate-900">
            ₹{product.price}
          </p>

          <p className="text-sm text-slate-400">
            Qty: {product.quantity}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => addToCart(product.id)}
          disabled={loading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}

          {loading ? "Adding..." : "Add to Cart"}
        </button> 

      </div>
    </div>
  );
}

export default ProductCard;

