"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useComplaintStore from "@/store/complainStore.js"; // update path if needed

export default function RaiseComplaint() {
  const router = useRouter();
  const { createComplaint, loading, error } = useComplaintStore();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    room: "",
    complaintType: "",
    complaint_desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createComplaint(form);

    if (!error) {
      alert("✅ Complaint submitted successfully!");
      router.push("/"); // Redirect to the complaints page
    } else {
      alert("❌ Failed to submit complaint: " + error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-2xl rounded-2xl mt-10 border border-blue-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📢 Raise a Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="roll"
          value={form.roll}
          onChange={handleChange}
          placeholder="University Roll Number"
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="room"
          value={form.room}
          onChange={handleChange}
          placeholder="Hostel Room Number"
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="complaintType"
          value={form.complaintType}
          onChange={handleChange}
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled hidden>
            Choose category
          </option>
          <option value="Mess">Mess</option>
          <option value="Room">Room</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          name="complaint_desc"
          value={form.complaint_desc}
          onChange={handleChange}
          placeholder="Describe your issue"
          required
          className="w-full p-3 border border-blue-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
}
