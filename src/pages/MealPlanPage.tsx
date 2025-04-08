
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/BottomNavigation";
import MealPlanDetails from "@/components/MealPlanDetails";
import MealPlanCard, { MealPlan } from "@/components/meals/MealPlanCard";
import PremiumBanner from "@/components/meals/PremiumBanner";
import { MEAL_PLANS } from "@/components/meals/mealPlanData";

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
          
          <PremiumBanner onUpgrade={handleUpgrade} />
        </TabsContent>
      </Tabs>
      
      <BottomNavigation />
    </div>
  );
};

export default MealPlanPage;
