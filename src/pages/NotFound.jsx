import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      {/* Ikon Error */}
      <MdErrorOutline className="text-hijau text-9xl mb-4 opacity-20" />
      
      {/* Teks Pesan */}
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
      <p className="text-xl text-gray-500 mt-2">
        Ups! Halaman yang kamu cari tidak ditemukan.
      </p>

      {/* Tombol Kembali */}
      <Link
        to="/"
        className="mt-8 rounded-xl bg-hijau px-8 py-3 text-white font-bold shadow-lg hover:opacity-90 transition-all active:scale-95"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}