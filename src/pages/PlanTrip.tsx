import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { CityPlan } from '../types';
import { getTravelRecommendations } from '../utils/gemini';
import { useAuthStore } from '../store/authStore';
import { CityInput } from '../components/CityInput';
import { TripRecommendations } from '../components/TripRecommendations';

export const PlanTrip = () => {
  const { user } = useAuthStore();
  const [cities, setCities] = useState<CityPlan[]>([
    { city: '', daysToStay: 1, dailyBudget: 100, activities: [] }
  ]);
  const [totalBudget, setTotalBudget] = useState<number>(1000);
  const [startDate, setStartDate] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const addCity = () => {
    setCities([...cities, { city: '', daysToStay: 1, dailyBudget: 100, activities: [] }]);
  };

  const removeCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  const updateCity = (index: number, field: keyof CityPlan, value: any) => {
    const newCities = [...cities];
    newCities[index] = { ...newCities[index], [field]: value };
    setCities(newCities);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const recommendations = await Promise.all(
        cities.map(async (city) => {
          if (!city.city) return '';
          const cityRecommendations = await getTravelRecommendations(
            city.city,
            user?.preferences?.activityPreferences || []
          );
          return `${city.city}:\n${cityRecommendations}\n\n`;
        })
      );
      setRecommendations(recommendations.join('\n'));
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Plan Your Trip</h1>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Budget ($)
              </label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {cities.map((city, index) => (
              <CityInput
                key={index}
                city={city}
                index={index}
                onUpdate={updateCity}
                onRemove={removeCity}
                showRemove={cities.length > 1}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={addCity}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
              <PlusCircle size={20} />
              <span>Add City</span>
            </button>
            <button
              onClick={handleGetRecommendations}
              disabled={loading || cities.some(city => !city.city)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </button>
          </div>
        </div>
      </div>

      <TripRecommendations recommendations={recommendations} />
    </div>
  );
};

export default PlanTrip;