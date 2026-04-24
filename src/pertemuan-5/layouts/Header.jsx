import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header({ onSearchClick }) {
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
        <div className="relative cursor-pointer rounded-2xl bg-blue-100 p-3 text-blue-500 hover:bg-blue-200 transition-colors">
          <FaBell />
          <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white font-bold">
            50
          </span>
        </div>

        {/* Chart */}
        <div className="cursor-pointer rounded-2xl bg-blue-100 p-3 hover:bg-blue-200 transition-colors">
          <FcAreaChart />
        </div>

        {/* Settings */}
        <div className="cursor-pointer rounded-2xl bg-red-100 p-3 text-red-500 hover:bg-red-200 transition-colors">
          <SlSettings />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4 border-l border-gray-300 pl-4">
          <div className="flex flex-col text-right">
            <span className="text-sm text-gray-500">Hello,</span>
            <span className="font-bold text-gray-800 leading-tight text-sm">
              Minionnn
            </span>
          </div>
          <img
            src="https://i.pinimg.com/1200x/2d/d9/f7/2dd9f7023a77bf45b5fd3abbf4ecbb22.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}