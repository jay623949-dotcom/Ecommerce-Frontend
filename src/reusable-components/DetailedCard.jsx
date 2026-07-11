import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../interceptors/axiosConfig";
import { useCart } from "../context/CartContext";
import {
  ShoppingCart,
  Package,
  Calendar,
  Tag,
  Building2,
  CheckCircle,
  XCircle,
  Minus,
  Plus,Pencil,Trash2
} from "lucide-react";
import {useNavigate} from "react-router-dom";

function ProductDetails({ product,isAdmin }) {
  const { fetchCartCount } = useCart();

  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  const [loading2,setLoading2] = useState(false);

  const navigate = useNavigate();

const deleteProduct = async () => {
  if (!window.confirm("Are you sure you want to delete this product?")) {
    return;
  }

  try {
    setLoading2(true);

    await api.delete(`/admin/delete/${product.id}`); // <-- apna endpoint rakh

    toast.success("Product deleted successfully");

    navigate("/home");

  } catch (err) {
    toast.error(
      err.response?.data || "Failed to delete product"
    );
  } finally {
    setLoading2(false);
  }
};

  

  const addToCart = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        `/Cart/add?id=${product.id}&quantity=${qty}`
      );

      toast.success(res.data);
      fetchCartCount();
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* LEFT IMAGE */}

          <div className="bg-slate-100 flex justify-center items-center p-10">

            <img
              src={product.imageName}
              alt={product.name}
              className="max-h-[550px] object-contain hover:scale-105 transition duration-300"
            />

          </div>

          {/* RIGHT SIDE */}

          <div className="p-10 flex flex-col">

            {/* Category */}

            <span className="w-fit bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full">

              {product.category}

            </span>

            {/* Name */}

            <h1 className="text-4xl font-bold text-slate-800 mt-4">

              {product.name}

            </h1>

            {/* Brand */}

            <div className="flex items-center gap-2 text-slate-500 mt-3">

              <Building2 size={18} />

              <span>{product.brand}</span>

            </div>

            {/* Price */}

            <h2 className="text-5xl font-bold text-blue-600 mt-8">

              ₹{product.price}

            </h2>

            <hr className="my-8 border-slate-500" />

            {/* Description */}
            <div className="flex items-center gap-2 mb-3">
                <Tag className="text-blue-600" size={20} />

            <h3 className="text-lg font-semibold text-slate-800">
                Description
            </h3>
            </div>

            <p className="text-slate-600 leading-7 text-justify">
                {product.description}
            </p>
            <hr className="my-8 border-slate-500" />

            {/* Stock */}

            <div className="flex flex-wrap gap-5 mt-8">

              <div className="flex items-center gap-2">

                {product.available ? (
                  <>
                    <CheckCircle
                      className="text-green-500"
                      size={18}
                    />

                    <span className="text-green-600 font-semibold">

                      In Stock

                    </span>
                  </>
                ) : (
                  <>
                    <XCircle
                      className="text-red-500"
                      size={18}
                    />

                    <span className="text-red-500 font-semibold">

                      Out of Stock

                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">

                <Package size={18} />

                <span>{product.quantity} Left</span>

              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} />
                <p className="text-slate-600">
                    <span className="font-semibold text-slate-800">
                    Release Date:
                    </span>{" "}
                    {product.releaseDate}
                </p>
                </div>

            </div>

            {/* Quantity */}

            <div className="mt-10">

              <h3 className="font-semibold text-slate-700 mb-3">

                Quantity

              </h3>

              <div className="flex items-center border rounded-xl w-fit">

                <button
                  className="p-3 hover:bg-slate-100"
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                >
                  <Minus size={18} />
                </button>

                <span className="px-8 font-semibold">

                  {qty}

                </span>

                <button
                  className="p-3 hover:bg-slate-100"
                  onClick={() =>
                    setQty((q) =>
                      Math.min(product.quantity, q + 1)
                    )
                  }
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

            <div className="mt-10">
            <button
                disabled={!product.available || loading}
                onClick={addToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition flex justify-center items-center gap-2 disabled:bg-slate-300"
            > 
            <ShoppingCart size={20} />
            {loading ? "Adding..." : "Add to Cart"}
            </button>
            </div>

            {isAdmin && (
  <div className="grid grid-cols-2 gap-4 mt-5">

    <button
      onClick={() => navigate(`/edit/${product.id}`)}
      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition"
    >
      <Pencil size={18} />
      Edit Product
    </button>

    <button
      onClick={deleteProduct}
      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
    >
      <Trash2 size={18} />
      {loading2 ? "Deleting..." : "Delete"}
    </button>

  </div>
)}

          </div>

        </div>

      </div>    

    </div>
  );
}

export default ProductDetails;