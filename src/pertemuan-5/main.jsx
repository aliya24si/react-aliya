import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  // State untuk mengontrol buka/tutup modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        {/* Sidebar di sisi kiri */}
        <Sidebar />

        <div id="main-content" className="flex-1 p-4">
          {/* Header menerima fungsi untuk membuka modal */}
          <Header onSearchClick={() => setIsModalOpen(true)} />
          
          {/* Konten Utama Dashboard */}
          <Dashboard />
        </div>
      </div>

      {/* MODAL SEARCH (Hanya muncul jika isModalOpen = true) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Search Something?</h3>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type to search menus, orders, etc..." 
                className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-hijau transition-all"
                autoFocus
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-gray-100 px-5 py-2 font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                className="rounded-lg bg-hijau px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Render hanya dilakukan satu kali di sini
createRoot(document.getElementById("root")).render(<App />);