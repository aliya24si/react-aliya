import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdAdd, MdRemove } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { orderService } from "@/services/orderService";

export default function OrderModal({ isOpen, onClose, onSubmit, userId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  // Load products when modal opens
  useEffect(() => {
    if (isOpen) {
      loadProducts();
      setItems([]);
      setError("");
    }
  }, [isOpen]);

  const loadProducts = async () => {
    try {
      const data = await orderService.getProducts();
      setProducts(data.filter((p) => p.stock > 0));
    } catch (err) {
      setError("Failed to load products.");
    }
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { product_id: "", product_name: "", quantity: 1, unit_price: 0 },
    ]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      if (field === "product_id") {
        const product = products.find((p) => p.id === value);
        updated[index] = {
          ...updated[index],
          product_id: value,
          product_name: product?.name || "",
          unit_price: product?.price || 0,
          quantity: 1,
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Please add at least one product.");
      return;
    }
    if (items.some((item) => !item.product_id)) {
      setError("Please select a product for all items.");
      return;
    }
    if (items.some((item) => item.quantity < 1)) {
      setError("Quantity must be at least 1.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        customer_id: userId,
        items: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create order.");
    } finally {
      setLoading(false);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="order-modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
              <h3 className="text-lg font-bold text-gray-800">New Order</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-6 space-y-4 flex-1"
            >
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                  {error}
                </div>
              )}

              {/* Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Order Items
                  </label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1 text-sm font-semibold text-hijau hover:text-green-600"
                  >
                    <MdAdd />
                    Add Item
                  </button>
                </div>

                {items.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    No items yet. Click "Add Item" to add products.
                  </p>
                )}

                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    {/* Product Select */}
                    <div className="flex-1">
                      <select
                        value={item.product_id}
                        onChange={(e) =>
                          updateItem(index, "product_id", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                      >
                        <option value="">Select product...</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {formatPrice(p.price)}
                          </option>
                        ))}
                      </select>
                      {item.product_name && (
                        <p className="mt-1 text-xs text-gray-400">
                          {item.product_name} @ {formatPrice(item.unit_price)}
                        </p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="w-20">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", parseInt(e.target.value) || 1)
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-center"
                      />
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center w-24 text-sm font-semibold text-gray-700">
                      {formatPrice(item.unit_price * item.quantity)}
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="mt-1 rounded-lg p-1 text-red-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <MdRemove />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              {items.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-base font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-xl font-bold text-hijau">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="flex items-center gap-2 rounded-lg bg-hijau px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && <ImSpinner2 className="animate-spin" />}
                  Create Order
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
