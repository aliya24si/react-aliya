export default function PageHeader() {
    return (
        <div className="flex items-center justify-between p-4">
            
            <div className="flex flex-col">
                <span className="text-3xl font-semibold">
                    Dashboard
                </span>

                <div className="mt-2 flex items-center space-x-2 font-medium">
                    <span className="text-gray-500">Dashboard</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-500">Order List</span>
                </div>
            </div>

            <div>
                <button className="rounded-lg bg-hijau px-4 py-2 text-white">
                    Add Button
                </button>
            </div>

        </div>
    );
}