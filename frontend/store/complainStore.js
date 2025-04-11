import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:1000/api/complaints"; // adjust if needed

const useComplaintStore = create((set) => ({
  complaints: [],
  loading: false,
  error: null,

  // Fetch all complaints
  fetchComplaints: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/getcomplains`);
      set({ complaints: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch", loading: false });
    }
  },

  // Create a new complaint
  createComplaint: async (complaintData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/createcomplain`, complaintData);
      set((state) => ({
        complaints: [res.data, ...state.complaints],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create", loading: false });
    }
  },
}));

export default useComplaintStore;
