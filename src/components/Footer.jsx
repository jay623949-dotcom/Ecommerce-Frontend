import React from "react";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                JD
              </div>

              <h1 className="text-3xl font-bold text-white">
                Shop<span className="text-blue-500">Easy</span>
              </h1>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              Your one-stop destination for electronics, fashion,
              accessories, and daily essentials with secure shopping
              and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">
              <li className="hover:text-blue-500 cursor-pointer transition">
                <Link to = "/home">
                Home
                </Link>
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition">
                Products
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition">
                Categories
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition">
                About Us
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-5">
              Customer Service
            </h2>

            <ul className="space-y-3">
              <li className="hover:text-blue-500 cursor-pointer transition">
                <a href="jay623949@gmail.com">
                Contact Us
                </a>
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition">
                FAQs
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-5">
              Contact
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-sm">
                <span className="text-lg text-blue-500">📍</span>
                <span>Mumbai, Maharashtra, India</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="text-lg text-blue-500">📞</span>
                <span>+91 81045 98959</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="text-lg text-blue-500">✉️</span>
                <span>support@shopeasy.com</span>
              </div>

              {/* Social Icons (Using clean text badges instead of icons) */}
              <div className="flex gap-2 pt-4">
                <div className="px-3 py-1 text-xs font-semibold rounded-md bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 cursor-pointer transition">
                  IG
                </div>
                <div className="px-3 py-1 text-xs font-semibold rounded-md bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 cursor-pointer transition">
                  TW
                </div>
                <div className="px-3 py-1 text-xs font-semibold rounded-md bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 cursor-pointer transition">
                  LN
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-sm text-slate-400">
            © 2026 ShopEasy. All Rights Reserved.
          </p>

          <p className="text-sm text-slate-400">
            Built with ❤️ using React & Spring Boot
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;