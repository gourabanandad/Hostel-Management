"use client";

import { useState,useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useStudentStore } from "@/store/userStore.js";
import { useRouter } from "next/navigation";
import { SignUpButton, SignIn, SignUp,SignedOut } from "@clerk/nextjs";
import { isAdminEmail } from "@/utils/isAdmin"

export default function CompleteRegistration() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const registerStudent = useStudentStore((state) => state.registerStudent);
  const isProcessing = useStudentStore((state) => state.isProcessing);
  const error = useStudentStore((state) => state.error);
  const message = useStudentStore((state) => state.message);

  const [form, setForm] = useState({
    fullName: "",
    semester: "",
    rollNo: "",
    roomNo: "",
    phone: "",

  });

  // 🔐 Redirect admin users
  useEffect(() => {
    if (isLoaded && user) {
      const email = user?.primaryEmailAddress?.emailAddress;

      if (isAdminEmail(email)) {
        router.push("/admin"); // 👑 send admin directly to admin page
      }
    }
  }, [isLoaded, user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStudent({
        ...form,
        email: user.primaryEmailAddress?.emailAddress,
        clerkId: user.id
      });
      router.push("/");
    } catch (err) {
      console.error("Error registering student:", err);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="text-black h-screen w-screen top-0 flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100 fixed">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Complete Your Registration
        </h2>
        <SignedOut>
          <SignUpButton>
            <button
              type="button"
              className="w-full font-semibold inline-flex items-center justify-center px-4 py-2 text-white rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-teal-500 hover:to-green-500 transition-all duration-300 ease-in-out shadow-sm"
            >
              Sign Up with Clerk
            </button>
          </SignUpButton>
        </SignedOut>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["fullName", "semester", "rollNo", "roomNo", "phone"].map(
            (field) => (
              <input
                key={field}
                name={field}
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isProcessing ? "Submitting..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
