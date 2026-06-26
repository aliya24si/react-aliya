import ErrorDisplay from "../components/ErrorDisplay";

export default function Error403() {
  return (
    <ErrorDisplay 
      code="403" 
      title="Forbidden" 
      description="Anda tidak memiliki izin untuk mengakses halaman ini. Hubungi administrator jika Anda memerlukan akses."
    />
  );
}