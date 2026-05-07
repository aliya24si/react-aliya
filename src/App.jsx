import { Routes, Route } from "react-router-dom";
import Sidebar from "./layouts/Sidebar"; // Tambahkan import Sidebar
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import Error400 from './pages/Error400';
import Error401 from './pages/Error401';
import Error403 from './pages/Error403';
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* 1. Sidebar diletakkan di sini (posisi kiri) */}
      <Sidebar />

      <div className="flex-1 flex flex-col p-4">
        {/* 2. Header tetap muncul di atas konten */}
        <Header />

        {/* 3. Area konten yang berubah-ubah */}
        <div className="mt-4">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/error-400" element={<Error400 />} />
            <Route path="/error-401" element={<Error401 />} />
            <Route path="/error-403" element={<Error403 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
