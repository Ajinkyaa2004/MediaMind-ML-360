"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/client";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Plus_Jakarta_Sans } from "next/font/google";
import { User, Briefcase, Hash, Calendar, X } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function ProfilePage() {
  const router = useRouter();
  const sunsetOrange = "#FF5841";
  const whiteColor = "#FFFFFF";

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    occupation: "",
    aadhar: "",
    phone: "",
    email: "",
  });

  // Load current user and existing profile data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setForm({
            name: data.name ?? "",
            age: data.age ?? "",
            occupation: data.occupation ?? "",
            aadhar: data.aadhar ?? "",
            phone: data.phone ?? "",
            email: data.email ?? firebaseUser.email ?? "",
          });
        } else {
          setForm((prev) => ({
            ...prev,
            email: firebaseUser.email ?? "",
          }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save profile to Firestore
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Validation: check empty fields
    const isEmpty = Object.values(form).some((field) => !field.trim());
    if (isEmpty) {
      toast.error(" Please fill all details!");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, form, { merge: true });

    toast.success(" Profile updated successfully!", { duration: 2000 });

    // redirect after toast
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div
      className={`${plusJakartaSans.className} relative flex flex-col justify-between min-h-screen w-full overflow-hidden`}
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-orange-200 via-white to-orange-100" />

      {/* Close button (top-left outside card) */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-orange-100 transition"
      >
        <X className="w-7 h-7" style={{ color: sunsetOrange }} />
      </button>

      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg rounded-3xl p-10 shadow-2xl backdrop-blur-lg bg-white/20 border border-white/30"
        >
          {/* Header */}
          <div className="mb-6 flex justify-center">
            <h2
              className="font-extrabold tracking-wide text-2xl"
              style={{ color: sunsetOrange }}
            >
              Update Profile
            </h2>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Name */}
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              icon={<User className="w-5 h-5" style={{ color: sunsetOrange }} />}
            />

            {/* Age */}
            <InputField
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              icon={<Calendar className="w-5 h-5" style={{ color: sunsetOrange }} />}
            />

            {/* Occupation */}
            <InputField
              label="Occupation"
              name="occupation"
              type="text"
              value={form.occupation}
              onChange={handleChange}
              icon={<Briefcase className="w-5 h-5" style={{ color: sunsetOrange }} />}
            />

            {/* Aadhaar */}
            <InputField
              label="Aadhaar Number"
              name="aadhar"
              type="text"
              value={form.aadhar}
              onChange={handleChange}
              icon={<Hash className="w-5 h-5" style={{ color: sunsetOrange }} />}
            />

            {/* Save button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  backgroundColor: sunsetOrange,
                  color: whiteColor,
                  padding: "10px 25px",
                  borderRadius: "2rem",
                  fontWeight: "900",
                  fontSize: "15px",
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                Save Profile
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

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

/* 🔹 Reusable Input Component */
function InputField({ label, name, type, value, onChange, icon, disabled }) {
  return (
    <div className="relative">
      <div className="relative flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500">
        {/* Icon */}
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 bg-orange-50/60">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={name}
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          placeholder=" "
          className="peer flex-1 px-4 pt-5 pb-2 bg-transparent focus:outline-none text-black"
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className="absolute left-14 text-gray-500 transition-all duration-200
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
            peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500
            peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-700"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
