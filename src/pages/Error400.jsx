import ErrorDisplay from "../components/ErrorDisplay";

export default function Error400() {
  return (
    <ErrorDisplay 
      code="400" 
      title="Bad Request" 
      description="Permintaan tidak dapat dipahami oleh server karena sintaksis yang salah. Silakan periksa kembali input Anda."
    />
  );
}