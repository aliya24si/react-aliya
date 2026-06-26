// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Layouts
const MainLayouts = React.lazy(() => import("./layouts/MainLayouts"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Product = React.lazy(() => import("./pages/Product"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
const Components = React.lazy(() => import("./pages/Components"))
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"))
const Note = React.lazy(() => import("./pages/Note"))

// Auth Pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Error Pages
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth routes (no protection needed) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Protected routes — require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayouts />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/components" element={<Components />} />
              <Route path="/fitur-xyz" element={<FiturXyz />} />
              <Route path="/note" element={<Note />} />
              <Route path="/error-400" element={<Error400 />} />
              <Route path="/error-401" element={<Error401 />} />
              <Route path="/error-403" element={<Error403 />} />
              <Route path="*" element={<NotFound />} />

              {/* Admin-only routes */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/customers" element={<Customers />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
