import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import { AuthProvider } from "./context/AuthContext";

function Layout(){
    return(
        <>
            <AuthProvider>
            <Header />
            <Outlet />
            <br />
            <Footer />
            </AuthProvider>
        </>
    );
}

export default Layout ;