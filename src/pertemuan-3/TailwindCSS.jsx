import { motion } from "framer-motion";

export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundGlow />
      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-10">
        <Navbar />
        <Hero />
        <Features />
        <Buttons />
        <Showcase />
      </div>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div className="absolute inset-0 -z-0">
      <div className="absolute w-72 h-72 bg-fuchsia-500 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">✨ MyWebsite</h1>
      <div className="flex gap-6 text-gray-300">
        <span className="hover:text-white cursor-pointer">Home</span>
        <span className="hover:text-white cursor-pointer">About</span>
        <span className="hover:text-white cursor-pointer">Contact</span>
      </div>
      <button className="bg-white text-black px-4 py-2 rounded-xl hover:scale-105 transition">
        Login
      </button>
    </div>
  );
}

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20"
    >
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-blue-400 text-transparent bg-clip-text">
        Modern Tailwind UI
      </h1>
      <p className="text-gray-400 mt-4 text-lg">
        UI kamu sekarang naik level 🚀
      </p>
    </motion.div>
  );
}

function Features() {
  const items = [
    "Clean Design",
    "Smooth Animation",
    "Responsive Layout",
    "Modern Style",
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg"
        >
          <h3 className="font-semibold">{item}</h3>
        </motion.div>
      ))}
    </div>
  );
}

function Buttons() {
  return (
    <div className="flex gap-4 justify-center">
      <button className="bg-gradient-to-r from-fuchsia-500 to-blue-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg">
        Get Started
      </button>
      <button className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
        Learn More
      </button>
    </div>
  );
}

function Showcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10"
    >
      <h2 className="text-2xl font-bold">🔥 Interactive Card</h2>
      <p className="text-gray-400 mt-3">
        Hover, animasi, gradient, blur — ini baru UI modern, bukan template biasa 😎
      </p>
    </motion.div>
  );
}
