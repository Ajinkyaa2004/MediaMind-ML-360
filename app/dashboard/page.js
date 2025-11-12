"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { ListTodo, CheckCircle, Clock } from "lucide-react";
import { getDatabase, ref, push, set, get, child, onValue } from "firebase/database";
import { initializeApp, getApps, getApp } from "firebase/app";
import { Toaster, toast } from "react-hot-toast";

const sunsetOrange = "#FF5841";
const whiteColor = "#FFFFFF";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA8aACiuYGf-Y4WSSUH0iu9QeVZUVQrLCo",
  authDomain: "mediamind-ml-360.firebaseapp.com",
  projectId: "mediamind-ml-360",
  storageBucket: "mediamind-ml-360.firebasestorage.app",
  messagingSenderId: "911344003007",
  appId: "1:911344003007:web:9b998aaa318d55df84630a",
  measurementId: "G-ZRWXG0XZQR",
  databaseURL:
    "https://mediamind-ml-360-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// ✅ Initialize Firebase once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const realtimeDB = getDatabase(app, "https://mediamind-ml-360-default-rtdb.asia-southeast1.firebasedatabase.app");


export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [userLinks, setUserLinks] = useState([]);
  const [activeTicketLink, setActiveTicketLink] = useState(null);
  const [ticketComment, setTicketComment] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  // Function to create an admin user
  const createAdminUser = async (email, fullName) => {
    try {
      const adminRef = doc(db, 'admin', email);
      await setDoc(adminRef, {
        email: email,
        fullName: fullName,
        createdAt: serverTimestamp(),
        role: 'admin'
      });
      console.log(`Admin user ${email} created successfully`);
      return true;
    } catch (error) {
      console.error('Error creating admin user:', error);
      return false;
    }
  };

  // Check if current user is an admin
  const checkIfAdmin = async (email) => {
    try {
      const adminRef = doc(db, 'admin', email);
      const adminSnap = await getDoc(adminRef);
      return adminSnap.exists();
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  // Task summary state
  const [tasksSummary, setTasksSummary] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  // Calculate task summary from user links
  const calculateTaskSummary = (links) => {
    const total = links.length;
    const completed = links.filter(link => link.processed).length;
    const pending = total - completed;
    
    setTasksSummary({
      total,
      completed,
      pending
    });
  };

  // Set up realtime listener for user's links
  useEffect(() => {
    if (!user?.email) return;
    
    const dbRef = ref(realtimeDB, 'links');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const linksData = snapshot.val();
          const filteredLinks = Object.entries(linksData)
            .filter(([_, link]) => link.userEmail === user.email)
            .map(([key, value]) => ({
              id: key,
              ...value
            }));
          
          setUserLinks(filteredLinks);
          calculateTaskSummary(filteredLinks);
        }
      } catch (error) {
        console.error('Error processing links:', error);
        toast.error('Failed to process links');
      }
    }, (error) => {
      console.error('Error fetching user links:', error);
      toast.error('Failed to load your links');
    });

    return () => unsubscribe();
  }, [user?.email]);

  // Fetch user's links from Realtime Database (initial fetch)
  const fetchUserLinks = async (userEmail) => {
    try {
      const dbRef = ref(realtimeDB, 'links');
      const snapshot = await get(dbRef);
      
      if (snapshot.exists()) {
        const linksData = snapshot.val();
        const filteredLinks = Object.entries(linksData)
          .filter(([_, link]) => link.userEmail === userEmail)
          .map(([key, value]) => ({
            id: key,
            ...value
          }));
        
        setUserLinks(filteredLinks);
        calculateTaskSummary(filteredLinks);
      }
    } catch (error) {
      console.error('Error fetching user links:', error);
      toast.error('Failed to load your links');
    }
  };

  // Handle raising a ticket
  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    if (!ticketComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (!activeTicketLink) return;

    setIsSubmittingTicket(true);
    const loadingToast = toast.loading('Submitting ticket...');

    try {
      const ticketRef = ref(realtimeDB, 'raisedTickets');
      const newTicketRef = push(ticketRef);
      
      await set(newTicketRef, {
        linkId: activeTicketLink.id,
        url: activeTicketLink.url,
        userEmail: user.email,
        comment: ticketComment,
        status: 'open',
        timestamp: new Date().toISOString(),
        department: activeTicketLink.department || 'Uncategorized'
      });

      toast.success('Ticket submitted successfully!', { id: loadingToast });
      setActiveTicketLink(null);
      setTicketComment('');
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast.error('Failed to submit ticket', { id: loadingToast });
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  // ✅ Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setProfile(userDocSnap.data());
        }
        // Fetch user's links after authentication
        await fetchUserLinks(firebaseUser.email);
      } else {
        setUser(null);
        setProfile(null);
        setUserLinks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle link submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const link = e.target.link.value.trim();

    if (!link) {
      toast.error("Please enter a valid link.");
      return;
    }

    if (!user?.email) {
      toast.error("Please sign in to submit links.");
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Submitting link...");

    try {
      const dbRef = ref(realtimeDB);
      const snapshot = await get(child(dbRef, "links"));
      const data = snapshot.exists() ? snapshot.val() : {};
      const nextId = Object.keys(data).length + 1;
      const newKey = `link_${nextId}`;
      const timestamp = new Date().toISOString();

      // Push data including all details and user email
      await set(ref(realtimeDB, "links/" + newKey), {
        id: nextId,
        title: `Submitted to ${link.department || 'Uncategorized'}`,
        content: `Link submitted to ${link.department || 'Uncategorized'}`,
        department: link.department || 'Uncategorized',
        sentiment: "negative",
        tonality: "negative",
        url: link,
        userEmail: user.email,
        timestamp: timestamp,
        processed: false
      });

      // Refresh the user's links
      await fetchUserLinks(user.email);
      
      toast.success(`✅ Link #${nextId} submitted successfully!`, { id: loadingToast });
      e.target.reset();
    } catch (err) {
      console.error("Firebase RTDB Error:", err);
      toast.error("Error submitting link. Check console.", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 mb-6 border border-gray-100"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
          Welcome back,{" "}
          <span className="text-orange-500">
            {profile?.fullName
              ? profile.fullName
              : user
                ? user.email.split("@")[0]
                : "User"}
          </span>{" "}
          👋
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-1">
          Here’s a quick look at your progress today:
        </p>

        {/* Task Summary */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl shadow-sm">
            <ListTodo className="text-orange-500 w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" />
            <span className="text-sm sm:text-base md:text-lg font-medium">
              {tasksSummary.total} Tasks
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl shadow-sm">
            <CheckCircle className="text-green-500 w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" />
            <span className="text-sm sm:text-base md:text-lg font-medium">
              {tasksSummary.completed} Completed
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-xl shadow-sm">
            <Clock className="text-yellow-500 w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" />
            <span className="text-sm sm:text-base md:text-lg font-medium">
              {tasksSummary.pending} Pending
            </span>
          </div>
        </div>
      </motion.div>

      {/* Link Submission Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl shadow-inner"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="url"
            name="link"
            placeholder="Enter your link..."
            className="w-full sm:flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base md:text-lg"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: sunsetOrange,
              color: whiteColor,
              padding: "10px 25px",
              borderRadius: "2rem",
              fontWeight: 900,
              fontSize: "15px",
              display: "inline-block",
              textDecoration: "none",
              userSelect: "none",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!submitting) e.currentTarget.style.backgroundColor = "#e04a37";
            }}
            onMouseLeave={(e) => {
              if (!submitting) e.currentTarget.style.backgroundColor = sunsetOrange;
            }}
          >
            {submitting ? "Submitting..." : "Submit Link"}
          </button>

        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Your Submitted Links</h3>
          {userLinks.length === 0 ? (
            <p className="text-gray-500">No links submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {userLinks.map((link) => (
                <div key={link.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        Submitted to: {link.department || 'Uncategorized'}
                      </h4>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm break-all"
                      >
                        {link.url}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted on: {new Date(link.timestamp).toLocaleString()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTicketLink(activeTicketLink?.id === link.id ? null : link);
                        }}
                        className="mt-2 px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-md hover:bg-orange-200 transition-colors"
                      >
                        {activeTicketLink?.id === link.id ? 'Cancel' : 'Raise Ticket'}
                      </button>
                      
                      {activeTicketLink?.id === link.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <textarea
                            value={ticketComment}
                            onChange={(e) => setTicketComment(e.target.value)}
                            placeholder="Please describe the issue..."
                            className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2"
                            rows="3"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setActiveTicketLink(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                              disabled={isSubmittingTicket}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleRaiseTicket}
                              className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-colors"
                              disabled={isSubmittingTicket}
                            >
                              {isSubmittingTicket ? 'Submitting...' : 'Submit Ticket'}
                            </button>
                          </div>
                        </div>
                      )}
                      {link.processed && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs rounded-full" 
                                style={{
                                  backgroundColor: link.sentiment === 'positive' ? '#DCFCE7' : 
                                                link.sentiment === 'negative' ? '#FEE2E2' : '#FEF3C7',
                                  color: link.sentiment === 'positive' ? '#166534' : 
                                         link.sentiment === 'negative' ? '#991B1B' : '#92400E'
                                }}>
                            {link.sentiment?.charAt(0).toUpperCase() + link.sentiment?.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {link.processed ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Processed
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>

  );
}
