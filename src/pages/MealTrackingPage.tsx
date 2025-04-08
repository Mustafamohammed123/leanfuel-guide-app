
import React, { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import MealTracker from "@/components/meals/MealTracker";
import WeeklyMacroReport from "@/components/meals/WeeklyMacroReport";
import NutritionAssistant from "@/components/NutritionAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const MealTrackingPage: React.FC = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  
  useEffect(() => {
    // Check premium status
    const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
    setIsPremiumUser(premiumStatus);
  }, []);
  
  const handleUpgrade = () => {
    // For demo purposes, set premium status
    localStorage.setItem('isPremiumUser', 'true');
    setIsPremiumUser(true);
    toast.success("You're now a premium user!");
  };
  
  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Meal Tracking</h1>
        <p className="text-gray-500">Log your meals and track your nutrition</p>
      </header>
      
      <Tabs defaultValue="daily" className="mb-4">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="daily">Daily Log</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <MealTracker isPremium={isPremiumUser} />
        </TabsContent>
        
        <TabsContent value="weekly">
          <WeeklyMacroReport isPremium={isPremiumUser} />
          
          {!isPremiumUser && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
              <h3 className="font-bold text-center mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-center mb-3">
                Get access to weekly macro reports, barcode scanning, and one-tap meal logging
              </p>
              <button
                onClick={handleUpgrade}
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <BottomNavigation />
      <NutritionAssistant isPremium={isPremiumUser} />
    </div>
  );
};

export default MealTrackingPage;
