import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Compass } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Plan Your Perfect Journey
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover personalized travel experiences tailored just for you
        </p>
        <Link
          to="/plan-trip"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start Planning
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<MapPin className="h-8 w-8 text-indigo-600" />}
          title="Smart Destinations"
          description="Get AI-powered recommendations for destinations based on your preferences"
        />
        <FeatureCard
          icon={<Calendar className="h-8 w-8 text-indigo-600" />}
          title="Itinerary Planning"
          description="Create detailed day-by-day itineraries with activities and restaurants"
        />
        <FeatureCard
          icon={<Compass className="h-8 w-8 text-indigo-600" />}
          title="Local Insights"
          description="Access curated recommendations from local experts and travelers"
        />
      </div>

      <div className="relative h-96 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Travel Adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for an Adventure?</h2>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;