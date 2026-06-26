import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  Lock,
  SearchX,
} from "lucide-react";

const errorConfig = {
  400: {
    icon: AlertTriangle,
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/10",
    dotGlow: "bg-amber-500/40",
    borderGlow: "border-amber-500/20",
    ringGlow: "ring-amber-500/20",
  },
  401: {
    icon: Lock,
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
    dotGlow: "bg-blue-500/40",
    borderGlow: "border-blue-500/20",
    ringGlow: "ring-blue-500/20",
  },
  403: {
    icon: ShieldAlert,
    gradient: "from-red-500 to-rose-600",
    bgGlow: "bg-red-500/10",
    dotGlow: "bg-red-500/40",
    borderGlow: "border-red-500/20",
    ringGlow: "ring-red-500/20",
  },
  404: {
    icon: SearchX,
    gradient: "from-slate-500 to-gray-600",
    bgGlow: "bg-slate-500/10",
    dotGlow: "bg-slate-500/40",
    borderGlow: "border-slate-500/20",
    ringGlow: "ring-slate-500/20",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.6, 0.9, 0.6],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function ErrorDisplay({ code, title, description }) {
  const config = errorConfig[code] || errorConfig[404];
  const IconComponent = config.icon;

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden p-6">
      {/* Animated Background Orbs */}
      <motion.div
        className={`pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl ${config.bgGlow}`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-20 blur-3xl ${config.bgGlow}`}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl ${config.bgGlow}`}
        animate={pulseAnimation}
      />

      {/* Dots Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-lg"
      >
        {/* Icon */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            animate={floatAnimation}
            className="inline-flex items-center justify-center"
          >
            <div
              className={`relative rounded-2xl p-5 ${config.bgGlow} ring-1 ${config.ringGlow}`}
            >
              <IconComponent
                className={`h-12 w-12 bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}
              />
              {/* Glow dot */}
              <motion.span
                className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ring-2 ring-white ${config.dotGlow}`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className={`mt-6 overflow-hidden rounded-2xl border ${config.borderGlow} bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5`}
        >
          <div className="p-8 text-center sm:p-10">
            {/* Code */}
            <motion.h1
              className="text-8xl font-black leading-none tracking-tighter sm:text-9xl"
            >
              <span className={`bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}>
                {code}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p className="mt-3 text-base leading-relaxed text-gray-500">
              {description}
            </motion.p>

            {/* Actions */}
            <motion.div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/">
                <Button
                  size="lg"
                  className={`h-11 min-w-[180px] gap-2 rounded-xl bg-gradient-to-r ${config.gradient} text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 min-w-[140px] rounded-xl border-gray-200 text-gray-600 transition-all hover:scale-105 hover:border-gray-300 active:scale-95"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Bottom accent bar */}
          <motion.div
            className={`h-1.5 w-full bg-gradient-to-r ${config.gradient}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Footer text */}
        <motion.p className="mt-6 text-center text-xs text-gray-400">
          If you believe this is an error, please contact your administrator.
        </motion.p>
      </motion.div>
    </div>
  );
}