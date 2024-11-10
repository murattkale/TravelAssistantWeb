import React from 'react';

interface TripRecommendationsProps {
  recommendations: string;
}

export const TripRecommendations = ({ recommendations }: TripRecommendationsProps) => {
  if (!recommendations) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Travel Recommendations</h2>
      <div className="prose max-w-none">
        {recommendations.split('\n').map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default TripRecommendations;