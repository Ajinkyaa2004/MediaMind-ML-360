"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Mail, Lock, User } from "lucide-react";
import { auth, db } from "@/firebase/client";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅ Added

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export default function UserSignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    const router = useRouter(); // ✅ Added

    const whiteColor = "#FFFFFF";
    const sunsetOrange = "#FF5841";

    const handleSignUp = async (e) => {
        e.preventDefault();

        let tempErrors = { fullName: "", email: "", password: "", confirmPassword: "" };
        let valid = true;

        if (!fullName.trim()) {
            tempErrors.fullName = "Full name is required";
            valid = false;
        }

        if (!email) {
            tempErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Enter a valid email";
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

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await new Promise((resolve) => {
                onAuthStateChanged(auth, (u) => {
                    if (u) resolve(u);
                });
            });

            await setDoc(doc(db, "users", user.uid), {
                fullName,
                email,
                createdAt: new Date(),
            });

            console.log("User successfully signed up:", user.uid);
            toast.success("Account created successfully!");

            // ✅ Redirect to login page after a short delay so toast is visible
            setTimeout(() => {
                router.push("/login/user");
            }, 1500);

        } catch (error) {
            console.error("Error signing up:", error);
            if (error.code === "permission-denied") {
                toast.error("Firestore permission error. Please check Firestore rules.");
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${plusJakartaSans.className} relative flex flex-col justify-between h-screen w-full overflow-hidden`}>
            <Toaster position="top-right" reverseOrder={false} />
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
                            Sign Up
                        </motion.h2>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">
                            Sign up to start your MediaMind ML journey
                        </p>
                        <div className="mt-4 w-16 h-1 bg-orange-600 mx-auto rounded-full"></div>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        {/* Full Name */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
                            <div className="relative flex items-center overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-inner backdrop-blur-lg focus-within:ring-2 focus-within:ring-orange-400">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-50/60">
                                    <User className="w-5 h-5" style={{ color: sunsetOrange }} />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="peer flex-1 px-4 pt-5 pb-2 bg-transparent focus:outline-none text-black"
                                    style={{ color: "#000000", caretColor: sunsetOrange }}
                                    placeholder=" "
                                />
                                <label htmlFor="fullName" className="absolute left-14 top-1 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                                    Enter your full name
                                </label>
                            </div>
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </motion.div>

                        {/* Email */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="relative">
                            <div className="relative flex items-center overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-inner backdrop-blur-lg focus-within:ring-2 focus-within:ring-orange-400">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-50/60">
                                    <Mail className="w-5 h-5" style={{ color: sunsetOrange }} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer flex-1 px-4 pt-5 pb-2 bg-transparent focus:outline-none text-black"
                                    style={{ color: "#000000", caretColor: sunsetOrange }}
                                    placeholder=" "
                                />
                                <label htmlFor="email" className="absolute left-14 top-1 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                                    Enter your email
                                </label>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </motion.div>

                        {/* Password */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
                            <div className="relative flex items-center overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-inner backdrop-blur-lg focus-within:ring-2 focus-within:ring-orange-400">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-50/60">
                                    <Lock className="w-5 h-5" style={{ color: sunsetOrange }} />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="peer flex-1 px-4 pt-5 pb-2 bg-transparent focus:outline-none text-black"
                                    style={{ color: "#000000", caretColor: sunsetOrange }}
                                    placeholder=" "
                                />
                                <label htmlFor="password" className="absolute left-14 top-1 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                                    Enter your password
                                </label>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="relative">
                            <div className="relative flex items-center overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-inner backdrop-blur-lg focus-within:ring-2 focus-within:ring-orange-400">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-50/60">
                                    <Lock className="w-5 h-5" style={{ color: sunsetOrange }} />
                                </div>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="peer flex-1 px-4 pt-5 pb-2 bg-transparent focus:outline-none text-black"
                                    style={{ color: "#000000", caretColor: sunsetOrange }}
                                    placeholder=" "
                                />
                                <label htmlFor="confirmPassword" className="absolute left-14 top-1 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                                    Confirm your password
                                </label>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </motion.div>

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
                                {loading ? "Signing Up..." : "Sign Up"}
                            </motion.button>
                        </div>
                    </form>

                    <p className="mt-6 text-center" style={{ color: sunsetOrange }}>
                        Already a user?{" "}
                        <Link href="/login/user" className="font-semibold hover:underline" style={{ color: sunsetOrange }}>
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
