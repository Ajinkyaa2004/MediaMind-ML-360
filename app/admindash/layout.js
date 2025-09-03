"use client";

import { useState } from "react";
import AdminSidebar from "../components/adminSidebar";
import { motion } from "framer-motion";

export default function AdmindashLayout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(240);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar setSidebarWidth={setSidebarWidth} />

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
