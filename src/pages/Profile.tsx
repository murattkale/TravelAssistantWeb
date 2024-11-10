import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Settings, Save } from 'lucide-react';

const activityOptions = [
  'Museums', 'Parks', 'Shopping', 'Nightlife', 
  'Historical Sites', 'Food Tours', 'Adventure Sports', 
  'Local Markets', 'Art Galleries', 'Beach Activities'
];

const foodOptions = [
  'Local Cuisine', 'Vegetarian', 'Vegan', 'Street Food', 
  'Fine Dining', 'Seafood', 'International', 'Halal', 
  'Gluten-Free', 'Organic'
];

const budgetOptions = ['budget', 'medium', 'luxury'];

export const Profile = () => {
  const { user, updateUserPreferences } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState(user?.preferences || {
    activityPreferences: [],
    foodPreferences: [],
    budgetPreference: 'medium'
  });

  const handleActivityToggle = (activity: string) => {
    setPreferences(prev => ({
      ...prev,
      activityPreferences: prev.activityPreferences.includes(activity)
        ? prev.activityPreferences.filter(a => a !== activity)
        : [...prev.activityPreferences, activity]
    }));
  };

  const handleFoodToggle = (food: string) => {
    setPreferences(prev => ({
      ...prev,
      foodPreferences: prev.foodPreferences.includes(food)
        ? prev.foodPreferences.filter(f => f !== food)
        : [...prev.foodPreferences, food]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserPreferences(preferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold">Travel Preferences</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Activity Preferences</h2>
            <div className="flex flex-wrap gap-3">
              {activityOptions.map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleActivityToggle(activity)}
                  className={`px-4 py-2 rounded-full border ${
                    preferences.activityPreferences.includes(activity)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 hover:border-indigo-600'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Food Preferences</h2>
            <div className="flex flex-wrap gap-3">
              {foodOptions.map((food) => (
                <button
                  key={food}
                  onClick={() => handleFoodToggle(food)}
                  className={`px-4 py-2 rounded-full border ${
                    preferences.foodPreferences.includes(food)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 hover:border-indigo-600'
                  }`}
                >
                  {food}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Budget Preference</h2>
            <div className="flex gap-4">
              {budgetOptions.map((budget) => (
                <button
                  key={budget}
                  onClick={() => setPreferences(prev => ({ ...prev, budgetPreference: budget }))}
                  className={`px-6 py-2 rounded-lg border capitalize ${
                    preferences.budgetPreference === budget
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 hover:border-indigo-600'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;