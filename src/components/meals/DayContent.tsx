
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import MealSection from "./MealSection";
import { DayMeals } from "@/utils/mealPlanUtils";

interface DayContentProps {
  dayIndex: number;
  dayPlan: DayMeals;
  onSaveMeal: (mealName: string) => void;
}

const DayContent: React.FC<DayContentProps> = ({ dayIndex, dayPlan, onSaveMeal }) => {
  return (
    <TabsContent value={`day${dayIndex + 1}`} className="space-y-4">
      <MealSection 
        title="Breakfast" 
        meal={dayPlan.breakfast} 
        onSave={onSaveMeal}
      />
      
      <MealSection 
        title="Lunch" 
        meal={dayPlan.lunch} 
        onSave={onSaveMeal}
      />
      
      <MealSection 
        title="Dinner" 
        meal={dayPlan.dinner} 
        onSave={onSaveMeal}
      />
      
      {dayPlan.snacks.length > 0 && (
        <div>
          <h3 className="font-medium text-sm text-gray-500 mb-2">Optional Snacks</h3>
          {dayPlan.snacks.map((snack, index) => (
            <MealSection 
              key={`snack-${index}`}
              title={`Snack ${index + 1}`} 
              meal={snack} 
              onSave={onSaveMeal}
              isSnack
            />
          ))}
        </div>
      )}
    </TabsContent>
  );
};

export default DayContent;
