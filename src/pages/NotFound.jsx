import ErrorDisplay from "../components/ErrorDisplay";

export default function NotFound() {
  return (
    <ErrorDisplay 
      code="404" 
      title="Page Not Found" 
      description="Ups! Halaman yang kamu cari tidak ditemukan. Mungkin sudah dipindahkan atau dihapus."
    />
  );
}