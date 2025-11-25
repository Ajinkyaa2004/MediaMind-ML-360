"use client";

import { motion } from "framer-motion";
import { HelpCircle, Mail, Phone, MessageSquare } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-orange-500" />
                    Help & Support
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
                        <p className="text-sm text-gray-500 mb-4">Get response within 24 hours</p>
                        <a href="mailto:support@mediamind.gov.in" className="text-orange-600 font-medium hover:underline">support@mediamind.gov.in</a>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
                        <p className="text-sm text-gray-500 mb-4">Mon-Fri, 9AM - 6PM</p>
                        <a href="tel:1800-123-4567" className="text-green-600 font-medium hover:underline">1800-123-4567</a>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
                        <p className="text-sm text-gray-500 mb-4">Chat with our AI assistant</p>
                        <button className="text-blue-600 font-medium hover:underline">Start Chat</button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group border-b border-gray-100 pb-4">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-800">
                                <span>How do I submit a new news link?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Go to the Dashboard home page, paste the URL in the submission form, fill in the newspaper details, and click "Submit Link".
                            </p>
                        </details>
                        <details className="group border-b border-gray-100 pb-4">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-800">
                                <span>How can I raise a ticket for incorrect sentiment analysis?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Find the link in your "Submitted Links" list, click "Raise Ticket", enter your comments describing the issue, and submit.
                            </p>
                        </details>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
