"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Lock, Globe } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-orange-500" />
                    Settings
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <User className="w-5 h-5 text-orange-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Profile Settings</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Manage your personal information and preferences.</p>
                        <button className="text-sm font-medium text-orange-600 hover:text-orange-700">Edit Profile &rarr;</button>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Bell className="w-5 h-5 text-blue-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Configure how you receive alerts and updates.</p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Email Alerts</span>
                            <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">SMS Notifications</span>
                            <input type="checkbox" className="toggle-checkbox" />
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <Lock className="w-5 h-5 text-green-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Update your password and security settings.</p>
                        <button className="text-sm font-medium text-green-600 hover:text-green-700">Change Password &rarr;</button>
                    </div>

                    {/* Language & Region */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Globe className="w-5 h-5 text-purple-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Language & Region</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Set your preferred language and regional format.</p>
                        <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
                            <option>English (India)</option>
                            <option>Hindi</option>
                            <option>Marathi</option>
                        </select>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
