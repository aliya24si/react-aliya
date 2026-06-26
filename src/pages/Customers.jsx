import { useState, useEffect, useCallback } from "react";
import {
  MdAdminPanelSettings,
  MdPerson,
  MdRefresh,
  MdEdit,
} from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import PageHeader from "../components/PageHeader";
import { profileService } from "@/services/profileService";
import { useAuth } from "@/contexts/AuthContext";

const tierBadge = {
  Gold: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Silver: "bg-blue-100 text-blue-700 ring-blue-200",
  Bronze: "bg-orange-100 text-orange-700 ring-orange-200",
};

const roleBadge = {
  admin: "bg-green-100 text-green-700 ring-green-200",
  member: "bg-blue-100 text-blue-700 ring-blue-200",
  guest: "bg-gray-100 text-gray-600 ring-gray-200",
};

export default function Customers() {
  const { isAdmin } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ role: "", points: "" });
  const [saving, setSaving] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await profileService.getAll();
      setCustomers(data);
    } catch (err) {
      setError(err.message || "Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setEditForm({ role: customer.role, points: customer.points?.toString() || "0" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ role: "", points: "" });
  };

  const handleSave = async (id) => {
    setSaving(true);
    try {
      await profileService.update(id, {
        role: editForm.role,
        points: parseInt(editForm.points, 10) || 0,
      });
      await fetchCustomers();
      cancelEdit();
    } catch (err) {
      setError(err.message || "Failed to update customer.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      <PageHeader
        title="Customers"
        breadcrumb="Dashboard / Customer List"
      >
        <button
          onClick={fetchCustomers}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-60"
        >
          <MdRefresh className={`text-lg ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </PageHeader>

      {/* Loading */}
      {loading && (
        <div className="mt-20 flex flex-col items-center justify-center text-gray-400">
          <ImSpinner2 className="animate-spin text-3xl" />
          <p className="mt-3 text-sm">Loading customers...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="mt-6 rounded-xl bg-red-50 p-6 text-center ring-1 ring-red-200">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchCustomers}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Customers Table */}
      {!loading && !error && (
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4">Points</th>
                  <th className="px-6 py-4">Joined</th>
                  {isAdmin && <th className="px-6 py-4 text-center">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={isAdmin ? 6 : 5}
                      className="px-6 py-12 text-center text-sm text-gray-400"
                    >
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  customers.map((cust) => (
                    <tr
                      key={cust.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                            {cust.full_name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {cust.full_name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-400">{cust.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ring-1 ${roleBadge[cust.role] || roleBadge.guest}`}
                        >
                          {cust.role === "admin" ? (
                            <MdAdminPanelSettings />
                          ) : (
                            <MdPerson />
                          )}
                          {cust.role}
                        </span>
                      </td>

                      {/* Tier */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${tierBadge[cust.tier] || tierBadge.Bronze}`}
                        >
                          {cust.tier}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        {cust.points?.toLocaleString() || 0}
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {cust.created_at
                          ? new Date(cust.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>

                      {/* Actions (Admin only) */}
                      {isAdmin && (
                        <td className="px-6 py-4">
                          {editingId === cust.id ? (
                            <div className="flex items-center gap-2">
                              <select
                                value={editForm.role}
                                onChange={(e) =>
                                  setEditForm((p) => ({ ...p, role: e.target.value }))
                                }
                                className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs"
                              >
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="guest">Guest</option>
                              </select>
                              <input
                                type="number"
                                value={editForm.points}
                                onChange={(e) =>
                                  setEditForm((p) => ({ ...p, points: e.target.value }))
                                }
                                className="w-16 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs"
                                min="0"
                              />
                              <button
                                onClick={() => handleSave(cust.id)}
                                disabled={saving}
                                className="rounded-lg bg-hijau px-2 py-1 text-xs font-semibold text-white hover:bg-green-600 disabled:opacity-60"
                              >
                                {saving ? "..." : "Save"}
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <button
                                onClick={() => startEdit(cust)}
                                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                                title="Edit role & points"
                              >
                                <MdEdit className="text-lg" />
                              </button>
                            </div>
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

      {/* Summary Card */}
      {!loading && !error && customers.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Total Customers
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-800">
              {customers.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Admins
            </p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {customers.filter((c) => c.role === "admin").length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Total Points Distributed
            </p>
            <p className="mt-1 text-2xl font-bold text-amber-600">
              {customers
                .reduce((sum, c) => sum + (c.points || 0), 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}