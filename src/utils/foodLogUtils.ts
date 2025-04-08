
// Define types for food log entries
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  servingSize: string;
}

export interface FoodLog {
  date: string;
  foods: FoodItem[];
  caloriesBurned: number;
}

// Helper functions for saving/loading food logs
const FOOD_LOG_PREFIX = 'leanfuel_foodlog_';

// Get food log for a specific date
export const getMealLog = (date: string): FoodLog => {
  const storageKey = `${FOOD_LOG_PREFIX}${date}`;
  const storedLog = localStorage.getItem(storageKey);
  
  if (storedLog) {
    return JSON.parse(storedLog);
  }
  
  // Return empty log for the date
  return {
    date,
    foods: [],
    caloriesBurned: 0
  };
};

// Save food log for a specific date
export const saveMealLog = (log: FoodLog): void => {
  const storageKey = `${FOOD_LOG_PREFIX}${log.date}`;
  localStorage.setItem(storageKey, JSON.stringify(log));
};

// Get all logged days (could be used for reports/history)
export const getLoggedDays = (): string[] => {
  const days: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(FOOD_LOG_PREFIX)) {
      days.push(key.replace(FOOD_LOG_PREFIX, ''));
    }
  }
  
  return days.sort();
};

// Calculate nutritional totals for a week (Premium feature)
export const getWeeklyNutritionTotals = (startDate: string, endDate: string) => {
  const days = getLoggedDays().filter(day => day >= startDate && day <= endDate);
  
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCaloriesBurned = 0;
  
  days.forEach(day => {
    const log = getMealLog(day);
    
    totalCaloriesBurned += log.caloriesBurned;
    
    log.foods.forEach(food => {
      totalCalories += food.calories;
      totalCarbs += food.carbs;
      totalProtein += food.protein;
      totalFat += food.fat;
    });
  });
  
  return {
    calories: totalCalories,
    caloriesBurned: totalCaloriesBurned,
    netCalories: totalCalories - totalCaloriesBurned,
    carbs: totalCarbs,
    protein: totalProtein,
    fat: totalFat,
    daysLogged: days.length
  };
};

// Add pre-made meal to log (Premium feature)
export const addMealToLog = (mealName: string, date: string, mealData: any): void => {
  // Get existing log
  const log = getMealLog(date);
  
  // Create food item from meal data
  const foodItem: FoodItem = {
    id: `food-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: mealName,
    calories: mealData.calories || 0,
    carbs: mealData.carbs || 0,
    protein: mealData.protein || 0,
    fat: mealData.fat || 0,
    servingSize: mealData.servingSize || "1 serving"
  };
  
  // Add to log and save
  log.foods.push(foodItem);
  saveMealLog(log);
};
