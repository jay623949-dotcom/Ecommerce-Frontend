import React, { useEffect, useState } from "react";
import api from "../interceptors/axiosConfig";
import { Mail, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isAdmin = user?.roletype?.includes("ADMIN");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/Greet/profile");
      setUser(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-10 gap-4">
        <p className="text-red-500">{error}</p>

        <button
          onClick={fetchProfile}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
  <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36"></div>

    {/* Profile */}
    <div className="-mt-16 flex flex-col items-center px-8 pb-10">

      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <span className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-white"></span>
      </div>

      <h1 className="mt-5 text-3xl font-bold text-slate-800">
        {user.username}
      </h1>

      <p className="text-slate-500 text-lg">
        {user.email}
      </p>

      <span className="mt-3 px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">
        Verified Account
      </span>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6 w-full mt-10">

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <User className="text-blue-600" size={30} />
          <div>
            <p className="text-sm text-slate-500">
              Username
            </p>
            <p className="text-lg font-semibold">
              {user.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <Mail className="text-blue-600" size={30} />
          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>
            <p className="text-lg font-semibold">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <Shield className="text-blue-600" size={30} />
          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>
            <p className="text-lg font-semibold">
              {user.roletype?.join(", ")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="w-8 h-8 rounded-full bg-green-500"></div>
          <div>
            <p className="text-sm text-slate-500">
              Account Status
            </p>
            <p className="text-lg font-semibold text-green-600">
              Active
            </p>
          </div>
        </div>

      </div>

      <div
  className={`grid gap-5 w-full mt-10 ${
    !isAdmin ? "grid-cols-3" : "grid-cols-2"
  }`}
>

    <button
    onClick={() => navigate("/home")}
    className="rounded-2xl border border-slate-200 p-6 hover:bg-blue-50 transition shadow-sm hover:shadow-md"
    >
    <p className="text-3xl">🏠</p>
    <p className="mt-2 font-semibold text-lg">
      Home
    </p>
    </button>

    <button
    onClick={() => navigate("/cart")}
    className="rounded-2xl border border-slate-200 p-6 hover:bg-blue-50 transition shadow-sm hover:shadow-md"
    >
    <p className="text-3xl">🛒</p>
    <p className="mt-2 font-semibold text-lg">
      My Cart
    </p>
  </button>

  {isAdmin && (
    <Link to = "/add">
    <button
      onClick={() => navigate("/admin/add-product")}
      className="rounded-2xl border border-slate-200 p-6 hover:bg-blue-50 transition shadow-sm hover:shadow-md"
    >
      <p className="text-3xl">➕</p>
      <p className="mt-2 font-semibold text-lg">
        Add Product
      </p>
    </button>
    </Link>         
  )}

</div>

    </div>
  </div>
</div>
  );
}

export default Profile;