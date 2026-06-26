import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../reusable-components/ProductCard";
import ProductGrid from "../reusable-components/ProductGrid";
import Pagination from "../reusable-components/Pagination";
import axios from "axios";

export default function Home() {
    const [products,setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const fetchProducts = async (page) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:8080/Greet/getall?page=${page}`
      );
      console.log(page);

      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.number);

        } catch (err) {
      setError("Failed to load products. Please try again.");
      setProducts([]);
        } finally {
      setLoading(false);
        }
    };

    useEffect(() =>{
        fetchProducts(0);
    },[])

    const handlePageChange = ((page) => {
        fetchProducts(page);
    })
    return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* MAIN CONTENT */}
      <main className="flex-1">

        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">

    {/* Background glow effect */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute -top-10 -left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 space-y-4">

    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in">
      Welcome to <span className="text-yellow-300">JDCommerce</span>
    </h1>

    <p className="text-blue-100 text-lg md:text-xl animate-fade-in delay-100">
      Best deals on electronics, fashion & more
    </p>
  </div>
</div>

        {/* ERROR STATE */}
        {error && (
          <div className="text-center mt-10">
            <p className="text-red-500 text-lg">{error}</p>

            <button
              onClick={() => fetchProducts(0)}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center mt-10 text-slate-600">
            Loading products...
          </div>
        ) : (
          <>
            {/* PRODUCTS GRID */}
            <ProductGrid products={products} />

            {/* PAGINATION */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}


