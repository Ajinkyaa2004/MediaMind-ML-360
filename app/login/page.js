"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function LoginSelector() {
  const whiteColor = "#FFFFFF";
  const sunsetOrange = "#FF5841";

  return (
    <div
      className={
        plusJakartaSans.className +
        " relative flex flex-col justify-between h-screen w-full overflow-hidden"
      }
    >
      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-orange-200 via-white to-orange-100" />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-between px-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center max-w-lg"
        >
          {/* Header */}
          <motion.div
            className="mb-8 flex flex-wrap"
            style={{
              color: sunsetOrange,
              fontWeight: "800",
              fontSize: "2.5rem",
              letterSpacing: "0.1em",
              borderBottom: `4px solid ${sunsetOrange}`,
              paddingBottom: "0.5rem",
              textTransform: "uppercase",
              fontVariant: "small-caps",
            }}
          >
            {"MediaMind ML - 360".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, -20, 0], // bounce up then down
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: Math.random() * 3, // random delay (0–2s)
                  ease: "easeOut",
                }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char} {/* keep spaces */}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              color: sunsetOrange,
              marginBottom: "2rem",
              fontWeight: "600",
              fontSize: "1.2rem",
            }}
          >
            Select your login type
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col gap-6">
            {[
              ["User Login", "/login/user"],
              ["Admin Login", "/login/admin"],
            ].map(([label, href]) => (
              <motion.div
                key={label}
                whileHover={{
                  scale: 1,
                  x: 5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <Link
                  href={href}
                  style={{
                    backgroundColor: sunsetOrange,
                    color: whiteColor,
                    padding: "1rem 1.5rem",
                    borderRadius: "2rem",
                    fontWeight: "900",
                    fontSize: "15px",
                    display: "inline-block",
                    textDecoration: "none",
                    userSelect: "none",
                    letterSpacing: "0.04em",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e04a37")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = sunsetOrange)
                  }
                  aria-label={label}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer / Small Credit */}
      <footer className="text-center py-3 text-sm text-gray-500">
        © {new Date().getFullYear()} MediaMind ML 360 · Built with ❤️ by Team Ajinkya,  Praveen and Rudra.
      </footer>

      {/* Gradient Animation Style */}
      <style jsx>{`
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
