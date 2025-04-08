
import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OnboardingLayout from "./OnboardingLayout";

const Step3DietaryPreferences = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();

  const handleNext = () => {
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  return (
    <OnboardingLayout 
      onNext={handleNext} 
      onBack={handleBack}
      canProceed={!!data.dietaryPreference && !!data.mealFrequency}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Dietary Preferences</h1>
        <p className="text-gray-600">
          Tell us about your eating habits so we can recommend suitable meal plans.
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Dietary Preference</Label>
            <RadioGroup
              value={data.dietaryPreference || ""}
              onValueChange={(value) => updateData({ dietaryPreference: value as any })}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="standard" id="standard" className="mt-1" />
                <div>
                  <Label htmlFor="standard" className="font-medium text-leanfuel-dark">Standard</Label>
                  <p className="text-sm text-gray-500">Balanced diet with all food groups</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="low-carb" id="low-carb" className="mt-1" />
                <div>
                  <Label htmlFor="low-carb" className="font-medium text-leanfuel-dark">Low-Carb</Label>
                  <p className="text-sm text-gray-500">Reduced carbohydrates, higher protein and fat</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="keto" id="keto" className="mt-1" />
                <div>
                  <Label htmlFor="keto" className="font-medium text-leanfuel-dark">Keto</Label>
                  <p className="text-sm text-gray-500">Very low carb, high fat diet</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="vegetarian" id="vegetarian" className="mt-1" />
                <div>
                  <Label htmlFor="vegetarian" className="font-medium text-leanfuel-dark">Vegetarian</Label>
                  <p className="text-sm text-gray-500">No meat, but includes dairy and eggs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="vegan" id="vegan" className="mt-1" />
                <div>
                  <Label htmlFor="vegan" className="font-medium text-leanfuel-dark">Vegan</Label>
                  <p className="text-sm text-gray-500">No animal products whatsoever</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="fasting" id="fasting" className="mt-1" />
                <div>
                  <Label htmlFor="fasting" className="font-medium text-leanfuel-dark">Intermittent Fasting</Label>
                  <p className="text-sm text-gray-500">Time-restricted eating patterns</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 mt-6">
            <Label className="text-base">Meal Frequency</Label>
            <RadioGroup
              value={data.mealFrequency || ""}
              onValueChange={(value) => updateData({ mealFrequency: value as any })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="three_meals" id="three_meals" />
                <Label htmlFor="three_meals" className="font-medium text-leanfuel-dark">3 meals per day</Label>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="two_meals_one_snack" id="two_meals_one_snack" />
                <Label htmlFor="two_meals_one_snack" className="font-medium text-leanfuel-dark">2 meals + 1 snack</Label>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="five_small_meals" id="five_small_meals" />
                <Label htmlFor="five_small_meals" className="font-medium text-leanfuel-dark">5 small meals</Label>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-leanfuel-primary transition-colors cursor-pointer">
                <RadioGroupItem value="omad" id="omad" />
                <Label htmlFor="omad" className="font-medium text-leanfuel-dark">One meal a day (OMAD)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step3DietaryPreferences;
