"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Database, Globe } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-orange-500" />
                    System Settings
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* General Configuration */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Globe className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">General Configuration</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>
                                <input type="text" defaultValue="MediaMind 360" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                                <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
                                    <option>English</option>
                                    <option>Hindi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Security Policies */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-50 rounded-lg">
                                <Shield className="w-5 h-5 text-red-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Security Policies</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                                <input type="checkbox" defaultChecked className="toggle-checkbox" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Force Password Reset (90 days)</span>
                                <input type="checkbox" defaultChecked className="toggle-checkbox" />
                            </div>
                        </div>
                    </div>

                    {/* Database & Backup */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Database className="w-5 h-5 text-blue-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Database & Backup</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Last backup: 2 hours ago</p>
                        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors w-full">
                            Trigger Manual Backup
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
