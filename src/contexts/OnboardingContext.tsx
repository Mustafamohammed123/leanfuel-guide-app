
import React, { createContext, useContext, useState, ReactNode } from "react";

type DietaryPreference = "standard" | "low-carb" | "keto" | "vegetarian" | "vegan" | "fasting";
type MealFrequency = "three_meals" | "two_meals_one_snack" | "five_small_meals" | "omad";
type Gender = "male" | "female" | "other";
type WeightUnit = "kg" | "lbs";

export interface OnboardingData {
  name: string;
  age: number | null;
  gender: Gender | null;
  height: number | null; // in cm
  weight: number | null;
  weightUnit: WeightUnit;
  weightGoal: number | null; // target weight
  dietaryPreference: DietaryPreference | null;
  mealFrequency: MealFrequency | null;
  allergies: string[];
  calorieGoal: number | null;
  completed: boolean;
}

const initialData: OnboardingData = {
  name: "",
  age: null,
  gender: null,
  height: null,
  weight: null,
  weightUnit: "kg",
  weightGoal: null,
  dietaryPreference: null,
  mealFrequency: null,
  allergies: [],
  calorieGoal: null,
  completed: false,
};

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  calculateCalorieGoal: () => number;
  resetData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
    setCurrentStep(1);
  };

  const calculateCalorieGoal = (): number => {
    // Only calculate if we have the required data
    if (!data.gender || !data.age || !data.height || !data.weight) {
      return 0;
    }

    // Basic BMR calculation using the Mifflin-St Jeor Equation
    const weight = data.weightUnit === "lbs" ? data.weight * 0.453592 : data.weight; // Convert to kg if needed
    let bmr = 0;

    if (data.gender === "male") {
      bmr = 10 * weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      bmr = 10 * weight + 6.25 * data.height - 5 * data.age - 161;
    }

    // Adjust for activity level (assuming moderate activity for now)
    const tdee = bmr * 1.375;

    // Create a deficit for weight loss (500-1000 calories)
    // Lower deficit for lower weights to avoid too low calorie goals
    const deficit = weight < 70 ? 500 : 750;
    
    const calorieGoal = Math.max(1200, Math.round(tdee - deficit));
    
    // Update the calorie goal in the data
    updateData({ calorieGoal });
    
    return calorieGoal;
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        calculateCalorieGoal,
        resetData,
        currentStep,
        setCurrentStep,
        totalSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
