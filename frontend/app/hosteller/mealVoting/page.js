'use client';

import { useEffect } from 'react';
import useMealStore from '@/store/mealStore.js'; // adjust path if needed

export default function MealConfirmation() {
  const {
    selectedMeal,
    setSelectedMeal,
    statusMessage,
    messageType,
    isVotingOpen,
    currentDate,
    fetchVotingStatus,
    submitMealChoice
  } = useMealStore();

  useEffect(() => {
    fetchVotingStatus();
  }, []);

  const handleSubmit = () => {
    submitMealChoice();
  };

  const getMessageClasses = () => {
    switch (messageType) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const options = [
    { value: 'both', icon: '🍽', title: 'Both Meals', description: 'Lunch & Dinner' },
    { value: 'lunch', icon: '🍲', title: 'Lunch Only', description: 'Midday meal' },
    { value: 'dinner', icon: '🍛', title: 'Dinner Only', description: 'Evening meal' },
    { value: 'none', icon: '🚫', title: 'No Meals', description: 'Not eating' }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Meal Confirmation</h1>
        <div className="text-gray-500 mb-5">{currentDate}</div>

        <div className="grid grid-cols-2 gap-4 my-5">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => isVotingOpen && setSelectedMeal(option.value)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedMeal === option.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-blue-400 hover:-translate-y-0.5'
              } ${!isVotingOpen ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-semibold">{option.title}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedMeal || !isVotingOpen}
          className={`w-full py-3 rounded-md text-white font-medium ${
            !selectedMeal || !isVotingOpen
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Submit Choice
        </button>

        {statusMessage && (
          <div className={`mt-4 p-3 rounded-md ${getMessageClasses()}`}>
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
