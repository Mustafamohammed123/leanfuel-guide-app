
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { ArrowLeft, Heart, Share2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import DayTabs from "@/components/meals/DayTabs";
import DayContent from "@/components/meals/DayContent";
import { MealPlan } from "@/components/meals/MealPlanCard";
import { MEAL_PLAN_DATA } from "@/utils/mealPlanUtils";
import GroceryListBuilder from "@/components/grocery/GroceryListBuilder";

interface MealPlanDetailsProps {
  plan: MealPlan;
  onBack: () => void;
}

const MealPlanDetails: React.FC<MealPlanDetailsProps> = ({ plan, onBack }) => {
  const [activeDay, setActiveDay] = useState("day1");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGroceryBuilder, setShowGroceryBuilder] = useState(false);
  
  const mealPlanData = MEAL_PLAN_DATA[plan.id] || [];
  
  const handleDayChange = (value: string) => {
    setActiveDay(value);
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites");
  };
  
  const handleShare = () => {
    toast("Sharing feature coming soon!");
  };
  
  const handleSaveMeal = (mealName: string) => {
    toast(`Added ${mealName} to grocery list`);
  };

  const handleGenerateGroceryList = () => {
    if (plan.isPremium) {
      // Check if user is premium, otherwise show upgrade message
      const isPremiumUser = localStorage.getItem('isPremiumUser') === 'true';
      
      if (!isPremiumUser) {
        toast("Premium meal plans require a subscription", {
          action: {
            label: "Upgrade",
            onClick: () => toast("Upgrade feature coming soon!")
          }
        });
        return;
      }
    }
    
    setShowGroceryBuilder(true);
  };
  
  if (showGroceryBuilder) {
    return <GroceryListBuilder plan={plan} onBack={() => setShowGroceryBuilder(false)} />;
  }
  
  return (
    <div className="leanfuel-container pb-20">
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft size={18} />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleToggleFavorite}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">{plan.title}</h1>
        <p className="text-gray-500">{plan.description}</p>
        
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
          <div>{plan.calories} calories</div>
          <div>{plan.duration}</div>
        </div>
        
        <Button 
          className="mt-3 gap-2" 
          onClick={handleGenerateGroceryList}
        >
          <ShoppingBag size={16} />
          Generate Grocery List
        </Button>
      </header>
      
      <Tabs value={activeDay} onValueChange={handleDayChange} className="mb-6">
        <DayTabs activeDay={activeDay} onDayChange={handleDayChange} />
        
        {mealPlanData.map((dayPlan, index) => (
          <DayContent 
            key={`content-day${index + 1}`}
            dayIndex={index}
            dayPlan={dayPlan}
            onSaveMeal={handleSaveMeal} 
          />
        ))}
      </Tabs>
    </div>
  );
};

export default MealPlanDetails;
