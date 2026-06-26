import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "@/contexts/AuthContext";

export default function Forgot() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await resetPassword(email);
      setSuccess("Password reset link has been sent to your email. Please check your inbox.");
    } catch (err) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-center text-2xl font-semibold text-gray-700">
        Forgot Your Password?
      </h2>

      <p className="mb-6 text-center text-sm text-gray-500">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>

      {error && (
        <div className="mb-5 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
          <BsFillExclamationDiamondFill className="me-2 text-lg text-red-500" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center rounded-lg bg-green-50 p-4 text-sm text-green-700 ring-1 ring-green-200">
          <BsCheckCircleFill className="me-2 text-lg text-green-500" />
          {success}
        </div>
      )}

      {loading && (
        <div className="mb-5 flex items-center rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
          <ImSpinner2 className="me-2 animate-spin" />
          Sending...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="forgot-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm placeholder-gray-400"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Remember your password?{" "}
        <Link to="/login" className="font-semibold text-green-600 hover:text-green-700 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
