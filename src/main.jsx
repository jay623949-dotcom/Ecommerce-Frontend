import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';



const router = createBrowserRouter([{
    path : "/",
    element : <Layout />,
    children : [
      {path : "Home", element : <Home />},
      {path : "About", element: <About />}
    ],
  }
]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
