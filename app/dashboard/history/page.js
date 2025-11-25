"use client";

import { motion } from "framer-motion";
import { History, Calendar, FileText } from "lucide-react";

export default function HistoryPage() {
    const historyItems = [
        {
            id: 1,
            action: "Submitted Link",
            details: "Times of India - Mumbai Edition",
            date: "2023-11-25",
            time: "10:30 AM",
        },
        {
            id: 2,
            action: "Raised Ticket",
            details: "Correction needed for 'Railways' article",
            date: "2023-11-24",
            time: "02:15 PM",
        },
        {
            id: 3,
            action: "Downloaded Clipping",
            details: "Economic Times - Finance Dept",
            date: "2023-11-23",
            time: "09:45 AM",
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
                    <History className="w-6 h-6 text-orange-500" />
                    Activity History
                </h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-800 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {historyItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-gray-400" />
                                            {item.action}
                                        </td>
                                        <td className="px-6 py-4">{item.details}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {item.date}
                                        </td>
                                        <td className="px-6 py-4">{item.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
