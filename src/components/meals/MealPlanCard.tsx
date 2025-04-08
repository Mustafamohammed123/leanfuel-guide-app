
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Info, Lock } from "lucide-react";

export interface MealPlan {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  calories: string;
  duration: string;
  category: "beginner" | "balanced" | "highProtein" | "keto" | "fasting" | "vegan";
  tags: string[];
}

interface MealPlanCardProps {
  plan: MealPlan;
  onClick: () => void;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${plan.isPremium ? 'border-amber-200' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{plan.title}</CardTitle>
          {plan.isPremium && (
            <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
              <Lock size={12} className="mr-1" />
              Premium
            </div>
          )}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {plan.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex text-sm text-gray-500 gap-4">
          <div className="flex items-center">
            <Info size={14} className="mr-1" />
            {plan.calories} calories
          </div>
          <div>{plan.duration}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end">
        <ChevronRight size={18} className="text-gray-400" />
      </CardFooter>
    </Card>
  );
};

export default MealPlanCard;
