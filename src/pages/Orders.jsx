import PageHeader from "../components/PageHeader";
import ordersData from "../data/ordersData.json"; // Panggil JSON di sini

export default function Orders() {
  return (
    <div className="p-4">
      <PageHeader title="Orders" breadcrumb="Dashboard / Order List">
        <button className="rounded-lg bg-hijau px-4 py-2 text-white font-bold shadow-md">
          + Add New Order
        </button>
      </PageHeader>

      <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ordersData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                    }`}>
                        {order.status}
                    </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-700">{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}