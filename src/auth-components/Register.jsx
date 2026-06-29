import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleResendOTP = async () => {
  const storedEmail = localStorage.getItem("verifyEmail");

  if (!storedEmail) {
    setError("No email found. Please register again.");
    return;
  }

  try {
  console.log("calling resend otp...");
  const res = await axios.post(
    `http://localhost:8080/auth/resendotp?email=${storedEmail}`
  );
  console.log("SUCCESS:", res);

  alert("OTP resent successfully");

  navigate("/verify-otp", {
    state: { email: storedEmail },
  });
} catch (err) {
  console.log("ERROR:", err);

  setError(
    err.response?.data?.message ||
    "Unable to resend OTP"
  );
}
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/auth/signup", {
        username,
        email,
        password,
      });

      alert("OTP sent successfully");
      
      localStorage.setItem(
      "verifyEmail",
      email
      );
      navigate("/verify-otp",{
        state : {
            email : email,
        },
      })
    } catch (err) {
        console.log(err); 
      setError(
        err.response?.data?.message ||
        err.message ||
        "Registration failed"
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
              Join thousands of customers and discover amazing products at unbeatable prices.
            </p>

            <div className="mt-10 space-y-4 text-blue-100">
              <p>✔ Secure Authentication</p>
              <p>✔ Fast Delivery</p>
              <p>✔ Best Deals Everyday</p>
              <p>✔ Trusted by Thousands of Customers</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-10 flex flex-col justify-center shadow-xl">

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Create Account
          </h2>

          <p className="text-slate-500 mb-8">
            Start your shopping journey with us.
          </p>

          <form
            onSubmit={handleRegister}
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Create a password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.02]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-8">
            Already have an account?{" "}
            <Link to = "/login" className="text-blue-600 font-medium hover:underline cursor-pointer">
              Login
            </Link>
          </p>
          <div className="mt-6 text-center">
  <p className="text-sm text-slate-500">
    Didn’t receive OTP?
  </p>

  <button
    type="button"
    onClick={handleResendOTP}
    className="text-blue-600 hover:underline font-medium"
  >
    Resend OTP
  </button>
</div>

        </div>
      </div>
    </div>
  );
}

export default Register;