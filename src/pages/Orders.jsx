import { useState, useEffect, useCallback } from "react";
import { MdAdd, MdRefresh } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import PageHeader from "../components/PageHeader";
import OrderModal from "../components/OrderModal";
import { orderService } from "@/services/orderService";
import { useAuth } from "@/contexts/AuthContext";

const statusBadge = {
  pending: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  processing: "bg-blue-100 text-blue-700 ring-blue-200",
  completed: "bg-green-100 text-green-700 ring-green-200",
  cancelled: "bg-red-100 text-red-700 ring-red-200",
};

export default function Orders() {
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async ({ customer_id, items }) => {
    await orderService.create({ customer_id, items });
    await fetchOrders();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await orderService.updateStatus(id, newStatus);
      await fetchOrders();
    } catch (err) {
      setError(err.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateId = (id) => id?.substring(0, 8) + "...";

  return (
    <div className="p-4">
      <PageHeader title="Orders" breadcrumb="Dashboard / Order List">
        <div className="flex gap-2">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-60"
          >
            <MdRefresh className={`text-lg ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-hijau px-4 py-2 font-bold text-white shadow-md transition-colors hover:bg-green-600"
          >
            <MdAdd className="text-lg" />
            Add New Order
          </button>
        </div>
      </PageHeader>

      {/* Loading */}
      {loading && (
        <div className="mt-20 flex flex-col items-center justify-center text-gray-400">
          <ImSpinner2 className="animate-spin text-3xl" />
          <p className="mt-3 text-sm">Loading orders...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="mt-6 rounded-xl bg-red-50 p-6 text-center ring-1 ring-red-200">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Orders Table */}
      {!loading && !error && (
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  {isAdmin && <th className="px-6 py-4 text-center">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={isAdmin ? 7 : 6}
                      className="px-6 py-12 text-center text-sm text-gray-400"
                    >
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-gray-500" title={order.id}>
                        {truncateId(order.id)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">
                          {order.customer?.full_name || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {order.items?.length || 0} item(s)
                        </div>
                        <div className="mt-0.5 text-xs text-gray-400 line-clamp-1">
                          {order.items
                            ?.map((i) => i.product?.name)
                            .filter(Boolean)
                            .join(", ") || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {formatPrice(order.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        {isAdmin && order.status !== "completed" && order.status !== "cancelled" ? (
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusUpdate(order.id, e.target.value)
                            }
                            disabled={updatingId === order.id}
                            className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusBadge[order.status]} cursor-pointer`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusBadge[order.status]}`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.created_at)}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 text-center">
                          {updatingId === order.id && (
                            <ImSpinner2 className="inline animate-spin" />
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateOrder}
        userId={user?.id}
      />
    </div>
  );
}