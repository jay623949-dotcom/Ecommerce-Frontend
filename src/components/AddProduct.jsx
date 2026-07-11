import React, { useState } from "react";
import api from "../interceptors/axiosConfig";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    description: "",
    available: true,
    quantity: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity"
          ? Number(value)
          : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "products",
        new Blob([JSON.stringify(product)], {
          type: "application/json",
        })
      );

      formData.append("image", image);

      await api.post("/admin/add", formData);

      alert("Product Added Successfully!");

      setProduct({
        name: "",
        price: "",
        brand: "",
        description: "",
        available: true,
        quantity: "",
        category: "",
      });

      setImage(null);
      setPreview("");

    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">

    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-10 py-8 text-white">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          📦 Add Product
        </h1>

        <p className="text-blue-100 mt-2 text-lg">
          Upload a new product to JDCommerce Marketplace
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-2 gap-10 p-10"
      >

        {/* LEFT SIDE */}

        <div>

          <label className="block text-lg font-semibold text-slate-700 mb-3">
            Product Image
          </label>

          <label
            htmlFor="image"
            className="
            h-[420px]
            border-2
            border-dashed
            border-blue-300
            rounded-3xl
            flex
            items-center
            justify-center
            cursor-pointer
            bg-slate-50
            hover:border-blue-600
            hover:bg-blue-50
            transition
            overflow-hidden"
          >

            {preview ? (

              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="text-center">

                <div className="text-7xl">
                  📷
                </div>

                <p className="mt-5 text-lg text-slate-600 font-medium">
                  Click to Upload Product Image
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  PNG • JPG • JPEG
                </p>

              </div>

            )}

          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-5">

          <div>

            <label className="font-semibold text-slate-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="font-semibold text-slate-700">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold text-slate-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="font-semibold text-slate-700">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Footwear</option>
              <option>Books</option>
              <option>Accessories</option>
            </select>

          </div>

          <div>

            <label className="font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button
            disabled={loading}
            className="
            w-full
            mt-3
            py-4
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            text-white
            text-lg
            font-bold
            hover:scale-[1.02]
            transition
            shadow-xl
            disabled:opacity-50"
          >
            {loading ? "Uploading Product..." : "🚀 Add Product"}
          </button>

        </div>

      </form>

    </div>

  </div>
);

}

export default AddProduct;