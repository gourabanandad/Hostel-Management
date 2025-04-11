// pages/index.js

"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [activeTab, setActiveTab] = useState("student");
  const [notices, setNotices] = useState([]);
  const [activeFeature, setActiveFeature] = useState("dashboard");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [quickStats, setQuickStats] = useState({});
  const scrollRef = useRef(null);
  const isPaused = useRef(false);
  const isResetting = useRef(false);

  // Helper: Mock Notices Data
  const getMockNotices = () => [
    {
      id: 1,
      title: "Mess Menu Update",
      message:
        "Starting from tomorrow, we'll be introducing new healthy meal options in the evening menu. Check the app for details.",
      date: "2023-06-18T10:00:00Z",
      imageUrl: "",
      priority: "high",
    },
    {
      id: 2,
      title: "Water Supply Interruption",
      message:
        "There will be no water supply on June 17th from 8 AM to 4 PM due to maintenance work. Please store water accordingly.",
      date: "2023-06-15T09:30:00Z",
      pdfUrl: "",
      priority: "urgent",
    },
    {
      id: 3,
      title: "Meal Confirmation Reminder",
      message:
        "Remember to confirm your meals by 9 PM daily. Late confirmations will not be accepted to help reduce food waste.",
      date: "2023-06-12T14:15:00Z",
      priority: "normal",
    },
    {
      id: 4,
      title: "Hostel Cleaning Day",
      message:
        "Monthly deep cleaning scheduled for this Saturday. Please remove all personal items from common areas by Friday night.",
      date: "2023-06-10T11:20:00Z",
      priority: "normal",
    },
    {
      id: 5,
      title: "Internet Maintenance",
      message:
        "Internet services will be unavailable from 2 AM to 5 AM this Sunday for scheduled maintenance.",
      date: "2023-06-08T16:45:00Z",
      priority: "normal",
    },
  ];

  // Mock upcoming events
  const getMockEvents = () => [
    {
      id: 1,
      title: "Cultural Fest",
      date: "2023-07-15",
      time: "4:00 PM",
      location: "Hostel Ground",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2023-07-20",
      time: "10:00 AM",
      location: "Admin Block",
    },
    {
      id: 3,
      title: "Sports Day",
      date: "2023-07-25",
      time: "8:00 AM",
      location: "College Stadium",
    },
  ];

  // Mock quick stats
  const getMockStats = () => ({
    totalStudents: 256,
    occupiedRooms: 128,
    upcomingEvents: 3,
    pendingRequests: 12,
  });

  // Fetch or mock data
  useEffect(() => {
    setNotices(getMockNotices().reverse());
    setUpcomingEvents(getMockEvents());
    setQuickStats(getMockStats());
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    const scrollSpeed = 0.5;

    const scrollLoop = () => {
      if (!container || isPaused.current || isResetting.current) {
        requestAnimationFrame(scrollLoop);
        return;
      }

      container.scrollTop += scrollSpeed;

      const isAtBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 1;

      if (isAtBottom) {
        isResetting.current = true;
        setTimeout(() => {
          container.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            isResetting.current = false;
          }, 1000);
        }, 500);
      }

      requestAnimationFrame(scrollLoop);
    };

    const animationId = requestAnimationFrame(scrollLoop);

    const pauseScroll = () => (isPaused.current = true);
    const resumeScroll = () => (isPaused.current = false);

    container?.addEventListener("mouseenter", pauseScroll);
    container?.addEventListener("mouseleave", resumeScroll);

    return () => {
      cancelAnimationFrame(animationId);
      container?.removeEventListener("mouseenter", pauseScroll);
      container?.removeEventListener("mouseleave", resumeScroll);
    };
  }, [notices]);

  // Helper: Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "border-red-500";
      case "high":
        return "border-orange-500";
      default:
        return "border-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>HostelHub | Smart Hostel Management</title>
        <meta
          name="description"
          content="Modern hostel management system for students and administrators"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Smart Hostel Management System
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Streamline your hostel operations with our digital platform for
                meal management, notices, and student tracking.
              </p>
              
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-0 right-20 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6">
                  <img
                    src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                    alt="Hostel Management Illustration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {quickStats.totalStudents}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Occupied Rooms
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {quickStats.occupiedRooms}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Upcoming Events
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {quickStats.upcomingEvents}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Requests
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {quickStats.pendingRequests}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Notice Board */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <h2 className="text-xl font-semibold">Hostel Notice Board</h2>
                </div>
                <div
                  ref={scrollRef}
                  className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
                  style={{ scrollBehavior: "smooth", cursor: "grab" }}
                >
                  {notices.length === 0 ? (
                    <div className="text-center py-10">
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
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">
                        No notices available
                      </h3>
                      <p className="mt-1 text-gray-500">
                        Check back later for updates.
                      </p>
                    </div>
                  ) : (
                    notices.map((notice) => (
                      <div
                        key={notice.id}
                        className={`bg-white p-5 rounded-lg shadow border-l-4 ${getPriorityColor(
                          notice.priority
                        )} min-h-[110px] flex-shrink-0 hover:shadow-md transition-shadow duration-200`}
                      >
                        <div className="flex items-start">
                          {notice.priority === "urgent" && (
                            <span className="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Urgent
                            </span>
                          )}
                          {notice.priority === "high" && (
                            <span className="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Important
                            </span>
                          )}
                          <div className="flex-1">
                            {notice.imageUrl || notice.pdfUrl ? (
                              <a
                                href={notice.imageUrl || notice.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-blue-700 hover:underline flex items-center"
                              >
                                {notice.title}
                                <svg
                                  className="ml-1 w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            ) : (
                              <h3 className="text-lg font-semibold text-gray-800">
                                {notice.title}
                              </h3>
                            )}
                            {notice.message && (
                              <p className="text-gray-700 mt-2">
                                {notice.message}
                              </p>
                            )}
                            <div className="flex items-center mt-3 text-sm text-gray-500">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {new Date(notice.date).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Meal Menu Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h2 className="text-xl font-semibold">Today's Meal Menu</h2>
                  </div>
                  <button className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md">
                    View Full Menu
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Breakfast
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Poha with Peanuts</li>
                        <li>• Bread Toast with Butter</li>
                        <li>• Tea/Coffee</li>
                        <li>• Fruits</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <svg
                          className="w-5 h-5 text-orange-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Lunch
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Jeera Rice</li>
                        <li>• Dal Tadka</li>
                        <li>• Mix Veg</li>
                        <li>• Chapati</li>
                        <li>• Salad</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Dinner
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Roti</li>
                        <li>• Chana Masala</li>
                        <li>• Aloo Jeera</li>
                        <li>• Rice</li>
                        <li>• Curd</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Reminder:</span> Meal
                        confirmations must be done by 9 PM daily.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                </div>
                <div className="p-4">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No upcoming events scheduled.
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {upcomingEvents.map((event) => (
                        <li key={event.id} className="py-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                              <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">
                                {event.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {event.date} • {event.time}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                <svg
                                  className="inline-block w-4 h-4 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md text-sm font-medium">
                    View All Events
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                  <h2 className="text-xl font-semibold">Quick Links</h2>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  <a
                    href="/rules"
                    className="group p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                  >
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 mb-2">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Rules
                    </span>
                  </a>
                  <a
                    href="/hosteller/mealVoting"
                    className="group p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                  >
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 mb-2">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Meal Voting
                    </span>
                  </a>
                  <a
                    href="/hosteller/complains"
                    className="group p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                  >
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 mb-2">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Complaints
                    </span>
                  </a>
                  <a
                    href="/contact"
                    className="group p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                  >
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 mb-2">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 00-8 8c0 1.47.397 2.842 1.093 4.014a14.951 14.951 0 01-1.007 3.598 1 1 0 001.21.992c1.47-.29 2.84-.737 4.014-1.318A7.963 7.963 0 0010 18a8 8 0 008-8 8 8 0 00-8-8zm-1 11H7a1 1 0 110-2h2a1 1 0 110 2zm4 0h-2a1 1 0 110-2h2a1 1 0 110 2zm-4-4H7a1 1 0 110-2h2a1 1 0 110 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Contact Us
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}