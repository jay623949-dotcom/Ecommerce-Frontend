import {
  Search,
  ShoppingCart,
  Filter,
  CircleUser
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate,useLocation, useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import FilterSidebar from "./FilterSidebar";


function Header() {

  const [name,setName] = useState("");
  const location = useLocation();

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Are you sure u want to log out?");
    logout();
    navigate("/login");
  };

  const handleSearch = () =>{
    if(name.trim() === "") return ;
    const params = new URLSearchParams();
    params.set("name",name);
    params.set("page",0);
    navigate(`/products?${params.toString()}`);
  }

  const {cartCount,fetchCartCount} = useCart();

  useEffect(() => {
    fetchCartCount();
  },[])

  return (
    <header className="sticky top-0 z-50 bg-slate-50 shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-20 flex items-center justify-between gap-10">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              JD
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Shop<span className="text-blue-600">Easy</span>
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-3xl">
  <div className="relative">

    <input
      type="text"
      placeholder="Search for products..."
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
      className="w-full rounded-full border border-slate-300 bg-white py-3 pl-6 pr-16 text-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
    />

    <button
      onClick={handleSearch}
      className="
        absolute
        right-2
        top-1/2
        -translate-y-1/2
        h-11
        w-11
        rounded-full
        bg-blue-600
        text-white
        flex
        items-center
        justify-center
        shadow-md
        hover:bg-blue-700
        hover:shadow-lg
        active:scale-95
        active:bg-blue-800
        transition-all
        duration-150
      "
    >
      <Search size={20} />
    </button>

  </div>
</div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* AUTH BUTTONS */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="font-medium text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-slate-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow"
                >
                  Register
                </Link>
              </>
            )}

            {/* Cart */}
            <Link to = "/cart">
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <ShoppingCart
                size={30}
                className="text-slate-700"
              />

               {cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
               </span>
                )}
            </button>
            </Link>

            {/* Profile */}
            <Link to="/profile">
              <button className="p-2 rounded-full hover:bg-slate-100 transition">
               <CircleUser
                 size={30}
                  className="text-slate-700"
                />
              </button>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

