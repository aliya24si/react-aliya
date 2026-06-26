import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import PageHeader from "../components/PageHeader";
import ProductModal from "../components/ProductModal";
import { productService } from "@/services/productService";
import { useAuth } from "@/contexts/AuthContext";

export default function Product() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingProduct) {
      await productService.update(editingProduct.id, formData);
    } else {
      await productService.create(formData);
    }
    await fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await productService.remove(id);
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStockBadge = (stock) => {
    if (stock > 40) return "bg-green-100 text-green-600";
    if (stock > 15) return "bg-amber-100 text-amber-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="p-4">
      <PageHeader title="Product" breadcrumb="Dashboard / Product List">
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-hijau px-4 py-2 font-bold text-white shadow-md transition-colors hover:bg-green-600"
          >
            <MdAdd className="text-lg" />
            Add New Product
          </button>
        )}
      </PageHeader>

      {/* Loading State */}
      {loading && (
        <div className="mt-20 flex flex-col items-center justify-center text-gray-400">
          <ImSpinner2 className="animate-spin text-3xl" />
          <p className="mt-3 text-sm">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6 rounded-xl bg-red-50 p-6 text-center ring-1 ring-red-200">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-gray-400">
          <MdAdd className="text-6xl opacity-30" />
          <p className="mt-2 text-sm">No products yet.</p>
          {isAdmin && (
            <button
              onClick={handleAdd}
              className="mt-4 rounded-lg bg-hijau px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
              Add your first product
            </button>
          )}
        </div>
      )}

      {/* Products Table */}
      {!loading && !error && products.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Created</th>
                  {isAdmin && <th className="px-6 py-4 text-center">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/product/${product.id}`}
                        className="font-medium text-emerald-500 transition-colors hover:text-emerald-600"
                      >
                        {product.name}
                      </Link>
                      {product.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                          {product.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getStockBadge(product.stock)}`}
                      >
                        {product.stock} porsi
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(product.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <MdEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                            title="Delete"
                          >
                            {deletingId === product.id ? (
                              <ImSpinner2 className="animate-spin text-lg" />
                            ) : (
                              <MdDelete className="text-lg" />
                            )}
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        product={editingProduct}
      />
    </div>
  );
}