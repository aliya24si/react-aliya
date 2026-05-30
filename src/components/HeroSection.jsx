export default function HeroSection({ title, subtitle, buttonText }) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-800 rounded-2xl p-8 md:p-12 text-white shadow-md">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{title}</h1>
        <p className="text-green-100 text-sm md:text-base mb-6 leading-relaxed">{subtitle}</p>
        {buttonText && (
          <button className="bg-white text-emerald-800 hover:bg-green-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow transition-colors">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}