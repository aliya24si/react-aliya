import PageHeader from "../components/PageHeader";
import customersData from "../data/customersData.json";

export default function Customers() {
  return (
    <div className="p-4">
      <PageHeader title="Customers" breadcrumb="Dashboard / Customer List">
        <button className="rounded-lg bg-hijau px-4 py-2 text-white font-bold shadow-md">
          + Add New Customer
        </button>
      </PageHeader>

      <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Loyalty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customersData.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50 transition-colors text-sm">
                <td className="px-6 py-4 font-bold text-gray-700">{cust.id}</td>
                <td className="px-6 py-4">{cust.name}</td>
                <td className="px-6 py-4 text-gray-500">{cust.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    cust.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-600' : 
                    cust.loyalty === 'Silver' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {cust.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}