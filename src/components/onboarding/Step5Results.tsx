
import React, { useEffect } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Trophy, Utensils, Calendar, AlertCircle } from "lucide-react";
import OnboardingLayout from "./OnboardingLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock meal plans based on dietary preferences
const mealPlans = {
  standard: "Balanced Nutrition Plan",
  "low-carb": "Low Carb Success Plan",
  keto: "Ketogenic Fat Burner",
  vegetarian: "Plant-Powered Slim Down",
  vegan: "Vegan Weight Loss Plan", 
  fasting: "Intermittent Fasting Schedule"
};

const Step5Results = () => {
  const { data, calculateCalorieGoal, updateData, setCurrentStep } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate calorie goal when component mounts
    const calorieGoal = calculateCalorieGoal();
    updateData({ calorieGoal });
  }, []);

  const handleBack = () => {
    setCurrentStep(4);
  };

  const handleFinish = () => {
    // Mark onboarding as completed
    updateData({ completed: true });
    
    // Show success toast
    toast.success("Your personalized plan is ready!");
    
    // Navigate to home page
    navigate("/");
  };

  // Get recommended meal plan based on dietary preference
  const recommendedPlan = data.dietaryPreference 
    ? mealPlans[data.dietaryPreference] 
    : "Standard Weight Loss Plan";

  return (
    <OnboardingLayout 
      onNext={handleFinish} 
      onBack={handleBack}
      canProceed={true}
      nextButtonText="Start My Journey"
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Your Personalized Plan</h1>
        <p className="text-gray-600">
          Based on your information, we've created a customized plan to help you reach your goals.
        </p>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-leanfuel-primary bg-opacity-10 rounded-full p-2">
                <Trophy className="h-5 w-5 text-leanfuel-primary" />
              </div>
              <div>
                <h3 className="font-medium text-leanfuel-dark">Your Daily Calorie Goal</h3>
                <p className="text-2xl font-bold text-leanfuel-primary">
                  {data.calorieGoal || "Calculating..."} calories
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Customized based on your age, gender, weight and goals
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-leanfuel-primary bg-opacity-10 rounded-full p-2">
                <Utensils className="h-5 w-5 text-leanfuel-primary" />
              </div>
              <div>
                <h3 className="font-medium text-leanfuel-dark">Recommended Meal Plan</h3>
                <p className="text-lg font-medium text-leanfuel-dark">
                  {recommendedPlan}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tailored to your {data.dietaryPreference} dietary preference
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-leanfuel-primary bg-opacity-10 rounded-full p-2">
                <Calendar className="h-5 w-5 text-leanfuel-primary" />
              </div>
              <div>
                <h3 className="font-medium text-leanfuel-dark">Meal Schedule</h3>
                <p className="text-lg font-medium text-leanfuel-dark">
                  {data.mealFrequency === "three_meals" && "3 meals per day"}
                  {data.mealFrequency === "two_meals_one_snack" && "2 meals + 1 snack"}
                  {data.mealFrequency === "five_small_meals" && "5 small meals"}
                  {data.mealFrequency === "omad" && "One meal a day (OMAD)"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Optimized for your preferred eating pattern
                </p>
              </div>
            </div>
          </div>

          {data.allergies.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-leanfuel-primary bg-opacity-10 rounded-full p-2 mt-1">
                  <AlertCircle className="h-5 w-5 text-leanfuel-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-leanfuel-dark">Allergies & Intolerances</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.allergies.map((allergy) => (
                      <span 
                        key={allergy}
                        className="bg-red-50 text-red-700 text-xs rounded-full px-2 py-0.5"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your meal plans will exclude these items
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-green-50 rounded-lg border border-green-200 mt-2">
            <p className="text-green-700 text-sm">
              <span className="font-medium">You're all set, {data.name}!</span> Click the button 
              below to start your weight loss journey with LeanFuel.
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step5Results;
