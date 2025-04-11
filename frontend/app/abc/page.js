"use client";

import { useEffect, useState } from "react";
import { useStudentDirectoryStore } from "@/store/userStore.js";

export default function StudentDirectory() {
  const { students, loading, error, fetchStudents } = useStudentDirectoryStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);
  

  // 🔍 Filter students based on name, semester or roll number
  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(search.toLowerCase()) ||
    student.semester.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Directory</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name, semester, or roll no"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md w-full md:w-1/2 focus:outline-none focus:ring focus:border-blue-300"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md p-4 rounded-xl border"
            >
              <h2 className="font-semibold text-lg">{student.fullName}</h2>
              <p>Semester: {student.semester}</p>
              <p>Roll No: {student.rollNo}</p>
              <p>Room No: {student.roomNo}</p>
              <p>Email: {student.email}</p>
              <p>Phone: {student.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No students found.</p>
      )}
    </div>
  );
}
