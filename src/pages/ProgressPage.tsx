
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, TrendingUp, Images, Weight } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import WeightInput from "@/components/WeightInput";
import ProgressChart from "@/components/ProgressChart";
import CalorieHistory from "@/components/progress/CalorieHistory";
import WeeklyTrends from "@/components/progress/WeeklyTrends";
import PhotoUpload from "@/components/progress/PhotoUpload";
import AIInsights from "@/components/progress/AIInsights";
import NutritionAssistant from "@/components/NutritionAssistant";

// Mock data - would come from a real API in production
const mockWeightData = [
  { date: "2025-03-01", weight: 82.5 },
  { date: "2025-03-05", weight: 81.8 },
  { date: "2025-03-10", weight: 81.2 },
  { date: "2025-03-15", weight: 80.5 },
  { date: "2025-03-20", weight: 79.8 },
  { date: "2025-04-01", weight: 79.2 },
  { date: "2025-04-05", weight: 78.6 },
];

const ProgressPage = () => {
  const [weightData, setWeightData] = useState(mockWeightData);
  const [weightGoal, setWeightGoal] = useState(75);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  
  useEffect(() => {
    // Check premium status
    const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
    setIsPremiumUser(premiumStatus);
  }, []);
  
  const handleWeightSave = (weight: number) => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry = { date: today, weight };
    
    // Update weight data
    const updatedData = [...weightData, newEntry].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    setWeightData(updatedData);
    toast.success("Weight updated successfully!");
  };
  
  const handleUpgrade = () => {
    // For demo purposes, set premium status
    localStorage.setItem('isPremiumUser', 'true');
    setIsPremiumUser(true);
    toast.success("You're now a premium user!");
  };

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Progress Dashboard</h1>
        <p className="text-gray-500">Track your health journey metrics</p>
      </header>
      
      <Tabs defaultValue="weight" className="mb-4">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="weight">Weight & Calories</TabsTrigger>
          <TabsTrigger value="insights">
            Insights {!isPremiumUser && <span className="ml-1 text-xs">🔒</span>}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Weight className="w-5 h-5 mr-2" />
                  Weight Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WeightInput 
                  onSave={handleWeightSave} 
                  currentWeight={weightData[weightData.length - 1]?.weight} 
                />
                <div className="mt-4">
                  <ProgressChart data={weightData} weightGoal={weightGoal} />
                </div>
              </CardContent>
            </Card>
            
            <CalorieHistory isPremium={isPremiumUser} />
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          {isPremiumUser ? (
            <div className="space-y-4">
              <WeeklyTrends weightData={weightData} />
              <PhotoUpload />
              <AIInsights />
            </div>
          ) : (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
              <CardHeader>
                <CardTitle>Premium Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-5 h-5 mr-2 text-leanfuel-primary" />
                    <span>Weekly trends analysis</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Images className="w-5 h-5 mr-2 text-leanfuel-primary" />
                    <span>Progress photo tracking</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="w-5 h-5 mr-2 text-leanfuel-primary" />
                    <span>AI-powered insights and recommendations</span>
                  </div>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md"
                >
                  Upgrade to Premium
                </button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <BottomNavigation />
      <NutritionAssistant isPremium={isPremiumUser} />
    </div>
  );
};

export default ProgressPage;
