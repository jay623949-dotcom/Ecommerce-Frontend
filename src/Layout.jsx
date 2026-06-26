import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";

function Layout(){
    return(
        <>
            <Header />
            <Outlet />
            <br />
            <Footer />
        </>
    );
}

export default Layout ;