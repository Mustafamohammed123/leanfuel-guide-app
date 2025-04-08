
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star } from "lucide-react";
import { useSubscription, SUBSCRIPTION_PLANS } from "@/contexts/SubscriptionContext";

const SubscriptionModal = () => {
  const { isModalOpen, setIsModalOpen, handleUpgrade } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl flex justify-center items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-center">
            Unlock all features and take your nutrition journey to the next level
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? "border-leanfuel-primary bg-leanfuel-secondary" 
                    : "hover:border-leanfuel-primary"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <p className="font-bold text-center">{plan.name}</p>
                <p className="text-center text-lg font-bold text-leanfuel-primary mt-1">
                  {plan.price}
                </p>
                <p className="text-xs text-center mt-1 text-gray-500">{plan.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold mb-2">Premium Features:</p>
            <ul className="space-y-2">
              {SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-leanfuel-accent to-leanfuel-primary text-white"
            onClick={() => handleUpgrade(selectedPlan)}
          >
            Upgrade Now
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            You can cancel your subscription at any time. 
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
