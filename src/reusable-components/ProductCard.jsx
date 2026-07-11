import React,{useState} from "react";
import toast from "react-hot-toast";
import api from "../interceptors/axiosConfig";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product}) {
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

  <Link to={`/product/${product.id}`} className="block">

    {/* Image */}
    <div className="h-60 w-full bg-slate-100 overflow-hidden">
      <img
        src={product.imageName}
        alt={product.name}
        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Content */}
    <div className="p-5 space-y-3">

      <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
        {product.category}
      </p>

      <h2 className="text-lg font-semibold text-slate-800 line-clamp-2">
        {product.name}
      </h2>

      <p className="text-sm text-slate-500 line-clamp-2">
        {product.description?.length > 30
          ? product.description.slice(0, 30) + "..."
          : product.description}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-slate-900">
          ₹{product.price}
        </p>

        <p className="text-sm text-slate-400">
          Qty: {product.quantity}
        </p>
      </div>

    </div>

  </Link>

  {/* Button (Outside Link) */}
  <div className="px-5 pb-5">
    <button
      onClick={() => addToCart(product.id)}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
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

