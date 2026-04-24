import { MdDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu */}
      <div className="mt-10">
        <ul className="space-y-3">
          <li className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold">
            <MdDashboard className="mr-4 text-xl" />
            <span>Dashboard</span>
          </li>

          <li className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold">
            <span>Orders</span>
          </li>

          <li className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold">
            <span>Customers</span>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="mb-10 flex items-center rounded-md bg-hijau px-4 py-2 shadow-lg">
          <div className="text-sm text-white">
            <span>Please organize your menus through button below!</span>

            <div className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2">
              <span className="flex items-center text-gray-600">Add Menus</span>
            </div>
          </div>

          <img
            className="w-20 rounded-full"
            src="https://i.pinimg.com/1200x/2d/d9/f7/2dd9f7023a77bf45b5fd3abbf4ecbb22.jpg"
          />
        </div>

        <span className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>
        <p className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
