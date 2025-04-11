import { create } from 'zustand';
import axios from 'axios';

const useMealStore = create((set) => ({
  selectedMeal: null,
  statusMessage: '',
  messageType: '',
  isVotingOpen: true,
  currentDate: '',

  setSelectedMeal: (meal) => set({ selectedMeal: meal }),

  fetchVotingStatus: () => {
    const now = new Date();
    const currentHour = now.getHours();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let isOpen = currentHour >= 17 && currentHour < 21;
    let message = '';
    let type = '';

    if (!isOpen) {
      type = 'info';
      message = currentHour < 17 ? '⏳ Voting opens at 5 PM.' : '🔒 Voting is closed for today.';
    }

    set({
      currentDate: dateString,
      isVotingOpen: isOpen,
      messageType: type,
      statusMessage: message
    });
  },

  submitMealChoice: async () => {
    const { selectedMeal } = useMealStore.getState();

    if (!selectedMeal) return;

    set({ statusMessage: 'Submitting...', messageType: '' });

    try {
      const res = await axios.post('http://localhost:3000/api/meals', {
        name: "Today's Meal",
        mealType: selectedMeal,
        takeMeal: selectedMeal !== 'none'
      });

      if (res.status === 201) {
        set({
          statusMessage: '✅ Your meal choice has been recorded!',
          messageType: 'success',
          isVotingOpen: false
        });
      } else {
        set({
          statusMessage: '❌ Failed to save. Please try again.',
          messageType: 'error'
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      set({
        statusMessage: '❌ Network error. Please try again later.',
        messageType: 'error'
      });
    }
  }
}));

export default useMealStore;
