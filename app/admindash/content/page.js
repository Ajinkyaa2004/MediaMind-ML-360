"use client";

import { motion } from "framer-motion";
import { FileText, Filter, CheckCircle, XCircle, Clock } from "lucide-react";

export default function ContentManagementPage() {
    const content = [
        { id: 1, title: "Railway Safety Measures", source: "Times of India", status: "Pending", date: "2023-11-25" },
        { id: 2, title: "New Education Policy Impact", source: "The Hindu", status: "Approved", date: "2023-11-24" },
        { id: 3, title: "Agricultural Reforms", source: "Dainik Jagran", status: "Rejected", date: "2023-11-23" },
    ];

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-orange-500" />
                        Content Management
                    </h1>
                    <div className="flex gap-2">
                        <button className="bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-800 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Article Title</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {content.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                    <td className="px-6 py-4">{item.source}</td>
                                    <td className="px-6 py-4">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {item.status === 'Approved' && <CheckCircle className="w-3 h-3" />}
                                            {item.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                                            {item.status === 'Pending' && <Clock className="w-3 h-3" />}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                                        <button className="text-red-600 hover:text-red-800 font-medium text-xs">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
