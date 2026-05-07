import ErrorDisplay from "../components/ErrorDisplay";

export default function Error403() {
  return (
    <ErrorDisplay 
      code="403" 
      title="Forbidden" 
      description="Maaf, server menolak permintaan Anda. Anda tidak memiliki izin untuk melihat halaman ini."
      // Ikon Tanda Seru Merah (Warning/Forbidden Style)
      image="https://cdn-icons-png.flaticon.com/512/752/752755.png" 
    />
  );
}