import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function Layout(){
    return(
        <>
            <Toaster position="top-center" />
            <CartProvider>
            <AuthProvider>
            <Header />
            <Outlet />
            <br />
            <Footer />
            </AuthProvider>
            </CartProvider>
        </>
    );
}

export default Layout ;