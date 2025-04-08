
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";

const MealPlanBanner = () => {
  return (
    <div className="mb-4">
      <Link 
        to="/meal-plans" 
        className="flex items-center justify-between leanfuel-card bg-green-50 hover:bg-green-100 transition-colors"
      >
        <div className="flex items-center">
          <div className="bg-leanfuel-primary bg-opacity-10 rounded-full p-2 mr-3">
            <BookOpen size={24} className="text-leanfuel-primary" />
          </div>
          <div>
            <h3 className="font-medium">Weekly Meal Plans</h3>
            <p className="text-sm text-gray-600">7-day planned meals for your goals</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-leanfuel-primary" />
      </Link>
    </div>
  );
};

export default MealPlanBanner;
