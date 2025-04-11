import { create } from "zustand";
import axios from "axios";

const IMAGE_API = "http://localhost:1000/api/images";
axios.defaults.withCredentials = true;

export const useImageStore = create((set) => ({
  images: [],
  selectedImage: null,
  isLoading: false,
  isProcessing: false,
  message: null,
  error: null,

  // Fetch all images
  fetchImages: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(IMAGE_API);
      set({ images: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch images",
        isLoading: false,
      });
    }
  },

  

  // Create a new image
  createImage: async (data) => {
    set({ isProcessing: true, error: null });
    try {
      const response = await axios.post(IMAGE_API, data);
      set((state) => ({
        images: [response.data, ...state.images],
        message: "Image created successfully",
        isProcessing: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to create image",
        isProcessing: false,
      });
    }
  },


  // Reset messages and error
  clearNotifications: () =>
    set({
      error: null,
      message: null,
    }),
}));
