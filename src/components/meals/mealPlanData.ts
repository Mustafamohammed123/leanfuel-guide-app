
import { MealPlan } from "./MealPlanCard";

export const MEAL_PLANS: MealPlan[] = [
  {
    id: "clean-eating",
    title: "Clean Eating for Beginners",
    description: "A simple plan focused on whole, unprocessed foods to kickstart your weight loss journey",
    isPremium: false,
    calories: "1500-1800",
    duration: "7-day rotation",
    category: "beginner",
    tags: ["simple", "whole foods", "balanced"]
  },
  {
    id: "low-calorie",
    title: "Low-Calorie Balanced Plan",
    description: "Nutritionally complete meals with reduced calories for steady weight loss",
    isPremium: false,
    calories: "1200-1500",
    duration: "7-day rotation",
    category: "balanced",
    tags: ["calorie-controlled", "balanced", "nutritious"]
  },
  {
    id: "high-protein",
    title: "High-Protein Weight Loss",
    description: "Protein-focused meals to preserve muscle mass while losing fat",
    isPremium: false,
    calories: "1400-1700",
    duration: "7-day rotation",
    category: "highProtein",
    tags: ["protein-rich", "muscle-preserving", "satisfying"]
  },
  {
    id: "keto",
    title: "Keto for Weight Loss",
    description: "Low-carb, high-fat plan designed to trigger ketosis for accelerated fat burning",
    isPremium: true,
    calories: "1600-1900",
    duration: "7-day rotation",
    category: "keto",
    tags: ["low-carb", "high-fat", "ketogenic"]
  },
  {
    id: "intermittent",
    title: "Intermittent Fasting Meal Plan",
    description: "Timed eating patterns with nutrient-dense meals during eating windows",
    isPremium: true,
    calories: "1400-1700",
    duration: "7-day rotation",
    category: "fasting", 
    tags: ["16:8 protocol", "time-restricted", "metabolic health"]
  },
  {
    id: "vegan",
    title: "Vegan Fat Burner",
    description: "Plant-based meals optimized for weight loss without animal products",
    isPremium: true,
    calories: "1300-1600",
    duration: "7-day rotation",
    category: "vegan",
    tags: ["plant-based", "dairy-free", "ethical"]
  }
];
