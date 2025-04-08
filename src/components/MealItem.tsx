
import { Clock, Utensils, ChevronRight } from "lucide-react";

interface MealItemProps {
  title: string;
  calories: number;
  prepTime: number;
  image: string;
  isPremium?: boolean;
  onClick?: () => void;
}

const MealItem = ({
  title,
  calories,
  prepTime,
  image,
  isPremium = false,
  onClick,
}: MealItemProps) => {
  return (
    <div 
      className="leanfuel-card flex mb-3 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover"
        />
        {isPremium && (
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-1 rounded-bl">
            PRO
          </div>
        )}
      </div>
      <div className="ml-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-base">{title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Utensils size={12} className="mr-1" />
            <span>{calories} kcal</span>
            <Clock size={12} className="ml-3 mr-1" />
            <span>{prepTime} min</span>
          </div>
        </div>
        <div className="self-end mt-2">
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MealItem;
