"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(240); // default expanded

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: sidebarWidth }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="flex-1 p-6 bg-gray-50"
      >
        {children}
      </motion.main>
    </div>
  );
}
