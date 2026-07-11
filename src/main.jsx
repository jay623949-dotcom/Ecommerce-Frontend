import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Register from './auth-components/Register.jsx';
import VerifyOtp from './auth-components/VerifyOtp.jsx';
import Login from './auth-components/Login.jsx';
import { AuthProvider } from "./context/AuthContext";
import LoginLayout from "./LoginLayout.jsx";
import Cart from './components/Cart.jsx';
import Products from './components/Products.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';
import PaymentCancel from './components/PaymentCancel.jsx'
import Product from './components/Product.jsx';
import Profile from './components/Profile.jsx';
import AddProduct from './components/AddProduct.jsx';
import { Edit } from 'lucide-react';
import EditProduct from './components/EditProduct.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      {path : "/cart",element : <Cart /> },
      {path : "/products", element : <Products />},
      {path : "/product/:id", element : <Product />}
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />
  },
  {
    path: "/login",
    element: <LoginLayout />
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />
  },
  {
    path: "/payment/cancel",
    element: <PaymentCancel />
  },
  {
    path : "/profile",
    element : <Profile />
  },
  {
    path : "/add",
    element : <AddProduct />
  },
  {
    path : "/edit/:id",
    element : <EditProduct />
  }
]);
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
