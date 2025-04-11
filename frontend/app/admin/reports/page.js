"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useComplaintStore from "@/store/complainStore.js";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { Search, Filter, AlertCircle } from "lucide-react"; // For icons

export default function ComplaintsPage() {
  const router = useRouter();
  const { complaints, fetchComplaints, updateComplaintStatus, loading, error } =
    useComplaintStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  useEffect(() => {
    const filtered = complaints.filter((c) => {
      const matchesSearch =
        c.complaint_desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.roll.toString().includes(searchTerm);
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, complaints]);

  const statusClasses = {
    Pending: "bg-amber-100 text-amber-800 ring-amber-500/20",
    "In Progress": "bg-blue-100 text-blue-800 ring-blue-500/20",
    Resolved: "bg-green-100 text-green-800 ring-green-500/20",
  };

  const statusOptions = ["All", "Pending", "In Progress", "Resolved"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complaints Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all complaints in real-time
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by description, name, or roll number..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              className="rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Complaints List */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading complaints...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500 flex flex-col items-center">
              <AlertCircle className="h-12 w-12 mb-2" />
              <p>Error: {error}</p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <p className="mt-2">No complaints found</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredComplaints.map((c) => (
                <motion.div
                  key={c._id}
                  className="border-b last:border-b-0 px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Complaint Info */}
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {c.complaintType} - Room {c.room}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {c.complaint_desc}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:items-end gap-2 text-sm">
                      <div className="flex items-center gap-4 text-gray-600">
                        <span>
                          {c.name} ({c.roll})
                        </span>
                        <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${
                          statusClasses[c.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >

                        {c.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}