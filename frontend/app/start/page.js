// pages/index.js

"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [activeTab, setActiveTab] = useState('student');
  const [notices, setNotices] = useState([]);
  const scrollRef = useRef(null);
  const isPaused = useRef(false);
  const isResetting = useRef(false);

  // Helper: Mock Notices Data
  const getMockNotices = () => ([
    {
      id: 1,
      title: "Mess Menu Update",
      message: "Starting from tomorrow, we'll be introducing new healthy meal options in the evening menu. Check the app for details.",
      date: "2023-06-18T10:00:00Z",
      imageUrl: ""
    },
    {
      id: 2,
      title: "Water Supply Interruption",
      message: "There will be no water supply on June 17th from 8 AM to 4 PM due to maintenance work. Please store water accordingly.",
      date: "2023-06-15T09:30:00Z",
      pdfUrl: ""
    },
    {
      id: 3,
      title: "Meal Confirmation Reminder",
      message: "Remember to confirm your meals by 9 PM daily. Late confirmations will not be accepted to help reduce food waste.",
      date: "2023-06-12T14:15:00Z"
    },
    {
      id: 4,
      title: "Hostel Cleaning Day",
      message: "Monthly deep cleaning scheduled for this Saturday. Please remove all personal items from common areas by Friday night.",
      date: "2023-06-10T11:20:00Z"
    },
    {
      id: 5,
      title: "Internet Maintenance",
      message: "Internet services will be unavailable from 2 AM to 5 AM this Sunday for scheduled maintenance.",
      date: "2023-06-08T16:45:00Z"
    }
  ]);

  // Fetch or mock notices
  useEffect(() => {
    // Replace this with a real API fetch in production
    setNotices(getMockNotices().reverse());
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
        container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

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

  // Helper: Render login tab button
  const LoginTabButton = ({ label, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-4 text-center font-semibold ${
        activeTab === tab
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Header */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,...')]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Smart Hostel Management System
          </h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
            Streamline your hostel operations with our digital platform for meal management, notices, and student tracking.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Notice Board */}
            <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4 flex items-center gap-3">
                <span>📢</span>
                <h2 className="text-xl font-semibold">Hostel Notice Board</h2>
              </div>
              <div
                ref={scrollRef}
                className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
                style={{ scrollBehavior: "smooth", cursor: "grab" }}
              >
                {notices.length === 0 ? (
                  <p className="text-gray-600 text-center">No notices available.</p>
                ) : (
                  notices.map((notice) => (
                    <div
                      key={notice.id}
                      className="bg-white p-
                      4 rounded-lg shadow border-l-4 border-blue-500 min-h-[110px] flex-shrink-0"
                    >
                      {notice.imageUrl || notice.pdfUrl ? (
                        <a
                          href={notice.imageUrl || notice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-blue-700 hover:underline"
                        >
                          {notice.title}
                        </a>
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-800">
                          {notice.title}
                        </h3>
                      )}
                      {notice.message && (
                        <p className="text-gray-700 mt-1">{notice.message}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        🕒 {new Date(notice.date).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Login Section */}
           
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold mb-4">HostelHub</div>
          <p className="text-sm opacity-80">
            © 2025 Smart Hostel Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
