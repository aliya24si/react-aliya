import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayouts() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col p-4">
        <Header />

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
