"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { ListTodo, CheckCircle, Clock } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Mock tasks summary (later connect to DB or API)
  const tasksSummary = {
    total: 6,
    completed: 3,
    pending: 3,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch user profile from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setProfile(userDocSnap.data());
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      {/* Welcome Widget */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back,{" "}
          <span className="text-orange-500">
            {profile?.fullName
              ? profile.fullName
              : user
              ? user.email.split("@")[0]
              : "User"}
          </span>
          👋
        </h2>
        <p className="text-gray-600 mt-1">
          Here’s a quick look at your progress today:
        </p>

        {/* Task Summary */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl shadow-sm">
            <ListTodo className="text-orange-500 w-6 h-6" />
            <span className="text-sm font-medium">
              {tasksSummary.total} Tasks
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl shadow-sm">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <span className="text-sm font-medium">
              {tasksSummary.completed} Completed
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-xl shadow-sm">
            <Clock className="text-yellow-500 w-6 h-6" />
            <span className="text-sm font-medium">
              {tasksSummary.pending} Pending
            </span>
          </div>
        </div>
      </motion.div>

      {/* Replace with your actual dashboard content */}
      <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
        <p className="text-gray-700">📊 Dashboard insights will go here...</p>
      </div>
    </div>
  );
}
