import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn({ email: dataForm.email, password: dataForm.password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const errorInfo = error ? (
    <div className="mb-5 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
      <BsFillExclamationDiamondFill className="me-2 text-lg text-red-500" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="mb-5 flex items-center rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
        Welcome Back 👋
      </h2>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
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
        <div className="mb-6">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
            value={dataForm.password}
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm placeholder-gray-400"
            placeholder="********"
          />
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded border-gray-300" />
            Remember me
          </label>
          <Link to="/forgot" className="text-green-600 hover:text-green-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-green-600 hover:text-green-700 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
