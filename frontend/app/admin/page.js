"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStudentDirectoryStore } from "@/store/userStore.js";

const Dashboard = () => {
  const { students, loading, error, fetchStudents } =
    useStudentDirectoryStore();
  const [data, setData] = useState({ pie_chart: "", bar_chart: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Fetch chart data
  useEffect(() => {
    setLoadingCharts(true);
    fetch("http://127.0.0.1:5000/api/charts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoadingCharts(false);
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
        setFetchError("Failed to load charts. Please try again later.");
        setLoadingCharts(false);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.semester.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="relative inset-y-0 left-0 w-64 bg-blue-900 text-white z-50 md:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="p-6 flex flex-col items-center border-b border-blue-800">
          <h3 className="text-lg font-semibold">Admin</h3>
        </div>
        <nav className="p-4 space-y-2">
          <ul>
            <Link href={"/admin"}>
              <li className="px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                Dashboard
              </li>
            </Link>
            <Link href="/admin/students">
              <li className="px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                Students
              </li>
            </Link>
            <Link href={"/admin/reports"}>
              <li className="px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              Complaints 
              </li>
            </Link>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={` flex-1 flex flex-col  ${
          sidebarOpen ? "md:ml-0" : "md:ml-0"
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Smart Hostel Dashboard
          </h1>
          <button
            onClick={toggleSidebar}
            className="md:hidden flex flex-col space-y-1 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </header>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Search Bar */}
          <section>
            <input
              type="text"
              placeholder="Search by name, semester, or roll number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </section>

          {/* Quick Stats */}
          <section className="flex justify-between gap-6 flex-wrap">
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
              {loading ? (
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
              ) : (
                <h3 className="text-2xl font-bold text-gray-800">
                  {filteredStudents.length}
                </h3>
              )}
              <p className="text-gray-600 mt-2">Total Students</p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
              <h3 className="text-2xl font-bold text-gray-800">85%</h3>
              <p className="text-gray-600 mt-2">Occupancy Rate</p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
              <h3 className="text-2xl font-bold text-gray-800">5</h3>
              <p className="text-gray-600 mt-2">Pending Leaves</p>
            </div>
          </section>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              Error loading students: {error}
            </div>
          )}
          {fetchError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {fetchError}
            </div>
          )}

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Distribution by Status
              </h2>
              {loadingCharts ? (
                <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
              ) : data.pie_chart ? (
                <img
                  src={`data:image/png;base64,${data.pie_chart}`}
                  alt="Pie Chart"
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <p className="text-gray-600">No data available</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Issues by Hostel and Status
              </h2>
              {loadingCharts ? (
                <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
              ) : data.bar_chart ? (
                <img
                  src={`data:image/png;base64,${data.bar_chart}`}
                  alt="Bar Chart"
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <p className="text-gray-600">No data available</p>
              )}
            </div>
          </section>

          {/* Table */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Student Activity Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead className="bg-gray-50 text-gray-700 font-semibold">
                  <tr>
                    {[
                      "Date",
                      "Total Students",
                      "Meals Taken",
                      "On Leave",
                      "Remaining",
                    ].map((heading, index) => (
                      <th key={index} className="px-4 py-3 text-left">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: "2025-04-10",
                      total: 200,
                      meals: 160,
                      leave: 20,
                      remain: 20,
                    },
                    {
                      date: "2025-04-09",
                      total: 200,
                      meals: 170,
                      leave: 10,
                      remain: 20,
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 border-b last:border-none"
                    >
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3">{row.total}</td>
                      <td className="px-4 py-3">{row.meals}</td>
                      <td className="px-4 py-3">{row.leave}</td>
                      <td className="px-4 py-3">{row.remain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-600 text-sm pt-6 border-t">
            © 2025 Smart Hostel Management System
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
