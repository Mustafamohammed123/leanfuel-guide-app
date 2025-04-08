
import React from "react";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/utils/foodLogUtils";
import { Trash2 } from "lucide-react";

interface FoodLogListProps {
  foods: FoodItem[];
  onRemoveFood: (id: string) => void;
}

const FoodLogList: React.FC<FoodLogListProps> = ({ foods, onRemoveFood }) => {
  if (foods.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No foods logged today. Add your first meal!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {foods.map((food) => (
        <div 
          key={food.id} 
          className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
        >
          <div>
            <h3 className="font-medium">{food.name}</h3>
            <div className="text-sm text-gray-500">
              {food.servingSize} • {food.calories} calories
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <span className="text-green-600">{food.carbs}c</span>
              {" / "}
              <span className="text-blue-600">{food.protein}p</span>
              {" / "}
              <span className="text-yellow-600">{food.fat}f</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onRemoveFood(food.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodLogList;
