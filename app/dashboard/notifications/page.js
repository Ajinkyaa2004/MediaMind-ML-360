"use client";

import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: "alert",
            title: "Negative Sentiment Alert",
            message: "A new negative story about 'Railways' has been detected.",
            time: "2 mins ago",
            icon: AlertTriangle,
            color: "text-red-500",
            bg: "bg-red-50",
        },
        {
            id: 2,
            type: "success",
            title: "Link Processed",
            message: "Your submission for 'Times of India' has been processed successfully.",
            time: "1 hour ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50",
        },
        {
            id: 3,
            type: "info",
            title: "System Update",
            message: "The dashboard has been updated with new filtering capabilities.",
            time: "1 day ago",
            icon: Info,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
    ];

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-orange-500" />
                    Notifications
                </h1>

                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: notification.id * 0.1 }}
                            className={`p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 ${notification.bg}`}
                        >
                            <div className={`p-2 rounded-full bg-white ${notification.color}`}>
                                <notification.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
