
import React from "react";
import { Progress } from "@/components/ui/progress";

interface MacroProgressProps {
  carbs: {
    current: number;
    goal: number;
  };
  protein: {
    current: number;
    goal: number;
  };
  fat: {
    current: number;
    goal: number;
  };
}

const MacroProgress: React.FC<MacroProgressProps> = ({ carbs, protein, fat }) => {
  const carbsPercentage = Math.min(100, (carbs.current / carbs.goal) * 100);
  const proteinPercentage = Math.min(100, (protein.current / protein.goal) * 100);
  const fatPercentage = Math.min(100, (fat.current / fat.goal) * 100);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Daily Macros</h3>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <div className="font-medium text-sm text-green-600">Carbs</div>
            <div className="text-sm text-gray-500">
              {carbs.current}g / {carbs.goal}g
            </div>
          </div>
          <Progress 
            value={carbsPercentage} 
            className="h-2 bg-green-100" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <div className="font-medium text-sm text-blue-600">Protein</div>
            <div className="text-sm text-gray-500">
              {protein.current}g / {protein.goal}g
            </div>
          </div>
          <Progress 
            value={proteinPercentage} 
            className="h-2 bg-blue-100" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <div className="font-medium text-sm text-yellow-600">Fat</div>
            <div className="text-sm text-gray-500">
              {fat.current}g / {fat.goal}g
            </div>
          </div>
          <Progress 
            value={fatPercentage} 
            className="h-2 bg-yellow-100" 
          />
        </div>
      </div>
    </div>
  );
};

export default MacroProgress;
