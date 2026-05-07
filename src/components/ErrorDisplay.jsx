import { Link } from "react-router-dom";

export default function ErrorDisplay({ code, title, description, image }) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center p-6">
      <img src={image} alt="error" className="w-64 mb-6 object-contain opacity-80" />
      <h1 className="text-7xl font-extrabold text-hijau">{code}</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">{title}</h2>
      <p className="text-gray-500 mt-2 max-w-sm">{description}</p>
      <Link 
        to="/" 
        className="mt-8 rounded-xl bg-hijau px-8 py-3 text-white font-bold shadow-lg hover:brightness-95 transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}