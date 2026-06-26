import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { MdArrowBack } from "react-icons/md";
import { productService } from "@/services/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    productService
      .getById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message || "Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <ImSpinner2 className="animate-spin text-3xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl bg-red-50 p-8 text-center ring-1 ring-red-200">
        <p className="font-medium text-red-600">{error}</p>
        <Link to="/product" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:underline">
          <MdArrowBack />
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl bg-gray-50 p-8 text-center ring-1 ring-gray-200">
        <p className="font-medium text-gray-500">Product not found</p>
        <Link to="/product" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-hijau hover:underline">
          <MdArrowBack />
          Back to Products
        </Link>
      </div>
    );
  }

  const getStockBadge = (stock) => {
    if (stock > 40) return "bg-green-100 text-green-700 ring-green-200";
    if (stock > 15) return "bg-amber-100 text-amber-700 ring-amber-200";
    return "bg-red-100 text-red-700 ring-red-200";
  };

  return (
    <div className="mx-auto mt-6 max-w-2xl p-4">
      <Link to="/product" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700">
        <MdArrowBack />
        Back to Products
      </Link>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.description && (
            <p className="mt-2 text-sm text-green-100">{product.description}</p>
          )}
        </div>

        <div className="space-y-6 p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Price</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">{formatPrice(product.price)}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Stock</p>
              <div className="mt-1 flex items-center gap-2">
                <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ring-1 ${getStockBadge(product.stock)}`}>
                  {product.stock} porsi
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Product ID</p>
                <p className="break-all font-mono text-xs text-gray-600">{product.id}</p>
              </div>
              <div>
                <p className="text-gray-400">Added</p>
                <p className="font-medium text-gray-600">
                  {new Date(product.created_at).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <Link to="/product" className="inline-flex items-center gap-2 rounded-xl bg-hijau px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600">
              <MdArrowBack />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}