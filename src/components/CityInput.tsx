import React from 'react';
import { MapPin, MinusCircle } from 'lucide-react';
import { CityPlan } from '../types';

interface CityInputProps {
  city: CityPlan;
  index: number;
  onUpdate: (index: number, field: keyof CityPlan, value: any) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export const CityInput = ({ city, index, onUpdate, onRemove, showRemove }: CityInputProps) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="City name"
            value={city.city}
            onChange={(e) => onUpdate(index, 'city', e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Days to stay"
            value={city.daysToStay}
            onChange={(e) => onUpdate(index, 'daysToStay', Number(e.target.value))}
            min={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Daily budget"
            value={city.dailyBudget}
            onChange={(e) => onUpdate(index, 'dailyBudget', Number(e.target.value))}
            min={0}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {showRemove && (
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-red-600 hover:text-red-700"
              aria-label="Remove city"
            >
              <MinusCircle size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityInput;