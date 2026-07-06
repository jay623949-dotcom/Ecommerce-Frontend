import React, { useEffect, useState, useCallback } from 'react';
import api from '../interceptors/axiosConfig';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../reusable-components/ProductGrid';
import ProductCard from '../reusable-components/ProductCard';
import Pagination from '../reusable-components/Pagination';
import { SearchX } from "lucide-react";


function Products() {
  const [params,setParams] = useSearchParams();
  const name = params.get("name") || "";
  const page = Number(params.get("page")) || 0;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        `/Greet/search/filter?${params.toString()}`
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
        fetchProducts(currentPage);
    }, [name,currentPage]);

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
              Your results for "{name}"
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-center mt-10">
            <p className="text-red-500 text-lg">{error}</p>
            <br />
            <button
          onClick={() => fetchProducts(currentPage)}
          className="
            px-6 py-3 rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white font-semibold
            hover:scale-105 transition
          "
        >
          Retry
        </button>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="text-center mt-10 text-slate-600">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center py-20">
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 px-10 py-12 text-center max-w-md">
    <SearchX className="mx-auto h-16 w-16 text-slate-400" />

    <h2 className="mt-4 text-3xl font-bold text-slate-700">
      No Products Found
    </h2>

    <p className="mt-3 text-slate-500">
      We couldn't find any products matching your search.
      Try using different keywords.
    </p>
    </div>
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

export default Products;