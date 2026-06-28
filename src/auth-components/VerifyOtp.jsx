import React, {useEffect,useRef,useState} from "react";
import axios from "axios";
import {useLocation,useNavigate,} from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState(
    Array(6).fill("")
  );
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");
  const [timeLeft, setTimeLeft] =
    useState(600);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const email =
    location.state?.email || "";

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(
        (prev) => prev - 1
      );
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds =
    timeLeft % 60;

  // INPUT CHANGE
  const handleChange = (
    value,
    index
  ) => {
    if (!/^\d*$/.test(value))
      return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (
      value &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  // BACKSPACE
  const handleBackspace = (
    e,
    index
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  // VERIFY
  const handleVerify =
    async (e) => {
      e.preventDefault();

      const finalOtp =
        otp.join("");

      if (
        finalOtp.length !== 6
      ) {
        setError(
          "Please enter complete OTP."
        );
        return;
      }

      if (timeLeft <= 0) {
        setError(
          "OTP has expired."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");

        await axios.post(
          "http://localhost:8080/auth/verify",
          {
            email,
            otp: finalOtp,
          }
        );

        alert(
          "OTP Verified Successfully!"
        );

        navigate("/Home");
      } catch (err) {
        setError(
          err.response?.data ||
            "Invalid OTP"
        );
      } finally {
        setLoading(false);
      }
    };

  // RESEND OTP
  const handleResend =
    async () => {
      try {
        await axios.post(
          `http://localhost:8080/auth/resendotp?email=${email}`
        );

        setOtp(
          Array(6).fill("")
        );
        setTimeLeft(600);

        alert(
          "OTP resent successfully"
        );
      } catch {
        setError(
          "Unable to resend OTP."
        );
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Verify OTP
          </h1>

          <p className="text-slate-500 mt-3">
            Enter the 6-digit OTP
            sent to
          </p>

          <p className="font-semibold text-blue-600 mt-1 break-all">
            {email}
          </p>
        </div>

        <form
          onSubmit={
            handleVerify
          }
          className="mt-10"
        >
          <div className="flex justify-center gap-3">
            {otp.map(
              (
                digit,
                index
              ) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) =>
                    (inputRefs.current[
                      index
                    ] = el)
                  }
                  onChange={(
                    e
                  ) =>
                    handleChange(
                      e.target
                        .value,
                      index
                    )
                  }
                  onKeyDown={(
                    e
                  ) =>
                    handleBackspace(
                      e,
                      index
                    )
                  }
                  className="w-12 h-14 border-2 border-slate-300 rounded-xl text-center text-2xl font-bold focus:outline-none focus:border-blue-600"
                />
              )
            )}
          </div>

          <p className="text-center text-slate-500 mt-5">
            OTP expires in{" "}
            {minutes}:
            {seconds
              .toString()
              .padStart(
                2,
                "0"
              )}
          </p>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={
              handleResend
            }
            className="w-full mt-4 text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;