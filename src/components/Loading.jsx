export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-latar font-poppins">
      <div className="relative flex items-center justify-center mb-6">
        {/* Spinner Luar (Ukuran Besar & Lambat) */}
        <div className="w-16 h-16 border-4 border-hijau/20 border-t-hijau rounded-full animate-spin"></div>
        
        {/* Spinner Dalam (Ukuran Kecil & Lebih Cepat dengan Arah Terbalik) */}
        <div className="absolute w-10 h-10 border-4 border-hijau/10 border-b-hijau rounded-full animate-spin [animation-direction:reverse] [animation-duration:0.6s]"></div>
      </div>

      {/* Teks Loading Premium */}
      <div className="text-center">
        <p className="text-teks text-xl font-bold tracking-wide animate-pulse">
          Memuat Data <span className="text-hijau">Sedap</span>...
        </p>
        <p className="text-teks-samping text-sm font-medium font-barlow mt-1">
          Mohon tunggu sebentar, hidangan sedang disiapkan.
        </p>
      </div>
    </div>
  );
}
