// 📂 frontend/store/userStore.js

import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:1000/api/users"; // user registration
const STUDENT_API = "http://localhost:1000/api/users/students"; // student list + status
axios.defaults.withCredentials = true;

export const useStudentStore = create((set) => ({
  student: null,
  isLoading: false,
  isProcessing: false,
  message: null,
  error: null,

  registerStudent: async (data) => {
    set({ isProcessing: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      set({
        student: response.data.user,
        message: response.data.message,
        isProcessing: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Registration failed",
        isProcessing: false,
      });
      throw error;
    }
  },
}));

export const useStudentDirectoryStore = create((set) => ({
  students: [],
  loading: false,
  error: null,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${STUDENT_API}`);
      set({ students: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch students",
        loading: false,
      });
    }
  },

  updateStatus: async (_id, status) => {
    try {
      const res = await axios.patch(`${STUDENT_API}/${_id}/status`, { status });

      // ✅ Update only the status of the specific student in the local state
      set((state) => ({
        students: state.students.map((s) =>
          s._id === id ? { ...s, status: res.data.status } : s
        ),
      }));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  },
}));
