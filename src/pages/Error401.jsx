import ErrorDisplay from "../components/ErrorDisplay";

export default function Error401() {
  return (
    <ErrorDisplay 
      code="401" 
      title="Unauthorized" 
      description="Anda memerlukan autentikasi sebelum mengakses halaman ini. Silakan masuk terlebih dahulu."
    />
  );
}