"use client";

import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Activity } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

export default function AnalyticsPage() {
    // Mock Data for Charts
    const sentimentData = [
        { name: 'Mon', Positive: 40, Negative: 24, Neutral: 24 },
        { name: 'Tue', Positive: 30, Negative: 13, Neutral: 22 },
        { name: 'Wed', Positive: 20, Negative: 58, Neutral: 22 },
        { name: 'Thu', Positive: 27, Negative: 39, Neutral: 20 },
        { name: 'Fri', Positive: 18, Negative: 48, Neutral: 21 },
        { name: 'Sat', Positive: 23, Negative: 38, Neutral: 25 },
        { name: 'Sun', Positive: 34, Negative: 43, Neutral: 21 },
    ];

    const deptData = [
        { name: 'Railways', value: 400 },
        { name: 'Finance', value: 300 },
        { name: 'Education', value: 300 },
        { name: 'Health', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BarChart2 className="w-6 h-6 text-orange-500" />
                    Analytics & Reports
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">Total Articles</span>
                            <Activity className="w-4 h-4 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">1,248</h3>
                        <span className="text-xs text-green-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +12% this week
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">Negative Sentiment</span>
                            <Activity className="w-4 h-4 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">156</h3>
                        <span className="text-xs text-red-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +5% this week
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">Processed</span>
                            <Activity className="w-4 h-4 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">892</h3>
                        <span className="text-xs text-green-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> 98% completion rate
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">Active Users</span>
                            <Activity className="w-4 h-4 text-purple-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">45</h3>
                        <span className="text-xs text-gray-500">Active now</span>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sentiment Trends Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Trends (Weekly)</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={sentimentData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="Positive" fill="#4ade80" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Negative" fill="#f87171" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Neutral" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Department Distribution Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Articles by Department</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
