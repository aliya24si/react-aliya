import ErrorDisplay from "../components/ErrorDisplay";

export default function Error401() {
  return (
    <ErrorDisplay 
      code="401" 
      title="Unauthorized" 
      description="Maaf, Anda memerlukan autentikasi sebelum mengakses halaman ini."
      image="https://cdn-icons-png.flaticon.com/512/12185/12185011.png"
    />
  );
}