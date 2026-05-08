import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayouts({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* 1. Sidebar diletakkan di sini (posisi kiri) */}
      <Sidebar />

      <div className="flex-1 flex flex-col p-4">
        {/* 2. Header tetap muncul di atas konten */}
        <Header />

        {/* 3. Area konten yang berubah-ubah */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
