import React, { useEffect, useState, useCallback } from 'react';
import api from '../interceptors/axiosConfig';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../reusable-components/ProductGrid';
import ProductCard from '../reusable-components/ProductCard';
import Pagination from '../reusable-components/Pagination';
import { SearchX } from "lucide-react";
import FilterSidebar from './FilterSidebar';

function Products() {
  const [params,setParams] = useSearchParams();
  const name = params.get("name") || "";
  const page = Number(params.get("page")) || 0;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

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

    useEffect(() => {
      getBrands(name);
      getCategories(name);
    },[name])

    useEffect(() => {
    fetchProducts(0);
    }, [params.toString()]);

    const getBrands = async (asdfghjkl) => {
    try {
        const res = await api.get(`/Greet/brands?name=${asdfghjkl}`);
        setBrands(res.data);
    } catch (err) {
        console.log(err);
    }
    }

    const getCategories = async (asdfghjkl) => {
    try {
        const res = await api.get(`/Greet/categories?name=${asdfghjkl}`);
        setCategories(res.data);
    } catch (err) {
        console.log(err);
    }
    }

  return (
  <div className="min-h-screen bg-slate-100">
  <main>

    {/* HERO */}
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white">

      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-16 -left-16 h-80 w-80 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-yellow-300 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center ">
          Welcome to <span className="text-yellow-300">JDCommerce</span>
        </h1>

        <p className="mt-4 text-lg text-blue-100 text-center">
          Your results for
          <span className="font-semibold text-white">
            {" "} "{name}"
          </span>
        </p>

      </div>

    </section>

    {/* ERROR */}
    {error && (
      <div className="max-w-7xl mx-auto py-20 text-center">

        <p className="text-xl font-semibold text-red-500">
          {error}
        </p>

        <button
          onClick={() => fetchProducts(currentPage)}
          className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
        >
          Retry
        </button>

      </div>
    )}

    {/* LOADING */}
    {!error && loading && (
      <div className="flex h-[55vh] items-center justify-center">

        <div className="space-y-4 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="text-lg text-slate-600">
            Loading Products...
          </p>

        </div>

      </div>
    )}

    {/* EMPTY */}
    {!error && !loading && products.length === 0 && (
      <div className="max-w-7xl mx-auto py-24">

        <div className="mx-auto max-w-lg rounded-3xl bg-white border border-slate-200 shadow-lg px-10 py-14 text-center">

          <SearchX className="mx-auto h-20 w-20 text-slate-400" />

          <h2 className="mt-6 text-3xl font-bold text-slate-700">
            No Products Found
          </h2>

          <p className="mt-4 text-slate-500 leading-7">
            We couldn't find any products matching
            <span className="font-semibold text-slate-700">
              {" "} "{name}"
            </span>.
            <br />
            Try searching with different keywords.
          </p>

        </div>

      </div>
    )}

    {/* PRODUCTS */}
    {!error && !loading && products.length > 0 && (

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <div className="w-72 shrink-0 sticky top-28">
            <FilterSidebar brands = {brands} categories = {categories} params = {params} setParams = {setParams}/>
          </div>

          {/* Product Area */}
          <div className="flex-1 rounded-2xl bg-white shadow-sm border border-slate-200 p-6">

            <ProductGrid products={products} />

            {totalPages > 1 && (

              <div className="mt-10 border-t border-slate-200 pt-8 flex justify-center">

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => fetchProducts(page)}
                />

              </div>

            )}

          </div>

        </div>

      </div>

    )}

  </main>
</div>
);
}

export default Products;