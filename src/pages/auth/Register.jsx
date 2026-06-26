import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Client-side validation
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (dataForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const result = await signUp({
        email: dataForm.email,
        password: dataForm.password,
        fullName: dataForm.fullName,
      });

      // Check if user was created (Supabase may require email confirmation)
      if (result?.user?.identities?.length === 0) {
        setError("This email is already registered.");
      } else {
        setSuccess(
          "Registration successful! Please check your email to confirm your account."
        );
        // Auto-redirect after 3 seconds
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
        Create Your Account ✨
      </h2>

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
          Processing...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            onChange={handleChange}
            type="text"
            value={dataForm.fullName}
            required
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm placeholder-gray-400"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="reg-email"
            name="email"
            onChange={handleChange}
            type="email"
            value={dataForm.email}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm placeholder-gray-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="reg-password"
            name="password"
            onChange={handleChange}
            type="password"
            value={dataForm.password}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm placeholder-gray-400"
            placeholder="Min. 6 characters"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={dataForm.confirmPassword}
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm placeholder-gray-400"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-green-600 hover:text-green-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
