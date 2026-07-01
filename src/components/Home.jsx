import React, {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../reusable-components/ProductGrid";
import Pagination from "../reusable-components/Pagination";
import api from "../interceptors/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        `/Greet/getall?page=${page}`
      );

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

  useEffect(() => {
    fetchProducts(0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1">
        
        {/* HERO */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Welcome to <span className="text-yellow-300">JDCommerce</span>
            </h1>

            <p className="text-blue-100 text-lg md:text-xl">
              Best deals on electronics, fashion & more
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-center mt-10">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="text-center mt-10 text-slate-600">
            Loading products...
          </div>
        ) : (
          <>
            <ProductGrid products={products} />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => fetchProducts(page)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}