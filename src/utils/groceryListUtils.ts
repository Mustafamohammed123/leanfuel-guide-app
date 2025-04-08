
import { Meal } from "./mealPlanUtils";

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

export type GroceryList = GroceryItem[];

// Categories for grocery items
export const GROCERY_CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Meat",
  "Dairy",
  "Grains",
  "Oils",
  "Spices",
  "Other"
];

// Map ingredients to their categories
const ingredientCategoryMap: Record<string, string> = {
  // Vegetables
  "spinach": "Vegetables",
  "broccoli": "Vegetables",
  "lettuce": "Vegetables",
  "tomato": "Vegetables",
  "tomatoes": "Vegetables",
  "carrot": "Vegetables",
  "carrots": "Vegetables",
  "cucumber": "Vegetables",
  "onion": "Vegetables",
  "garlic": "Vegetables",
  "sweet potato": "Vegetables",
  "sweet potatoes": "Vegetables",
  "pepper": "Vegetables",
  "bell pepper": "Vegetables",
  
  // Fruits
  "apple": "Fruits",
  "banana": "Fruits",
  "orange": "Fruits",
  "lemon": "Fruits",
  "avocado": "Fruits",
  "avocados": "Fruits",
  "berries": "Fruits",
  "strawberry": "Fruits",
  "strawberries": "Fruits",
  "blueberry": "Fruits",
  "blueberries": "Fruits",
  
  // Meat
  "chicken": "Meat",
  "beef": "Meat",
  "pork": "Meat",
  "turkey": "Meat",
  "chicken breast": "Meat",
  "ground beef": "Meat",
  "salmon": "Meat",
  "fish": "Meat",
  "tuna": "Meat",
  
  // Dairy
  "milk": "Dairy",
  "cheese": "Dairy",
  "yogurt": "Dairy",
  "greek yogurt": "Dairy",
  "eggs": "Dairy",
  "butter": "Dairy",
  "cream": "Dairy",
  
  // Grains
  "rice": "Grains",
  "quinoa": "Grains",
  "oats": "Grains",
  "pasta": "Grains",
  "bread": "Grains",
  "tortilla": "Grains",
  "tortillas": "Grains",
  "flour": "Grains",
  
  // Oils
  "olive oil": "Oils",
  "coconut oil": "Oils",
  "avocado oil": "Oils",
  "vegetable oil": "Oils",
  
  // Spices
  "salt": "Spices",
  "pepper": "Spices",
  "cumin": "Spices",
  "paprika": "Spices",
  "cinnamon": "Spices",
  "oregano": "Spices",
  "basil": "Spices",
};

// Generate a category for an ingredient
const getIngredientCategory = (ingredient: string): string => {
  const ingredientLower = ingredient.toLowerCase();
  
  // Check for exact matches
  for (const [key, category] of Object.entries(ingredientCategoryMap)) {
    if (ingredientLower.includes(key)) {
      return category;
    }
  }
  
  return "Other";
};

// Generate a unique ID for a grocery item
const generateId = (): string => {
  return `grocery-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Generate a grocery list from a list of meals
export const generateGroceryListFromMeals = (meals: Meal[]): GroceryList => {
  const ingredientMap = new Map<string, GroceryItem>();
  
  // Extract ingredients from all meals
  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      const trimmedIngredient = ingredient.trim();
      
      // Skip if the ingredient is already in the list
      if (ingredientMap.has(trimmedIngredient)) {
        return;
      }
      
      // Add the ingredient to the map
      ingredientMap.set(trimmedIngredient, {
        id: generateId(),
        name: trimmedIngredient,
        category: getIngredientCategory(trimmedIngredient),
        checked: false
      });
    });
  });
  
  // Convert the map to an array and sort by category
  return Array.from(ingredientMap.values()).sort((a, b) => {
    // Sort by category first
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    // Then sort by name
    return a.name.localeCompare(b.name);
  });
};

// Flatten meal plan data to get all meals
export const getAllMealsFromMealPlan = (mealPlanData: any[]): Meal[] => {
  const allMeals: Meal[] = [];
  
  mealPlanData.forEach(dayPlan => {
    allMeals.push(dayPlan.breakfast);
    allMeals.push(dayPlan.lunch);
    allMeals.push(dayPlan.dinner);
    
    if (dayPlan.snacks && dayPlan.snacks.length) {
      allMeals.push(...dayPlan.snacks);
    }
  });
  
  return allMeals;
};
