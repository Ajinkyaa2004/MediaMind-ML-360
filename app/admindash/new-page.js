"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { motion } from "framer-motion";
import { MessageSquare, Check, X, Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('raised');
  const [tickets, setTickets] = useState({ raised: [], processed: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeDB, setRealtimeDB] = useState(null);

  // Initialize Realtime Database
  useEffect(() => {
    const db = getDatabase();
    setRealtimeDB(db);
  }, []);

  // Fetch tickets from Realtime Database
  useEffect(() => {
    if (!realtimeDB) return;

    const ticketsRef = ref(realtimeDB, 'raisedTickets');
    
    const unsubscribe = onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const ticketsList = Object.entries(data).map(([id, ticket]) => ({
        id,
        ...ticket
      }));

      // Separate raised and processed tickets
      const raised = ticketsList.filter(ticket => ticket.status === 'open');
      const processed = ticketsList.filter(ticket => ticket.status === 'closed');
      
      setTickets({ raised, processed });
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
      setIsLoading(false);
    });

    return () => {
      // Clean up the listener when component unmounts
      unsubscribe();
    };
  }, [realtimeDB]);

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
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

  const handleResolveTicket = async (ticketId) => {
    if (!realtimeDB) return;
    
    try {
      const ticketRef = ref(realtimeDB, `raisedTickets/${ticketId}`);
      await update(ticketRef, { status: 'closed', resolvedAt: new Date().toISOString() });
      toast.success('Ticket marked as resolved');
    } catch (error) {
      console.error('Error resolving ticket:', error);
      toast.error('Failed to update ticket status');
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!realtimeDB) return;
    
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    
    try {
      const ticketRef = ref(realtimeDB, `raisedTickets/${ticketId}`);
      await update(ticketRef, { status: 'deleted' });
      toast.success('Ticket deleted');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderTicketCard = (ticket) => (
    <div key={ticket.id} className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium">Ticket from {ticket.userEmail}</h3>
          </div>
          <p className="text-gray-700 mb-2">{ticket.comment || 'No comment provided'}</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>URL: <a href={ticket.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {ticket.url.length > 40 ? `${ticket.url.substring(0, 40)}...` : ticket.url}
            </a></p>
            <p>Department: {ticket.department || 'N/A'}</p>
            <p>Created: {formatDate(ticket.timestamp)}</p>
            {ticket.resolvedAt && <p>Resolved: {formatDate(ticket.resolvedAt)}</p>}
          </div>
        </div>
        {ticket.status === 'open' && (
          <div className="flex gap-2">
            <button
              onClick={() => handleResolveTicket(ticket.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full"
              title="Mark as resolved"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDeleteTicket(ticket.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              title="Delete ticket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage user tickets and reports</p>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('raised')}
            className={`px-4 py-2 font-medium ${activeTab === 'raised' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Raised Tickets ({tickets.raised.length})
          </button>
          <button
            onClick={() => setActiveTab('processed')}
            className={`px-4 py-2 font-medium ${activeTab === 'processed' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Processed Tickets ({tickets.processed.length})
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading tickets...</span>
            </div>
          ) : activeTab === 'raised' ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Raised Tickets</h2>
              {tickets.raised.length > 0 ? (
                <div className="space-y-4">
                  {tickets.raised.map(renderTicketCard)}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No raised tickets found</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Processed Tickets</h2>
              {tickets.processed.length > 0 ? (
                <div className="space-y-4">
                  {tickets.processed.map(renderTicketCard)}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Check className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No processed tickets found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
