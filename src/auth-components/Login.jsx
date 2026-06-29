import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {login} = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/auth/login",
        {
          username,
          password,
        }
      );
      console.log(res.data.jwt);
      login(res.data.jwt,res.data.refreshToken);
      console.log(localStorage.getItem("refreshToken"));
      if (res.data.id) {
        localStorage.setItem(
          "userId",
          res.data.id
        );
      }

      navigate("/home");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center px-6 py-10">
    <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-12 py-16 text-white relative overflow-hidden">

        <div className="absolute -top-20 -left-20 h-72 w-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-yellow-300/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4">
            JDCommerce
          </h1>

          <p className="text-blue-100 text-lg leading-relaxed">
            Welcome back! Sign in and continue your shopping journey.
          </p>

          <div className="mt-10 space-y-4 text-blue-100">
            <p>✔ Secure Authentication</p>
            <p>✔ Fast Delivery</p>
            <p>✔ Exclusive Discounts</p>
            <p>✔ Trusted by Thousands of Customers</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white p-10 flex flex-col justify-center shadow-xl">

        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-slate-500 mb-8">
          Login to access your account.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login;
