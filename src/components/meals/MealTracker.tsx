import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import FoodLogEntry from "./FoodLogEntry";
import FoodLogList from "./FoodLogList";
import MacroProgress from "./MacroProgress";
import { FoodItem, FoodLog, getMealLog, saveMealLog } from "@/utils/foodLogUtils";

interface MealTrackerProps {
  isPremium?: boolean;
  onDailyLogComplete?: () => void;
}

const MealTracker: React.FC<MealTrackerProps> = ({ 
  isPremium = false, 
  onDailyLogComplete 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodLog, setFoodLog] = useState<FoodLog>({
    foods: [],
    date: format(new Date(), 'yyyy-MM-dd'),
    caloriesBurned: 0
  });
  
  // Macro goals - could be customized per user in a real app
  const macroGoals = {
    carbs: 250,
    protein: 120,
    fat: 70
  };

  useEffect(() => {
    // Load food log for the selected date
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const log = getMealLog(dateStr);
    setFoodLog(log);
  }, [selectedDate]);

  const handleAddFood = (food: FoodItem) => {
    const updatedLog = {
      ...foodLog,
      foods: [...foodLog.foods, food]
    };
    setFoodLog(updatedLog);
    saveMealLog(updatedLog);
    
    // Check if this completes a full day's logging (3 or more meals)
    // This is a simple heuristic - in a real app, you might have more complex logic
    if (updatedLog.foods.length >= 3 && onDailyLogComplete) {
      onDailyLogComplete();
    }
  };

  const handleRemoveFood = (id: string) => {
    const updatedLog = {
      ...foodLog,
      foods: foodLog.foods.filter(food => food.id !== id)
    };
    setFoodLog(updatedLog);
    saveMealLog(updatedLog);
  };

  const handleAddCaloriesBurned = () => {
    // This would open a dialog to add exercise/calories burned
    const mockCaloriesBurned = 150;
    const updatedLog = {
      ...foodLog,
      caloriesBurned: foodLog.caloriesBurned + mockCaloriesBurned
    };
    setFoodLog(updatedLog);
    saveMealLog(updatedLog);
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? addDays(selectedDate, -1) 
      : addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  // Calculate totals
  const totalCalories = foodLog.foods.reduce((sum, food) => sum + food.calories, 0);
  const totalCarbs = foodLog.foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalProtein = foodLog.foods.reduce((sum, food) => sum + food.protein, 0);
  const totalFat = foodLog.foods.reduce((sum, food) => sum + food.fat, 0);
  
  const netCalories = totalCalories - foodLog.caloriesBurned;

  return (
    <div className="leanfuel-card px-4 py-5">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleDateChange('prev')}
        >
          <ArrowLeft size={16} />
        </Button>
        
        <h2 className="text-lg font-bold">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h2>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleDateChange('next')}
          disabled={format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')}
        >
          <ArrowRight size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="leanfuel-card flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="text-xs text-gray-500 mb-1">Calories In</div>
          <div className="text-3xl font-bold text-green-600">{totalCalories}</div>
        </div>
        
        <div className="leanfuel-card flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-xs text-gray-500 mb-1">Calories Out</div>
          <div className="text-3xl font-bold text-red-500">{foodLog.caloriesBurned}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Net Calories</h3>
        <div className={`text-xl font-bold ${netCalories > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {netCalories > 0 ? '+' : ''}{netCalories}
        </div>
      </div>
      
      <div className="mb-6">
        <MacroProgress 
          carbs={{ current: totalCarbs, goal: macroGoals.carbs }}
          protein={{ current: totalProtein, goal: macroGoals.protein }}
          fat={{ current: totalFat, goal: macroGoals.fat }}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Today's Food</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddCaloriesBurned}
          >
            Log Exercise
          </Button>
        </div>
        
        <FoodLogList 
          foods={foodLog.foods} 
          onRemoveFood={handleRemoveFood} 
        />
        
        <div className="pt-2">
          <FoodLogEntry 
            onAddFood={handleAddFood}
            isPremium={isPremium}
          />
        </div>
      </div>
    </div>
  );
};

export default MealTracker;
