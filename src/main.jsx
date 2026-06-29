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
import { AuthProvider } from './context/AuthContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
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
    element: <Login />
  }
]);
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
