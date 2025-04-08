
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Utensils, Clock, Plus } from "lucide-react";
import { Meal } from "@/utils/mealPlanUtils";

interface MealSectionProps {
  title: string;
  meal: Meal;
  onSave: (name: string) => void;
  isSnack?: boolean;
}

const MealSection: React.FC<MealSectionProps> = ({ 
  title, 
  meal, 
  onSave,
  isSnack = false 
}) => {
  return (
    <div className={`leanfuel-card ${isSnack ? 'bg-gray-50' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className={`font-medium ${isSnack ? 'text-sm' : 'text-base'}`}>{title}</h3>
          <p className="font-medium text-leanfuel-dark">{meal.name}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => onSave(meal.name)}
        >
          <Plus size={18} />
        </Button>
      </div>
      
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <Utensils size={12} className="mr-1" />
        <span>{meal.calories} kcal</span>
        <Clock size={12} className="ml-3 mr-1" />
        <span>{meal.prepTime} min</span>
      </div>
      
      <Accordion type="single" collapsible className="w-full border-t pt-2">
        <AccordionItem value="ingredients" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium">
            Ingredients
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        {meal.instructions && (
          <AccordionItem value="instructions" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm font-medium">
              Instructions
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                {meal.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default MealSection;
