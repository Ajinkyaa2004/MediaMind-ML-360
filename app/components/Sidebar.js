"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ListTodo,
  Bell,
  History,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";

export default function Sidebar({ setSidebarWidth }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const sunsetOrange = "#FF5733";

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Sync width with parent layout
  useEffect(() => {
    if (setSidebarWidth) {
      setSidebarWidth(isOpen ? 240 : 70);
    }
  }, [isOpen, setSidebarWidth]);

  // ✅ Watch for Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const menuItems = [
    { name: "Tasks / Activities", icon: ListTodo, href: "/dashboard/tasks" },
    { name: "Notifications", icon: Bell, href: "/dashboard/messages" },
    { name: "History", icon: History, href: "/dashboard/history" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Support", icon: HelpCircle, href: "/dashboard/support" },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 240 : 70, minWidth: isOpen ? 240 : 70 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen bg-white text-black flex flex-col shadow-lg fixed left-0 top-0 z-50"
    >
    {/* Toggle button + User info */}
<div className="flex items-center justify-between p-4 border-b border-gray-200">
  <button onClick={() => setIsOpen(!isOpen)}>
    <Menu className="w-6 h-6" color={sunsetOrange} />
  </button>
  <motion.h1
    initial={false}
    animate={{
      opacity: isOpen ? 1 : 0,
      fontSize: isOpen ? "1rem" : "0rem", // text-base when open
    }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="font-bold text-gray-700 overflow-hidden truncate max-w-[150px]"
  >
    {user ? user.email.split("@")[0] : "User"}
  </motion.h1>
</div>


      {/* Profile Section */}
      <div className="relative px-4 py-4 border-b border-gray-200">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
            <User className="w-7 h-7" color={sunsetOrange} />
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-between w-full overflow-hidden"
          >
            <p className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">
              {user ? user.email.split("@")[0] : "User"}
            </p>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </motion.div>
        </div>

        {/* Dropdown */}
        {dropdownOpen && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mt-2 bg-gray-50 rounded-lg shadow-md p-2"
          >
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 w-full text-sm"
              style={{ color: sunsetOrange }}
            >
              <User className="w-4 h-4" />
              Update Profile
            </button>
          </motion.div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link key={idx} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                  isActive
                    ? "bg-orange-100 border-l-4 border-orange-500 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                style={{ color: sunsetOrange }}
              >
                <item.icon className="w-5 h-5" color={sunsetOrange} />
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    fontSize: isOpen ? "1rem" : "0rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.name}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <motion.div
        whileHover={{ scale: 1.05, x: 5 }}
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer mb-4"
        style={{ color: sunsetOrange }}
      >
        <LogOut className="w-5 h-5" color={sunsetOrange} />
        <motion.span
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            fontSize: isOpen ? "1rem" : "0rem",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-medium overflow-hidden"
        >
          Logout
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
