import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUtensils } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// Simulasi Data (Bisa dipindah ke file terpisah nantinya)
const orders = [
  { id: "#001", customer: "Aliya", menu: "Nasi Goreng", status: "Delivered", price: "Rp. 25.000" },
  { id: "#002", customer: "Fikri", menu: "Mie Ayam", status: "Pending", price: "Rp. 15.000" },
  { id: "#003", customer: "Budi", menu: "Es Teh", status: "Canceled", price: "Rp. 5.000" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <PageHeader />

      {/* SECTION 1: Statistik Cards */}
      <div className="grid gap-4 p-5 sm:grid-cols-2 md:grid-cols-4">
        {/* Total Orders */}
        <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
          <div className="rounded-full bg-hijau p-4 shadow-sm">
            <FaShoppingCart className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">75</span>
            <span className="text-sm text-gray-400">Total Orders</span>
          </div>
        </div>

        {/* Total Delivered */}
        <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
          <div className="rounded-full bg-blue-500 p-4 shadow-sm">
            <FaTruck className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">175</span>
            <span className="text-sm text-gray-400">Total Delivered</span>
          </div>
        </div>

        {/* Total Canceled */}
        <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
          <div className="rounded-full bg-red-500 p-4 shadow-sm">
            <FaBan className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">40</span>
            <span className="text-sm text-gray-400">Total Canceled</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex items-center space-x-5 rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105">
          <div className="rounded-full bg-yellow-500 p-4 shadow-sm">
            <FaDollarSign className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800">Rp. 128jt</span>
            <span className="text-sm text-gray-400">Total Revenue</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Tabel Data & Promo */}
      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-3">
        
        {/* Kolom 1 & 2: Tabel Order List */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
            <button className="text-sm font-semibold text-hijau hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-sm font-medium text-gray-400">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Menu</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {orders.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-gray-700">{item.id}</td>
                    <td className="py-4 text-gray-600">{item.customer}</td>
                    <td className="py-4 text-gray-600 font-medium">{item.menu}</td>
                    <td className="py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom 3: Komponen Baru (Promo Card) */}
        <div className="relative overflow-hidden rounded-2xl bg-hijau p-8 text-white shadow-lg">
          <div className="relative z-10">
            <div className="mb-4 flex items-center space-x-2 opacity-80">
              <FaUtensils />
              <span className="text-xs font-bold uppercase tracking-widest">Promotion</span>
            </div>
            <h3 className="text-3xl font-extrabold leading-tight">
              Get 50% <br /> Discount!
            </h3>
            <p className="mt-4 text-sm font-light opacity-90 leading-relaxed">
              Dapatkan promo "Nasi Goreng Spesial" hanya hari ini. Berlaku untuk pemesanan via Dashboard.
            </p>
            <button className="mt-8 w-full rounded-xl bg-white py-3 font-bold text-hijau shadow-md transition-all hover:bg-gray-100 active:scale-95">
              Check Details
            </button>
          </div>
          
          {/* Hiasan Background (SVG Food) */}
          <img 
            src="https://i.pinimg.com/736x/1e/2a/c1/1e2ac1f56cfec868a91593c10aa075d6.jpg" 
            alt="decoration" 
            className="absolute -bottom-10 -right-10 h-48 w-48 opacity-10 rotate-12"
          />
        </div>

      </div>
    </div>
  );
}