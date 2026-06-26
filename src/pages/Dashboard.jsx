import { useState, useEffect, useCallback } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUtensils, FaStar, FaGem, FaMedal } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { dashboardService } from "@/services/dashboardService";
import { useAuth } from "@/contexts/AuthContext";

const tierColors = {
  Gold: { bg: "bg-yellow-500", text: "text-yellow-600", icon: FaGem },
  Silver: { bg: "bg-gray-400", text: "text-gray-500", icon: FaMedal },
  Bronze: { bg: "bg-orange-600", text: "text-orange-600", icon: FaStar },
};

export default function Dashboard() {
  const { profile, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [orderStats, recent] = await Promise.all([
        dashboardService.getOrderStats(),
        dashboardService.getRecentOrders(5),
      ]);
      setStats(orderStats);
      setRecentOrders(recent);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const TierIcon = profile?.tier ? tierColors[profile.tier]?.icon || FaStar : FaStar;
  const tierColor = profile?.tier ? tierColors[profile.tier]?.text || "text-gray-500" : "text-gray-500";

  return (
    <div className="space-y-6 p-4">
      <PageHeader title="Dashboard" breadcrumb="Dashboard / Home" />

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <ImSpinner2 className="animate-spin text-3xl" />
          <p className="mt-3 text-sm">Loading dashboard...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-xl bg-red-50 p-6 text-center ring-1 ring-red-200">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Member Info Card */}
          {!isAdmin && profile && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-6 text-white shadow-lg">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-100">
                      Welcome back,
                    </p>
                    <h2 className="text-2xl font-bold">
                      {profile.full_name || "Member"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-medium text-green-100">Your Tier</p>
                      <div className="flex items-center gap-1">
                        <TierIcon className={tierColor} />
                        <span className="text-lg font-bold">{profile.tier}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs text-green-100">Points</p>
                    <p className="text-xl font-bold">
                      {profile.points?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs text-green-100">Role</p>
                    <p className="text-xl font-bold capitalize">{profile.role}</p>
                  </div>
                </div>
                {profile.tier === "Bronze" && (
                  <p className="mt-3 text-xs text-green-200">
                    {100 - (profile.points || 0)} more points to reach Silver
                  </p>
                )}
                {profile.tier === "Silver" && (
                  <p className="mt-3 text-xs text-green-200">
                    {500 - (profile.points || 0)} more points to reach Gold
                  </p>
                )}
              </div>
              <div className="pointer-events-none absolute -top-10 -right-10 text-8xl opacity-5">
                <TierIcon />
              </div>
            </div>
          )}

          {/* Statistik Cards */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
              <div className="rounded-full bg-hijau p-4 shadow-sm">
                <FaShoppingCart className="text-2xl text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats ? stats.total : 0}</span>
                <span className="text-sm text-gray-400">Total Orders</span>
              </div>
            </div>
            <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
              <div className="rounded-full bg-blue-500 p-4 shadow-sm">
                <FaTruck className="text-2xl text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats ? stats.completed : 0}</span>
                <span className="text-sm text-gray-400">Completed</span>
              </div>
            </div>
            <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
              <div className="rounded-full bg-red-500 p-4 shadow-sm">
                <FaBan className="text-2xl text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stats ? stats.cancelled : 0}</span>
                <span className="text-sm text-gray-400">Cancelled</span>
              </div>
            </div>
            <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
              <div className="rounded-full bg-yellow-500 p-4 shadow-sm">
                <FaDollarSign className="text-2xl text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">
                  {stats ? formatPrice(stats.revenue) : "Rp 0"}
                </span>
                <span className="text-sm text-gray-400">Total Revenue</span>
              </div>
            </div>
          </div>

          {/* Recent Orders & Promo */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                <Link to="/orders" className="text-sm font-semibold text-hijau hover:underline">
                  View All
                </Link>
              </div>
              {recentOrders.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 text-sm font-medium text-gray-400">
                        <th className="pb-4">Order</th>
                        <th className="pb-4">Customer</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="transition-colors group hover:bg-gray-50">
                          <td className="py-4 font-mono text-xs text-gray-500">
                            {order.id?.substring(0, 8)}...
                          </td>
                          <td className="py-4 text-gray-600">
                            {order.customer?.full_name || "Unknown"}
                          </td>
                          <td className="py-4 font-semibold text-gray-700">
                            {formatPrice(order.total_amount)}
                          </td>
                          <td className="py-4">
                            <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                              order.status === "completed" ? "bg-green-100 text-green-600" :
                              order.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                              order.status === "processing" ? "bg-blue-100 text-blue-600" :
                              "bg-red-100 text-red-600"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-hijau p-8 text-white shadow-lg">
              <div className="relative z-10">
                <div className="mb-4 flex items-center space-x-2 opacity-80">
                  <FaUtensils />
                  <span className="text-xs font-bold uppercase tracking-widest">Promotion</span>
                </div>
                <h3 className="text-3xl font-extrabold leading-tight">Get 50% <br /> Discount!</h3>
                <p className="mt-4 text-sm font-light leading-relaxed opacity-90">
                  Dapatkan promo "Nasi Goreng Spesial" hanya hari ini.
                </p>
                <button className="mt-8 w-full rounded-xl bg-white py-3 font-bold text-hijau shadow-md transition-all hover:bg-gray-100 active:scale-95">
                  Check Details
                </button>
              </div>
              <img src="https://i.pinimg.com/736x/1e/2a/c1/1e2ac1f56cfec868a91593c10aa075d6.jpg" alt="decoration" className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rotate-12 opacity-10" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}