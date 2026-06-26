import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ onSearchClick }) {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div
        className="relative w-full max-w-lg cursor-pointer"
        onClick={onSearchClick}
      >
        <input
          type="text"
          placeholder="Search Here..."
          readOnly
          className="w-full max-w-lg cursor-pointer rounded-md border border-gray-100 bg-white p-2 pr-10 outline-none transition-all focus:ring-2 focus:ring-hijau/20"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-300" />
      </div>

      {/* Icons & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification */}
        <div className="relative cursor-pointer rounded-2xl bg-blue-100 p-3 text-blue-500 transition-colors hover:bg-blue-200">
          <FaBell />
          <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            50
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4 border-l border-gray-300 pl-4">
          <div className="flex flex-col text-right">
            <span className="text-sm text-gray-500">Hello,</span>
            <span className="text-sm font-bold leading-tight text-gray-800">
              {displayName}
            </span>
            {profile?.role && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                {profile.role}
              </span>
            )}
          </div>
          <div className="relative group">
            <img
              src="https://i.pinimg.com/1200x/2d/d9/f7/2dd9f7023a77bf45b5fd3abbf4ecbb22.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
            />
            {/* Logout button on hover */}
            <button
              onClick={handleLogout}
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white opacity-0 shadow-sm transition-all hover:bg-red-600 group-hover:opacity-100"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}