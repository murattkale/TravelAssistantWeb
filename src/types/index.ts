export interface CityPlan {
  city: string;
  daysToStay: number;
  dailyBudget: number;
  activities: string[];
}

export interface User {
  id: string;
  email: string;
  preferences?: {
    activityPreferences: string[];
    foodPreferences: string[];
    budgetPreference: string;
  };
}

export interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: User['preferences']) => Promise<void>;
}