
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Utensils, CalendarCheck, User, LineChart, BookOpen } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check current path
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
      <div className="flex justify-around items-center p-3 max-w-md mx-auto">
        <button 
          onClick={() => navigate("/")}
          className={`flex flex-col items-center p-2 ${isActive("/") ? "text-leanfuel-primary" : "text-gray-500"}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          onClick={() => navigate("/meals")}
          className={`flex flex-col items-center p-2 ${isActive("/meals") ? "text-leanfuel-primary" : "text-gray-500"}`}
        >
          <Utensils size={24} />
          <span className="text-xs mt-1">Meals</span>
        </button>
        
        <button 
          onClick={() => navigate("/meal-tracking")}
          className={`flex flex-col items-center p-2 ${isActive("/meal-tracking") ? "text-leanfuel-primary" : "text-gray-500"}`}
        >
          <CalendarCheck size={24} />
          <span className="text-xs mt-1">Track</span>
        </button>
        
        <button 
          onClick={() => navigate("/learning")}
          className={`flex flex-col items-center p-2 ${
            location.pathname.includes("/learning") ? "text-leanfuel-primary" : "text-gray-500"
          }`}
        >
          <BookOpen size={24} />
          <span className="text-xs mt-1">Learn</span>
        </button>
        
        <button 
          onClick={() => navigate("/progress")}
          className={`flex flex-col items-center p-2 ${isActive("/progress") ? "text-leanfuel-primary" : "text-gray-500"}`}
        >
          <LineChart size={24} />
          <span className="text-xs mt-1">Progress</span>
        </button>
        
        <button 
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center p-2 ${isActive("/profile") ? "text-leanfuel-primary" : "text-gray-500"}`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
