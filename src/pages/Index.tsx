
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalorieCounter from "@/components/CalorieCounter";
import ProgressChart from "@/components/ProgressChart";
import MealItem from "@/components/MealItem";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import WeightInput from "@/components/WeightInput";
import BottomNavigation from "@/components/BottomNavigation";
import MealTracker from "@/components/meals/MealTracker";
import NutritionAssistant from "@/components/NutritionAssistant";
import { toast } from "sonner";
import { useOnboarding } from "@/contexts/OnboardingContext";

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

const mockMealSuggestions = [
  {
    id: "1",
    title: "Greek Yogurt with Berries",
    calories: 320,
    prepTime: 5,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
  {
    id: "2",
    title: "Avocado Toast with Egg",
    calories: 450,
    prepTime: 10,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: false,
  },
  {
    id: "3",
    title: "Grilled Chicken Salad",
    calories: 380,
    prepTime: 15,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPremium: true,
  },
];

const HomePage = () => {
  const { data: onboardingData } = useOnboarding();
  const navigate = useNavigate();
  const [weightGoal, setWeightGoal] = useState(75);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [caloriesConsumed, setCaloriesConsumed] = useState(1250);
  const [weightData, setWeightData] = useState(mockWeightData);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  
  // Check if onboarding is completed
  useEffect(() => {
    if (!onboardingData.completed) {
      // Redirect to onboarding if not completed
      navigate("/onboarding");
    } else {
      // Use onboarding data to personalize the experience
      if (onboardingData.weightGoal) {
        setWeightGoal(onboardingData.weightGoal);
      }
      
      if (onboardingData.calorieGoal) {
        setCalorieGoal(onboardingData.calorieGoal);
      }
      
      // Check premium status
      const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
      setIsPremiumUser(premiumStatus);
    }
  }, [onboardingData, navigate]);
  
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
  
  const handleMealClick = (meal: any) => {
    if (meal.isPremium && !isPremiumUser) {
      toast("This is a premium meal. Upgrade to unlock!", {
        action: {
          label: "Upgrade",
          onClick: handleUpgrade
        }
      });
    } else {
      toast(`Added ${meal.title} to your meal plan`);
    }
  };

  // If onboarding is not completed, don't render the full page
  if (!onboardingData.completed) {
    return null;
  }

  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Welcome, {onboardingData.name || "User"}!</h1>
        <p className="text-gray-500">Your journey to a healthier you</p>
      </header>
      
      {!isPremiumUser && <SubscriptionBanner onUpgrade={handleUpgrade} />}
      
      <div className="my-4">
        <MealTracker isPremium={isPremiumUser} />
      </div>
      
      <CalorieCounter dailyGoal={calorieGoal} consumed={caloriesConsumed} />
      
      <div className="my-4">
        <ProgressChart data={weightData} weightGoal={weightGoal} />
      </div>
      
      <div className="my-4">
        <WeightInput 
          onSave={handleWeightSave} 
          currentWeight={weightData[weightData.length - 1]?.weight} 
        />
      </div>
      
      <div className="mt-6 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Suggested Meals</h2>
          <button 
            onClick={() => window.location.href = "/meals"}
            className="text-sm text-leanfuel-primary"
          >
            See All
          </button>
        </div>
        
        {mockMealSuggestions.map((meal) => (
          <MealItem
            key={meal.id}
            title={meal.title}
            calories={meal.calories}
            prepTime={meal.prepTime}
            image={meal.image}
            isPremium={meal.isPremium}
            onClick={() => handleMealClick(meal)}
          />
        ))}
      </div>
      
      <BottomNavigation />
      <NutritionAssistant isPremium={isPremiumUser} />
    </div>
  );
};

export default HomePage;
