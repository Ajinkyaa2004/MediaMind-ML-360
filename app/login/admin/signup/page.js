"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { User, Hash, Mail, Lock } from "lucide-react";

// 🔥 Import Firebase client
import { auth, db } from "@/firebase/client"; // adjust path if needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AdminSignupPage() {
  const [fullName, setFullName] = useState("");
  const [govtId, setGovtId] = useState("");
  const [govtEmail, setGovtEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ fullName: "", govtId: "", govtEmail: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const whiteColor = "#FFFFFF";
  const sunsetOrange = "#FF5841";

  const handleSignUp = async (e) => {
    e.preventDefault();

    let tempErrors = { fullName: "", govtId: "", govtEmail: "", password: "", confirmPassword: "" };
    let valid = true;

    if (!fullName.trim()) {
      tempErrors.fullName = "Full legal name is required";
      valid = false;
    }

    if (!govtId.trim()) {
      tempErrors.govtId = "Government ID number is required";
      valid = false;
    }

    if (!govtEmail) {
      tempErrors.govtEmail = "Government email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(govtEmail)) {
      tempErrors.govtEmail = "Enter a valid government email";
      valid = false;
    }

    if (!password) {
      tempErrors.password = "Password cannot be empty";
      valid = false;
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(tempErrors);

    if (!valid) return;

    try {
      setLoading(true);

      // 🔥 Create admin in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, govtEmail, password);
      const user = userCredential.user;

      // 🔥 Save admin details in Firestore
      await setDoc(doc(db, "admins", user.uid), {
        fullName,
        govtId,
        govtEmail,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      alert("Admin account created successfully!");
      // 🔥 Optional: redirect to admin login
      // router.push("/login/admin");
    } catch (error) {
      console.error("Error creating admin:", error);
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setErrors((prev) => ({ ...prev, govtEmail: "Email is already in use" }));
      } else {
        alert("Failed to create admin: " + error.message);
      }
    }
  };

  return (
    <div className={`${plusJakartaSans.className} relative flex flex-col justify-between h-screen w-full overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-orange-200 via-white to-orange-100" />

      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl p-10 shadow-2xl backdrop-blur-lg bg-white/20 border border-white/30"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="font-extrabold tracking-wide text-2xl md:text-3xl" style={{ color: sunsetOrange, letterSpacing: "0.05em" }}>
              MediaMind ML-360
            </motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} className="font-semibold tracking-wide mt-1 text-lg md:text-xl" style={{ color: sunsetOrange, letterSpacing: "0.03em" }}>
              Admin Sign Up
            </motion.h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Create your admin account
            </p>
            <div className="mt-4 w-16 h-1 bg-orange-600 mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Full Legal Name */}
            {/* ... your input fields unchanged ... */}

            {/* Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                type="submit"
                style={{
                  backgroundColor: sunsetOrange,
                  color: whiteColor,
                  padding: "10px 25px",
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e04a37")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = sunsetOrange)}
                disabled={loading}
              >
                {loading ? "Creating..." : "Sign Up"}
              </motion.button>
            </div>
          </form>

          <p className="mt-6 text-center" style={{ color: sunsetOrange }}>
            Already an admin?{" "}
            <Link href="/login/admin" className="font-semibold hover:underline" style={{ color: sunsetOrange }}>
              Login here
            </Link>
          </p>
        </motion.div>
      </div>

      <footer className="text-center py-3 text-sm" style={{ color: "GrayText" }}>
        © {new Date().getFullYear()} MediaMind ML 360 · Built with ❤️ by Team Ajinkya, Praveen and Rudra.
      </footer>

      <style jsx>{`
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
