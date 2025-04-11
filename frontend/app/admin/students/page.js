"use client";

import { useEffect, useState } from "react";
import { useStudentDirectoryStore } from "@/store/userStore.js";
import Link from "next/link";
import { User, Mail, Phone, Home, GraduationCap } from "lucide-react";

export default function StudentDirectory() {
  const { students, loading, error, fetchStudents } = useStudentDirectoryStore();
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.semester.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/admin">
            <div className="px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition">
              Dashboard
            </div>
          </Link>
          <Link href="/admin/students">
            <div className="px-4 py-2 bg-blue-800 rounded cursor-pointer font-semibold">
              Students
            </div>
          </Link>
          
          <Link href={"/admin/reports"}>
          
          <div className="px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition">
            Reports
          </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Student Directory</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, semester, or roll no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 mb-6 px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Loading */}
        {loading && (
          <p className="text-sky-600 animate-pulse text-center flex justify-center gap-2">
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading Students...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {/* Students */}
        {!loading && filteredStudents.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student._id}
                className="bg-white border border-sky-100 p-6 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {student.fullName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-blue-800">{student.fullName}</h2>
                    <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-sky-500" />
                    Semester: <span className="font-medium">{student.semester}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-sky-500" />
                    Room: <span className="font-medium">{student.roomNo}</span>
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-sky-500" />
                    <a href={`mailto:${student.email}`} className="hover:underline">
                      {student.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-500" />
                    <span>{student.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-500" />
                    Status:{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded ${
                        student.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-blue-600 font-medium">No Students Found</p>
          </div>
        )}
      </main>
    </div>
  );
}
