import { MdSpaceDashboard, MdShoppingBasket, MdPeople, MdError } from "react-icons/md"; // Tambah MdError
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 transition-all ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold shadow-sm"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <div className="flex min-h-screen w-80 flex-col bg-white p-10 shadow-lg shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900 leading-tight">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">Modern Admin Dashboard</span>
      </div>

      {/* Menu Utama */}
      <div className="mt-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
        <ul className="space-y-3">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdSpaceDashboard className="mr-4 text-2xl" />
              <span className="text-lg">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <MdShoppingBasket className="mr-4 text-2xl" />
              <span className="text-lg">Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={menuClass}>
              <MdPeople className="mr-4 text-2xl" />
              <span className="text-lg">Customers</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Menu Error (List Baru) */}
      <div className="mt-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Error Testing</p>
        <ul className="space-y-3">
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <MdError className="mr-4 text-2xl text-red-400" />
              <span className="text-lg">Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-401" className={menuClass}>
              <MdError className="mr-4 text-2xl text-red-400" />
              <span className="text-lg">Error 401</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-403" className={menuClass}>
              <MdError className="mr-4 text-2xl text-red-400" />
              <span className="text-lg">Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Banner Tetap Sama */}
      <div className="mt-auto pt-10">
        <div className="mb-10 flex items-center rounded-2xl bg-hijau p-4 shadow-lg overflow-hidden">
          <div className="text-xs text-white">
            <p className="font-medium leading-relaxed">Please organize your menus through button below!</p>
            <button className="mt-3 w-full rounded-xl bg-white py-2 font-bold text-gray-600 shadow-sm hover:bg-gray-100 transition-colors">
              Add Menus
            </button>
          </div>
          <img
            className="ml-2 w-14 h-14 rounded-full object-cover border-2 border-white/30 shrink-0"
            src="https://i.pinimg.com/1200x/2d/d9/f7/2dd9f7023a77bf45b5fd3abbf4ecbb22.jpg"
            alt="user"
          />
        </div>
        <div className="text-xs">
            <span className="font-bold text-gray-400 block">Sedap Restaurant Admin Dashboard</span>
            <p className="font-light text-gray-400 mt-1">&copy; 2025 All Right Reserved</p>
        </div>
      </div>
    </div>
  );
}