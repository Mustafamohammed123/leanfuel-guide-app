
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Lock, ChevronRight, Info } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import MealPlanDetails from "@/components/MealPlanDetails";

type MealPlan = {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  calories: string;
  duration: string;
  category: "beginner" | "balanced" | "highProtein" | "keto" | "fasting" | "vegan";
  tags: string[];
};

const MEAL_PLANS: MealPlan[] = [
  {
    id: "clean-eating",
    title: "Clean Eating for Beginners",
    description: "A simple plan focused on whole, unprocessed foods to kickstart your weight loss journey",
    isPremium: false,
    calories: "1500-1800",
    duration: "7-day rotation",
    category: "beginner",
    tags: ["simple", "whole foods", "balanced"]
  },
  {
    id: "low-calorie",
    title: "Low-Calorie Balanced Plan",
    description: "Nutritionally complete meals with reduced calories for steady weight loss",
    isPremium: false,
    calories: "1200-1500",
    duration: "7-day rotation",
    category: "balanced",
    tags: ["calorie-controlled", "balanced", "nutritious"]
  },
  {
    id: "high-protein",
    title: "High-Protein Weight Loss",
    description: "Protein-focused meals to preserve muscle mass while losing fat",
    isPremium: false,
    calories: "1400-1700",
    duration: "7-day rotation",
    category: "highProtein",
    tags: ["protein-rich", "muscle-preserving", "satisfying"]
  },
  {
    id: "keto",
    title: "Keto for Weight Loss",
    description: "Low-carb, high-fat plan designed to trigger ketosis for accelerated fat burning",
    isPremium: true,
    calories: "1600-1900",
    duration: "7-day rotation",
    category: "keto",
    tags: ["low-carb", "high-fat", "ketogenic"]
  },
  {
    id: "intermittent",
    title: "Intermittent Fasting Meal Plan",
    description: "Timed eating patterns with nutrient-dense meals during eating windows",
    isPremium: true,
    calories: "1400-1700",
    duration: "7-day rotation",
    category: "fasting", 
    tags: ["16:8 protocol", "time-restricted", "metabolic health"]
  },
  {
    id: "vegan",
    title: "Vegan Fat Burner",
    description: "Plant-based meals optimized for weight loss without animal products",
    isPremium: true,
    calories: "1300-1600",
    duration: "7-day rotation",
    category: "vegan",
    tags: ["plant-based", "dairy-free", "ethical"]
  }
];

const MealPlanPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    toast("Upgrade feature coming soon!");
  };
  
  const handlePlanSelect = (plan: MealPlan) => {
    if (plan.isPremium) {
      toast("This meal plan is only available to premium subscribers", {
        action: {
          label: "Upgrade",
          onClick: handleUpgrade
        }
      });
      return;
    }
    
    setSelectedPlan(plan);
  };
  
  const handleBackToPlans = () => {
    setSelectedPlan(null);
  };
  
  if (selectedPlan) {
    return <MealPlanDetails plan={selectedPlan} onBack={handleBackToPlans} />;
  }
  
  return (
    <div className="leanfuel-container pb-20">
      <header className="pt-8 pb-4">
        <h1 className="text-2xl font-bold text-leanfuel-dark">Meal Plans</h1>
        <p className="text-gray-500">Choose a plan that fits your lifestyle</p>
      </header>
      
      <Tabs defaultValue="all" className="mb-4">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {MEAL_PLANS.map((plan) => (
            <MealPlanCard key={plan.id} plan={plan} onClick={() => handlePlanSelect(plan)} />
          ))}
        </TabsContent>
        
        <TabsContent value="free" className="space-y-4">
          {MEAL_PLANS.filter(p => !p.isPremium).map((plan) => (
            <MealPlanCard key={plan.id} plan={plan} onClick={() => handlePlanSelect(plan)} />
          ))}
        </TabsContent>
        
        <TabsContent value="premium" className="space-y-4">
          {MEAL_PLANS.filter(p => p.isPremium).map((plan) => (
            <MealPlanCard key={plan.id} plan={plan} onClick={() => handlePlanSelect(plan)} />
          ))}
          
          <div className="bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary rounded-lg shadow-md p-4 mt-6">
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                <Star size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">Unlock Premium Meal Plans</h3>
                <p className="text-white text-opacity-90 text-sm mb-3">
                  Get specialized meal plans, detailed nutrition guides, and personalized recipes.
                </p>
                <button
                  onClick={handleUpgrade}
                  className="bg-white text-leanfuel-accent font-medium text-sm py-1.5 px-3 rounded-lg"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomNavigation />
    </div>
  );
};

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

export default MealPlanPage;
