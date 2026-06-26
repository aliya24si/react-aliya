import {
  MdSpaceDashboard,
  MdShoppingBasket,
  MdPeople,
  MdError,
  MdShoppingBag,
  MdExtension,
  MdAutoAwesome,
  MdNote,
  MdLogout,
  MdVerified,
  MdAdminPanelSettings,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const { profile, user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 transition-all ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold shadow-sm"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-80 flex-col bg-white p-10 shadow-lg shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900 leading-tight">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">
          {isAdmin ? "Admin Dashboard" : "Member Portal"}
        </span>
      </div>

      {/* User Info Card */}
      {user && (
        <div className="mt-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 ring-1 ring-green-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hijau text-sm font-bold text-white">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {profile?.full_name || "User"}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {isAdmin ? (
                  <>
                    <MdAdminPanelSettings className="text-hijau" />
                    <span className="font-medium text-hijau">Admin</span>
                  </>
                ) : (
                  <>
                    <MdVerified className="text-blue-500" />
                    <span className="text-blue-500 capitalize">{profile?.role}</span>
                  </>
                )}
                {profile?.tier && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="font-medium">{profile.tier}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Menu */}
      <div className="mt-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          Main Menu
        </p>
        <ul className="space-y-3">
          <li>
            <NavLink to="/" className={menuClass} end>
              <MdSpaceDashboard className="mr-4 text-2xl" />
              <span className="text-lg">Dashboard</span>
            </NavLink>
          </li>

          {/* Admin-only menus */}
          {isAdmin && (
            <>
              <li>
                <NavLink to="/customers" className={menuClass}>
                  <MdPeople className="mr-4 text-2xl" />
                  <span className="text-lg">Customers</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/product" className={menuClass}>
                  <MdShoppingBag className="mr-4 text-2xl" />
                  <span className="text-lg">Product</span>
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to="/orders" className={menuClass}>
              <MdShoppingBasket className="mr-4 text-2xl" />
              <span className="text-lg">Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/components" className={menuClass}>
              <MdExtension className="mr-4 text-2xl" />
              <span className="text-lg">Components</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitur-xyz" className={menuClass}>
              <MdAutoAwesome className="mr-4 text-2xl" />
              <span className="text-lg">Fitur XYZ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/note" className={menuClass}>
              <MdNote className="mr-4 text-2xl" />
              <span className="text-lg">Note</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Error Testing Menu */}
      {isAdmin && (
        <div className="mt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            Error Testing
          </p>
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
      )}

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 hover:shadow-sm"
        >
          <MdLogout className="text-xl" />
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10">
        <div className="mb-10 flex items-center overflow-hidden rounded-2xl bg-hijau p-4 shadow-lg">
          <div className="text-xs text-white">
            <p className="font-medium leading-relaxed">
              Please organize your menus through button below!
            </p>
            <button className="mt-3 w-full rounded-xl bg-white py-2 font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-100">
              Add Menus
            </button>
          </div>
          <img
            className="ml-2 h-14 w-14 shrink-0 rounded-full border-2 border-white/30 object-cover"
            src="https://i.pinimg.com/1200x/2d/d9/f7/2dd9f7023a77bf45b5fd3abbf4ecbb22.jpg"
            alt="user"
          />
        </div>
        <div className="text-xs">
          <span className="block font-bold text-gray-400">
            Sedap Restaurant Admin Dashboard
          </span>
          <p className="mt-1 font-light text-gray-400">
            &copy; 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
