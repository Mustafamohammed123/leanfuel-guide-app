
import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import NutritionAssistant from "@/components/NutritionAssistant";
import { Settings, LogOut, CreditCard, Award, ChevronRight, Shield } from "lucide-react";
import { toast } from "sonner";
import { useSubscription } from "@/contexts/SubscriptionContext";

const ProfilePage = () => {
  const [user] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    startWeight: 85,
    currentWeight: 78.6,
    goalWeight: 75,
  });

  const { isPremium, setIsModalOpen } = useSubscription();

  const weightLost = user.startWeight - user.currentWeight;
  const percentProgress = Math.round(
    (weightLost / (user.startWeight - user.goalWeight)) * 100
  );

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Profile</h1>
        <p className="text-gray-500">Your account & progress</p>
      </header>

      <div className="leanfuel-card mb-4">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-leanfuel-secondary flex items-center justify-center text-leanfuel-primary font-bold text-xl">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Weight loss progress</span>
            <span className="text-sm font-medium">{percentProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-leanfuel-primary h-2.5 rounded-full"
              style={{ width: `${percentProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Start: {user.startWeight} kg</span>
            <span>Current: {user.currentWeight} kg</span>
            <span>Goal: {user.goalWeight} kg</span>
          </div>
        </div>
      </div>

      {!isPremium && (
        <div className="leanfuel-card mb-4 bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary">
          <div className="flex items-center">
            <div className="mr-3">
              <Award size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">Upgrade to Premium</h3>
              <p className="text-white text-opacity-90 text-sm">
                Unlock all features and personalized plans
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-leanfuel-accent px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      <div className="leanfuel-card p-0 mb-4">
        <Link to="/settings" className="w-full flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Settings size={20} className="text-gray-500 mr-3" />
            <span>Settings</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </Link>
        
        <button className="w-full flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <CreditCard size={20} className="text-gray-500 mr-3" />
            <span>Payment Methods</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        
        <Link to="/admin" className="w-full flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Shield size={20} className="text-gray-500 mr-3" />
            <span>Admin Dashboard</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </Link>
        
        <button 
          className="w-full flex items-center justify-between p-4 text-red-500"
          onClick={() => toast.error("Logout functionality coming soon!")}
        >
          <div className="flex items-center">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      <div className="text-center text-xs text-gray-400 mt-4">
        <p>LeanFuel v1.0</p>
        <p className="mt-1">© 2025 LeanFuel. All rights reserved.</p>
      </div>

      <BottomNavigation />
      <NutritionAssistant isPremium={isPremium} />
    </div>
  );
};

export default ProfilePage;
