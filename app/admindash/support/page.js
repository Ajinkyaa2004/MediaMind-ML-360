"use client";

import { motion } from "framer-motion";
import { HelpCircle, FileText, MessageSquare } from "lucide-react";

export default function AdminSupportPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-orange-500" />
                    Admin Support Center
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Technical Documentation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                                <h3 className="font-medium text-gray-800">System Architecture</h3>
                                <p className="text-xs text-gray-500">View detailed diagrams</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                                <h3 className="font-medium text-gray-800">API Reference</h3>
                                <p className="text-xs text-gray-500">Endpoints and authentication</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 p-8 rounded-xl border border-orange-100">
                    <div className="flex items-start gap-4">
                        <MessageSquare className="w-8 h-8 text-orange-500 mt-1" />
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Contact Developer Team</h2>
                            <p className="text-gray-600 mb-4">
                                For critical system failures or bug reports, please contact the development team directly.
                            </p>
                            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                                Raise Critical Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
