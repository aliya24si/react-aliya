import React from "react";
import PageHeader from "../components/PageHeader";
import dataProduk from "../data/produk.json";
import { Link } from "react-router-dom";

export default function Product() {
  return (
    <div className="p-4">
      {/* PageHeader disesuaikan untuk halaman Product */}
      <PageHeader title="Product" breadcrumb="Dashboard / Product List">
        <button className="rounded-lg bg-hijau px-4 py-2 text-white font-bold shadow-md hover:bg-green-600 transition-colors">
          + Add New Product
        </button>
      </PageHeader>

      {/* Kontainer Tabel Utama */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Sub-Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dataProduk.map((produk) => (
              <tr
                key={produk.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* ID Produk */}
                <td className="px-6 py-4 font-bold text-gray-700">
                  {produk.id}
                </td>

                {/* Nama Menu Kuliner dengan Link Detail (Sudah Diperbaiki) */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  <Link
                    to={`/product/${produk.id}`}
                    className="text-emerald-400 hover:text-emerald-500 transition-colors"
                  >
                    {produk.tittle}
                  </Link>
                </td>

                {/* Kode Menu */}
                <td className="px-6 py-4 text-gray-600">{produk.code}</td>

                {/* Kategori dengan Warna Badge Dinamis Sesuai Jenis Kuliner */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      produk.category === "Makanan Utama"
                        ? "bg-orange-100 text-orange-600"
                        : produk.category === "Minuman"
                          ? "bg-blue-100 text-blue-600"
                          : produk.category === "Makanan Ringan"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-purple-100 text-purple-600" // Untuk Pencuci Mulut
                    }`}
                  >
                    {produk.category}
                  </span>
                </td>

                {/* Sub-Kategori / Kelompok Menu */}
                <td className="px-6 py-4 text-gray-600">{produk.brand}</td>

                {/* Harga Format Rupiah */}
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Rp {produk.price.toLocaleString("id-ID")}
                </td>

                {/* Status Ketersediaan Porsi / Stok */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      produk.stock > 40
                        ? "bg-green-100 text-green-600"
                        : produk.stock > 15
                          ? "bg-amber-100 text-amber-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {produk.stock} porsi
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}